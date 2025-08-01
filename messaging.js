// Messaging System with Firebase Firestore
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

class MessagingSystem {
  constructor() {
    this.db = window.firebaseDb;
    this.messagesCollection = collection(this.db, 'messages');
    this.unsubscribe = null;
    this.init();
  }

  init() {
    this.setupMessageForm();
    this.loadMessages();
    this.setupRealTimeUpdates();
  }

  setupMessageForm() {
    const messageForm = document.getElementById('message-form');
    if (!messageForm) return;

    messageForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.submitMessage(e.target);
    });
  }

  async submitMessage(form) {
    const nameInput = form.querySelector('#name');
    const messageInput = form.querySelector('#message');
    const submitBtn = form.querySelector('button[type="submit"]');
    const alertContainer = document.getElementById('alert-container');

    if (!nameInput || !messageInput) {
      this.showAlert('Form fields not found', 'error');
      return;
    }

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
      this.showAlert('Please fill in all fields', 'error');
      return;
    }

    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;

    try {
      // Add message to Firestore
      await addDoc(this.messagesCollection, {
        name: name,
        message: message,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString()
      });

      // Reset form
      nameInput.value = '';
      messageInput.value = '';
      
      this.showAlert('Message sent successfully! ✨', 'success');
      
    } catch (error) {
      console.error('Error sending message:', error);
      this.showAlert('Failed to send message. Please try again.', 'error');
    } finally {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  async loadMessages() {
    const messagesContainer = document.getElementById('messages-container');
    if (!messagesContainer) return;

    try {
      // Show loading state
      messagesContainer.innerHTML = '<div class="loading-messages">Loading messages...</div>';

      // Get messages ordered by timestamp
      const q = query(this.messagesCollection, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        messagesContainer.innerHTML = `
          <div class="no-messages">
            <p>No messages yet. Be the first to leave a message! 💌</p>
          </div>
        `;
        return;
      }

      // Render messages
      const messagesHtml = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return this.createMessageElement(data);
      }).join('');

      messagesContainer.innerHTML = messagesHtml;

    } catch (error) {
      console.error('Error loading messages:', error);
      messagesContainer.innerHTML = `
        <div class="error-messages">
          <p>Failed to load messages. Please refresh the page.</p>
        </div>
      `;
    }
  }

  setupRealTimeUpdates() {
    const messagesContainer = document.getElementById('messages-container');
    if (!messagesContainer) return;

    // Listen for real-time updates
    const q = query(this.messagesCollection, orderBy('timestamp', 'desc'));
    
    this.unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const messagesHtml = snapshot.docs.map(doc => {
          const data = doc.data();
          return this.createMessageElement(data);
        }).join('');

        messagesContainer.innerHTML = messagesHtml;
      }
    }, (error) => {
      console.error('Error in real-time updates:', error);
    });
  }

  createMessageElement(messageData) {
    const { name, message, timestamp, createdAt } = messageData;
    
    // Format timestamp
    let timeString = 'Just now';
    if (timestamp && timestamp.toDate) {
      timeString = this.formatTimestamp(timestamp.toDate());
    } else if (createdAt) {
      timeString = this.formatTimestamp(new Date(createdAt));
    }

    // Sanitize content to prevent XSS
    const safeName = this.sanitizeHtml(name);
    const safeMessage = this.sanitizeHtml(message);

    return `
      <div class="message-item">
        <div class="message-author">${safeName}</div>
        <div class="message-content">${safeMessage}</div>
        <div class="message-timestamp">${timeString}</div>
      </div>
    `;
  }

  formatTimestamp(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
  }

  sanitizeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showAlert(message, type) {
    let alertContainer = document.getElementById('alert-container');
    
    if (!alertContainer) {
      alertContainer = document.createElement('div');
      alertContainer.id = 'alert-container';
      alertContainer.style.position = 'fixed';
      alertContainer.style.top = '20px';
      alertContainer.style.left = '50%';
      alertContainer.style.transform = 'translateX(-50%)';
      alertContainer.style.zIndex = '9999';
      document.body.appendChild(alertContainer);
    }

    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.textContent = message;
    alert.style.display = 'block';
    alert.style.animation = 'slideInDown 0.3s ease';

    alertContainer.appendChild(alert);

    // Remove alert after 5 seconds
    setTimeout(() => {
      alert.style.animation = 'slideOutUp 0.3s ease';
      setTimeout(() => {
        if (alert.parentNode) {
          alert.parentNode.removeChild(alert);
        }
      }, 300);
    }, 5000);
  }

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

// Initialize messaging system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait for Firebase to be initialized
  const initMessaging = () => {
    if (window.firebaseDb) {
      window.messagingSystem = new MessagingSystem();
    } else {
      setTimeout(initMessaging, 100);
    }
  };
  
  initMessaging();
});

// Add CSS for alert animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInDown {
    from {
      transform: translateX(-50%) translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutUp {
    from {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    to {
      transform: translateX(-50%) translateY(-100%);
      opacity: 0;
    }
  }
  
  .loading-messages, .no-messages, .error-messages {
    text-align: center;
    padding: 2rem;
    color: var(--text-light);
    font-style: italic;
  }
  
  body.dark-theme .loading-messages,
  body.dark-theme .no-messages,
  body.dark-theme .error-messages {
    color: var(--text-dark);
  }
`;
document.head.appendChild(style);
