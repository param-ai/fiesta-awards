import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD41w2hpKN4e7KC9Ke8_77dNoh9eWu_RpU",
  authDomain: "recfiesta-c0ab5.firebaseapp.com",
  projectId: "recfiesta-c0ab5",
  storageBucket: "recfiesta-c0ab5.firebasestorage.app",
  messagingSenderId: "512982533492",
  appId: "1:512982533492:web:e75df8473c8051d8755821"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export
const db = getFirestore(app);

// Initialize Auth and export
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider }; 