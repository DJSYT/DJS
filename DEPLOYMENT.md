# GitHub Pages Deployment Guide

## Files to Upload to GitHub

**✅ Upload these files:**
```
├── index.html
├── BFF.html
├── FAQ.html
├── guestbook.html
├── edits.html
├── updates.html
├── css/
│   ├── styles.css
│   ├── theme.css
│   └── icons.css
├── js/
│   ├── main.js
│   ├── firebase-config.js
│   ├── messaging.js
│   └── theme-toggle.js
├── README.md
└── .gitignore
```

**❌ DO NOT upload these files (they're for local development only):**
```
├── main.py
├── server.py
├── pyproject.toml
├── uv.lock
├── __pycache__/
└── .replit
```

## Step-by-Step Deployment

### 1. Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it (e.g., `djs-vortex-portfolio`)
4. Make it **public**
5. Don't initialize with README (we already have one)

### 2. Upload Files
**Method A: GitHub Web Interface**
1. Click "uploading an existing file"
2. Drag and drop ONLY the static files listed above
3. Commit the files

**Method B: Git Commands**
```bash
git init
git add index.html BFF.html FAQ.html guestbook.html edits.html updates.html
git add css/ js/ README.md .gitignore
git commit -m "Initial portfolio website"
git remote add origin https://github.com/[USERNAME]/[REPO-NAME].git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository settings
2. Scroll down to "Pages" section
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"

### 4. Your Site is Live!
- Your website will be available at: `https://[USERNAME].github.io/[REPO-NAME]`
- It may take 5-10 minutes to go live
- All features will work: theme toggle, navigation, Firebase messaging

## Why Your Files Are Perfectly Connected

✅ **All paths are relative** - works on GitHub Pages
✅ **CSS files properly linked** - all styles will load
✅ **JavaScript modules work** - Firebase and theme switching included
✅ **Icons and symbols display** - all custom symbols included
✅ **Responsive design** - works on all devices

## Troubleshooting

**If the site doesn't work:**
1. Check that you uploaded the correct files (no Python files)
2. Verify GitHub Pages is enabled in settings
3. Make sure repository is public
4. Wait 10 minutes after enabling Pages

**If Firebase messaging doesn't work:**
- The Firebase configuration is already set up correctly
- Messages should work in real-time once deployed

**If themes don't switch:**
- Theme toggle is included and should work automatically
- Settings are saved in browser localStorage

## What Each File Does

- **HTML files**: The website pages
- **css/styles.css**: Main website styling
- **css/theme.css**: Dark/light theme switching  
- **css/icons.css**: Your custom symbols (</>, YouTube, Discord, etc.)
- **js/main.js**: Interactive features (clock, typewriter, animations)
- **js/firebase-config.js**: Database connection for messaging
- **js/messaging.js**: Real-time message board
- **js/theme-toggle.js**: Dark/light mode switching

All files are properly connected and will work perfectly on GitHub Pages!