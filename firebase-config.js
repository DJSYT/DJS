// Firebase Configuration and Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6cFyB0xjro_gs8uw69Uqwx4YCzvx1Yts",
  authDomain: "botonomy-83590.firebaseapp.com",
  projectId: "botonomy-83590",
  storageBucket: "botonomy-83590.firebasestorage.app",
  messagingSenderId: "936937974527",
  appId: "1:936937974527:web:36a2f78072065bac2a7aca",
  measurementId: "G-KNF0F66HDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Export for use in other modules
window.firebaseApp = app;
window.firebaseDb = db;
window.firebaseAnalytics = analytics;

console.log('Firebase initialized successfully');
