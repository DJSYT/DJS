// Enhanced Portfolio JavaScript with Animations and Effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeNavigation();
    initializeScrollEffects();
    initializeParticleSystem();
    initializeAnimations();
    initializeContactForm();
    initializeSkillBars();
    initializeCounters();
    initializeInteractiveElements();
    initializeTypingEffect();
    
    console.log('🚀 DJS Portfolio initialized successfully!');
});

// Navigation Management
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Add body scroll lock when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink);
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects and Animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bars animation when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Trigger counters animation when about section is visible
                if (entry.target.id === 'about') {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Parallax effect for hero section elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Apply parallax to floating shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
        });
    });
}

// Advanced Particle System
function initializeParticleSystem() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    let particles = [];
    const maxParticles = 50;
    let animationId;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const sizes = ['small', 'medium', 'large'];
        const colors = ['red', 'white'];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.classList.add(size, color);
        
        // Random position and animation properties
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 15 + 10; // 10-25 seconds
        const drift = (Math.random() - 0.5) * 300; // Side drift
        const opacity = Math.random() * 0.7 + 0.3; // 0.3-1.0 opacity
        
        particle.style.left = startX + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.opacity = opacity;
        particle.style.setProperty('--drift', drift + 'px');
        
        particlesContainer.appendChild(particle);
        particles.push(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                particles = particles.filter(p => p !== particle);
            }
        }, duration * 1000);
    }

    function startParticleSystem() {
        // Create initial burst of particles
        for (let i = 0; i < maxParticles; i++) {
            setTimeout(() => {
                createParticle();
            }, Math.random() * 5000);
        }
        
        // Continuously create new particles
        setInterval(() => {
            if (particles.length < maxParticles && document.visibilityState === 'visible') {
                createParticle();
            }
        }, 400);
    }

    // Only run particles when page is visible for performance
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            startParticleSystem();
        }
    });

    startParticleSystem();
}

// Initialize Animations
function initializeAnimations() {
    // Add staggered fade-in animation to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });

    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.service-card, .project-card, .contact-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.includes('scale') 
                ? this.style.transform 
                : this.style.transform + ' scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace('scale(1.02)', '');
        });
    });

    // Magnetic hover effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Contact Form Management
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim()
        };
        
        let isValid = validateForm(formData);

        // If form is valid, show success modal with animation
        if (isValid) {
            showSuccessModal();
            contactForm.reset();
            
            // Add a subtle animation to show form was submitted
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                submitBtn.style.background = '';
            }, 3000);
        }
    });

    function validateForm(data) {
        let isValid = true;

        // Validate name
        if (!data.name) {
            showError('nameError', 'Name is required.');
            isValid = false;
        } else if (data.name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters long.');
            isValid = false;
        }

        // Validate email
        if (!data.email) {
            showError('emailError', 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(data.email)) {
            showError('emailError', 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate service
        if (!data.service) {
            showError('serviceError', 'Please select a service.');
            isValid = false;
        }

        // Validate message
        if (!data.message) {
            showError('messageError', 'Message is required.');
            isValid = false;
        } else if (data.message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters long.');
            isValid = false;
        }

        return isValid;
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showSuccessModal() {
        successModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function hideSuccessModal() {
        successModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Modal close events
    if (closeModal) {
        closeModal.addEventListener('click', hideSuccessModal);
    }
    
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                hideSuccessModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.classList.contains('show')) {
            hideSuccessModal();
        }
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    // This will be triggered by intersection observer
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width');
        
        setTimeout(() => {
            bar.style.width = targetWidth + '%';
        }, index * 100); // Stagger the animations
    });
}

// Counter Animation
function initializeCounters() {
    // This will be triggered by intersection observer
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Interactive Elements Enhancement
function initializeInteractiveElements() {
    // Add ripple effect to buttons
    document.querySelectorAll('.hero-btn, .submit-btn, .modal-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't add ripple to external links
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('http')) {
                return;
            }
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.hero-btn, .submit-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform + ' scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace('scale(1.05)', '');
        });
    });

    // Add loading animation to form submission
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            if (this.type === 'submit') {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    }

    // Enhanced profile card interaction
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'rotate 3s linear infinite';
            }, 100);
        });
    }
}

// Typing Effect for Hero Section
function initializeTypingEffect() {
    const greetingText = document.querySelector('.greeting-text');
    if (!greetingText) return;
    
    const originalText = greetingText.textContent;
    greetingText.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            greetingText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Performance Optimizations
function optimizePerformance() {
    // Lazy load images if any are added
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Throttle scroll events for better performance
    let ticking = false;
    
    function updateOnScroll() {
        // Add any scroll-dependent updates here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// Advanced Animations and Effects
function addAdvancedEffects() {
    // Floating animation for service icons
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });

    // Glowing effect for contact icons
    const contactIcons = document.querySelectorAll('.contact-icon');
    contactIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(220, 38, 38, 0.6)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // Gradient animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', function() {
            this.style.backgroundSize = '200% 200%';
        });
        
        heroTitle.addEventListener('mouseleave', function() {
            this.style.backgroundSize = '400% 400%';
        });
    }
}

// Initialize advanced effects
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        addAdvancedEffects();
        optimizePerformance();
    }, 1000);
});

// Custom cursor effect (optional enhancement)
function initializeCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .nav-link');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add any additional initialization here
    console.log('🎨 All animations and effects loaded!');
    
    // Optional: Initialize custom cursor for desktop
    if (window.innerWidth > 768) {
        // initializeCustomCursor(); // Uncomment if you want custom cursor
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});

// Console greeting
console.log(`
██████╗      ██╗███████╗
██╔══██╗     ██║██╔════╝
██║  ██║     ██║███████╗
██║  ██║██   ██║╚════██║
██████╔╝╚█████╔╝███████║
╚═════╝  ╚════╝ ╚══════╝

🚀 DJS Portfolio - Loaded and Ready!
💻 Full-Stack Developer & MineCloud Owner
🎮 Gamer | Creator | Problem Solver

Visit: https://minecloud.dev
Contact: djs@minecloud.dev
`);

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment below if you add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then((registration) => {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch((registrationError) => {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}