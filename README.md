# DJS_Vortex Portfolio Website

A modern, responsive portfolio website for DJS_Vortex featuring custom symbols, real-time messaging, and theme switching.

## Features

- **Multi-page Portfolio**: Home, BFF, FAQ, Messages, Edits, Updates
- **Custom Symbols**: Icons for coding (</> ), YouTube, Discord, Roblox, updates, and animations
- **Real-time Messaging**: Firebase-powered message board
- **Theme Switching**: Dark/light mode with smooth transitions
- **Responsive Design**: Works on all devices
- **Interactive Elements**: Live clock, typewriter effect, smooth animations

## File Structure

```
├── index.html          # Home page
├── BFF.html           # Best friend page
├── FAQ.html           # FAQ page
├── guestbook.html     # Messages page
├── edits.html         # Video edits showcase
├── updates.html       # Updates page
├── css/
│   ├── styles.css     # Main styling
│   ├── theme.css      # Theme switching
│   └── icons.css      # Custom icons & symbols
├── js/
│   ├── main.js        # Core functionality
│   ├── firebase-config.js  # Firebase setup
│   ├── messaging.js   # Message system
│   └── theme-toggle.js # Theme switching
├── server.py          # Local development server (optional)
└── main.py           # Flask entry point (optional)
```

## GitHub Pages Deployment

This website is designed to work perfectly with GitHub Pages:

1. **Upload all files** to your GitHub repository
2. **Enable GitHub Pages** in repository settings
3. **Select source** as "Deploy from a branch" and choose "main" branch
4. **Your site will be live** at `https://[username].github.io/[repository-name]`

## Local Development

For local development, you can either:

### Option 1: Static Files (Recommended for GitHub)
Simply open `index.html` in your browser, or use a simple HTTP server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have npx)
npx serve .
```

### Option 2: Flask Server (For advanced features)
```bash
pip install flask
python main.py
```

## Firebase Configuration

The messaging system uses Firebase Firestore. The configuration is already set up with:
- Project ID: `botonomy-83590`
- Real-time message updates
- Secure data handling

## Custom Symbols Used

- **Code Symbol**: `</>`
- **Platform Icons**: YouTube, Discord, Roblox
- **Feature Icons**: Updates, Animation, Messages, etc.
- **Navigation Icons**: Each page has unique icons

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Optimized experience

## Technologies

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **Vanilla JavaScript**: ES6+ modules
- **Firebase**: Real-time database
- **Responsive Design**: Mobile-first approach

---

Created by DJS_Vortex - A 14-year-old content creator from India specializing in anime video editing, gaming content, and animations.