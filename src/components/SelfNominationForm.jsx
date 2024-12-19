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

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`

const FormSection = styled.div`
  margin-bottom: 1.5rem;
`

const SectionTitle = styled.h3`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1rem;
`

const categories = [
  'Best Tech Recruiter',
  'Best GTM/ Business Recruiter',
  'Best Leadership Recruiter',
  'Top TA Leader',
  'Best Candidate Experience Specialist',
  'Best Employer Branding Champion',
  'Best DEI Advocate',
  'Best Referral Champion',
  'Lifetime Achievement Award'
];

export const SelfNominationForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedinUrl: '',
    phone: '',
    company: '',
    jobTitle: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormSection>
        <SectionTitle>Basic Information</SectionTitle>
        <FormGroup>
          <Label>Full Name</Label>
          <Input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Enter your full name"
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="Enter your email address"
          />
        </FormGroup>

        <FormGroup>
          <Label>LinkedIn URL</Label>
          <Input
            required
            type="url"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
            placeholder="Enter your LinkedIn profile URL"
          />
        </FormGroup>

        <FormGroup>
          <Label>Phone Number</Label>
          <Input
            required
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="Enter your phone number"
          />
        </FormGroup>

        <FormGroup>
          <Label>Current Company</Label>
          <Input
            required
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            placeholder="Enter your current company name"
          />
        </FormGroup>

        <FormGroup>
          <Label>Job Title</Label>
          <Input
            required
            type="text"
            value={formData.jobTitle}
            onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
            placeholder="Enter your job title"
          />
        </FormGroup>
      </FormSection>

      <FormSection>
        <SectionTitle>Category Selection</SectionTitle>
        <FormGroup>
          <Label>Award Category</Label>
          <Select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
        </FormGroup>
      </FormSection>

      <Button type="submit">Next</Button>
    </Form>
  );
}; 