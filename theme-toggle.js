// Theme Toggle System
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.createThemeToggle();
    this.setupEventListeners();
  }

  createThemeToggle() {
    // Check if theme toggle already exists
    if (document.getElementById('theme-toggle')) return;

    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.innerHTML = '<span class="icon">🌙</span>';
    
    document.body.appendChild(themeToggle);
  }

  setupEventListeners() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');

    if (theme === 'dark') {
      body.classList.add('dark-theme');
      if (themeToggle) {
        themeToggle.innerHTML = '<span class="icon">☀️</span>';
        themeToggle.setAttribute('aria-label', 'Toggle light mode');
      }
    } else {
      body.classList.remove('dark-theme');
      if (themeToggle) {
        themeToggle.innerHTML = '<span class="icon">🌙</span>';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
      }
    }

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: theme }
    }));
  }

  getTheme() {
    return this.currentTheme;
  }
}

// Initialize theme manager
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});

// Auto-detect system preference if no saved theme
if (!localStorage.getItem('theme')) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    localStorage.setItem('theme', 'dark');
  }
}
