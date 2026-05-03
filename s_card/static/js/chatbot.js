/**
 * AI Chatbot Widget - Frontend JavaScript
 * Handles widget interaction, API communication, and message management
 */

class ChatbotWidget {
    constructor() {
        this.isOpen = false;
        this.isLoading = false;
        this.messages = [];
        this.init();
    }

    /**
     * Initialize the chatbot widget
     */
    init() {
        this.createWidgetHTML();
        this.setupEventListeners();
        this.loadMessages();
    }

    /**
     * Create the chatbot widget HTML structure
     */
    createWidgetHTML() {
        const widgetHTML = `
            <!-- Floating Robot Icon -->
            <button class="chatbot-widget-icon" id="chatbot-toggle" aria-label="Open AI Assistant" title="Chat with our AI Assistant">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <!-- Robot head -->
                    <rect x="4" y="5" width="16" height="11" rx="2" ry="2" fill="currentColor"/>
                    <!-- Robot left eye -->
                    <circle cx="9" cy="9" r="1.5" fill="white"/>
                    <!-- Robot right eye -->
                    <circle cx="15" cy="9" r="1.5" fill="white"/>
                    <!-- Robot mouth -->
                    <line x1="9" y1="12" x2="15" y2="12" stroke="white" stroke-width="1" stroke-linecap="round"/>
                    <!-- Robot antenna left -->
                    <line x1="8" y1="5" x2="8" y2="2" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                    <circle cx="8" cy="2" r="0.8" fill="white"/>
                    <!-- Robot antenna right -->
                    <line x1="16" y1="5" x2="16" y2="2" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                    <circle cx="16" cy="2" r="0.8" fill="white"/>
                    <!-- Robot body -->
                    <rect x="5" y="16" width="14" height="6" rx="1" ry="1" fill="currentColor"/>
                    <!-- Robot left arm -->
                    <rect x="1" y="13" width="3" height="4" rx="1" ry="1" fill="currentColor"/>
                    <!-- Robot right arm -->
                    <rect x="20" y="13" width="3" height="4" rx="1" ry="1" fill="currentColor"/>
                </svg>
            </button>

            <!-- Chatbot Window -->
            <div class="chatbot-window" id="chatbot-window">
                <!-- Header -->
                <div class="chatbot-header">
                    <h2 class="chatbot-header-title">AI Assistant</h2>
                    <button class="chatbot-close-btn" id="chatbot-close" aria-label="Close chat">✕</button>
                </div>

                <!-- Messages Area -->
                <div class="chatbot-messages" id="chatbot-messages">
                    <div class="chatbot-empty-state">
                        <div class="chatbot-empty-state-icon">👋</div>
                        <div class="chatbot-empty-state-text">
                            <strong>Welcome to AI Assistant!</strong><br>
                            Ask me anything about our products and services.
                        </div>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="chatbot-input-area">
                    <textarea
                        class="chatbot-input-field"
                        id="chatbot-input"
                        placeholder="Type your message..."
                        rows="1"
                    ></textarea>
                    <button class="chatbot-send-btn" id="chatbot-send" aria-label="Send message">Send</button>
                </div>
            </div>
        `;

        // Inject HTML into the document
        const container = document.createElement('div');
        container.innerHTML = widgetHTML;
        document.body.appendChild(container.firstElementChild);
        document.body.appendChild(container.lastElementChild);
    }

    /**
     * Setup event listeners for the chatbot widget
     */
    setupEventListeners() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const inputField = document.getElementById('chatbot-input');

        // Toggle chatbot window
        toggleBtn.addEventListener('click', () => this.toggleWindow());

        // Close chatbot window
        closeBtn.addEventListener('click', () => this.closeWindow());

        // Send message on button click
        sendBtn.addEventListener('click', () => this.sendMessage());

        // Send message on Enter key (but allow Shift+Enter for new line)
        inputField.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        inputField.addEventListener('input', () => this.autoResizeTextarea());

        // Close window when clicking outside (optional)
        document.addEventListener('click', (event) => {
            const window = document.getElementById('chatbot-window');
            const toggle = document.getElementById('chatbot-toggle');
            if (!window.contains(event.target) && !toggle.contains(event.target)) {
                if (this.isOpen) {
                    // Optionally close on outside click
                    // this.closeWindow();
                }
            }
        });
    }

    /**
     * Toggle the chatbot window open/closed
     */
    toggleWindow() {
        if (this.isOpen) {
            this.closeWindow();
        } else {
            this.openWindow();
        }
    }

    /**
     * Open the chatbot window
     */
    openWindow() {
        const window = document.getElementById('chatbot-window');
        const inputField = document.getElementById('chatbot-input');

        window.classList.add('active');
        this.isOpen = true;
        inputField.focus();
    }

    /**
     * Close the chatbot window
     */
    closeWindow() {
        const window = document.getElementById('chatbot-window');
        window.classList.remove('active');
        this.isOpen = false;
    }

    /**
     * Auto-resize the input textarea based on content
     */
    autoResizeTextarea() {
        const inputField = document.getElementById('chatbot-input');
        inputField.style.height = 'auto';
        inputField.style.height = Math.min(inputField.scrollHeight, 100) + 'px';
    }

    /**
     * Send user message and get AI response
     */
    async sendMessage() {
        const inputField = document.getElementById('chatbot-input');
        const sendBtn = document.getElementById('chatbot-send');
        const message = inputField.value.trim();

        if (!message || this.isLoading) {
            return;
        }

        // Clear input field
        inputField.value = '';
        inputField.style.height = 'auto';

        // Add user message to UI
        this.addMessage(message, 'user');

        // Disable input
        this.setLoading(true);

        try {
            // Send message to backend API
            const response = await fetch('/api/chatbot/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                }),
            });

            const data = await response.json();

            if (data.success && data.response) {
                // Add AI response to UI
                this.addMessage(data.response, 'ai');
            } else {
                // Add error message
                this.addMessage(
                    data.error || 'An error occurred while processing your request. Please try again.',
                    'ai'
                );
            }
        } catch (error) {
            console.error('Chatbot API Error:', error);
            this.addMessage(
                'Sorry, I encountered a connection error. Please try again.',
                'ai'
            );
        } finally {
            this.setLoading(false);
            inputField.focus();
        }
    }

    /**
     * Add a message to the chat
     * @param {string} message - The message text
     * @param {string} sender - 'user' or 'ai'
     */
    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');

        // Remove empty state if exists
        const emptyState = messagesContainer.querySelector('.chatbot-empty-state');
        if (emptyState) {
            emptyState.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `chatbot-message ${sender}`;

        const messageContent = document.createElement('div');
        messageContent.className = 'chatbot-message-content';
        messageContent.textContent = message;

        messageEl.appendChild(messageContent);
        messagesContainer.appendChild(messageEl);

        // Store message
        this.messages.push({
            text: message,
            sender: sender,
            timestamp: new Date().toISOString(),
        });

        // Save messages to localStorage
        this.saveMessages();

        // Scroll to bottom
        this.scrollToBottom();
    }

    /**
     * Show typing indicator
     */
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');

        const typingEl = document.createElement('div');
        typingEl.className = 'chatbot-message ai';
        typingEl.id = 'typing-indicator';

        typingEl.innerHTML = `
            <div class="chatbot-typing-indicator">
                <div class="chatbot-typing-dot"></div>
                <div class="chatbot-typing-dot"></div>
                <div class="chatbot-typing-dot"></div>
            </div>
        `;

        messagesContainer.appendChild(typingEl);
        this.scrollToBottom();
    }

    /**
     * Remove typing indicator
     */
    removeTypingIndicator() {
        const typingEl = document.getElementById('typing-indicator');
        if (typingEl) {
            typingEl.remove();
        }
    }

    /**
     * Set loading state
     */
    setLoading(loading) {
        this.isLoading = loading;
        const sendBtn = document.getElementById('chatbot-send');
        const inputField = document.getElementById('chatbot-input');

        if (loading) {
            sendBtn.disabled = true;
            inputField.disabled = true;
            this.showTypingIndicator();
        } else {
            sendBtn.disabled = false;
            inputField.disabled = false;
            this.removeTypingIndicator();
        }
    }

    /**
     * Scroll messages container to bottom
     */
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    /**
     * Save messages to localStorage
     */
    saveMessages() {
        try {
            localStorage.setItem('chatbot-messages', JSON.stringify(this.messages));
        } catch (error) {
            console.warn('Could not save messages to localStorage:', error);
        }
    }

    /**
     * Load messages from localStorage
     */
    loadMessages() {
        try {
            const saved = localStorage.getItem('chatbot-messages');
            if (saved) {
                this.messages = JSON.parse(saved);

                // Restore messages to UI (limit to last 50 messages)
                const messagesContainer = document.getElementById('chatbot-messages');
                messagesContainer.innerHTML = '';

                const recentMessages = this.messages.slice(-50);
                recentMessages.forEach((msg) => {
                    const messageEl = document.createElement('div');
                    messageEl.className = `chatbot-message ${msg.sender}`;

                    const messageContent = document.createElement('div');
                    messageContent.className = 'chatbot-message-content';
                    messageContent.textContent = msg.text;

                    messageEl.appendChild(messageContent);
                    messagesContainer.appendChild(messageEl);
                });

                this.scrollToBottom();
            }
        } catch (error) {
            console.warn('Could not load messages from localStorage:', error);
        }
    }

    /**
     * Clear chat history
     */
    clearHistory() {
        this.messages = [];
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.innerHTML = `
            <div class="chatbot-empty-state">
                <div class="chatbot-empty-state-icon">👋</div>
                <div class="chatbot-empty-state-text">
                    <strong>Chat cleared!</strong><br>
                    Start a new conversation.
                </div>
            </div>
        `;
        localStorage.removeItem('chatbot-messages');
    }
}

/**
 * Initialize chatbot widget when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.chatbotWidget = new ChatbotWidget();
    });
} else {
    window.chatbotWidget = new ChatbotWidget();
}
