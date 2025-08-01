// Main JavaScript functionality
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupClock();
    this.setupTypewriter();
    this.setupScrollAnimations();
    this.setupLazyLoading();
  }

  setupNavigation() {
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-btn');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  setupClock() {
    const clockElement = document.getElementById('clock');
    if (!clockElement) return;

    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      clockElement.textContent = timeString;
    };

    updateClock();
    setInterval(updateClock, 1000);
  }

  setupTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const text = "👋 Hello, I'm DJS_Vortex!";
    let index = 0;

    const type = () => {
      if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
      } else {
        // Add blinking cursor
        typewriterElement.innerHTML += '<span class="cursor">|</span>';
        this.animateCursor();
      }
    };

    // Start typewriter effect after a short delay
    setTimeout(type, 500);
  }

  animateCursor() {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
      }, 500);
    }
  }

  setupScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .card').forEach(el => {
      observer.observe(el);
    });
  }

  setupLazyLoading() {
    // Lazy load images
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Utility function to show notifications
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem',
      borderRadius: '8px',
      zIndex: '9999',
      animation: 'slideInRight 0.3s ease',
      maxWidth: '300px'
    });

    // Set colors based on type
    const colors = {
      success: { bg: '#d4edda', color: '#155724', border: '#c3e6cb' },
      error: { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' },
      info: { bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb' }
    };

    const colorScheme = colors[type] || colors.info;
    Object.assign(notification.style, {
      backgroundColor: colorScheme.bg,
      color: colorScheme.color,
      border: `1px solid ${colorScheme.border}`
    });

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Performance optimization for scroll events
const optimizedResize = debounce(() => {
  window.dispatchEvent(new CustomEvent('optimizedResize'));
}, 250);

window.addEventListener('resize', optimizedResize);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .animate-in {
    animation: fadeInUp 0.6s ease forwards;
  }
  
  .cursor {
    color: var(--primary-blue);
    font-weight: bold;
  }
  
  body.dark-theme .cursor {
    color: var(--light-blue);
  }
`;
document.head.appendChild(style);
