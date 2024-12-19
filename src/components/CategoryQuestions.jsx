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

const RangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const RangeInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
  }
`

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
  padding: 0 2px;
`

const RatingValue = styled.span`
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  button {
    flex: 1;
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

  &:first-child {
    background: transparent;
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  }
`

const Text = styled.p`
  color: white;
  font-size: 0.9rem;
`

const categoryQuestions = {
  'Best Tech Recruiter': {
    numeric: [
      'How many tech hires did you make in the last 12 months?',
      'What was your average time-to-fill for tech positions (in days)?'
    ],
    range: [
      'Rate your technical understanding (1-10)',
      'How would you rate your relationship with hiring managers? (1-10)'
    ],
    text: [
      'Describe your most challenging tech hire and how you closed it',
      'What innovative sourcing strategies do you use for tech talent?'
    ]
  },
  'Best GTM/ Business Recruiter': {
    numeric: [
      'How many business hires did you make in the last 12 months?',
      'What was your average time-to-fill for business positions (in days)?'
    ],
    range: [
      'Rate your understanding of business functions (1-10)',
      'How would you rate your candidate engagement? (1-10)'
    ],
    text: [
      'Share a success story of a critical business hire',
      'What strategies do you use to assess business acumen?'
    ]
  },
  'Best Leadership Recruiter': {
    numeric: [
      'How many leadership positions did you fill in the last 12 months?',
      'What was your average time-to-fill for leadership roles (in days)?'
    ],
    range: [
      'Rate your executive assessment capabilities (1-10)',
      'How would you rate your network strength? (1-10)'
    ],
    text: [
      'Describe a challenging leadership hire and how you closed it',
      'What methods do you use to assess leadership potential?'
    ]
  },
  'Top TA Leader': {
    numeric: [
      'Size of the team you lead',
      'Number of hires your team made in the last 12 months'
    ],
    range: [
      'Team satisfaction score (1-10)',
      'Hiring manager satisfaction score (1-10)'
    ],
    text: [
      'Describe a major TA transformation you led',
      'What innovative practices have you implemented?'
    ]
  },
  'Best Candidate Experience Specialist': {
    numeric: [
      'Average candidate satisfaction score',
      'Number of candidates handled monthly'
    ],
    range: [
      'Candidate feedback score (1-10)',
      'Process efficiency rating (1-10)'
    ],
    text: [
      'Share an example of how you improved candidate experience',
      'What tools/methods do you use to enhance candidate journey?'
    ]
  },
  'Best Employer Branding Champion': {
    numeric: [
      'Social media engagement growth (%)',
      'Number of employer branding campaigns led'
    ],
    range: [
      'Brand awareness impact (1-10)',
      'Content effectiveness rating (1-10)'
    ],
    text: [
      'Describe your most successful branding campaign',
      'How do you measure employer branding success?'
    ]
  },
  'Best DEI Advocate': {
    numeric: [
      'Diversity hiring percentage improvement',
      'Number of DEI initiatives led'
    ],
    range: [
      'DEI program effectiveness (1-10)',
      'Inclusion index improvement (1-10)'
    ],
    text: [
      'Share a successful DEI initiative you implemented',
      'How do you ensure inclusive hiring practices?'
    ]
  },
  'Best Referral Champion': {
    numeric: [
      'Number of successful referral hires',
      'Referral program conversion rate (%)'
    ],
    range: [
      'Program engagement score (1-10)',
      'Quality of referral hires (1-10)'
    ],
    text: [
      'Describe how you built/improved the referral program',
      'What makes your referral program unique?'
    ]
  },
  'Lifetime Achievement Award': {
    numeric: [
      'Years of experience in recruitment',
      'Total number of people hired in career'
    ],
    range: [
      'Industry impact rating (1-10)',
      'Innovation contribution (1-10)'
    ],
    text: [
      'Share your most significant contribution to the recruitment industry',
      'What legacy do you want to leave in recruitment?'
    ]
  }
};

export const CategoryQuestions = ({ category, onNext, isOptional = false }) => {
  const [answers, setAnswers] = useState({
    numeric1: '',
    numeric2: '',
    range1: 5,
    range2: 5,
    text1: '',
    text2: ''
  });

  // Get questions for the selected category
  const questions = categoryQuestions[category];

  // If no category is selected or questions not found, show message
  if (!category || !questions) {
    return <div>Please select a category first</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const answersWithQuestions = {
      ...answers,
      questions: {
        numeric: questions.numeric,
        range: questions.range,
        text: questions.text
      }
    };
    onNext(answersWithQuestions);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>
        Category: {category}
      </h3>

      {questions.numeric.map((question, index) => (
        <FormGroup key={`numeric${index + 1}`}>
          <Label>{question}</Label>
          <Input
            type="number"
            required={!isOptional}
            value={answers[`numeric${index + 1}`]}
            onChange={(e) => setAnswers({...answers, [`numeric${index + 1}`]: e.target.value})}
            placeholder="Enter a number"
          />
        </FormGroup>
      ))}

      {questions.range.map((question, index) => (
        <FormGroup key={`range${index + 1}`}>
          <Label>{question}</Label>
          <RangeWrapper>
            <RangeInput
              type="range"
              min="1"
              max="10"
              required={!isOptional}
              value={answers[`range${index + 1}`]}
              onChange={(e) => setAnswers({...answers, [`range${index + 1}`]: e.target.value})}
            />
            <RangeLabels>
              <span>1</span>
              <RatingValue>Selected: {answers[`range${index + 1}`]}</RatingValue>
              <span>10</span>
            </RangeLabels>
          </RangeWrapper>
        </FormGroup>
      ))}

      {questions.text.map((question, index) => (
        <FormGroup key={`text${index + 1}`}>
          <Label>{question}</Label>
          <TextArea
            required={!isOptional}
            value={answers[`text${index + 1}`]}
            onChange={(e) => setAnswers({...answers, [`text${index + 1}`]: e.target.value})}
            placeholder="Enter your answer here..."
          />
        </FormGroup>
      ))}

      <Button type="submit">
        {isOptional ? 'Submit Additional Information' : 'Submit Nomination'}
      </Button>
    </Form>
  );
}; 