import { db } from '../firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

export const createOrUpdateUser = async (user) => {
  try {
    console.log('Creating/updating user:', user.uid);
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // New user - set default values
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        jury: false,
        normalUser: true,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      };
      
      console.log('Saving new user data:', userData);
      await setDoc(userRef, userData);
    } else {
      // Update lastLogin for existing users
      await setDoc(userRef, {
        lastLogin: serverTimestamp()
      }, { merge: true });
    }
    
    return userSnap.data();
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error);
    throw error;
  }
}; 