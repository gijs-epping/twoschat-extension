// Ensure we're in a service worker context
if (typeof chrome !== 'undefined' && chrome.runtime) {
  console.log('Background script starting...');

  // Configure sidebar behavior
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error('Error setting panel behavior:', error));

  // Message handling
  if (chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      try {
        console.log('Background received message:', message);
        
        if (message.type === 'TWOS_AUTH_CAPTURED') {
          console.log('Storing auth data:', message.data);
          chrome.storage.local.set({
            twosAuth: message.data
          }).then(() => {
            console.log('Auth data stored successfully');
          }).catch(error => {
            console.error('Error storing auth data:', error);
          });
        }
        
        if (message.type === 'CONTENT_SCRIPT_READY') {
          console.log('Content script ready in tab:', sender.tab?.id);
        }
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });
  } else {
    console.error('chrome.runtime.onMessage not available');
  }

  // Extension installation handling
  if (chrome.runtime.onInstalled) {
    chrome.runtime.onInstalled.addListener(() => {
      try {
        console.log('Extension installed/updated, opening options page');
        chrome.runtime.openOptionsPage();
      } catch (error) {
        console.error('Error opening options page:', error);
      }
    });
  } else {
    console.error('chrome.runtime.onInstalled not available');
  }

  // Error handling
  if (chrome.runtime.onError) {
    chrome.runtime.onError.addListener((error) => {
      console.error('Runtime error:', error);
    });
  } else {
    console.error('chrome.runtime.onError not available');
  }

  console.log('Background script initialized');
} else {
  console.error('Chrome runtime API not available');
}
