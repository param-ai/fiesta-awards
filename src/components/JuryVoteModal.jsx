import { useState } from 'react';
import styled from 'styled-components';

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

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const ModalContent = styled.div`
  background: #1a1a1a;
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 100%;
  }
`

const Title = styled.h2`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 400;
`

const SliderContainer = styled.div`
  margin: 2rem 0;
`

const Slider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffd54f;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`

const Points = styled.div`
  text-align: center;
  font-size: 2rem;
  color: white;
  margin: 1rem 0;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    padding: 0.875rem;
    font-size: 0.95rem;
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
  
  &:hover {
    color: white;
  }
`

export const JuryVoteModal = ({ onClose, onSubmit, nominationId, nomineeName }) => {
  const [points, setPoints] = useState(25); // Default to middle value

  const handleSubmit = () => {
    onSubmit(nominationId, points);
    onClose();
  };

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Jury Vote for {nomineeName}</Title>
        
        <SliderContainer>
          <Slider
            type="range"
            min="0"
            max="50"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value))}
          />
        </SliderContainer>
        
        <Points>{points} points</Points>
        
        <SubmitButton onClick={handleSubmit}>
          Submit Vote
        </SubmitButton>
      </ModalContent>
    </ModalOverlay>
  );
}; 