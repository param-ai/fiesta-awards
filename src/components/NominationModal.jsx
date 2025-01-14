import { useState, useRef } from 'react';
import styled from 'styled-components';
import { SelfNominationForm } from './SelfNominationForm';
import { CategoryQuestions } from './CategoryQuestions';
import { ConfirmationPage } from './ConfirmationPage';
import { NominateOtherForm } from './NominateOtherForm';
import { saveNomination } from '../services/nominationService';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have auth context
import { categoryQuestions } from './CategoryQuestions';
import { toast } from 'react-hot-toast';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`

const ModalContent = styled.div`
  background: #1a1a1a;
  border-radius: 20px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
    max-height: 95vh;
  }
`

const ModalHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  background: rgba(255, 255, 255, 0.02);
`

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-height: calc(85vh - 120px);
  
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1;

  @media (max-width: 768px) {
    top: 0.75rem;
    right: 0.75rem;
  }
`

const Title = styled.h2`
  color: white;
  font-weight: 400;
  font-size: 1.1rem;
  margin: 0;
  padding-right: 2rem;
`

const NominationChoices = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const ChoiceButton = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  span {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
  }
`

const SuccessMessage = styled.div`
  text-align: center;
  color: white;
  
  h3 {
    color: #4CAF50;
    margin-bottom: 1rem;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.375rem;
  }
`

const Label = styled.label`
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
`

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  
  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 16px; // Prevents iOS zoom on focus
  }
`

const Select = styled.select`
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }

  option {
    background: #1a1a1a;
    padding: 0.5rem;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 0.95rem;
  line-height: 1.5;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: rgba(144, 202, 249, 0.5);
    background: rgba(255, 255, 255, 0.08);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`

const FormSection = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h3`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
`

const QuestionSection = styled.div`
  margin-bottom: 2rem;
  background: #1E1E1E;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const QuestionHeader = styled.div`
  margin-bottom: 2rem;
`

const QuestionTopic = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: #90caf9;
  margin-bottom: 1rem;
`

const QuestionText = styled.div`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  line-height: 1.6;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin: 0 0 1.5rem 0;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => (props.$progress * 100)}%;
    background: #90caf9;
    transition: width 0.3s ease;
  }
`

const ProgressText = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 2rem;
`

const QuestionType = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  letter-spacing: 0.5px;
  
  ${props => props.$type === 'mandatory' ? `
    background: rgba(244, 67, 54, 0.1);
    color: #ef9a9a;
    border: 1px solid rgba(244, 67, 54, 0.2);
  ` : `
    background: rgba(76, 175, 80, 0.1);
    color: #81c784;
    border: 1px solid rgba(76, 175, 80, 0.2);
  `}
`

const AnswerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const AnswerBlock = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
`

const AnswerLabel = styled.div`
  font-size: 1rem;
  color: #90caf9;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;

  &::before {
    content: '${props => props.$icon}';
    font-size: 1.2rem;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const SubmitButton = styled.button`
  min-width: 160px;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  background: #ffffff;
  color: #000000;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    background: #f8f8f8;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
  }
`

const OptionalButton = styled(SubmitButton)`
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    background: transparent;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }

  button {
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`

const isNominationPeriodActive = () => {
  const deadline = new Date('2024-01-13T18:00:00');
  return new Date() <= deadline;
};

export const NominationModal = ({ onClose }) => {
  const [step, setStep] = useState('initial');
  const [formData, setFormData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [nominationType, setNominationType] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showingOptional, setShowingOptional] = useState(false);
  const [answers, setAnswers] = useState({
    mandatory: [],
    optional: []
  });
  const { currentUser } = useAuth();

  const modalBodyRef = useRef(null);

  // Get current category and questions
  const category = nominationType === 'self' ? formData.category : formData.nominee?.category;
  const questions = category ? categoryQuestions[category] : null;
  const mandatoryQuestions = questions?.mandatory || [];
  const optionalQuestions = questions?.optional || [];
  const currentQuestion = showingOptional 
    ? optionalQuestions[currentQuestionIndex]
    : mandatoryQuestions[currentQuestionIndex];
  const progress = showingOptional
    ? (currentQuestionIndex + mandatoryQuestions.length) / (mandatoryQuestions.length + optionalQuestions.length)
    : currentQuestionIndex / mandatoryQuestions.length;

  const handleSelfNominationNext = (data) => {
    setFormData(data);
    setStep('questions');
  };

  const handleOtherNominationNext = (data) => {
    setFormData(data);
    if (data.hasChosenInfoOption && !data.wantsToAddInfo) {
      setStep('confirmation');
    } else {
      setStep('questions');
    }
  };

  const handleAnswer = (field, value) => {
    if (!currentQuestion) return;
    
    const questionSet = showingOptional ? 'optional' : 'mandatory';
    const newAnswers = {...answers};
    
    if (!newAnswers[questionSet][currentQuestionIndex]) {
      newAnswers[questionSet][currentQuestionIndex] = {};
    }
    
    newAnswers[questionSet][currentQuestionIndex] = {
      ...newAnswers[questionSet][currentQuestionIndex],
      topic: currentQuestion.topic,
      question: currentQuestion.question,
      [field]: value
    };
    
    setAnswers(newAnswers);
  };

  const isCurrentQuestionComplete = () => {
    if (!showingOptional) {  // Only check for mandatory questions
      const currentAnswer = answers.mandatory[currentQuestionIndex] || {};
      return (
        currentAnswer.situation?.trim() &&
        currentAnswer.behavior?.trim() &&
        currentAnswer.impact?.trim()
      );
    }
    return true;  // Optional questions can be skipped
  };

  const handleNext = () => {
    if (!isCurrentQuestionComplete()) {
      alert('Please complete all sections (Situation, Behavior, and Impact) before proceeding.');
      return;
    }

    const maxQuestions = showingOptional 
      ? optionalQuestions.length 
      : mandatoryQuestions.length;
      
    if (currentQuestionIndex < maxQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Scroll to top of modal body
      if (modalBodyRef.current) {
        modalBodyRef.current.scrollTop = 0;
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Scroll to top of modal body
      if (modalBodyRef.current) {
        modalBodyRef.current.scrollTop = 0;
      }
    }
  };

  const handleOptionalQuestions = () => {
    setShowingOptional(true);
    setCurrentQuestionIndex(0);
  };

  const handleSubmit = async () => {
    if (!isNominationPeriodActive()) {
      toast.error('Nomination period has ended');
      return;
    }
    // Skip validation if nominating someone else and they chose not to provide additional info
    const skipValidation = nominationType === 'other' && formData.hasChosenInfoOption && !formData.wantsToAddInfo;

    // Check if all mandatory questions are complete
    if (!showingOptional && !skipValidation) {
      const allMandatoryComplete = mandatoryQuestions.every((_, index) => {
        const answer = answers.mandatory[index] || {};
        return (
          answer.situation?.trim() &&
          answer.behavior?.trim() &&
          answer.impact?.trim()
        );
      });

      if (!allMandatoryComplete) {
        alert('Please complete all mandatory questions before submitting.');
        return;
      }
    }

    try {
      const nominationData = {
        ...formData,
        answers: skipValidation ? { skipped: true } : answers,
        nominationType
      };
      
      await saveNomination(nominationData, currentUser.uid);
      setShowSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting nomination:', error);
      alert(error.message || 'Error submitting nomination. Please try again.');
    }
  };

  const renderStep = () => {
    if (showSuccess) {
      return (
        <SuccessMessage>
          <h3>✓ Nomination Submitted Successfully!</h3>
          <p>Thank you for your nomination. You will be redirected shortly.</p>
        </SuccessMessage>
      );
    }

    switch (step) {
      case 'initial':
        return (
          <NominationChoices>
            <ChoiceButton onClick={() => {
              setStep('self');
              setNominationType('self');
            }}>
              Nominate Self
              <span>Nominate yourself for an award category</span>
            </ChoiceButton>
            <ChoiceButton onClick={() => {
              setStep('other');
              setNominationType('other');
            }}>
              Nominate Someone Else
              <span>Nominate a colleague or professional</span>
            </ChoiceButton>
          </NominationChoices>
        );
      case 'self':
        return <SelfNominationForm onNext={handleSelfNominationNext} currentUser={currentUser} />;
      case 'other':
        return <NominateOtherForm onNext={handleOtherNominationNext} currentUser={currentUser} />;
      case 'questions':
        if (!category || !questions) {
          return <div>Loading questions...</div>;
        }

        if (!currentQuestion) {
          return <div>No questions available for this category.</div>;
        }

        return (
          <QuestionSection>
            <ProgressBar $progress={progress} />
            <ProgressText>
              {showingOptional ? 'Optional Questions' : 'Mandatory Questions'} - 
              Question {currentQuestionIndex + 1} of {showingOptional ? optionalQuestions.length : mandatoryQuestions.length}
            </ProgressText>

            <QuestionType $type={showingOptional ? 'optional' : 'mandatory'}>
              {showingOptional ? 'OPTIONAL' : 'MANDATORY'}
            </QuestionType>

            <QuestionHeader>
              <QuestionTopic>{currentQuestion.topic}</QuestionTopic>
              <QuestionText>{currentQuestion.question}</QuestionText>
            </QuestionHeader>
            
            <AnswerSection>
              <AnswerBlock>
                <AnswerLabel $icon="🎯">Situation</AnswerLabel>
                <TextArea
                  placeholder={currentQuestion.prompt.situation}
                  value={answers[showingOptional ? 'optional' : 'mandatory'][currentQuestionIndex]?.situation || ''}
                  onChange={(e) => handleAnswer('situation', e.target.value)}
                  maxLength={500}
                />
              </AnswerBlock>

              <AnswerBlock>
                <AnswerLabel $icon="⚡">Behavior</AnswerLabel>
                <TextArea
                  placeholder={currentQuestion.prompt.behavior}
                  value={answers[showingOptional ? 'optional' : 'mandatory'][currentQuestionIndex]?.behavior || ''}
                  onChange={(e) => handleAnswer('behavior', e.target.value)}
                  maxLength={500}
                />
              </AnswerBlock>

              <AnswerBlock>
                <AnswerLabel $icon="🎉">Impact</AnswerLabel>
                <TextArea
                  placeholder={currentQuestion.prompt.impact}
                  value={answers[showingOptional ? 'optional' : 'mandatory'][currentQuestionIndex]?.impact || ''}
                  onChange={(e) => handleAnswer('impact', e.target.value)}
                  maxLength={500}
                />
              </AnswerBlock>
            </AnswerSection>

            <ButtonContainer>
              {currentQuestionIndex > 0 && (
                <OptionalButton onClick={handleBack}>
                  Back
                </OptionalButton>
              )}
              
              {currentQuestionIndex < mandatoryQuestions.length - 1 ? (
                <SubmitButton onClick={handleNext}>
                  Next Question
                </SubmitButton>
              ) : (
                <>
                  {!showingOptional && (
                    <>
                      <SubmitButton onClick={handleSubmit}>
                        Submit Nomination
                      </SubmitButton>
                      {hasOptionalQuestions(category) && (
                        <OptionalButton onClick={handleOptionalQuestions}>
                          Answer Optional Questions
                        </OptionalButton>
                      )}
                    </>
                  )}
                  {showingOptional && (
                    <SubmitButton onClick={handleSubmit}>
                      Submit With Optional Answers
                    </SubmitButton>
                  )}
                </>
              )}
            </ButtonContainer>
          </QuestionSection>
        );
      case 'confirmation':
        return (
          <ConfirmationPage 
            formData={formData}
            nominationType={nominationType}
            onSubmit={handleSubmit} 
          />
        );
      default:
        return null;
    }
  };

  // Add this helper function to check if category has optional questions
  const hasOptionalQuestions = (category) => {
    const noOptionalQuestionsCategories = [
      "Best Referral Champion",
      "Best DEI Advocate",
      "Best Employer Branding Champion",
      "Candidate Experience & Ops Pro"
    ];
    return !noOptionalQuestionsCategories.includes(category);
  };

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent>
        <ModalHeader>
          <Title>
            {step === 'initial' ? 'Nomination Type' :
             step === 'self' ? 'Self Nomination' :
             step === 'other' ? 'Nominate Someone Else' :
             step === 'questions' ? (nominationType === 'other' ? 'Additional Information' : 'Category Questions') :
             'Confirm Submission'}
          </Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <ModalBody ref={modalBodyRef}>
          {renderStep()}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
}; 