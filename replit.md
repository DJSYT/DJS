# DJS_Vortex Portfolio Website

## Overview

This is a personal portfolio website for DJS_Vortex, a 14-year-old content creator from India who specializes in anime video editing, gaming content, and animations. The website serves as a comprehensive showcase of their work across multiple YouTube channels and provides an interactive platform for community engagement. Built as a static website with modern web technologies, it features a clean, responsive design with dark/light theme switching capabilities and real-time messaging functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application follows a traditional multi-page website structure with modern enhancements:

- **Static HTML Pages**: Six main pages (Home, BFF, FAQ, Messages, Edits, Updates) with consistent navigation and branding
- **Modular CSS Architecture**: Separated into `styles.css` for main styling and `theme.css` for theme-specific styles and transitions
- **Component-Based JavaScript**: Organized into specialized modules for different functionalities (main.js, messaging.js, theme-toggle.js)
- **Responsive Design**: Mobile-first approach with flexible layouts and modern CSS features

### Backend Architecture
The backend uses a minimal Flask server for local development and file serving:

- **Flask Application**: Simple Python server (`server.py`) that serves static files and handles routing
- **Static File Serving**: All HTML, CSS, JS, and asset files are served directly from the root directory
- **Development Focus**: Designed primarily for local development with easy deployment to static hosting platforms

### Theme System
A sophisticated client-side theme management system:

- **Dual Theme Support**: Light and dark themes with CSS custom properties for easy switching
- **Local Storage Persistence**: User theme preferences are saved and restored across sessions
- **System Theme Detection**: Automatically detects and respects user's system theme preference
- **Smooth Transitions**: All theme changes include smooth CSS transitions for enhanced user experience

### Interactive Features
Modern web capabilities enhance user engagement:

- **Real-time Messaging**: Live message board with instant updates
- **Smooth Animations**: Scroll-based animations and smooth page transitions
- **Lazy Loading**: Performance optimization for images and content
- **Typewriter Effects**: Dynamic text animations for enhanced visual appeal

## External Dependencies

### Firebase Integration
- **Firestore Database**: Real-time NoSQL database for storing and syncing user messages
- **Firebase Analytics**: User behavior tracking and engagement metrics
- **Configuration**: Project ID "botonomy-83590" with full Firebase SDK integration

### Frontend Libraries
- **Firebase SDK v12.0.0**: Modular imports for Firestore, Analytics, and App initialization
- **Modern ES6 Modules**: Native JavaScript modules for clean code organization
- **CSS Custom Properties**: For theme management and consistent styling
- **Web APIs**: LocalStorage for theme persistence, real-time updates via Firestore listeners

### Hosting and Deployment
- **Flask Development Server**: Local development environment on port 5000
- **Static Asset Management**: Direct file serving for HTML, CSS, JS, and images
- **CDN Integration**: External image hosting via ImgBB for profile pictures and thumbnails

### Third-party Services
- **YouTube Integration**: Links to multiple YouTube channels (DJS_YT, DJS_Vortex, DJS_ANIMATION)
- **Image Hosting**: ImgBB service for external image storage and delivery
- **Font System**: System font stack for optimal performance and consistency across platforms