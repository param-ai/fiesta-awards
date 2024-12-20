import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  browserLocalPersistence, 
  setPersistence
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

// Single provider instance
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

const signInWithGoogle = async () => {
  try {
    console.log('1. Starting Google Sign In...');
    // Add popup settings
    const auth = getAuth();
    auth.settings = {
      appVerificationDisabledForTesting: true // Helps with popup issues
    };
    
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
      auth_type: 'rerequest',
      access_type: 'offline'
    });

    const result = await signInWithPopup(auth, provider);
    console.log('2. Sign in successful:', result);
    return result;
  } catch (error) {
    if (error.code === 'auth/popup-closed-by-user') {
      console.log('User closed the popup window');
      // Handle gracefully - maybe show a message to user
    }
    console.error('Sign in error:', error);
    throw error;
  }
};

export { db, auth, signInWithGoogle }; 