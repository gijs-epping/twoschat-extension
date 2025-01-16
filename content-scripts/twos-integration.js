console.log('TwosApp content script loading...');

// Global ready state
window.twosAuthReady = false;

// Handle TwosApp login
async function handleLogin({ username, password }) {
  console.log('Attempting login...');
  try {
    const response = await fetch('https://www.twosapp.com/apiV2/user/login/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        }
      }),
    });
    
    const data = await response.json();
    console.log('Login response:', data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    
    if (data.user?._id && data.user?.token) {
      const authData = {
        userId: data.user._id,
        token: data.user.token,
        username: data.user.username,
        email: data.user.email,
        profilePicture: data.user.profilePicture
      };
      
      // Store in localStorage for future use
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('token', data.user.token);
      
      return { success: true, data: authData };
    }
    
    throw new Error('Invalid response from server');
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
}

// Message listener setup - outside initialization to ensure it's always available
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Content script received message:', message);
  
  // Handle ping message for readiness check
  if (message.type === 'PING') {
    console.log('Received ping, sending pong. Ready state:', window.twosAuthReady);
    sendResponse({ pong: true, ready: window.twosAuthReady });
    return true;
  }
  
  // Only handle other messages if we're ready
  if (!window.twosAuthReady) {
    console.log('Received message but not ready yet');
    sendResponse({ success: false, error: 'Content script not ready' });
    return true;
  }
  
  if (message.type === 'LOGIN') {
    console.log('Handling login request...');
    handleLogin(message.data)
      .then(response => {
        console.log('Login result:', response);
        if (response.success) {
          // Save to storage directly from content script as well
          chrome.storage.local.set({ twosAuth: response.data })
            .then(() => console.log('Auth saved from content script'))
            .catch(err => console.error('Error saving auth:', err));
        }
        sendResponse(response);
      })
      .catch(error => {
        console.error('Login error:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }
});

// Initialize the content script
(function initialize() {
  try {
    // Check for multiple initializations
    if (window.twosAuthInitialized) {
      console.log('TwosApp auth script already initialized');
      window.twosAuthReady = true;
    } else {
      console.log('Initializing TwosApp auth script');
      window.twosAuthInitialized = true;
      
      // Intercept both fetch and XHR requests
      const originalFetch = window.fetch;
      const originalXHROpen = XMLHttpRequest.prototype.open;
      const originalXHRSend = XMLHttpRequest.prototype.send;

      // Intercept fetch requests
      window.fetch = async function(...args) {
        const response = await originalFetch.apply(this, args);
        
        try {
          const url = typeof args[0] === 'string' ? args[0] : args[0].url;
          if (url.includes('/api') || url.includes('fullSync')) {
            const clone = response.clone();
            const data = await clone.json();
            console.log('Intercepted fetch response:', { url, data });
            
            // Look for auth data in response
            const userId = data.user?._id;
            const token = data.user?.token;
            
            if (userId && token) {
              console.log('Found auth data in fetch response');
              if (chrome.runtime && chrome.runtime.sendMessage) {
                chrome.runtime.sendMessage({
                  type: 'TWOS_AUTH_CAPTURED',
                  data: { userId, token }
                });
              }
            }
          }
        } catch (error) {
          console.error('Error processing fetch request:', error);
        }
        
        return response;
      };

      // Intercept XHR requests
      XMLHttpRequest.prototype.open = function(...args) {
        const url = args[1];
        this._url = url;
        return originalXHROpen.apply(this, args);
      };

      XMLHttpRequest.prototype.send = function(...args) {
        const xhr = this;
        const originalOnLoad = xhr.onload;
        
        xhr.onload = function() {
          try {
            if (xhr._url.includes('/api') || xhr._url.includes('fullSync')) {
              const data = JSON.parse(xhr.responseText);
              console.log('Intercepted XHR response:', { url: xhr._url, data });
              
              // Look for auth data in response
              const userId = data.user?._id;
              const token = data.user?.token;
              
              if (userId && token) {
                console.log('Found auth data in XHR response');
                if (chrome.runtime && chrome.runtime.sendMessage) {
                  chrome.runtime.sendMessage({
                    type: 'TWOS_AUTH_CAPTURED',
                    data: { userId, token }
                  });
                }
              }
            }
          } catch (error) {
            console.error('Error processing XHR request:', error);
          }
          
          if (originalOnLoad) {
            originalOnLoad.apply(xhr, arguments);
          }
        };
        
        return originalXHRSend.apply(this, args);
      };
      
      // Mark as ready
      window.twosAuthReady = true;
      console.log('Content script ready for messages');
    }
  } catch (error) {
    console.error('Content script initialization error:', error);
  }
})();
