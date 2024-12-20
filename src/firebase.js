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
const googleProvider = new GoogleAuthProvider();

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence);

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { db, auth, googleProvider }; 