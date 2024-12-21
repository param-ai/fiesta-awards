import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc, writeBatch } from 'firebase/firestore';

export const saveNomination = async (nominationData, userId) => {
  try {
    // Create a new batch
    const batch = writeBatch(db);
    const nominationRef = doc(collection(db, 'nominations'));
    
    // Helper function to safely map answers
    const mapAnswers = (answers = []) => {
      if (!Array.isArray(answers)) return [];
      return answers.map(answer => ({
        topic: answer?.topic || '',
        question: answer?.question || '',
        situation: answer?.situation || '',
        behavior: answer?.behavior || '',
        impact: answer?.impact || ''
      }));
    };

    // Prepare category questions data with null checks
    const prepareCategoryQuestions = (answers) => {
      if (!answers || answers.skipped) return null;
      return {
        mandatory: mapAnswers(answers.mandatory),
        optional: mapAnswers(answers.optional)
      };
    };

    // Determine if this is a self nomination by checking if nominee data is nested
    const isSelfNomination = !nominationData.nominee;

    // Prepare the nomination data structure
    const nominatorData = isSelfNomination
      ? {
          name: nominationData.name || '',
          email: nominationData.email || '',
          linkedinUrl: nominationData.linkedinUrl || '',
          phone: nominationData.phone || '',
          company: nominationData.company || '',
          jobTitle: nominationData.jobTitle || ''
        }
      : {
          name: nominationData.nominator?.name || '',
          email: nominationData.nominator?.email || '',
          linkedinUrl: nominationData.nominator?.linkedinUrl || '',
          phone: nominationData.nominator?.phone || '',
          company: nominationData.nominator?.company || '',
          jobTitle: nominationData.nominator?.jobTitle || ''
        };

    const nomineeData = isSelfNomination
      ? {
          name: nominationData.name || '',
          email: nominationData.email || '',
          linkedinUrl: nominationData.linkedinUrl || '',
          phone: nominationData.phone || '',
          company: nominationData.company || '',
          jobTitle: nominationData.jobTitle || '',
          category: nominationData.category || ''
        }
      : {
          name: nominationData.nominee?.name || '',
          email: nominationData.nominee?.email || '',
          linkedinUrl: nominationData.nominee?.linkedinUrl || '',
          phone: nominationData.nominee?.phone || '',
          company: nominationData.nominee?.company || '',
          jobTitle: nominationData.nominee?.jobTitle || '',
          category: nominationData.nominee?.category || ''
        };

    // Common nomination data structure
    const nominationDoc = {
      userId: userId || '',
      type: isSelfNomination ? 'self' : 'other',
      createdAt: serverTimestamp(),
      nominator: nominatorData,
      nominee: nomineeData,
      relationship: isSelfNomination ? 'self' : (nominationData.relationship || ''),
      otherRelationship: isSelfNomination ? '' : (nominationData.otherRelationship || ''),
      recommendation: isSelfNomination ? '' : (nominationData.recommendation || ''),
      categoryQuestions: prepareCategoryQuestions(nominationData.answers),
      totalVotes: 0,
      juryVotes: 0,
      juryScore: 0,
      status: 'pending'
    };

    console.log('Saving nomination:', nominationDoc); // For debugging
    
    // Add the nomination to the batch
    batch.set(nominationRef, nominationDoc);
    
    // Commit the batch
    await batch.commit();
    
    return nominationRef.id;
  } catch (error) {
    console.error('Error saving nomination:', error);
    
    // If it's a permission error, throw a more specific error
    if (error.code === 'permission-denied') {
      throw new Error('You do not have permission to submit nominations. Please sign in again.');
    }
    
    // If it's a network error, throw a more specific error
    if (error.code === 'unavailable') {
      throw new Error('Network error. Please check your connection and try again.');
    }
    
    throw error;
  }
}; 