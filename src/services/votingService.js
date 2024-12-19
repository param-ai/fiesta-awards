import { db } from '../firebase';
import { 
  doc, 
  writeBatch, 
  increment, 
  getDoc, 
  arrayUnion, 
  serverTimestamp 
} from 'firebase/firestore';

export const submitVote = async (nominationId, userId, isJury) => {
  try {
    console.log('Submitting vote:', { nominationId, userId, isJury }); // Debug log

    // First check if user has already voted
    const voteRef = doc(db, 'votes', `${userId}_${nominationId}`);
    const voteDoc = await getDoc(voteRef);
    
    if (voteDoc.exists()) {
      throw new Error('Already voted');
    }

    const batch = writeBatch(db);
    const nominationRef = doc(db, 'nominations', nominationId);

    // Record the vote with exact structure matching rules
    batch.set(voteRef, {
      userId,
      nominationId,
      isJury,
      timestamp: serverTimestamp()
    });

    // Update nomination with only allowed fields
    if (isJury) {
      console.log('Adding jury vote...'); // Debug log
      batch.update(nominationRef, {
        juryScore: increment(50), // Make sure this is being applied
        juryVotes: increment(1),
        juryVoters: arrayUnion(userId)
      });
    } else {
      console.log('Adding normal vote...'); // Debug log
      batch.update(nominationRef, {
        totalVotes: increment(1),
        voters: arrayUnion(userId)
      });
    }

    await batch.commit();
    console.log('Vote submitted successfully'); // Debug log
    return true;
  } catch (error) {
    console.error('Error submitting vote:', error);
    throw error;
  }
}; 