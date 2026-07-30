// AI Chat Agent for ASQ Assist
class ASQAIAssistant {
    constructor() {
        this.chatWidget = document.getElementById('aiChatWidget');
        this.chatToggle = document.getElementById('chatToggle');
        this.chatContainer = document.getElementById('chatContainer');
        this.chatClose = document.getElementById('chatClose');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.chatSend = document.getElementById('chatSend');
        this.quickReplies = document.getElementById('quickReplies');
        
        this.knowledgeBase = {
            services: {
                'graphics design': 'We offer professional graphics design services including logo design, branding, social media graphics, flyers, brochures, and marketing materials. Our team creates stunning visuals that capture your brand essence.',
                'video editing': 'Our video editing services include cutting, transitions, color grading, motion graphics, sound design, and final rendering. We work with all video formats and deliver high-quality results.',
                'social media marketing': 'We provide comprehensive social media marketing including content creation, posting schedules, audience engagement, paid advertising, and analytics reporting across all major platforms.',
                'website development': 'We build custom websites from scratch, including e-commerce sites, landing pages, corporate websites, and web applications. We also offer website management and maintenance.',
                'lead generation': 'Our lead generation services help you find qualified prospects through targeted campaigns, email marketing, social media outreach, and data research.',
                'sales training': 'We offer sales training programs to help your team close more deals, improve communication skills, and develop effective sales strategies.',
                'bpo outsourcing': 'Our BPO services include customer support, virtual assistants, data entry, telemarketing, and back-office operations. We provide cost-effective solutions with skilled professionals.',
                'ai agents': 'Our AI agents can handle customer inquiries 24/7, book appointments, answer questions, process orders, and provide instant support through chat, email, and phone.'
            },
            pricing: {
                'basic': 'Our pricing varies based on project scope. For graphics design, packages start at ₱5,000. Video editing starts at ₱8,000 per project. Social media management starts at ₱15,000/month.',
                'custom': 'We offer custom packages tailored to your specific needs. Book a free consultation to discuss your requirements and get a personalized quote.'
            },
            company: {
                'founded': 'ASQ Assist was founded on March 22, 2018 by Joffrey R. Aporado.',
                'location': 'We are located at Brgy. Cabuco, Trece Martires City, Cavite, Philippines 4109.',
                'contact': 'You can reach us at 0916 769 8066 or asqassist@gmail.com. We also have WhatsApp support at 0991 324 9620.',
                'hours': 'Our AI agents are available 24/7. Our human team is available Monday-Saturday, 9 AM - 6 PM PHT.'
            },
            booking: {
                'how': 'You can book a consultation by clicking the "Book a Call" button on our website, which will open our Calendly scheduling system. Choose a time that works for you!',
                'what': 'During your free consultation, we\'ll discuss your business needs, goals, and how our services can help you achieve them. No obligation, just valuable insights!'
            }
        };

        this.init();
    }

    init() {
        // Toggle chat widget
        this.chatToggle.addEventListener('click', () => {
            this.chatContainer.classList.toggle('active');
            this.chatWidget.classList.toggle('active');
        });

        // Close chat
        this.chatClose.addEventListener('click', () => {
            this.chatContainer.classList.remove('active');
            this.chatWidget.classList.remove('active');
        });

        // Send message on button click
        this.chatSend.addEventListener('click', () => this.sendMessage());

        // Send message on Enter key
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Quick reply buttons
        document.querySelectorAll('.quick-reply').forEach(button => {
            button.addEventListener('click', (e) => {
                const message = e.target.getAttribute('data-message');
                this.chatInput.value = message;
                this.sendMessage();
            });
        });

        // Show greeting after 5 seconds
        setTimeout(() => {
            if (!this.chatContainer.classList.contains('active')) {
                this.showNotification();
            }
        }, 5000);
    }

    showNotification() {
        // Create a small notification bubble
        const notification = document.createElement('div');
        notification.className = 'ai-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-robot"></i>
                <span>Hi! Need help? Chat with me!</span>
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: var(--medium-gray);
            padding: 1rem;
            border-radius: 10px;
            border: 1px solid var(--primary-gold);
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 9998;
            animation: slideIn 0.3s ease;
            cursor: pointer;
        `;
        
        notification.addEventListener('click', () => {
            this.chatContainer.classList.add('active');
            this.chatWidget.classList.add('active');
            notification.remove();
        });

        document.body.appendChild(notification);

        // Remove notification after 10 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 10000);
    }

    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Process and respond
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = text;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        typingDiv.style.cssText = `
            .typing-dots span {
                display: inline-block;
                width: 8px;
                height: 8px;
                background: var(--primary-gold);
                border-radius: 50%;
                margin: 0 2px;
                animation: typing 1.4s infinite;
            }
            .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
            .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
            @keyframes typing {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-10px); }
            }
        `;
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Greetings
        if (message.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
            return "Hello! 👋 Welcome to ASQ Assist! I'm here to help you. How can I assist you today? Feel free to ask about our services, pricing, or book a consultation!";
        }

        // Booking/Consultation
        if (message.includes('book') || message.includes('appointment') || message.includes('schedule') || message.includes('consultation')) {
            return "Great! I'd love to help you book a consultation. \n\nYou can schedule a call by clicking the 'Book a Call' button at the top of our website. It will open our Calendly system where you can choose a time that works best for you.\n\nOur consultations are FREE and no obligation. Would you like me to provide more information about what to expect?";
        }

        // Services
        if (message.includes('service') || message.includes('offer') || message.includes('do')) {
            return "We offer a comprehensive range of business services:\n\n✨ <strong>Graphics Design</strong> - Logos, branding, marketing materials\n <strong>Video Editing</strong> - Professional video production\n📱 <strong>Social Media Marketing</strong> - Content & campaigns\n <strong>Website Development</strong> - Custom websites\n📊 <strong>Lead Generation</strong> - Quality prospects\n <strong>Sales Training</strong> - Team development\n🏢 <strong>BPO Outsourcing</strong> - Virtual assistants & support\n <strong>AI Agents</strong> - 24/7 automated support\n\nWhich service interests you most?";
        }

        // Pricing
        if (message.includes('price') || message.includes('cost') || message.includes('how much') || message.includes('package')) {
            return "Our pricing is competitive and tailored to your needs:\n\n💰 <strong>Graphics Design:</strong> Starting at ₱5,000\n <strong>Video Editing:</strong> Starting at 8,000\n📱 <strong>Social Media:</strong> Starting at ₱15,000/month\n💻 <strong>Web Development:</strong> Custom quotes\n\nWe offer flexible packages! For a personalized quote, I recommend booking a free consultation. Would you like to do that?";
        }

        // Contact information
        if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('reach')) {
            return "Here's how you can reach us:\n\n📞 <strong>Phone:</strong> 0916 769 8066\n📱 <strong>WhatsApp:</strong> 0991 324 9620\n✉️ <strong>Email:</strong> asqassist@gmail.com\n📍 <strong>Location:</strong> Brgy. Cabuco, Trece Martires City, Cavite, Philippines\n\nOur AI agents are available 24/7, and our human team is available Mon-Sat, 9 AM - 6 PM.";
        }

        // About company
        if (message.includes('about') || message.includes('who') || message.includes('founder') || message.includes('company')) {
            return "ASQ Assist was founded on <strong>March 22, 2018</strong> by <strong>Joffrey R. Aporado</strong>. \n\nWe're a premium business solutions provider based in the Philippines, specializing in graphics design, digital marketing, web development, and BPO services. \n\nWhat sets us apart is our combination of AI-powered efficiency and human expertise, available 24/7 to serve you!";
        }

        // Specific services
        for (const [key, value] of Object.entries(this.knowledgeBase.services)) {
            if (message.includes(key)) {
                return value;
            }
        }

        // Objection handling
        if (message.includes('expensive') || message.includes('too much') || message.includes('budget')) {
            return "I understand budget is important! 💰\n\nHere's the thing - we offer flexible packages and payment plans to fit different budgets. Plus, investing in quality services now saves you time and money in the long run.\n\nOur free consultation will help us understand your needs and find the best solution for your budget. No pressure, just honest advice. Would you like to schedule one?";
        }

        if (message.includes('time') || message.includes('long') || message.includes('deadline')) {
            return "We pride ourselves on fast turnaround times! ⚡\n\nMost projects are completed within 3-7 business days, depending on complexity. We understand deadlines are important, and we always communicate realistic timelines upfront.\n\nRush services are also available if needed. During your consultation, we'll discuss your timeline and make sure we can meet it!";
        }

        if (message.includes('trust') || message.includes('reliable') || message.includes('guarantee')) {
            return "Great question! Here's why clients trust us:\n\n✅ 6+ years in business (since 2018)\n✅ 500+ satisfied clients\n✅ 98% satisfaction rate\n✅ Transparent pricing\n✅ Professional team\n✅ 24/7 support\n\nWe also offer revision rounds to ensure you're 100% happy with the results. Your success is our success! 🤝";
        }

        // Talk to human
        if (message.includes('human') || message.includes('person') || message.includes('agent') || message.includes('representative')) {
            return "Of course! I can connect you with our team. \n\nYou can reach us directly at:\n• Phone: 0916 769 8066\n• WhatsApp: 0991 324 9620\n• Email: asqassist@gmail.com\n\nOur team is available Monday-Saturday, 9 AM - 6 PM. Or, you can book a call through our website for a scheduled consultation. Which would you prefer?";
        }

        // Thank you
        if (message.includes('thank')) {
            return "You're very welcome! 😊 I'm here whenever you need assistance. Don't hesitate to ask if you have any other questions. Have a great day!";
        }

        // Default response
        return "That's a great question! Let me help you with that. 🤔\n\nI can assist you with:\n• Information about our services\n• Pricing details\n• Booking a consultation\n• Contact information\n• General inquiries\n\nCould you provide a bit more detail about what you'd like to know? Or feel free to use the quick reply buttons below!";
    }
}

// Initialize AI Assistant when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.asqAI = new ASQAIAssistant();
});

// Handle missed calls (simulated - would integrate with phone system)
function handleMissedCall(callerNumber, callTime) {
    // This would be triggered by your phone system API
    const message = `Missed call from ${callerNumber} at ${callTime}`;
    
    // Send WhatsApp notification
    sendWhatsAppNotification(message);
    
    // Send email notification
    sendEmailNotification('Missed Call Alert', message);
}

// Send WhatsApp notification
function sendWhatsAppNotification(message) {
    // This would integrate with WhatsApp Business API
    console.log('WhatsApp Notification:', message);
    // In production, use WhatsApp Business API or Twilio
}

// Send email notification
function sendEmailNotification(subject, message) {
    // This would integrate with email service
    console.log('Email Notification:', subject, message);
    // In production, use EmailJS, SendGrid, or similar service
}

// Export for use in other scripts
window.ASQAIAssistant = ASQAIAssistant;
window.handleMissedCall = handleMissedCall;
