// Vikas AI - Application Logic
// VVG ONLINE - // ACCESS THE FUTURE

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface ChatSession {
    id: string;
    title: string;
    messages: Message[];
    createdAt: Date;
}

class VikasAI {
    private currentSession: ChatSession | null = null;
    private sessions: ChatSession[] = [];
    private messagesArea: HTMLElement;
    private messageInput: HTMLTextAreaElement;
    private sendBtn: HTMLButtonElement;
    private newChatBtn: HTMLButtonElement;
    private chatHistory: HTMLElement;
    private themeToggle: HTMLButtonElement;
    private modelSelect: HTMLSelectElement;

    constructor() {
        this.initializeElements();
        this.loadSessions();
        this.attachEventListeners();
        this.initializeTheme();
        this.createNewSession();
    }

    private initializeElements(): void {
        this.messagesArea = document.getElementById('messagesArea') as HTMLElement;
        this.messageInput = document.getElementById('messageInput') as HTMLTextAreaElement;
        this.sendBtn = document.getElementById('sendBtn') as HTMLButtonElement;
        this.newChatBtn = document.getElementById('newChatBtn') as HTMLButtonElement;
        this.chatHistory = document.getElementById('chatHistory') as HTMLElement;
        this.themeToggle = document.getElementById('themeToggle') as HTMLButtonElement;
        this.modelSelect = document.getElementById('modelSelect') as HTMLSelectElement;
    }

    private attachEventListeners(): void {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keydown', (e: KeyboardEvent) => {
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

    private initializeTheme(): void {
        const savedTheme = localStorage.getItem('vikas-theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.updateThemeButton('dark');
        }
    }

    private toggleTheme(): void {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('vikas-theme', newTheme);
        this.updateThemeButton(newTheme);
    }

    private updateThemeButton(theme: string): void {
        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        this.themeToggle.innerHTML = `<span id="themeIcon">${theme === 'dark' ? '☀️' : '🌙'}</span> ${theme === 'dark' ? 'Light' : 'Dark'} Mode`;
    }

    private createNewSession(): void {
        const session: ChatSession = {
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

    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    private async sendMessage(): Promise<void> {
        const content = this.messageInput.value.trim();
        if (!content || !this.currentSession) return;

        // Add user message
        const userMessage: Message = {
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

        // Simulate AI response (Phase 1: Using dataset)
        await this.getAIResponse(content);
    }

    private async getAIResponse(userMessage: string): Promise<void> {
        if (!this.currentSession) return;

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        // Phase 1: Simple rule-based responses
        const responses = [
            "I'm Vikas AI, your privacy-first assistant running entirely in your browser. How can I help you today?",
            "That's an interesting question! As an in-browser AI, I'm here to assist you while keeping your data completely private.",
            "I understand what you're asking. Let me help you with that using my local knowledge base.",
            "Great question! Since I run entirely in your browser, your conversations never leave your device.",
            "I'm processing your request locally on your device. This ensures complete privacy and security."
        ];

        const aiMessage: Message = {
            role: 'assistant',
            content: responses[Math.floor(Math.random() * responses.length)],
            timestamp: new Date()
        };

        this.currentSession.messages.push(aiMessage);
        this.hideTypingIndicator();
        this.renderMessages();
        this.saveSessions();
    }

    private showTypingIndicator(): void {
        const indicator = document.createElement('div');
        indicator.id = 'typingIndicator';
        indicator.className = 'message message-ai';
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

    private hideTypingIndicator(): void {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    private renderMessages(): void {
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
                    <div class="message-content">${this.escapeHtml(message.content)}</div>
                    <small class="message-timestamp">${time}</small>
                </div>
            `;

            this.messagesArea.appendChild(messageEl);
        });

        this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
    }

    private clearMessages(): void {
        this.messagesArea.innerHTML = '';
    }

    private showWelcomeScreen(): void {
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
                            <span class="feature-text">WebGPU Powered</span>
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

    private renderChatHistory(): void {
        this.chatHistory.innerHTML = '';

        if (this.sessions.length === 0) {
            this.chatHistory.innerHTML = '<p class="text-muted">No chat history</p>';
            return;
        }

        this.sessions.forEach(session => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.textContent = session.title;
            item.addEventListener('click', () => this.loadSession(session.id));
            this.chatHistory.appendChild(item);
        });
    }

    private loadSession(id: string): void {
        const session = this.sessions.find(s => s.id === id);
        if (session) {
            this.currentSession = session;
            this.renderMessages();
        }
    }

    private saveSessions(): void {
        localStorage.setItem('vikas-sessions', JSON.stringify(this.sessions));
    }

    private loadSessions(): void {
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

    private escapeHtml(text: string): string {
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