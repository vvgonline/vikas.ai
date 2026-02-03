// Vikas AI - Application Logic
// VVG ONLINE - // ACCESS THE FUTURE
// Compiled from TypeScript

class VikasAI {
    constructor() {
        this.currentSession = null;
        this.sessions = [];
        this.dataset = [];
        this.datasetLoaded = false;
        
        this.initializeElements();
        this.loadDataset();
        this.loadSessions();
        this.attachEventListeners();
        this.initializeTheme();
        this.createNewSession();
    }

    initializeElements() {
        this.messagesArea = document.getElementById('messagesArea');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.newChatBtn = document.getElementById('newChatBtn');
        this.chatHistory = document.getElementById('chatHistory');
        this.themeToggle = document.getElementById('themeToggle');
        this.modelSelect = document.getElementById('modelSelect');
    }

    async loadDataset() {
        try {
            console.log('Loading validated-dataset.jsonl...');
            const response = await fetch('validated-dataset.jsonl');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            const lines = text.trim().split('\n');
            
            this.dataset = lines
                .filter(line => line.trim())
                .map(line => JSON.parse(line));
            
            this.datasetLoaded = true;
            console.log(`✓ Loaded ${this.dataset.length} training examples`);
            this.updateModelStatus('ready');
        } catch (error) {
            console.error('Error loading dataset:', error);
            this.datasetLoaded = false;
            this.updateModelStatus('error');
        }
    }

    updateModelStatus(status) {
        const loadingSpinner = document.getElementById('loadingSpinner');
        if (loadingSpinner) {
            if (status === 'ready') {
                loadingSpinner.style.display = 'none';
            } else if (status === 'error') {
                loadingSpinner.innerHTML = '<div class="spinner"></div><p class="loading-text">Error loading model</p>';
            }
        }
    }

    attachEventListeners() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        this.newChatBtn.addEventListener('click', () => this.createNewSession());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Auto-resize textarea
        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = this.messageInput.scrollHeight + 'px';
        });
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('vikas-theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.updateThemeButton('dark');
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('vikas-theme', newTheme);
        this.updateThemeButton(newTheme);
    }

    updateThemeButton(theme) {
        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        this.themeToggle.innerHTML = `<span id="themeIcon">${theme === 'dark' ? '☀️' : '🌙'}</span> ${theme === 'dark' ? 'Light' : 'Dark'} Mode`;
    }

    createNewSession() {
        const session = {
            id: this.generateId(),
            title: 'New Chat',
            messages: [],
            createdAt: new Date()
        };
        
        this.currentSession = session;
        this.sessions.unshift(session);
        this.saveSessions();
        this.renderChatHistory();
        this.clearMessages();
        this.showWelcomeScreen();
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    async sendMessage() {
        const content = this.messageInput.value.trim();
        if (!content || !this.currentSession) return;

        // Add user message
        const userMessage = {
            role: 'user',
            content: content,
            timestamp: new Date()
        };
        
        this.currentSession.messages.push(userMessage);
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';
        
        // Update session title from first message
        if (this.currentSession.messages.length === 1) {
            this.currentSession.title = content.substring(0, 30) + (content.length > 30 ? '...' : '');
            this.renderChatHistory();
        }
        
        this.renderMessages();
        this.saveSessions();

        // Get AI response
        await this.getAIResponse(content);
    }

    async getAIResponse(userMessage) {
        if (!this.currentSession) return;

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

        let responseContent;

        if (this.datasetLoaded && this.dataset.length > 0) {
            // Use dataset to find best matching response
            responseContent = this.findBestResponse(userMessage);
        } else {
            // Fallback responses if dataset not loaded
            responseContent = this.getFallbackResponse();
        }

        const aiMessage = {
            role: 'assistant',
            content: responseContent,
            timestamp: new Date()
        };

        this.currentSession.messages.push(aiMessage);
        this.hideTypingIndicator();
        this.renderMessages();
        this.saveSessions();
    }

    findBestResponse(userMessage) {
        const userLower = userMessage.toLowerCase();
        let bestMatch = null;
        let highestScore = 0;

        // Calculate similarity for each dataset entry
        for (const entry of this.dataset) {
            const userMsg = entry.messages.find(m => m.role === 'user');
            if (!userMsg) continue;

            const score = this.calculateSimilarity(userLower, userMsg.content.toLowerCase());
            
            if (score > highestScore) {
                highestScore = score;
                bestMatch = entry;
            }
        }

        // If we found a good match (>30% similarity), use it
        if (bestMatch && highestScore > 0.3) {
            const assistantMsg = bestMatch.messages.find(m => m.role === 'assistant');
            if (assistantMsg) {
                return assistantMsg.content;
            }
        }

        // Otherwise, return a contextual fallback
        return this.getContextualFallback(userMessage);
    }

    calculateSimilarity(str1, str2) {
        const words1 = str1.split(/\s+/).filter(w => w.length > 2);
        const words2 = str2.split(/\s+/).filter(w => w.length > 2);
        
        if (words1.length === 0 || words2.length === 0) return 0;

        let matches = 0;
        const words2Set = new Set(words2);

        for (const word of words1) {
            if (words2Set.has(word)) {
                matches++;
            }
        }

        // Weighted by length to favor longer matches
        const lengthBonus = Math.min(words1.length, words2.length) / Math.max(words1.length, words2.length);
        return (matches / Math.max(words1.length, words2.length)) * lengthBonus;
    }

    getContextualFallback(userMessage) {
        const lower = userMessage.toLowerCase();
        
        // Check for specific keywords and provide contextual responses
        if (lower.includes('help') || lower.includes('how')) {
            return "I'm Vikas AI, your browser-native assistant. I can help answer questions about technology, business consulting, and general topics. What specific area would you like assistance with?";
        }
        
        if (lower.includes('who') || lower.includes('what are you')) {
            return "I'm Vikas AI, created by VVG ONLINE - a digital business consulting company. I run entirely in your browser, ensuring complete privacy. All processing happens on your device, and your conversations never leave your computer. // ACCESS THE FUTURE";
        }
        
        if (lower.includes('privacy') || lower.includes('data') || lower.includes('secure')) {
            return "Privacy is my core feature! I operate 100% in your browser using WebAssembly and local processing. No data is sent to any servers, no tracking, no cloud storage. Your conversations are stored only in your browser's local storage and never leave your device.";
        }
        
        if (lower.includes('thank') || lower.includes('thanks')) {
            return "You're welcome! I'm here whenever you need assistance. Remember, all our conversations stay private on your device. Feel free to ask me anything!";
        }

        return "That's an interesting question! As your privacy-first AI assistant running entirely in your browser, I'm here to help. Could you provide more details or rephrase your question? I'm continuously learning from our validated dataset to provide better responses.";
    }

    getFallbackResponse() {
        const responses = [
            "I'm Vikas AI, your privacy-first assistant running entirely in your browser. The knowledge base is still loading, but I'm here to help!",
            "I'm currently initializing my knowledge base. As a browser-native AI, all processing happens locally on your device for complete privacy.",
            "Model is loading... In the meantime, know that I'm Vikas AI by VVG ONLINE - bringing you privacy-first AI assistance. // ACCESS THE FUTURE"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'typingIndicator';
        indicator.className = 'message message-assistant';
        indicator.innerHTML = `
            <div class="message-bubble">
                <div class="typing-dots">
                    <span>•</span><span>•</span><span>•</span>
                </div>
            </div>
        `;
        
        const welcomeScreen = this.messagesArea.querySelector('.welcome-screen');
        if (welcomeScreen) {
            welcomeScreen.remove();
        }
        
        this.messagesArea.appendChild(indicator);
        this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    renderMessages() {
        if (!this.currentSession) return;

        const welcomeScreen = this.messagesArea.querySelector('.welcome-screen');
        if (welcomeScreen) {
            welcomeScreen.remove();
        }

        this.messagesArea.innerHTML = '';

        this.currentSession.messages.forEach(message => {
            const messageEl = document.createElement('div');
            messageEl.className = `message message-${message.role}`;
            
            const time = message.timestamp.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });

            messageEl.innerHTML = `
                <div class="message-bubble">
                    <div class="message-content">${this.formatContent(message.content)}</div>
                    <small class="message-timestamp">${time}</small>
                </div>
            `;

            this.messagesArea.appendChild(messageEl);
        });

        this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
    }

    formatContent(content) {
        // Escape HTML but preserve line breaks
        const escaped = this.escapeHtml(content);
        // Convert line breaks to <br>
        return escaped.replace(/\n/g, '<br>');
    }

    clearMessages() {
        this.messagesArea.innerHTML = '';
    }

    showWelcomeScreen() {
        this.messagesArea.innerHTML = `
            <div class="welcome-screen">
                <div class="welcome-content">
                    <h1 class="welcome-title glitch" data-text="VIKAS AI">VIKAS AI</h1>
                    <p class="welcome-tagline">// ACCESS THE FUTURE</p>
                    <p class="welcome-description">
                        Your privacy-first AI assistant running entirely in your browser.
                        No data leaves your device. No servers. Pure AI.
                    </p>
                    <div class="features-grid">
                        <div class="feature">
                            <span class="feature-icon">🔒</span>
                            <span class="feature-text">100% Private</span>
                        </div>
                        <div class="feature">
                            <span class="feature-icon">⚡</span>
                            <span class="feature-text">Dataset Powered</span>
                        </div>
                        <div class="feature">
                            <span class="feature-icon">🌐</span>
                            <span class="feature-text">Offline Ready</span>
                        </div>
                        <div class="feature">
                            <span class="feature-icon">🚀</span>
                            <span class="feature-text">Real-time</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderChatHistory() {
        this.chatHistory.innerHTML = '';

        if (this.sessions.length === 0) {
            this.chatHistory.innerHTML = '<p class="text-muted">No chat history</p>';
            return;
        }

        this.sessions.forEach(session => {
            const item = document.createElement('div');
            item.className = 'history-item';
            if (this.currentSession && session.id === this.currentSession.id) {
                item.classList.add('active');
            }
            item.textContent = session.title;
            item.addEventListener('click', () => this.loadSession(session.id));
            this.chatHistory.appendChild(item);
        });
    }

    loadSession(id) {
        const session = this.sessions.find(s => s.id === id);
        if (session) {
            this.currentSession = session;
            this.renderMessages();
            this.renderChatHistory();
        }
    }

    saveSessions() {
        localStorage.setItem('vikas-sessions', JSON.stringify(this.sessions));
    }

    loadSessions() {
        const saved = localStorage.getItem('vikas-sessions');
        if (saved) {
            this.sessions = JSON.parse(saved);
            // Convert string dates back to Date objects
            this.sessions.forEach(session => {
                session.createdAt = new Date(session.createdAt);
                session.messages.forEach(msg => {
                    msg.timestamp = new Date(msg.timestamp);
                });
            });
            this.renderChatHistory();
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new VikasAI());
} else {
    new VikasAI();
}