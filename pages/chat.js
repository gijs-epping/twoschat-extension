import { vectorStoreService } from '../dist/vectorStore.bundle.js';

// State
let isProcessing = false;

// Initialize the UI and check settings
async function initializeUI() {
  try {
    const { openaiToken, twosAuth } = await chrome.storage.local.get(['openaiToken', 'twosAuth']);
    
    if (!openaiToken || !twosAuth?.userId || !twosAuth?.token) {
      // Redirect to settings popup if not configured
      chrome.runtime.openOptionsPage();
      window.close();
      return;
    }
    
    // Initialize chat view elements
    initializeChatView();
    
  } catch (error) {
    console.error('Initialization error:', error);
  }
}

// Initialize chat view and its elements
function initializeChatView() {
  const messagesContainer = document.getElementById('messages');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-btn');
  const syncVectorButton = document.getElementById('sync-vector-btn');
  const openSidebarButton = document.getElementById('open-sidebar-btn');

  // Sidebar button handling
  openSidebarButton.addEventListener('click', async () => {
    try {
      // Get the current window
      const currentWindow = await chrome.windows.getCurrent();
      await chrome.sidePanel.open({ windowId: currentWindow.id });
    } catch (error) {
      console.error('Failed to open sidebar:', error);
      appendMessage('Failed to open sidebar. Please try again.', 'error');
    }
  });

  // Set up vector store status callback
  vectorStoreService.setStatusCallback((message) => {
    appendMessage(message, 'system');
  });

  // Vector store sync handling
  syncVectorButton.addEventListener('click', async () => {
    if (isProcessing) return;
    
    isProcessing = true;
    
    try {
      const { twosAuth } = await chrome.storage.local.get(['twosAuth']);
      
      if (!twosAuth?.userId || !twosAuth?.token) {
        appendMessage('Please connect your TwosApp account in the settings.', 'error');
        return;
      }
      
      const result = await vectorStoreService.syncToVectorStore(twosAuth.userId, twosAuth.token);
      appendMessage('Vector store sync completed successfully!', 'system');
      
    } catch (error) {
      console.error('Sync error:', error);
      appendMessage('Failed to sync vector store. Please try again.', 'error');
    } finally {
      isProcessing = false;
    }
  });

  // Thread state
  let currentThread = null;

  // Message Handling
  async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message || isProcessing) return;

    isProcessing = true;
    messageInput.value = '';
    
    // Add user message to chat
    appendMessage(message, 'user');
    
    try {
      // Show typing indicator
      const typingIndicator = appendMessage(
        '<div class="typing-indicator"><span>TwosChat is thinking</span><div class="typing-dots"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>',
        'ai typing',
        true
      );

      // Create thread if it doesn't exist
      if (!currentThread) {
        currentThread = await vectorStoreService.createThread(message);
      }

      // Add message to thread
      await vectorStoreService.openai.beta.threads.messages.create(
        currentThread.id,
        {
          role: 'user',
          content: message
        }
      );

      // Run the assistant
      const run = await vectorStoreService.openai.beta.threads.runs.create(
        currentThread.id,
        {
          assistant_id: localStorage.getItem('assistantId')
        }
      );

      // Poll for completion
      let runStatus = await vectorStoreService.openai.beta.threads.runs.retrieve(
        currentThread.id,
        run.id
      );
      
      while (runStatus.status !== 'completed') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        runStatus = await vectorStoreService.openai.beta.threads.runs.retrieve(
          currentThread.id,
          run.id
        );
        
        if (runStatus.status === 'failed') {
          throw new Error('Assistant run failed');
        }
      }

      // Get the assistant's response
      const messages = await vectorStoreService.openai.beta.threads.messages.list(
        currentThread.id
      );
      const lastMessage = messages.data[0];
      const aiMessage = lastMessage.content[0].text.value;

      // Remove typing indicator and add AI response
      typingIndicator.remove();
      appendMessage(aiMessage, 'ai');
      
    } catch (error) {
      console.error('Error:', error);
      appendMessage('An error occurred. Please try again.', 'error');
      // Reset thread on error
      currentThread = null;
    } finally {
      isProcessing = false;
    }
  }

  // UI Helpers
  function appendMessage(text, type, isHTML = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    if (isHTML) {
      messageDiv.innerHTML = text;
    } else if (type === 'ai') {
      // Clean up the text
      text = text
        // Remove file references
        .replace(/【[^】]+】/g, '')
        // Split into paragraphs
        .split(/\\n\\n|\n\n/)
        .map(paragraph => {
          // Process each paragraph
          return paragraph
            // Convert markdown elements to HTML
            .replace(/^### (.*?)$/gm, '<h3>$1</h3>') // H3
            .replace(/^## (.*?)$/gm, '<h2>$1</h2>') // H2
            .replace(/^# (.*?)$/gm, '<h1>$1</h1>') // H1
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
            .replace(/`(.*?)`/g, '<code>$1</code>') // Inline code
            .replace(/^- (.*?)$/gm, '<li>$1</li>') // List items
            // Convert single line breaks
            .replace(/\\n|\n/g, '<br>')
            .trim();
        })
        .map(p => {
          // Wrap in <p> or <ul> based on content
          if (p.includes('<li>')) {
            return `<ul>${p}</ul>`;
          }
          return `<p>${p}</p>`;
        })
        .join('')
        .trim();
      
      messageDiv.innerHTML = text;
      
      // Add copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-btn';
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Copy
      `;
      
      copyButton.addEventListener('click', () => {
        // Get text content without HTML tags
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        const textToCopy = tempDiv.textContent;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
          copyButton.textContent = 'Copied!';
          setTimeout(() => {
            copyButton.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            `;
          }, 2000);
        });
      });
      
      messageDiv.appendChild(copyButton);
    } else {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      messageDiv.appendChild(paragraph);
    }
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return messageDiv;
  }

  // Event Listeners
  sendButton.addEventListener('click', sendMessage);

  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Focus input
  messageInput.focus();
}

// Initialize the UI when the page loads
document.addEventListener('DOMContentLoaded', initializeUI);
