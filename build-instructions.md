# TwosChat Chrome Extension Build Instructions

This document outlines the steps to build a Chrome extension that adds chat functionality to TwosApp.

## Project Structure

```
twoschat/
├── manifest.json
├── background.js
├── content-scripts/
│   └── twos-integration.js
├── pages/
│   ├── chat.html
│   ├── chat.css
│   ├── chat.js
│   ├── settings.html
│   ├── settings.css
│   └── settings.js
└── assets/
    └── icons/
```

## 1. Initial Setup

1. Create manifest.json:
```json
{
  "manifest_version": 3,
  "name": "TwosChat",
  "version": "1.0.0",
  "description": "AI Chat extension for TwosApp",
  "permissions": [
    "storage",
    "tabs",
    "scripting"
  ],
  "host_permissions": [
    "https://www.twosapp.com/*",
    "https://api.openai.com/*"
  ],
  "action": {
    "default_title": "TwosChat",
    "default_popup": "pages/chat.html"
  },
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://www.twosapp.com/*"],
      "js": ["content-scripts/twos-integration.js"]
    }
  ],
  "icons": {
    "16": "assets/icons/icon16.png",
    "48": "assets/icons/icon48.png",
    "128": "assets/icons/icon128.png"
  }
}
```

## 2. Chat Interface Implementation

### 2.1 Create chat.html
```html
<!DOCTYPE html>
<html>
<head>
  <title>TwosChat AI</title>
  <link rel="stylesheet" href="chat.css">
</head>
<body>
  <div class="chat-container">
    <header>
      <h1>TwosChat AI</h1>
      <button id="settings-btn" class="settings-icon">⚙️</button>
    </header>
    
    <div id="messages" class="messages">
      <div class="message ai">
        <p>How can I help you with your TwosApp data? I can search through your notes and provide relevant information.</p>
      </div>
    </div>
    
    <div class="input-container">
      <input type="text" id="message-input" placeholder="Ask about your TwosApp data...">
      <button id="send-btn" class="send-icon">📤</button>
    </div>
  </div>
  <script src="chat.js"></script>
</body>
</html>
```

### 2.2 Style with chat.css
```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.chat-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
}

h1 {
  font-size: 1.2rem;
  margin: 0;
}

.settings-icon {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.message {
  margin-bottom: 1rem;
  max-width: 80%;
}

.message.ai {
  background: #f5f5f5;
  padding: 0.8rem;
  border-radius: 8px;
}

.input-container {
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  border-top: 1px solid #e0e0e0;
}

#message-input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
}

.send-icon {
  background: #0084ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
```

## 3. Settings Interface Implementation

### 3.1 Create settings.html
```html
<!DOCTYPE html>
<html>
<head>
  <title>TwosChat Settings</title>
  <link rel="stylesheet" href="settings.css">
</head>
<body>
  <div class="settings-container">
    <header>
      <h1>Settings</h1>
    </header>
    
    <div class="settings-form">
      <div class="setting-group">
        <label for="openai-token">OpenAI API Key</label>
        <input type="password" id="openai-token">
        <a href="https://platform.openai.com/api-keys" target="_blank" class="help-link">Get API Key</a>
      </div>
      
      <div class="setting-group">
        <label>TwosApp Authentication</label>
        <div id="twos-auth-status" class="auth-status">
          <span class="status-text">Not connected</span>
          <button id="fetch-auth-btn">Fetch from TwosApp</button>
        </div>
      </div>
      
      <button id="save-btn" class="save-button">Save Settings</button>
    </div>
  </div>
  <script src="settings.js"></script>
</body>
</html>
```

### 3.2 Style with settings.css
```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.settings-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  margin-bottom: 2rem;
}

h1 {
  font-size: 1.5rem;
  margin: 0;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
}

input {
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
}

.help-link {
  color: #0084ff;
  text-decoration: none;
  font-size: 0.9rem;
}

.auth-status {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-text {
  color: #666;
}

button {
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

#fetch-auth-btn {
  background: #f5f5f5;
}

.save-button {
  background: #0084ff;
  color: white;
  margin-top: 1rem;
}
```

## 4. TwosApp Integration

### 4.1 Create twos-integration.js
```javascript
// Listen for API requests to capture authentication data
const originalFetch = window.fetch;
window.fetch = async function(...args) {
  const response = await originalFetch.apply(this, args);
  
  // Clone the response to read its body
  const clone = response.clone();
  
  try {
    const url = args[0];
    if (url.includes('fullSync')) {
      const data = await clone.json();
      if (data.user_id && data.token) {
        chrome.runtime.sendMessage({
          type: 'TWOS_AUTH_CAPTURED',
          data: {
            userId: data.user_id,
            token: data.token
          }
        });
      }
    }
  } catch (error) {
    console.error('Error processing request:', error);
  }
  
  return response;
};
```

### 4.2 Create background.js
```javascript
// Store TwosApp authentication when captured
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TWOS_AUTH_CAPTURED') {
    chrome.storage.local.set({
      twosAuth: message.data
    });
  }
});
```

## 5. Testing and Loading

1. Open Chrome and navigate to `chrome://extensions`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the extension directory
4. The extension should appear in your toolbar

## 6. Usage Instructions

1. Click the extension icon to open the chat interface
2. Click the settings gear icon to configure:
   - Enter your OpenAI API key
   - Visit TwosApp to automatically capture authentication
3. The chat interface can be used in:
   - Popup mode (clicking extension icon)
   - Tab mode (right-click extension icon > "Open in new tab")
   - Sidebar mode (Edge browser only, click extension icon > "Open in sidebar")

## 7. Development Notes

- The extension uses Chrome's Storage API to persist settings
- Authentication is captured automatically when browsing TwosApp
- The chat interface is responsive and works in various display modes
- The extension follows Chrome's Manifest V3 requirements
