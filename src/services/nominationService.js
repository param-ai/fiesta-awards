import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const saveNomination = async (nominationData, userId) => {
  try {
    const nominationsRef = collection(db, 'nominations');
    
    const nominationToSave = {
      type: nominationData.nominationType,
      status: 'pending',
      createdAt: serverTimestamp(),
      submittedBy: userId,
      totalVotes: 0,
      juryScore: 0,
      voters: [],
      juryVoters: [],
      nominationData: nominationData.nominationType === 'self' ? 
        {
          nominee: {
            name: nominationData.name,
            email: nominationData.email,
            linkedinUrl: nominationData.linkedinUrl,
            phone: nominationData.phone,
            company: nominationData.company,
            jobTitle: nominationData.jobTitle,
            category: nominationData.category
          },
          // Category questions and answers for self nominations are always included
          categoryQuestions: {
            numeric: {
              questions: nominationData.answers.questions.numeric,
              answers: [
                {
                  question: nominationData.answers.questions.numeric[0],
                  answer: nominationData.answers.numeric1
                },
                {
                  question: nominationData.answers.questions.numeric[1],
                  answer: nominationData.answers.numeric2
                }
              ]
            },
            ratings: {
              questions: nominationData.answers.questions.range,
              answers: [
                {
                  question: nominationData.answers.questions.range[0],
                  answer: nominationData.answers.range1
                },
                {
                  question: nominationData.answers.questions.range[1],
                  answer: nominationData.answers.range2
                }
              ]
            },
            textAnswers: {
              questions: nominationData.answers.questions.text,
              answers: [
                {
                  question: nominationData.answers.questions.text[0],
                  answer: nominationData.answers.text1
                },
                {
                  question: nominationData.answers.questions.text[1],
                  answer: nominationData.answers.text2
                }
              ]
            }
          }
        } 
        : 
        {
          // Other nomination structure
          nominator: {
            name: nominationData.nominator.name,
            email: nominationData.nominator.email,
            linkedinUrl: nominationData.nominator.linkedinUrl,
            phone: nominationData.nominator.phone,
            company: nominationData.nominator.company,
            jobTitle: nominationData.nominator.jobTitle
          },
          relationship: nominationData.relationship,
          otherRelationship: nominationData.otherRelationship,
          nominee: {
            name: nominationData.nominee.name,
            email: nominationData.nominee.email,
            linkedinUrl: nominationData.nominee.linkedinUrl,
            phone: nominationData.nominee.phone,
            company: nominationData.nominee.company,
            jobTitle: nominationData.nominee.jobTitle,
            category: nominationData.nominee.category
          },
          recommendation: nominationData.recommendation,
          // Include category questions only if they chose to add more info
          ...(nominationData.wantsToAddInfo && !nominationData.answers?.skipped && {
            categoryQuestions: {
              numeric: {
                questions: nominationData.answers.questions.numeric,
                answers: {
                  numeric1: nominationData.answers.numeric1,
                  numeric2: nominationData.answers.numeric2
                }
              },
              ratings: {
                questions: nominationData.answers.questions.range,
                answers: {
                  rating1: nominationData.answers.range1,
                  rating2: nominationData.answers.range2
                }
              },
              textAnswers: {
                questions: nominationData.answers.questions.text,
                answers: {
                  text1: nominationData.answers.text1,
                  text2: nominationData.answers.text2
                }
              }
            }
          })
        }
    };

    console.log('Saving nomination:', nominationToSave);
    const docRef = await addDoc(nominationsRef, nominationToSave);
    return docRef.id;
  } catch (error) {
    console.error('Error saving nomination:', error);
    throw error;
  }
}; 