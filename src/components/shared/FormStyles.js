import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const Label = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem;
  font-weight: 500;
`

export const Input = styled.input`
  padding: 0.625rem 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`

export const Button = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
  }
` 