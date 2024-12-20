import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  browserLocalPersistence, 
  setPersistence,
  inMemoryPersistence
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD41w2hpKN4e7KC9Ke8_77dNoh9eWu_RpU",
  authDomain: "recfiesta-c0ab5.firebaseapp.com",
  projectId: "recfiesta-c0ab5",
  storageBucket: "recfiesta-c0ab5.firebasestorage.app",
  messagingSenderId: "512982533492",
  appId: "1:512982533492:web:e75df8473c8051d8755821"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Try to set persistence to LOCAL, fallback to IN_MEMORY if cookies are blocked
const initAuth = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch (error) {
    console.warn('Local persistence failed, falling back to in-memory:', error);
    await setPersistence(auth, inMemoryPersistence);
  }
};

// Initialize auth
initAuth();

// Configure Google provider with additional settings
googleProvider.setCustomParameters({
  prompt: 'select_account',
  // Adding additional parameters to help with cookie issues
  auth_type: 'rerequest',
  access_type: 'offline'
});

// Add popup settings to reduce cookie issues
const popupConfig = {
  width: 500,
  height: 600,
  location: 'yes',
  resizable: 'yes',
  statusbar: 'yes',
  toolbar: 'no'
};

export { db, auth, googleProvider, popupConfig }; 