import { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  color: white;
  font-size: 0.9rem;
`

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }
`

const Select = styled.select`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }

  option {
    background: #1a1a1a;
  }
`

const TextArea = styled.textarea`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }
`

const Button = styled.button`
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &[type="button"] {
    background: ${props => props.primary ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  }
`

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`

const StepDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.2)'};
  transition: background 0.3s ease;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.5rem;

  button {
    flex: 1;
    white-space: nowrap;
  }
`

const relationships = [
  'I work/worked with this person in the same department',
  'I work/worked with this person in a different department',
  'I am this person\'s manager',
  'I am a stakeholder who has worked with this person',
  'I work/worked with this nominee as a candidate/job seeker',
  'Other (Please specify)'
];

const categories = [
  'Best Tech Recruiter',
  'Best GTM/ Business Recruiter',
  'Best Leadership Recruiter',
  'Top TA Leader',
  'Candidate Experience & Ops Pro',
  'Best Employer Branding Champion',
  'Best DEI Advocate',
  'Best Referral Champion'
];

export const NominateOtherForm = ({ onNext, currentUser }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nominator: {
      name: currentUser?.displayName || '',
      email: currentUser?.email || '',
      linkedinUrl: '',
      phone: '',
      company: '',
      jobTitle: ''
    },
    relationship: '',
    otherRelationship: '',
    nominee: {
      name: '',
      email: '',
      linkedinUrl: '',
      phone: '',
      company: '',
      jobTitle: '',
      category: ''
    },
    recommendation: '',
    wantsToAddInfo: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else if (formData.nominee.category && !formData.hasChosenInfoOption) {
      setFormData(prev => ({ ...prev, hasChosenInfoOption: true }));
    } else {
      onNext(formData);
    }
  };

  const renderNominatorForm = () => (
    <>
      <h3 style={{ color: 'white', marginBottom: '1rem' }}>Your Information</h3>
      <FormGroup>
        <Label>Full Name</Label>
        <Input
          required
          type="text"
          value={formData.nominator.name}
          onChange={(e) => setFormData({
            ...formData,
            nominator: { ...formData.nominator, name: e.target.value }
          })}
          placeholder="Enter your full name"
          readOnly
          style={{ opacity: 0.7, cursor: 'not-allowed' }}
        />
      </FormGroup>

      <FormGroup>
        <Label>Email</Label>
        <Input
          required
          type="email"
          value={formData.nominator.email}
          onChange={(e) => setFormData({
            ...formData,
            nominator: { ...formData.nominator, email: e.target.value }
          })}
          placeholder="Enter your email address"
          readOnly
          style={{ opacity: 0.7, cursor: 'not-allowed' }}
        />
      </FormGroup>

      <FormGroup>
        <Label>LinkedIn URL</Label>
        <Input
          required
          type="url"
          value={formData.nominator.linkedinUrl}
          onChange={(e) => setFormData({
            ...formData,
            nominator: { ...formData.nominator, linkedinUrl: e.target.value }
          })}
          placeholder="Enter your LinkedIn profile URL"
        />
      </FormGroup>

      <FormGroup>
        <Label>Phone Number</Label>
        <Input
          required
          type="tel"
          value={formData.nominator.phone}
          onChange={(e) => setFormData({
            ...formData,
            nominator: { ...formData.nominator, phone: e.target.value }
          })}
          placeholder="Enter your phone number"
        />
      </FormGroup>

      <FormGroup>
        <Label>Current Company</Label>
        <Input
          required
          type="text"
          value={formData.nominator.company}
          onChange={(e) => setFormData({
            ...formData,
            nominator: { ...formData.nominator, company: e.target.value }
          })}
          placeholder="Enter your current company name"
        />
      </FormGroup>

      <FormGroup>
        <Label>Job Title</Label>
        <Input
          required
          type="text"
          value={formData.nominator.jobTitle}
          onChange={(e) => setFormData({
            ...formData,
            nominator: { ...formData.nominator, jobTitle: e.target.value }
          })}
          placeholder="Enter your job title"
        />
      </FormGroup>
    </>
  );

  const renderRelationshipForm = () => (
    <>
      <h3 style={{ color: 'white', marginBottom: '1rem' }}>Your Relationship with the Nominee</h3>
      <FormGroup>
        <Label>Relationship</Label>
        <Select
          required
          value={formData.relationship}
          onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
        >
          <option value="">Select your relationship</option>
          {relationships.map(rel => (
            <option key={rel} value={rel}>{rel}</option>
          ))}
        </Select>
      </FormGroup>
      {formData.relationship === 'Other (Please specify)' && (
        <FormGroup>
          <Label>Please specify your relationship</Label>
          <TextArea
            required
            value={formData.otherRelationship}
            onChange={(e) => setFormData({ ...formData, otherRelationship: e.target.value })}
            placeholder="Describe your relationship with the nominee"
          />
        </FormGroup>
      )}
    </>
  );

  const renderNomineeForm = () => (
    <>
      <h3 style={{ color: 'white', marginBottom: '1rem' }}>Nominee Information</h3>
      <FormGroup>
        <Label>Nominee's Full Name</Label>
        <Input
          required
          type="text"
          value={formData.nominee.name}
          onChange={(e) => setFormData({
            ...formData,
            nominee: { ...formData.nominee, name: e.target.value }
          })}
          placeholder="Enter nominee's full name"
        />
      </FormGroup>

      <FormGroup>
        <Label>Nominee's Email</Label>
        <Input
          required
          type="email"
          value={formData.nominee.email}
          onChange={(e) => setFormData({
            ...formData,
            nominee: { ...formData.nominee, email: e.target.value }
          })}
          placeholder="Enter nominee's email address"
        />
      </FormGroup>

      <FormGroup>
        <Label>Nominee's LinkedIn URL</Label>
        <Input
          required
          type="url"
          value={formData.nominee.linkedinUrl}
          onChange={(e) => setFormData({
            ...formData,
            nominee: { ...formData.nominee, linkedinUrl: e.target.value }
          })}
          placeholder="Enter nominee's LinkedIn profile URL"
        />
      </FormGroup>

      <FormGroup>
        <Label>Nominee's Phone Number</Label>
        <Input
          required
          type="tel"
          value={formData.nominee.phone}
          onChange={(e) => setFormData({
            ...formData,
            nominee: { ...formData.nominee, phone: e.target.value }
          })}
          placeholder="Enter nominee's phone number"
        />
      </FormGroup>

      <FormGroup>
        <Label>Nominee's Current Company</Label>
        <Input
          required
          type="text"
          value={formData.nominee.company}
          onChange={(e) => setFormData({
            ...formData,
            nominee: { ...formData.nominee, company: e.target.value }
          })}
          placeholder="Enter nominee's current company name"
        />
      </FormGroup>

      <FormGroup>
        <Label>Nominee's Job Title</Label>
        <Input
          required
          type="text"
          value={formData.nominee.jobTitle}
          onChange={(e) => setFormData({
            ...formData,
            nominee: { ...formData.nominee, jobTitle: e.target.value }
          })}
          placeholder="Enter nominee's job title"
        />
      </FormGroup>

      <FormGroup>
        <Label>Category</Label>
        <Select
          required
          value={formData.nominee.category}
          onChange={(e) => setFormData({
            ...formData,
            nominee: { ...formData.nominee, category: e.target.value }
          })}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </Select>
      </FormGroup>

      {formData.nominee.category && (
        <>
          <FormGroup>
            <Label>Why are you nominating this candidate?</Label>
            <TextArea
              required
              value={formData.recommendation}
              onChange={(e) => setFormData({
                ...formData,
                recommendation: e.target.value
              })}
              placeholder="Please provide your reasons for nominating this candidate..."
              style={{ minHeight: '100px' }}
            />
          </FormGroup>

          {formData.recommendation && (
            <Button 
              type="button"
              onClick={() => onNext({
                ...formData,
                wantsToAddInfo: false,
                hasChosenInfoOption: true
              })}
            >
              Continue to Submit
            </Button>
          )}
        </>
      )}
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <StepIndicator>
        <StepDot $active={step === 1} />
        <StepDot $active={step === 2} />
        <StepDot $active={step === 3} />
      </StepIndicator>
      
      {step === 1 && renderNominatorForm()}
      {step === 2 && renderRelationshipForm()}
      {step === 3 && renderNomineeForm()}

      {(!formData.nominee.category || !formData.recommendation || formData.hasChosenInfoOption) && (
        <Button type="submit">
          {step === 3 ? 'Continue' : 'Next'}
        </Button>
      )}
    </Form>
  );
}; 