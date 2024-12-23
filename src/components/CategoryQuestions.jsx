import { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1.25rem;
  }
`

const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
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

  @media (max-width: 768px) {
    min-height: 100px;
    padding: 0.875rem;
    font-size: 16px; // Prevents iOS zoom
  }
`

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1.25rem;
  }
`

const Button = styled.button`
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  background: white;
  color: black;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.75rem 1.25rem;
  }
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

const Text = styled.div`
  color: white;
  font-size: 0.9rem;
`

export const categoryQuestions = {
  'Best Tech Recruiter': {
    mandatory: [
      {
        topic: 'Sourcing Strategies',
        question: 'Give a specific example of a hard-to-fill role you successfully closed. Highlight the sourcing methods you used, how you engaged the candidate, and why your approach worked',
        prompt: {
          situation: 'What made the role challenging to fill (e.g., niche skills, location constraints, compensation)?',
          behavior: 'What innovative sourcing strategies or tools did you use to find and engage candidates?',
          impact: 'What was the result (e.g., time-to-hire, quality of hire, feedback from hiring managers)?'
        }
      },
      {
        topic: 'Screening and Assessment',
        question: 'Describe a time when you had to deeply assess a candidates technical/strategic/leadership skills for a role. How did you ensure the candidate met the roles requirements and aligned with the companys culture?',
        prompt: {
          situation: 'What was unique about the role or candidate?',
          behavior: 'What methods (e.g., structured interviews, behavioral assessments, competency-based screening) did you use to evaluate them?',
          impact: 'How did your assessment contribute to hiring success (e.g., reduced rejection rates, manager satisfaction, retention)?'
        }
      },
      {
        topic: 'Role Calibration and Stakeholder Collaboration',
        question: 'Share an example of when you successfully recalibrated a role with a hiring manager after initial misalignment. How did you achieve clarity and drive results?',
        prompt: {
          situation: 'What was the misalignment (e.g., unrealistic expectations, vague role definition)?',
          behavior: 'How did you facilitate discussions, gather data, or influence the process to refine the role?',
          impact: 'What were the measurable results (e.g., reduced time-to-hire, better candidate alignment)?'
        }
      },
      {
        topic: 'Recruitment Metrics and Process Optimization',
        question: 'Describe a time you analyzed recruitment data to address a bottleneck or improve the hiring process. What insights did you uncover, and how did you act on them?',
        prompt: {
          situation: 'What metrics or data signaled a problem (e.g., drop-off rates, slow time-to-fill)?',
          behavior: 'How did you identify the root cause and implement changes?',
          impact: 'What measurable improvements did you achieve (e.g., process efficiency, candidate experience, offer acceptance rates)?'
        }
      },
      {
        topic: 'Candidate Engagement and Relationship Management',
        question: 'Describe a time when you kept a high-potential candidate engaged during a prolonged hiring process. What steps did you take, and what was the outcome?',
        prompt: {
          situation: 'Why was the process delayed or extended?',
          behavior: 'How did you maintain communication and interest during this period?',
          impact: 'How did this affect the candidates experience and hiring outcome?'
        }
      }
    ],
    optional: [
      {
        topic: 'Employer Value Proposition',
        question: 'Give an example of how you effectively positioned the companys value proposition to close a candidate. What messaging worked, and why?',
        prompt: {
          situation: 'What made the candidate hesitant or the role competitive?',
          behavior: 'How did you tailor the EVP and communicate it during the process?',
          impact: 'How did this influence the candidates decision and result in a hire?'
        }
      },
      {
        topic: 'Negotiation and Closing',
        question: 'Share a specific example of a challenging negotiation with a candidate. How did you balance the candidates needs with business requirements and successfully close the offer?',
        prompt: {
          situation: 'What made the negotiation difficult (e.g., competing offers, compensation mismatch)?',
          behavior: 'How did you approach and resolve the challenges (e.g., data, storytelling, creative solutions)?',
          impact: 'What was the outcome, and how did it affect the hire or the relationship with the candidate?'
        }
      },
      {
        topic: 'Diversity and Inclusion',
        question: 'Share a specific example of a diversity hiring initiative you led. How did you ensure equitable outcomes and build a diverse pipeline?',
        prompt: {
          situation: 'What was the goal or challenge in diversity hiring?',
          behavior: 'What strategies, tools, or practices did you implement to achieve diversity goals?',
          impact: 'What measurable results or changes did you achieve (e.g., increased diversity in hires, reduced bias in the process)?'
        }
      },
      {
        topic: 'Market and Industry Intelligence',
        question: 'Describe a time when you used market intelligence to influence a hiring strategy. What insights did you provide, and how did it shape the outcome?',
        prompt: {
          situation: 'What industry trend or data point was relevant?',
          behavior: 'How did you gather, analyze, and present this information to stakeholders?',
          impact: 'How did it affect the hiring process or decision-making?'
        }
      },
      {
        topic: 'Technical Role Deep Dive',
        question: 'Share an example of a technical role you successfully filled that required deep collaboration with engineering teams. What challenges did you face, and how did you overcome them?',
        prompt: {
          situation: 'What made this role technically complex or unique?',
          behavior: 'How did you partner with engineers to refine requirements or screen candidates?',
          impact: 'What was the measurable success (e.g., hire quality, team satisfaction)?'
        }
      }
    ]
  },
  'Best GTM/ Business Recruiter': {
    mandatory: [
      {
        topic: 'Sourcing Strategies',
        question: 'Give a specific example of a hard-to-fill role you successfully closed. Highlight the sourcing methods you used, how you engaged the candidate, and why your approach worked',
        prompt: {
          situation: 'What made the role challenging to fill (e.g., niche skills, location constraints, compensation)?',
          behavior: 'What innovative sourcing strategies or tools did you use to find and engage candidates?',
          impact: 'What was the result (e.g., time-to-hire, quality of hire, feedback from hiring managers)?'
        }
      },
      {
        topic: 'Screening and Assessment',
        question: 'Describe a time when you had to deeply assess a candidates technical/strategic/leadership skills for a role. How did you ensure the candidate met the roles requirements and aligned with the companys culture?',
        prompt: {
          situation: 'What was unique about the role or candidate?',
          behavior: 'What methods (e.g., structured interviews, behavioral assessments, competency-based screening) did you use to evaluate them?',
          impact: 'How did your assessment contribute to hiring success (e.g., reduced rejection rates, manager satisfaction, retention)?'
        }
      },
      {
        topic: 'Role Calibration and Stakeholder Collaboration',
        question: 'Share an example of when you successfully recalibrated a role with a hiring manager after initial misalignment. How did you achieve clarity and drive results?',
        prompt: {
          situation: 'What was the misalignment (e.g., unrealistic expectations, vague role definition)?',
          behavior: 'How did you facilitate discussions, gather data, or influence the process to refine the role?',
          impact: 'What were the measurable results (e.g., reduced time-to-hire, better candidate alignment)?'
        }
      },
      {
        topic: 'Recruitment Metrics and Process Optimization',
        question: 'Describe a time you analyzed recruitment data to address a bottleneck or improve the hiring process. What insights did you uncover, and how did you act on them?',
        prompt: {
          situation: 'What metrics or data signaled a problem (e.g., drop-off rates, slow time-to-fill)?',
          behavior: 'How did you identify the root cause and implement changes?',
          impact: 'What measurable improvements did you achieve (e.g., process efficiency, candidate experience, offer acceptance rates)?'
        }
      },
      {
        topic: 'Candidate Engagement and Relationship Management',
        question: 'Describe a time when you kept a high-potential candidate engaged during a prolonged hiring process. What steps did you take, and what was the outcome?',
        prompt: {
          situation: 'Why was the process delayed or extended?',
          behavior: 'How did you maintain communication and interest during this period?',
          impact: 'How did this affect the candidates experience and hiring outcome?'
        }
      }
    ],
    optional: [
      {
        topic: 'Employer Value Proposition',
        question: 'Give an example of how you effectively positioned the companys value proposition to close a candidate. What messaging worked, and why?',
        prompt: {
          situation: 'What made the candidate hesitant or the role competitive?',
          behavior: 'How did you tailor the EVP and communicate it during the process?',
          impact: 'How did this influence the candidates decision and result in a hire?'
        }
      },
      {
        topic: 'Negotiation and Closing',
        question: 'Share a specific example of a challenging negotiation with a candidate. How did you balance the candidates needs with business requirements and successfully close the offer?',
        prompt: {
          situation: 'What made the negotiation difficult (e.g., competing offers, compensation mismatch)?',
          behavior: 'How did you approach and resolve the challenges (e.g., data, storytelling, creative solutions)?',
          impact: 'What was the outcome, and how did it affect the hire or the relationship with the candidate?'
        }
      },
      {
        topic: 'Diversity and Inclusion',
        question: 'Share a specific example of a diversity hiring initiative you led. How did you ensure equitable outcomes and build a diverse pipeline?',
        prompt: {
          situation: 'What was the goal or challenge in diversity hiring?',
          behavior: 'What strategies, tools, or practices did you implement to achieve diversity goals?',
          impact: 'What measurable results or changes did you achieve (e.g., increased diversity in hires, reduced bias in the process)?'
        }
      },
      {
        topic: 'Market and Industry Intelligence',
        question: 'Describe a time when you used market intelligence to influence a hiring strategy. What insights did you provide, and how did it shape the outcome?',
        prompt: {
          situation: 'What industry trend or data point was relevant?',
          behavior: 'How did you gather, analyze, and present this information to stakeholders?',
          impact: 'How did it affect the hiring process or decision-making?'
        }
      },
      {
        topic: 'GTM Hiring Challenges',
        question: 'Describe a time when you filled a challenging GTM role (e.g., sales, marketing). How did you balance the candidates personality, skill set, and the teams performance goals?',
        prompt: {
          situation: 'What made the role or hire particularly challenging?',
          behavior: 'How did you screen for both skill and personality alignment?',
          impact: 'How did this hire contribute to team or revenue success?'
        }
      }
    ]
  },
  'Best Leadership Recruiter': {
    mandatory: [
      {
        topic: 'Sourcing Strategies',
        question: 'Give a specific example of a hard-to-fill role you successfully closed. Highlight the sourcing methods you used, how you engaged the candidate, and why your approach worked',
        prompt: {
          situation: 'What made the role challenging to fill (e.g., niche skills, location constraints, compensation)?',
          behavior: 'What innovative sourcing strategies or tools did you use to find and engage candidates?',
          impact: 'What was the result (e.g., time-to-hire, quality of hire, feedback from hiring managers)?'
        }
      },
      {
        topic: 'Screening and Assessment',
        question: 'Describe a time when you had to deeply assess a candidates technical/strategic/leadership skills for a role. How did you ensure the candidate met the roles requirements and aligned with the companys culture?',
        prompt: {
          situation: 'What was unique about the role or candidate?',
          behavior: 'What methods (e.g., structured interviews, behavioral assessments, competency-based screening) did you use to evaluate them?',
          impact: 'How did your assessment contribute to hiring success (e.g., reduced rejection rates, manager satisfaction, retention)?'
        }
      },
      {
        topic: 'Role Calibration and Stakeholder Collaboration',
        question: 'Share an example of when you successfully recalibrated a role with a hiring manager after initial misalignment. How did you achieve clarity and drive results?',
        prompt: {
          situation: 'What was the misalignment (e.g., unrealistic expectations, vague role definition)?',
          behavior: 'How did you facilitate discussions, gather data, or influence the process to refine the role?',
          impact: 'What were the measurable results (e.g., reduced time-to-hire, better candidate alignment)?'
        }
      },
      {
        topic: 'Recruitment Metrics and Process Optimization',
        question: 'Describe a time you analyzed recruitment data to address a bottleneck or improve the hiring process. What insights did you uncover, and how did you act on them?',
        prompt: {
          situation: 'What metrics or data signaled a problem (e.g., drop-off rates, slow time-to-fill)?',
          behavior: 'How did you identify the root cause and implement changes?',
          impact: 'What measurable improvements did you achieve (e.g., process efficiency, candidate experience, offer acceptance rates)?'
        }
      },
      {
        topic: 'Candidate Engagement and Relationship Management',
        question: 'Describe a time when you kept a high-potential candidate engaged during a prolonged hiring process. What steps did you take, and what was the outcome?',
        prompt: {
          situation: 'Why was the process delayed or extended?',
          behavior: 'How did you maintain communication and interest during this period?',
          impact: 'How did this affect the candidates experience and hiring outcome?'
        }
      }
    ],
    optional: [
      {
        topic: 'Employer Value Proposition',
        question: 'Give an example of how you effectively positioned the companys value proposition to close a candidate. What messaging worked, and why?',
        prompt: {
          situation: 'What made the candidate hesitant or the role competitive?',
          behavior: 'How did you tailor the EVP and communicate it during the process?',
          impact: 'How did this influence the candidates decision and result in a hire?'
        }
      },
      {
        topic: 'Negotiation and Closing',
        question: 'Share a specific example of a challenging negotiation with a candidate. How did you balance the candidates needs with business requirements and successfully close the offer?',
        prompt: {
          situation: 'What made the negotiation difficult (e.g., competing offers, compensation mismatch)?',
          behavior: 'How did you approach and resolve the challenges (e.g., data, storytelling, creative solutions)?',
          impact: 'What was the outcome, and how did it affect the hire or the relationship with the candidate?'
        }
      },
      {
        topic: 'Diversity and Inclusion',
        question: 'Share a specific example of a diversity hiring initiative you led. How did you ensure equitable outcomes and build a diverse pipeline?',
        prompt: {
          situation: 'What was the goal or challenge in diversity hiring?',
          behavior: 'What strategies, tools, or practices did you implement to achieve diversity goals?',
          impact: 'What measurable results or changes did you achieve (e.g., increased diversity in hires, reduced bias in the process)?'
        }
      },
      {
        topic: 'Market and Industry Intelligence',
        question: 'Describe a time when you used market intelligence to influence a hiring strategy. What insights did you provide, and how did it shape the outcome?',
        prompt: {
          situation: 'What industry trend or data point was relevant?',
          behavior: 'How did you gather, analyze, and present this information to stakeholders?',
          impact: 'How did it affect the hiring process or decision-making?'
        }
      },
      {
        topic: 'Leadership Candidate Vetting',
        question: 'Provide an example of how you thoroughly assessed and vetted a leadership candidate to ensure they were the right fit for the role and company. What specific methods did you use, and what was the outcome?',
        prompt: {
          situation: 'What was at stake in hiring this leader (e.g., organizational impact, executive team alignment)?',
          behavior: 'How did you evaluate both hard and soft skills (e.g., assessments, interviews, references)?',
          impact: 'What was the final decision, and how did the hire perform in the role?'
        }
      }
    ]
  },
  'Top TA Leader': {
    mandatory: [
      {
        topic: 'Strategic Workforce Planning',
        question: 'Describe a specific instance where you partnered with business leaders to align workforce planning with business objectives. Include details on how you forecasted hiring needs, built talent pipelines, and ensured readiness for future business demands',
        prompt: {
          situation: 'What business objective or challenge drove the need for workforce planning?',
          behavior: 'What steps did you take to forecast, plan, and align recruitment with these objectives?',
          impact: 'What measurable outcomes were achieved (e.g., reduced time-to-hire, strategic readiness for expansion)?'
        }
      },
      {
        topic: 'Data-Driven Decision Making',
        question: 'Provide a specific example of how you used data to adjust recruitment strategies or improve outcomes. Be sure to mention the KPIs you monitored and the insights you derived.',
        prompt: {
          situation: 'What recruitment challenge or goal were you addressing?',
          behavior: 'How did you collect and analyze data, and what actions did you take based on your findings?',
          impact: 'What measurable improvements or outcomes were achieved (e.g., time-to-fill, cost-per-hire, diversity metrics)?'
        }
      },
      {
        topic: 'Retention and Quality of Hire',
        question: 'What percentage of hires from the past year demonstrated high performance or were promoted? Share a specific example of how you achieved this, focusing on hiring strategies or post-hiring practices',
        prompt: {
          situation: 'What challenge or need drove your focus on retention and quality of hire?',
          behavior: 'What methods (e.g., competency-based hiring, onboarding practices, cultural alignment) did you employ?',
          impact: 'How did this translate into measurable results (e.g., turnover rates, performance metrics, promotion percentages)?'
        }
      },
      {
        topic: 'Employer Branding and Candidate Experience',
        question: 'Describe how you enhanced both the employer brand and the candidate experience in a single initiative. Highlight your strategy, execution, and measurable outcomes',
        prompt: {
          situation: 'What specific business challenge or gap prompted the need to improve both employer branding and candidate experience (e.g., low applications, poor feedback, weak brand perception)?',
          behavior: 'What strategies or actions did you take to integrate branding and candidate experience enhancements (e.g., campaigns, journey improvements, internal storytelling)?',
          impact: 'What measurable outcomes were achieved (e.g., improved brand perception, higher quality applications, better candidate feedback scores, increased offer acceptance rates)?'
        }
      },
      {
        topic: 'Technical Acumen',
        question: 'Provide an example of how you leveraged technology to streamline recruitment or improve outcomes',
        prompt: {
          situation: 'What inefficiency or problem were you solving with technology?',
          behavior: 'What specific tools, platforms, or technologies did you use, and how?',
          impact: 'What measurable efficiencies or improvements were achieved?'
        }
      },
      {
        topic: 'Business Acumen',
        question: 'Describe a time you used your understanding of the business to craft a recruitment strategy that achieved measurable results',
        prompt: {
          situation: 'What business goal or challenge were you addressing?',
          behavior: 'How did you align recruitment with business objectives?',
          impact: 'What measurable business outcomes were influenced by your strategy?'
        }
      },
      {
        topic: 'Onboarding Effectiveness',
        question: 'Share an example of how you designed or improved an onboarding program to enhance new hire productivity and satisfaction.',
        prompt: {
          situation: 'What challenge or feedback prompted onboarding improvements?',
          behavior: 'What specific onboarding strategies or tools did you implement?',
          impact: 'How was the programs success measured (e.g., feedback scores, time-to-productivity, retention)?'
        }
      },
      {
        topic: 'TA Organization Certifications',
        question: 'What certifications or programs did you lead, implement, or participate in to elevate the recruitment teams effectiveness?',
        prompt: {
          situation: 'What organizational need or gap drove the focus on certifications?',
          behavior: 'What steps did you take to acquire, implement, or integrate these certifications?',
          impact: 'How did these certifications improve recruitment effectiveness or stakeholder confidence?'
        }
      },
      {
        topic: 'Sustainability and Social Responsibility in Hiring',
        question: 'Describe a hiring initiative that incorporated sustainability or social responsibility. Be specific about its ethical or societal impact',
        prompt: {
          situation: 'What problem or opportunity drove the need for this initiative?',
          behavior: 'What actions or strategies did you implement to ensure sustainability or social responsibility?',
          impact: 'How did this initiative create measurable societal, ethical, or organizational benefits?'
        }
      },
      {
        topic: 'Stakeholder Management',
        question: 'Share an example of how you managed conflicting stakeholder priorities during a hiring project. Include details about how you maintained alignment and delivered results.',
        prompt: {
          situation: 'What was the conflict or challenge?',
          behavior: 'How did you communicate, negotiate, or collaborate with stakeholders?',
          impact: 'What was the outcome, and how were stakeholder expectations met or exceeded?'
        }
      }
    ],
    optional: [
    ]
  },
  'Best Employer Branding Champion': {
    mandatory: [
      {
        topic: 'Employer Value Proposition (EVP) Development',
        question: 'Describe a time when you developed or refined the Employer Value Proposition (EVP) for your organization. How did you ensure it aligned with both employee perceptions and market expectations?',
        prompt: {
          situation: 'What challenge or gap prompted the need to define or enhance the EVP?',
          behavior: 'What steps did you take to develop, validate, and communicate the EVP?',
          impact: 'How did the EVP influence key metrics (e.g., application volume, quality of hires, employee referrals)?'
        }
      },
      {
        topic: 'Social Media and Digital Campaign Success',
        question: 'Share a specific example of an employer branding campaign you led on social media or other digital platforms. What strategies did you use to engage the target audience and measure success?',
        prompt: {
          situation: 'What was the goal of the campaign (e.g., increasing applications, improving brand perception)?',
          behavior: 'What content, channels, or tools did you use to create impact?',
          impact: 'What were the measurable results (e.g., engagement rates, reach, conversions)?'
        }
      },
      {
        topic: 'Internal Ambassadors and Cultural Storytelling',
        question: 'Describe how you engaged internal employees to become brand ambassadors and tell authentic stories about your culture. What challenges did you face, and how did you overcome them?',
        prompt: {
          situation: 'What drove the need to involve employees in employer branding efforts?',
          behavior: 'How did you identify, empower, and enable employees to share their stories?',
          impact: 'What was the outcome in terms of candidate engagement or brand perception?'
        }
      },
      {
        topic: 'Competitive Benchmarking and Differentiation',
        question: 'Provide an example of how you conducted competitive benchmarking to differentiate your employer brand. What actions did you take to outshine competitors, and what results did you achieve?',
        prompt: {
          situation: 'What specific branding challenges did you face in a competitive market?',
          behavior: 'How did you gather insights and strategically position your organization?',
          impact: 'What measurable advantages were gained (e.g., increased market share, improved brand rankings)?'
        }
      },
      {
        topic: 'Impact of Employer Branding on Recruitment Metrics',
        question: 'Explain how your employer branding efforts directly impacted recruitment metrics like time-to-hire, cost-per-hire, or offer acceptance rates. Be specific about your strategy and results.',
        prompt: {
          situation: 'What recruitment challenges were you addressing through branding efforts?',
          behavior: 'How did you integrate branding strategies into the recruitment process?',
          impact: 'What measurable improvements were seen, and how did they contribute to overall business goals?'
        }
      }
    ],
    optional: []
  },
  'Best DEI Advocate': {
    mandatory: [
      {
        topic: 'Creating Inclusive Hiring Practices',
        question: 'Provide an example of how you revamped a hiring process to reduce bias and improve diversity. What specific changes did you make, and what measurable outcomes were achieved?',
        prompt: {
          situation: 'What biases or barriers existed in the hiring process?',
          behavior: 'How did you identify the issues, and what steps did you take to address them?',
          impact: 'What was the measurable improvement in diversity metrics or candidate feedback?'
        }
      },
      {
        topic: 'Driving Organizational Accountability for DEI Goals',
        question: 'Describe how you held your organization accountable for meeting DEI goals. What metrics did you use, and how did you ensure they translated into meaningful action?',
        prompt: {
          situation: 'What specific DEI challenges or gaps prompted your action?',
          behavior: 'What frameworks or tracking systems did you implement to measure and communicate progress?',
          impact: 'How did your efforts influence organizational culture or key DEI outcomes?'
        }
      },
      {
        topic: 'Championing Underrepresented Groups',
        question: 'Share a specific initiative you led to champion underrepresented groups within your organization. What challenges did you face, and how did you overcome them?',
        prompt: {
          situation: 'What need or gap prompted this initiative?',
          behavior: 'What actions did you take to design and implement the program?',
          impact: 'What measurable results were achieved (e.g., promotion rates, retention, engagement scores)?'
        }
      },
      {
        topic: 'Addressing Unconscious Bias in Leadership or Teams',
        question: 'Describe how you identified and addressed unconscious bias within your organization. How did you engage stakeholders, and what were the results?',
        prompt: {
          situation: 'What signs of unconscious bias did you identify in decision-making or culture?',
          behavior: 'What interventions (e.g., workshops, policies) did you lead, and how did you drive adoption?',
          impact: 'How did this improve inclusivity, team dynamics, or decision-making processes?'
        }
      },
      {
        topic: 'Tackling Resistance to DEI Efforts',
        question: 'Provide an example of how you navigated resistance to a DEI initiative. How did you gain buy-in, and what was the eventual outcome?',
        prompt: {
          situation: 'What form of resistance (e.g., budget, cultural, leadership) did you face?',
          behavior: 'What steps did you take to address skepticism and drive alignment?',
          impact: 'How did this shift perceptions or lead to the success of the DEI initiative?'
        }
      }
    ],
    optional: []
  },
  'Best Referral Champion': {
    mandatory: [
      {
        topic: 'Scaling Referral Programs',
        question: 'Describe a time when you built or scaled a referral program that significantly increased participation and successful hires. What specific strategies did you implement to ensure its effectiveness?',
        prompt: {
          situation: 'What gaps or challenges prompted the need to build or scale the program?',
          behavior: 'How did you design, implement, and promote the program?',
          impact: 'What measurable improvements were achieved (e.g., % of hires via referrals, engagement rates, time-to-hire)?'
        }
      },
      {
        topic: 'Innovative/Creative incentive structures for Referral Engagement that challenge the traditional way of doing things',
        question: 'Provide an example of how you designed or revamped a referral incentive structure. How did you ensure it motivated employees while staying aligned with business goals?',
        prompt: {
          situation: 'What challenges or limitations existed in the previous incentive model?',
          behavior: 'How did you structure the new incentives, and how were they communicated to employees?',
          impact: 'What measurable results followed (e.g., increase in referral volume, reduced cost-per-hire)?'
        }
      },
      {
        topic: 'Driving Diversity through Referral Programs',
        question: 'Share an example of how you improved the diversity of referral hires. What specific strategies did you use to address bias or expand referral networks?',
        prompt: {
          situation: 'What diversity challenges did you observe in the referral program?',
          behavior: 'What actions did you take to encourage diverse referrals or mitigate bias (e.g., education, process redesign)?',
          impact: 'How did your efforts influence diversity metrics or perceptions of inclusivity?'
        }
      },
      {
        topic: 'Referral Program Marketing and Employee Engagement',
        question: 'Describe how you collaborated with the internal teams (Marketing/ Branding/ Content team) and marketed a referral program to maximize employee engagement. What innovative tactics did you use to create excitement and participation?',
        prompt: {
          situation: 'What participation or awareness challenges did you face?',
          behavior: 'How did you design and execute campaigns to promote the program (e.g., events, gamification, storytelling)?',
          impact: 'What results did you achieve (e.g., increased participation rates, higher awareness)?'
        }
      },
      {
        topic: 'Measuring and Improving Referral Program ROI',
        question: 'Explain how you measured the ROI of a referral program. What insights did you uncover, and how did you use them to improve the program?',
        prompt: {
          situation: 'What challenges or gaps prompted the need to analyze the programs ROI?',
          behavior: 'How did you collect and analyze data to evaluate the programs success?',
          impact: 'What changes did you implement, and how did they influence referral volume, quality of hires, or cost-effectiveness?'
        }
      }
    ],
    optional: []
  },
  'Candidate Experience & Ops Pro': {
    mandatory: [
      {
        topic: 'Candidate Journey Mapping',
        question: 'Describe a specific instance where you identified and resolved a major pain point in the candidate journey. How did you approach the problem, and what measurable improvements were achieved?',
        prompt: {
          situation: 'What specific stage of the candidate journey was causing friction?',
          behavior: 'How did you analyze the issue, and what actions did you take to resolve it?',
          impact: 'What changes did you see in candidate feedback, application completion rates, or satisfaction scores?'
        }
      },
      {
        topic: 'Process Automation in Recruitment Ops',
        question: 'Share an example of how you implemented automation in a recruitment or TA process. How did it address inefficiencies and improve operational outcomes?',
        prompt: {
          situation: 'What manual or inefficient process were you addressing?',
          behavior: 'What automation tools or workflows did you implement, and how?',
          impact: 'How did automation improve speed, accuracy, or recruiter productivity (e.g., reduced time-to-hire, fewer errors)?'
        }
      },
      {
        topic: 'KPI Monitoring and Actionable Insights',
        question: 'Provide a specific example of how you used data or KPIs to uncover an operational issue in recruitment and drive actionable change. What were the results?',
        prompt: {
          situation: 'What KPI or data trend indicated a problem (e.g., low offer acceptance rates, high time-to-fill)?',
          behavior: 'How did you analyze the data and engage stakeholders to address the issue?',
          impact: 'What measurable improvements did you achieve (e.g., improved KPIs, higher stakeholder satisfaction)?'
        }
      },
      {
        topic: 'Candidate Communications at Scale',
        question: 'Describe how you managed personalized and timely communication with candidates during a high-volume hiring project. What challenges did you face, and how did you overcome them?',
        prompt: {
          situation: 'What volume or scale of hiring created communication challenges?',
          behavior: 'How did you structure processes or use tools to ensure personalized and effective communication?',
          impact: 'What feedback or metrics demonstrated the success of your approach?'
        }
      },
      {
        topic: 'Post-Hire Operations and Onboarding Handoff',
        question: 'Explain how you created or improved the handoff process from TA to onboarding. How did you ensure no gaps, and what impact did this have on new hire readiness?',
        prompt: {
          situation: 'What specific gap or challenge existed in the handoff process?',
          behavior: 'What steps did you take to standardize or optimize the transition?',
          impact: 'How did this affect new hire productivity, satisfaction, or onboarding feedback?'
        }
      }
    ],
    optional: []
  }
};

export const CategoryQuestions = ({ category, onNext, isOptional }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showingOptional, setShowingOptional] = useState(false);
  const [answers, setAnswers] = useState({
    mandatory: [],
    optional: []
  });

  const questions = categoryQuestions[category];
  const currentQuestions = showingOptional ? questions.optional : questions.mandatory;
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const validateMandatoryAnswers = () => {
    if (!answers.mandatory || answers.mandatory.length !== questions.mandatory.length) {
      return false;
    }
    
    return answers.mandatory.every(answer => 
      answer && 
      answer.situation && 
      answer.situation.trim() !== '' &&
      answer.behavior && 
      answer.behavior.trim() !== '' &&
      answer.impact && 
      answer.impact.trim() !== ''
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!showingOptional && currentQuestionIndex === questions.mandatory.length - 1) {
      // Skip validation if this is a nomination for someone else
      if (!isOptional) {
        // Validate all mandatory questions are answered
        if (!validateMandatoryAnswers()) {
          alert('Please complete all mandatory questions before proceeding.');
          return;
        }
      }
      
      // Completed mandatory questions, show choice for optional
      const answersWithQuestions = {
        ...answers,
        questions: questions,
        category: category
      };
      onNext(answersWithQuestions, true); // true indicates mandatory questions completed
      return;
    }

    if (showingOptional && currentQuestionIndex === questions.optional.length - 1) {
      // All done, submit everything
      const answersWithQuestions = {
        ...answers,
        questions: questions,
        category: category
      };
      onNext(answersWithQuestions, false); // false indicates all questions completed
      return;
    }

    // Move to next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleAnswerChange = (section, value) => {
    const questionSet = showingOptional ? 'optional' : 'mandatory';
    const newAnswers = [...(answers[questionSet] || [])];
    
    if (!newAnswers[currentQuestionIndex]) {
      newAnswers[currentQuestionIndex] = {
        topic: currentQuestion.topic,
        question: currentQuestion.question,
        situation: '',
        behavior: '',
        impact: ''
      };
    }
    
    newAnswers[currentQuestionIndex][section] = value;
    
    setAnswers({
      ...answers,
      [questionSet]: newAnswers
    });
  };

  if (!category || !questions || !currentQuestion) {
    return <div>Please select a category first</div>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>
        {currentQuestion.topic}
      </h3>

      <FormGroup>
        <Label>{currentQuestion.question}</Label>
        
        <FormGroup>
          <Label>Situation: {currentQuestion.prompt.situation}</Label>
          <TextArea
            required
            value={answers[showingOptional ? 'optional' : 'mandatory'][currentQuestionIndex]?.situation || ''}
            onChange={(e) => handleAnswerChange('situation', e.target.value)}
            placeholder="Describe the situation..."
            maxLength={500}
          />
        </FormGroup>

        <FormGroup>
          <Label>Behavior: {currentQuestion.prompt.behavior}</Label>
          <TextArea
            required
            value={answers[showingOptional ? 'optional' : 'mandatory'][currentQuestionIndex]?.behavior || ''}
            onChange={(e) => handleAnswerChange('behavior', e.target.value)}
            placeholder="Describe your actions..."
            maxLength={500}
          />
        </FormGroup>

        <FormGroup>
          <Label>Impact: {currentQuestion.prompt.impact}</Label>
          <TextArea
            required
            value={answers[showingOptional ? 'optional' : 'mandatory'][currentQuestionIndex]?.impact || ''}
            onChange={(e) => handleAnswerChange('impact', e.target.value)}
            placeholder="Describe the results..."
            maxLength={500}
          />
        </FormGroup>
      </FormGroup>

      <Button type="submit">
        {(!showingOptional && currentQuestionIndex === questions.mandatory.length - 1) ? 
          'Complete Mandatory Questions' : 
          (showingOptional && currentQuestionIndex === questions.optional.length - 1) ?
          'Submit All Questions' : 
          'Next Question'}
      </Button>
    </Form>
  );
}; 