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

    async fetchTwosData(userId, token) {
        this.updateStatus('Fetching data from Twos API...');
        const response = await fetch('https://www.twosapp.com/apiV2/user/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                token: token,
                page: 0
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from Twos');
        }

        const data = await response.json();
        this.updateStatus(`Data received: ${data.entries?.length || 0} entries and ${data.posts?.length || 0} posts`);
        return data;
    }

    formatDataForVectorStore(data) {
        if (!data.entries || data.entries.length === 0) {
            throw new Error('No entries found in Twos data');
        }

        // Format entries with their associated posts
        const formattedEntries = data.entries.map(entry => {
            const entryPosts = data.posts.filter(post => post.entry_id === entry._id);
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
                    tags: post.tags || []
                }))
            };
        });

        // Split into chunks for better processing
        const chunks = [];
        const CHUNK_SIZE = 50;
        
        for (let i = 0; i < formattedEntries.length; i += CHUNK_SIZE) {
            const chunk = formattedEntries.slice(i, i + CHUNK_SIZE);
            chunks.push({
                entries: chunk.map(entry => ({
                    ...entry,
                    // Create a combined content field for better semantic search
                    content: `${entry.title}\n${entry.posts.map(post => 
                        `${post.text} ${post.tags?.join(' ') || ''}`
                    ).join('\n')}`
                }))
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

            // Fetch data from Twos
            const twosData = await this.fetchTwosData(userId, token);
            
            // Format the data
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
When answering questions, try to:
    1. Search for relevant content in the vector store
    2. Provide specific examples from the user's notes when applicable
    3. Include relevant dates and context from the stored data
    4. Quote specific parts of notes when they directly answer the user's question
    5. ALWAYS RETURN MARKDOWN
    6. don't add file references in the response
    `,
                model: "gpt4o-mini",
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
