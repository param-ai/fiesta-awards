import { useState } from 'react';
import styled from 'styled-components';
import { SelfNominationForm } from './SelfNominationForm';
import { CategoryQuestions } from './CategoryQuestions';
import { ConfirmationPage } from './ConfirmationPage';
import { NominateOtherForm } from './NominateOtherForm';
import { saveNomination } from '../services/nominationService';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have auth context

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
    padding: 0;
    align-items: flex-end;
  }
`

const ModalContent = styled.div`
  background: #1a1a1a;
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 2rem;

  @media (max-width: 768px) {
    max-height: 95vh;
    padding: 1.5rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
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
  gap: 0.375rem;
`

const Label = styled.label`
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
`

const Input = styled.input`
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
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  min-height: 80px;
  max-height: 150px;
  resize: vertical;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
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

export const NominationModal = ({ onClose }) => {
  const [step, setStep] = useState('initial');
  const [formData, setFormData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [nominationType, setNominationType] = useState(null); // 'self' or 'other'
  const { currentUser } = useAuth();

  const handleSelfNominationNext = (data) => {
    setFormData(data);
    setStep('questions'); // Always go to questions for self nominations
  };

  const handleOtherNominationNext = (data) => {
    setFormData(data);
    if (data.hasChosenInfoOption && !data.wantsToAddInfo) {
      setStep('confirmation');
    } else {
      setStep('questions');
    }
  };

  const handleQuestionsNext = (answers) => {
    setFormData(prev => ({
      ...prev,
      answers
    }));
    setStep('confirmation');
  };

  const handleSubmit = async () => {
    try {
      const nominationData = {
        ...formData,
        nominationType: nominationType
      };
      
      await saveNomination(nominationData, currentUser.uid);
      setShowSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting nomination:', error);
      // Add error handling UI feedback here
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
        return <SelfNominationForm onNext={handleSelfNominationNext} />;
      case 'other':
        return <NominateOtherForm onNext={handleOtherNominationNext} />;
      case 'questions':
        return (
          <CategoryQuestions 
            category={nominationType === 'self' ? formData.category : formData.nominee.category}
            onNext={handleQuestionsNext}
            isOptional={nominationType === 'other'}
          />
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
        
        <ModalBody>
          {renderStep()}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
}; 