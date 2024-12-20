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
`

const Header = styled.div`
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: sticky;
  top: 0;
  background: #1a1a1a;
  z-index: 1;
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
`

const ProfileHeader = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
`

const MainInfo = styled.div`
  flex: 1;
`

const Name = styled.h2`
  color: white;
  font-size: 1.75rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
`

const CompanyInfo = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin-bottom: 1rem;
`

const Badges = styled.div`
  display: flex;
  gap: 0.75rem;
`

const Badge = styled.span`
  padding: 0.375rem 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
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
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;

  span {
    color: white;
    font-weight: 500;
  }
`

const Content = styled.div`
  padding: 2rem;
`

const Section = styled.div`
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.06);
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

const Answer = styled.div`
  color: white;
  font-size: 1rem;
  line-height: 1.5;
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
              <Name>{nominee.name}</Name>
              <CompanyInfo>
                {nominee.company} • {nominee.jobTitle}
              </CompanyInfo>
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
              {/* Numeric Questions */}
              {categoryQuestions.numeric?.questions?.length > 0 && (
                <Section>
                  <SectionTitle>Numeric Metrics</SectionTitle>
                  <QuestionGrid>
                    {categoryQuestions.numeric.questions.map((question, index) => (
                      <QuestionCard key={`numeric-${index}`}>
                        <Question>{question}</Question>
                        <Answer>
                          {categoryQuestions.numeric.answers?.[index]?.answer || 'N/A'}
                        </Answer>
                      </QuestionCard>
                    ))}
                  </QuestionGrid>
                </Section>
              )}

              {/* Rating Questions */}
              {categoryQuestions.ratings?.questions?.length > 0 && (
                <Section>
                  <SectionTitle>Ratings</SectionTitle>
                  <QuestionGrid>
                    {categoryQuestions.ratings.questions.map((question, index) => (
                      <QuestionCard key={`rating-${index}`}>
                        <Question>{question}</Question>
                        <Answer>
                          {categoryQuestions.ratings.answers?.[index]?.answer || 'N/A'}/10
                        </Answer>
                      </QuestionCard>
                    ))}
                  </QuestionGrid>
                </Section>
              )}

              {/* Text Questions */}
              {categoryQuestions.textAnswers?.questions?.length > 0 && 
                categoryQuestions.textAnswers.questions.map((question, index) => (
                  <Section key={`text-${index}`}>
                    <SectionTitle>{question}</SectionTitle>
                    <Answer style={{ whiteSpace: 'pre-wrap' }}>
                      {categoryQuestions.textAnswers.answers?.[index]?.answer || 'N/A'}
                    </Answer>
                  </Section>
                ))
              }
            </>
          )}
        </Content>
      </ModalContent>
    </ModalOverlay>
  );
}; 