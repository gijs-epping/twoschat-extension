import { vectorStoreService } from '../dist/vectorStore.bundle.js';

// DOM Elements
let loginForm, settingsForm, usernameInput, passwordInput, loginButton, authStatus, 
    openaiTokenInput, saveButton, openChatButton;

// Initialize DOM elements
function initializeElements() {
  console.log('Initializing DOM elements...');
  loginForm = document.getElementById('login-form');
  settingsForm = document.getElementById('settings-form');
  usernameInput = document.getElementById('username');
  passwordInput = document.getElementById('password');
  loginButton = document.getElementById('login-btn');
  authStatus = document.getElementById('auth-status');
  openaiTokenInput = document.getElementById('openai-token');
  saveButton = document.getElementById('save-btn');
  openChatButton = document.getElementById('open-chat-btn');

  // Log element states
  console.log('Elements found:', {
    loginForm: !!loginForm,
    settingsForm: !!settingsForm,
    usernameInput: !!usernameInput,
    passwordInput: !!passwordInput,
    loginButton: !!loginButton,
    authStatus: !!authStatus,
    openaiTokenInput: !!openaiTokenInput,
    saveButton: !!saveButton,
    openChatButton: !!openChatButton
  });
}

// Check if all required settings are present
async function checkSettings() {
  const { openaiToken, twosAuth } = await chrome.storage.local.get(['openaiToken', 'twosAuth']);
  return !!(openaiToken && twosAuth?.userId && twosAuth?.token);
}

// Load existing settings and check auth state
async function loadSettings() {
  const { openaiToken, twosAuth } = await chrome.storage.local.get(['openaiToken', 'twosAuth']);
  
  if (openaiToken) {
    openaiTokenInput.value = openaiToken;
  }
  
  if (twosAuth?.userId && twosAuth?.token) {
    loginForm.style.display = 'none';
    settingsForm.style.display = 'block';
    
    // Show open chat button if OpenAI key is also set
    if (openaiToken) {
      openChatButton.style.display = 'block';
    }
  } else {
    loginForm.style.display = 'block';
    settingsForm.style.display = 'none';
    openChatButton.style.display = 'none';
  }
}

// Handle TwosApp login
async function handleLogin() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  
  if (!username || !password) {
    authStatus.textContent = 'Please enter both username and password';
    authStatus.className = 'status-text error';
    return;
  }
  
  loginButton.disabled = true;
  loginButton.textContent = 'Logging in...';
  authStatus.textContent = '';
  
  try {
    // Find TwosApp tabs
    const tabs = await chrome.tabs.query({ url: '*://*.twosapp.com/*' });
    
    if (tabs.length === 0) {
      throw new Error('Please open TwosApp in another tab first');
    }
    
    // Inject content script into the first TwosApp tab
    await chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content-scripts/twos-integration.js']
    });

    // Wait for content script to be ready
    const checkScriptReady = async () => {
      try {
        const pingResponse = await chrome.tabs.sendMessage(tabs[0].id, { type: 'PING' });
        return pingResponse?.ready;
      } catch (error) {
        return false;
      }
    };

    // Poll until content script is ready (with timeout)
    let attempts = 0;
    while (!(await checkScriptReady()) && attempts < 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      attempts++;
    }

    if (attempts >= 10) {
      throw new Error('Content script failed to initialize');
    }
    
    // Send login request to content script
    const response = await chrome.tabs.sendMessage(tabs[0].id, {
      type: 'LOGIN',
      data: { username, password }
    });
    
    if (response?.success) {
      // Save auth data
      await chrome.storage.local.set({
        twosAuth: {
          userId: response.data.userId,
          token: response.data.token
        }
      });
      
      // Update UI
      loginForm.style.display = 'none';
      settingsForm.style.display = 'block';
      authStatus.textContent = '';
    } else {
      throw new Error(response?.error || 'Login failed');
    }
    
  } catch (error) {
    console.error('Login error:', error);
    authStatus.textContent = error.message || 'Login failed. Please try again.';
    authStatus.className = 'status-text error';
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = 'Login';
  }
}

// Save OpenAI settings
async function saveSettings() {
  const openaiToken = openaiTokenInput.value.trim();
  
  if (!openaiToken) {
    alert('Please enter your OpenAI API key');
    return;
  }
  
  try {
    await chrome.storage.local.set({ openaiToken });
    
    // Save to localStorage for vector store service
    localStorage.setItem('openaiId', openaiToken);
    
    // Get Twos auth data
    const { twosAuth } = await chrome.storage.local.get(['twosAuth']);
    
    if (twosAuth?.userId && twosAuth?.token) {
      saveButton.textContent = 'Syncing...';
      saveButton.disabled = true;
      
      try {
        // Initialize vector store service with new OpenAI key
        vectorStoreService.initialize();
        
        // Sync data to vector store
        await vectorStoreService.syncToVectorStore(twosAuth.userId, twosAuth.token);
        
        // Show success message
        saveButton.textContent = 'Saved!';
        saveButton.style.backgroundColor = '#28a745';
        
        // Show open chat button if all settings are present
        if (await checkSettings()) {
          openChatButton.style.display = 'block';
        }
      } catch (error) {
        console.error('Error syncing to vector store:', error);
        alert('Error syncing to vector store. Please try again.');
        saveButton.textContent = 'Save';
        saveButton.style.backgroundColor = '#0084ff';
      }
    } else {
      // Show success message without syncing
      saveButton.textContent = 'Saved!';
      saveButton.style.backgroundColor = '#28a745';
    }
    
    setTimeout(() => {
      saveButton.textContent = 'Save';
      saveButton.style.backgroundColor = '#0084ff';
      saveButton.disabled = false;
    }, 2000);
    
  } catch (error) {
    console.error('Error saving settings:', error);
    alert('Error saving settings. Please try again.');
  }
}

// Open chat in new tab
async function openChat() {
  const url = chrome.runtime.getURL('pages/chat.html');
  await chrome.tabs.create({ url });
  window.close(); // Close the popup
}

// Initialize the application
function initialize() {
  console.log('Initializing application...');
  initializeElements();
  
  if (!loginButton || !saveButton || !openChatButton) {
    console.error('Critical elements not found, retrying in 100ms...');
    setTimeout(initialize, 100);
    return;
  }

  console.log('Adding event listeners...');
  loginButton.addEventListener('click', (e) => {
    console.log('Login button clicked');
    handleLogin();
  });
  
  saveButton.addEventListener('click', (e) => {
    console.log('Save button clicked');
    saveSettings();
  });
  
  openChatButton.addEventListener('click', (e) => {
    console.log('Open chat button clicked');
    openChat();
  });

  loadSettings();
  console.log('Initialization complete');
}

// Start initialization when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
