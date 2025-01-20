import { OpenAI } from '../node_modules/openai/index.js';

// Simple state management
const createStore = (initialValue) => {
  let value = initialValue;
  const subscribers = new Set();
  
  return {
    set: (newValue) => {
      value = newValue;
      subscribers.forEach(fn => fn(value));
    },
    subscribe: (fn) => {
      subscribers.add(fn);
      fn(value);
      return () => subscribers.delete(fn);
    },
    get: () => value
  };
};

export const vectorSyncStatus = createStore('idle');

class VectorStoreService {
    constructor() {
        this.openai = null;
        this.vectorStoreId = null;
        this.statusCallback = null;
        this.initialize();
    }

    setStatusCallback(callback) {
        this.statusCallback = callback;
    }

    updateStatus(message) {
        if (this.statusCallback) {
            this.statusCallback(message);
        }
    }

    initialize() {
        const openaiId = localStorage.getItem('openaiId');
        if (openaiId) {
            this.openai = new OpenAI({
                apiKey: openaiId,
                dangerouslyAllowBrowser: true
            });
            this.vectorStoreId = localStorage.getItem('vectorStoreId');
        }
    }

    async cleanupExistingResources() {
        if (!this.openai) {
            throw new Error('OpenAI client not initialized');
        }

        try {
            this.updateStatus('Starting cleanup of existing resources...');

            // Delete existing assistant if any
            const existingAssistantId = localStorage.getItem('assistantId');
            if (existingAssistantId) {
                this.updateStatus('Deleting existing assistant...');
                try {
                    await this.openai.beta.assistants.del(existingAssistantId);
                    localStorage.removeItem('assistantId');
                } catch (error) {
                    console.warn('Error deleting assistant:', error);
                }
            }

            // Delete existing vector store if any
            const existingVectorStoreId = localStorage.getItem('vectorStoreId');
            if (existingVectorStoreId) {
                this.updateStatus('Deleting existing vector store...');
                try {
                    await this.openai.beta.vectorStores.del(existingVectorStoreId);
                    localStorage.removeItem('vectorStoreId');
                    this.vectorStoreId = null;
                } catch (error) {
                    console.warn('Error deleting vector store:', error);
                }
            }

            this.updateStatus('Cleanup completed');
        } catch (error) {
            console.error('Error during cleanup:', error);
            // Continue with the process even if cleanup fails
        }
    }

    async fetchTwosData(userId, token, page = 0) {
        this.updateStatus(`Fetching page ${page + 1} from Twos API...`);
        const response = await fetch('https://www.twosapp.com/apiV2/user/export2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                token: token,
                page: page
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data from Twos (page ${page + 1})`);
        }

        const data = await response.json();
        return data;
    }

    async fetchAllTwosData(userId, token) {
        this.updateStatus('Starting data fetch from Twos API...');
        
        // Fetch first page to get initial data and determine total pages
        const firstPage = await this.fetchTwosData(userId, token, 0);
        let allEntries = [...(firstPage.entries || [])];
        let allPosts = [...(firstPage.posts || [])];
        
        // If we have 500 entries, we need to fetch more pages
        if (firstPage.entries?.length === 500) {
            let currentPage = 1;  // Start with page 1 since we already fetched page 0
            let hasMoreData = true;
            
            while (hasMoreData) {
                try {
                    const pageData = await this.fetchTwosData(userId, token, currentPage);
                    
                    if (pageData.entries?.length > 0) {
                        allEntries = [...allEntries, ...pageData.entries];
                        allPosts = [...allPosts, ...pageData.posts];
                        this.updateStatus(`Fetched page ${currentPage} (after initial page): ${pageData.entries.length} entries`);
                    }
                    
                    hasMoreData = pageData.entries?.length === 500;
                    currentPage++;
                } catch (error) {
                    console.error(`Error fetching page ${currentPage}:`, error);
                    break;
                }
            }
        }
        
        this.updateStatus(`Total data fetched: ${allEntries.length} entries and ${allPosts.length} posts`);
        return {
            entries: allEntries,
            posts: allPosts
        };
    }

    formatDataForVectorStore(data) {
        if (!data.entries || data.entries.length === 0) {
            throw new Error('No entries found in Twos data');
        }

        const formatPost = (post) => {
            let prefix = '';
            let content = post.text;
            
            switch (post.type) {
                case 'none':
                    prefix = '📝';
                    break;
                case 'checkbox':
                    prefix = post.completed ? '✅' : '⬜';
                    break;
                case 'photo':
                    prefix = '📷';
                    if (post.photos && post.photos.length > 0) {
                        content = `${post.text}\n  Photo URL: ${post.photos[0]}`;
                    }
                    break;
                case 'dash':
                    prefix = '➖';
                    break;
                default:
                    prefix = '-';
            }

            let formattedPost = `${prefix} ${content}`;
            if (post.url) {
                formattedPost += `\n  Link: ${post.url}`;
            }
            if (post.tags?.length) {
                formattedPost += `\n  ${post.tags.map(tag => `#${tag}`).join(' ')}`;
            }
            return formattedPost;
        };

        // Format entries with their associated posts
        const formattedEntries = data.entries.map(entry => {
            const entryPosts = data.posts.filter(post => post.entry_id === entry._id);
            const twosLink = `https://www.twosapp.com/${entry._id}`;
            
            return {
                title: entry.title,
                _id: entry._id,
                lastModified: entry.lastModified,
                posts: entryPosts.map(post => ({
                    text: post.text,
                    _id: post._id,
                    type: post.type,
                    lastModified: post.lastModified,
                    url: post.url || "",
                    tags: post.tags || [],
                    completed: post.completed,
                    photos: post.photos
                })),
                // Format content as markdown
                content: `# ${entry.title}\nView in Twos: ${twosLink}\n\n${
                    entryPosts.map(post => formatPost(post)).join('\n')
                }`
            };
        });

        // Split into chunks for better processing
        const chunks = [];
        const CHUNK_SIZE = 50;
        
        for (let i = 0; i < formattedEntries.length; i += CHUNK_SIZE) {
            const chunk = formattedEntries.slice(i, i + CHUNK_SIZE);
            chunks.push({
                entries: chunk
            });
        }

        this.updateStatus(`Formatted data into ${chunks.length} chunks`);
        return chunks;
    }

    async uploadFiles(chunks) {
        const fileIds = [];
        for (const [index, chunk] of chunks.entries()) {
            this.updateStatus(`Uploading file ${index + 1} of ${chunks.length}`);
            const file = new File(
                [JSON.stringify(chunk)],
                `twos_data_${index}.json`,
                { type: 'application/json' }
            );

            const uploadedFile = await this.openai.files.create({
                file,
                purpose: 'assistants'
            });

            fileIds.push(uploadedFile.id);
            this.updateStatus(`File ${index + 1} uploaded successfully`);
        }
        return fileIds;
    }

    async syncToVectorStore(userId, token) {
        if (!this.openai) {
            throw new Error('OpenAI client not initialized');
        }

        if (!userId || !token) {
            throw new Error('Twos User ID and Token are required');
        }

        try {
            vectorSyncStatus.set('syncing');

            // Clean up existing resources first
            await this.cleanupExistingResources();

            // Fetch all data from Twos with pagination
            const twosData = await this.fetchAllTwosData(userId, token);
            
            // Format the data into markdown chunks
            const chunks = this.formatDataForVectorStore(twosData);
            
            if (chunks.length === 0) {
                throw new Error('No data available to sync');
            }

            // Upload files first
            this.updateStatus('Starting file uploads...');
            const fileIds = await this.uploadFiles(chunks);

            // Create vector store
            this.updateStatus('Creating vector store...');
            const vectorStore = await this.openai.beta.vectorStores.create({
                name: "Twoschat store"
            });

            this.vectorStoreId = vectorStore.id;
            localStorage.setItem('vectorStoreId', vectorStore.id);
            this.updateStatus('Vector store created successfully');

            // Create file batch with file IDs
            this.updateStatus('Creating file batch...');
            const fileBatch = await this.openai.beta.vectorStores.fileBatches.create(
                vectorStore.id,
                {
                    file_ids: fileIds
                }
            );

            this.updateStatus('Files and vector created, indeing while take a while, check you assistant ');

            // Create new assistant with updated vector store
            this.updateStatus('Creating assistant...');
            const assistant = await this.createAssistant();
            this.updateStatus('Assistant created successfully');
            
            vectorSyncStatus.set('success');
            return {
                success: true,
                vectorStoreId: vectorStore.id,
                assistantId: assistant.id,
                chunksProcessed: chunks.length,
                fileIds
            };
        } catch (error) {
            console.error('Error syncing to vector store:', error);
            vectorSyncStatus.set('error');
            throw error;
        }
    }

    async createAssistant() {
        if (!this.openai) {
            throw new Error('OpenAI client not initialized');
        }

        if (!this.vectorStoreId) {
            throw new Error('Vector store ID not found. Please sync data first.');
        }

        try {

            const assistant = await this.openai.beta.assistants.create({
                instructions: `You are a helpful assistant that provides information based on the user's TwosApp data.
Use the vector store to search through their notes and provide relevant information.
When answering questions:

1. Content Types - Clearly identify and handle:
   - 📝 Notes: Include full note content with context
   - ✅ Tasks: Show completion status and related details
   - ⬜ Open Tasks: Highlight pending items
   - 📷 Images: Include image descriptions and links
   - ➖ Dash items: Present as list items
   - #️⃣ Tags: Include relevant tags for context

2. Search and Context:
   - Search deeply through all content types
   - When referencing a Twos list or entry, format it as: "Title (https://www.twosapp.com/...)"
   - Include dates and temporal context when available
   - Show relationships between items (e.g., tasks in the same list)

3. Response Format:
   - ALWAYS RETURN IN MARKDOWN
   - Use appropriate icons for different content types (📝✅⬜📷➖)
   - For Twos links, use plain text format: "Title (URL)" instead of markdown links
   - Format lists and sublists with proper indentation
   - Don't include file references in the response

4. When listing tasks:
   - Clearly separate completed vs open tasks
   - Maintain original formatting and checkboxes
   - Include any associated notes or context
   - Show task metadata (dates, tags, etc.)

5. For images and attachments:
   - For image references, use format: "Image: Description (URL)"
   - Provide image descriptions
   - Show related notes or context
   - Present URLs in plain text, not markdown links

6. URL Formatting:
   - NEVER use markdown link syntax like [Title](URL)
   - Instead use plain text format: "Title (URL)"
   - For Twos links: "List Title (https://www.twosapp.com/...)"
   - For other links: "Link Description (https://...)"`,
                model: "gpt-4o-mini",
                tools: [{"type": "file_search"}],
                name: "Twosapp Chat ",
                tool_resources: {
                    "file_search": {
                        "vector_store_ids": [this.vectorStoreId]
                    }
                }
            });

            localStorage.setItem('assistantId', assistant.id);
            return assistant;
        } catch (error) {
            console.error('Error creating assistant:', error);
            throw error;
        }
    }

    async createThread(initialMessage) {
        if (!this.openai || !this.vectorStoreId) {
            throw new Error('OpenAI client or vector store ID not initialized');
        }

        try {
            const thread = await this.openai.beta.threads.create({
                messages: [
                    { 
                        role: "user", 
                        content: initialMessage || "Hello" 
                    }
                ],
                tool_resources: {
                    "file_search": {
                        "vector_store_ids": [this.vectorStoreId]
                    }
                }
            });

            return thread;
        } catch (error) {
            console.error('Error creating thread:', error);
            throw error;
        }
    }
}

export const vectorStoreService = new VectorStoreService();
