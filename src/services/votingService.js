import { db } from '../firebase';
import { doc, setDoc, updateDoc, increment, arrayUnion } from 'firebase/firestore';

export const submitVote = async (nominationId, userId, isJury, juryPoints = null) => {
  const voteRef = doc(db, 'votes', `${userId}_${nominationId}`);
  const nominationRef = doc(db, 'nominations', nominationId);

  // Create the vote document
  await setDoc(voteRef, {
    userId,
    nominationId,
    timestamp: new Date(),
    isJury
  });

  // Update nomination counters
  if (isJury && juryPoints !== null) {
    // For jury votes, only update jury-related fields
    await updateDoc(nominationRef, {
      juryVotes: increment(1),
      juryScore: increment(juryPoints),
      juryVoters: arrayUnion(userId)
    });
  } else {
    // For regular votes, only update totalVotes
    await updateDoc(nominationRef, {
      totalVotes: increment(1),
      voters: arrayUnion(userId)
    });
  }
}; 