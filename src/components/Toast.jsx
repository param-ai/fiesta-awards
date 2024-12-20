import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(76, 175, 80, 0.9);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  z-index: 1000;
  animation: ${props => props.$hiding ? slideOut : slideIn} 0.3s ease forwards;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '🎉';
  }
`;

export const Toast = ({ message, hiding }) => (
  <ToastContainer $hiding={hiding}>
    {message}
  </ToastContainer>
); 