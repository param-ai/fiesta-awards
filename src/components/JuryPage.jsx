import styled from 'styled-components';
import { FaLinkedin, FaArrowLeft } from 'react-icons/fa';
import { juryMembers } from '../data/juryData';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  padding: 2rem;
`

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(-2px);
  }
`

const PageTitle = styled.h1`
  color: white;
  font-size: 2rem;
  font-weight: 500;
  margin: 0 0 2rem 0;
`

const JuryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
`

const JuryCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
`

const CardHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
`

const HeaderInfo = styled.div`
  flex: 1;
`

const Name = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
`

const Title = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`

const Company = styled.div`
  color: #81c784;
  font-size: 0.9rem;
  font-weight: 500;
`

const CardBody = styled.div`
  padding: 1.5rem;
`

const Bio = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
`

const LinkedInButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
`

export const JuryPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <BackButton onClick={() => navigate('/')}>
        <FaArrowLeft /> Back to Nominations
      </BackButton>
      
      <PageTitle>Meet Our Jury</PageTitle>
      
      <JuryGrid>
        {juryMembers.map((member, index) => (
          <JuryCard key={index}>
            <CardHeader>
              <Avatar src={member.image} alt={member.name} />
              <HeaderInfo>
                <Name>{member.name}</Name>
                <Title>{member.title}</Title>
                <Company>{member.company}</Company>
              </HeaderInfo>
            </CardHeader>
            <CardBody>
              <Bio>{member.bio}</Bio>
              <LinkedInButton 
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin /> View Profile
              </LinkedInButton>
            </CardBody>
          </JuryCard>
        ))}
      </JuryGrid>
    </PageContainer>
  );
}; 