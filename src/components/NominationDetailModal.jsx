import styled from 'styled-components';
import { FaLinkedin, FaTimes, FaThumbsUp } from 'react-icons/fa';

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
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 0;
    align-items: flex-end;
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
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    max-height: 85vh;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: none;
  }
`

const Header = styled.div`
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: sticky;
  top: 0;
  background: #1a1a1a;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`

const NameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`

const Name = styled.h2`
  color: white;
  font-size: 1.75rem;
  font-weight: 500;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`

const Section = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`

const SectionTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 0 1rem 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
`

const Answer = styled.div`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 0.95rem;
  white-space: pre-wrap;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: white;
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
  }
`

const ProfileHeader = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const MainInfo = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const Badges = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`

const Badge = styled.span`
  padding: 0.375rem 1rem;
  border-radius: 12px;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
  }
`

const CategoryBadge = styled(Badge)`
  background: rgba(76, 175, 80, 0.1);
  color: #81c784;
`

const TypeBadge = styled(Badge)`
  background: ${props => props.$type === 'self' ? 
    'rgba(103, 58, 183, 0.1)' : 
    'rgba(33, 150, 243, 0.1)'};
  color: ${props => props.$type === 'self' ? 
    '#b39ddb' : 
    '#90caf9'};
`

const Stats = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-around;
    padding: 0.875rem;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.03);
  }
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  span {
    color: white;
    font-weight: 500;
  }
`

const Content = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`

const NominatorInfo = styled.div`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
`

const NominatorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`

const NominatorName = styled.h4`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`

const NominatorCompany = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
`

const Recommendation = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
`

const QuestionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const QuestionCard = styled.div`
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
`

const Question = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
`

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
    
    button {
      padding: 0.5rem 0.75rem;
      font-size: 0.8rem;
      min-width: auto; // Allow buttons to be smaller
      white-space: nowrap;
    }
  }
`

const HeaderButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
`

const renderAnswers = (section) => {
  if (!section || !section.answers) return null;
  
  return section.answers.map((item, index) => (
    <Answer key={index}>
      <Question>{item?.question || 'N/A'}</Question>
      <Response>{item?.answer || 'N/A'}</Response>
    </Answer>
  ));
};

export const NominationDetailModal = ({ nomination, onClose }) => {
  const { type, nominee, nominator, totalVotes, juryScore, categoryQuestions } = nomination;

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent>
        <Header>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
          
          <ProfileHeader>
            <MainInfo>
              <NameRow>
                <Name>{nominee.name}</Name>
                <CompanyInfo>
                  {nominee.company} • {nominee.jobTitle}
                </CompanyInfo>
              </NameRow>
              <Badges>
                <TypeBadge $type={type}>
                  {type === 'self' ? '🎯 Self Nominated' : '👥 Peer Nominated'}
                </TypeBadge>
                <CategoryBadge>{nominee.category}</CategoryBadge>
              </Badges>
            </MainInfo>

            <Stats>
              <StatItem>
                <FaThumbsUp />
                <span>{totalVotes || 0}</span> votes
              </StatItem>
              <StatItem>
                Jury Score: <span>{juryScore || 0}</span>
              </StatItem>
            </Stats>
          </ProfileHeader>
        </Header>

        <Content>
          {type === 'other' && nominator && (
            <Section>
              <SectionTitle>Nominated By</SectionTitle>
              <NominatorInfo>
                <NominatorHeader>
                  <div>
                    <NominatorName>{nominator.name}</NominatorName>
                    <NominatorCompany>
                      {nominator.company} • {nominator.jobTitle}
                    </NominatorCompany>
                  </div>
                  <a 
                    href={nominator.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#90caf9', textDecoration: 'none' }}
                  >
                    <FaLinkedin />
                  </a>
                </NominatorHeader>
                <Recommendation>{nomination.recommendation}</Recommendation>
              </NominatorInfo>
            </Section>
          )}

          {categoryQuestions && (
            <>
              {/* Mandatory Questions */}
              {categoryQuestions.mandatory?.length > 0 && (
                <Section>
                  <SectionTitle>Mandatory Questions</SectionTitle>
                  {categoryQuestions.mandatory.map((questionData, index) => (
                    <Section key={`mandatory-${index}`}>
                      <SectionTitle>{questionData.topic}</SectionTitle>
                      <QuestionCard>
                        <Question>{questionData.question}</Question>
                        
                        <div style={{ marginTop: '1rem' }}>
                          <h4 style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.5rem' }}>Situation</h4>
                          <Answer>{questionData.situation || 'N/A'}</Answer>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                          <h4 style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.5rem' }}>Behavior</h4>
                          <Answer>{questionData.behavior || 'N/A'}</Answer>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                          <h4 style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.5rem' }}>Impact</h4>
                          <Answer>{questionData.impact || 'N/A'}</Answer>
                        </div>
                      </QuestionCard>
                    </Section>
                  ))}
                </Section>
              )}

              {/* Optional Questions */}
              {categoryQuestions.optional?.length > 0 && (
                <Section>
                  <SectionTitle>Additional Questions</SectionTitle>
                  {categoryQuestions.optional.map((questionData, index) => (
                    <Section key={`optional-${index}`}>
                      <SectionTitle>{questionData.topic}</SectionTitle>
                      <QuestionCard>
                        <Question>{questionData.question}</Question>
                        
                        <div style={{ marginTop: '1rem' }}>
                          <h4 style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.5rem' }}>Situation</h4>
                          <Answer>{questionData.situation || 'N/A'}</Answer>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                          <h4 style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.5rem' }}>Behavior</h4>
                          <Answer>{questionData.behavior || 'N/A'}</Answer>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                          <h4 style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.5rem' }}>Impact</h4>
                          <Answer>{questionData.impact || 'N/A'}</Answer>
                        </div>
                      </QuestionCard>
                    </Section>
                  ))}
                </Section>
              )}
            </>
          )}
        </Content>
      </ModalContent>
    </ModalOverlay>
  );
}; 