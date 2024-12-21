import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Text = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  font-size: 0.9rem;
`

const CheckboxGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  
  label {
    font-size: 0.9rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.7);
  }
`

const Checkbox = styled.input`
  margin-top: 0.3rem;
  cursor: pointer;
`

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover {
    background: ${props => props.disabled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.15)'};
    border-color: ${props => props.disabled ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.3)'};
  }
`

export const ConfirmationPage = ({ onSubmit, formData, nominationType }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <Container>
      <Text>
        Please review your nomination details carefully before submitting.
      </Text>
      {nominationType === 'other' && !formData.answers?.skipped && (
        <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Thank you for providing additional information about the nominee.
        </Text>
      )}
      
      <CheckboxGroup>
        <Checkbox
          type="checkbox"
          id="terms"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <label htmlFor="terms">
          I confirm that all information provided in this nomination form is accurate and that I am authorized to share these details. 
          By submitting this form, I agree to allow {nominationType === 'self' ? 'my' : 'the nominee\'s'} name, designation, and achievements to be used in materials related to the FiesTA Recruitment Awards.
        </label>
      </CheckboxGroup>

      <Button 
        disabled={!agreed}
        onClick={agreed ? onSubmit : undefined}
      >
        Submit Nomination
      </Button>
    </Container>
  );
}; 