import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaLinkedin, FaTrophy, FaStar, FaUsers, FaLightbulb, FaAward } from 'react-icons/fa';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const trophyFloat = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const CongratsBanner = styled.div`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.05) 100%);
  padding: 1.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  margin-bottom: 2rem;
  animation: fadeIn 1s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const CongratsTitle = styled.h2`
  color: #FFD700;
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 0.8rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CongratsText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Container = styled.div`
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(135deg, #121212 0%, #1a1a1a 100%);

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const PageTitle = styled.h1`
  color: white;
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  svg {
    color: #FFD700;
    animation: ${trophyFloat} 3s ease-in-out infinite;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 0 1rem;
  }
`;

const SubTitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  font-weight: 300;
  position: relative;
  padding: 0 1rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #FFD700, transparent);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled.h2`
  color: #ffd700;
  font-size: 1.8rem;
  margin: 3rem 0 1.5rem;
  padding: 0 1rem 0.5rem;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: relative;
  
  svg {
    font-size: 1.6rem;
    color: #FFD700;
  }

  &:before {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 60px;
    height: 1px;
    background: #FFD700;
    animation: ${shimmer} 2s infinite linear;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin: 2rem 0 1rem;
  }
`;

const WinnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 0 0.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 0 0.5rem;
  }
`;

const WinnerCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), transparent);
    border-radius: 16px 16px 0 0;
  }
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 215, 0, 0.3);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const WinnerImage = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: block;
  border: 3px solid rgba(255, 215, 0, 0.3);
  padding: 3px;
  background: rgba(255, 215, 0, 0.05);
  object-fit: cover;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  ${WinnerCard}:hover & {
    transform: scale(1.05);
    border-color: rgba(255, 215, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const Category = styled.div`
  background: rgba(255, 215, 0, 0.1);
  color: #ffd700;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  text-align: center;
  border: 1px solid rgba(255, 215, 0, 0.2);
  font-weight: 500;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  ${WinnerCard}:hover & {
    background: rgba(255, 215, 0, 0.15);
    border-color: rgba(255, 215, 0, 0.3);
  }
`;

const Name = styled.h2`
  color: white;
  text-align: center;
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${WinnerCard}:hover & {
    color: #FFD700;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Bio = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.2rem;
  flex-grow: 1;
  
  ${WinnerCard}:hover & {
    color: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const LinkedInButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem;
  border-radius: 10px;
  background: rgba(10, 102, 194, 0.1);
  color: #0a66c2;
  border: 1px solid rgba(10, 102, 194, 0.2);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
  
  &:hover {
    background: rgba(10, 102, 194, 0.15);
    border-color: rgba(10, 102, 194, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 0.9rem;
  }
`;

const Section = styled.div`
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s forwards;
  animation-delay: ${props => props.index * 0.2}s;

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

// Organized winners data by sections
const winnersData = {
  leadership: [
    {
      category: "OG TA Pillar",
      name: "Harish Muniraju",
      image: "/images/winners/harish.jpeg",
      bio: "A legendary figure in talent acquisition with decades of experience, whose wisdom and leadership have shaped the industry and inspired countless professionals.",
      linkedin: "https://www.linkedin.com/in/harishmuniraju/"
    },
    {
      category: "Top TA Leader",
      name: "Swapna Kole",
      image: "/images/winners/swapna.jpeg",
      bio: "A visionary Talent Acquisition leader known for driving organizational growth through innovative strategies and building world-class talent acquisition teams.",
      linkedin: "https://www.linkedin.com/in/swapna-kole-a75a2924/"
    },
    {
      category: "Emerging TA Leader",
      name: "Abhishek Singh",
      image: "/images/winners/abhishek.jpeg",
      bio: "An emerging force in talent acquisition, bringing fresh perspectives and innovative approaches to recruitment strategies and team leadership.",
      linkedin: "https://www.linkedin.com/in/abhishek-singh-b79107b0/"
    }
  ],
  recruitment: [
    {
      category: "Best Tech Recruiter",
      name: "Satish Ch",
      image: "/images/winners/satish.jpeg",
      bio: "A tech recruiting virtuoso known for innovative hiring strategies and deep understanding of technical roles, consistently delivering top talent for challenging positions.",
      linkedin: "https://www.linkedin.com/in/satish-ch/"
    },
    {
      category: "Best GTM/ Business Recruiter",
      name: "Divesh Dhawan",
      image: "/images/winners/divesh.jpeg",
      bio: "Expert in GTM and business recruitment, with an exceptional track record in building high-performing commercial teams across diverse industries.",
      linkedin: "https://www.linkedin.com/in/diveshdhawan/"
    },
    {
      category: "Best Leadership Recruiter",
      name: "Jose Merciline",
      image: "/images/winners/jose.jpeg",
      bio: "A distinguished executive search specialist known for strategic talent acquisition and placing transformational leaders across organizations.",
      linkedin: "https://www.linkedin.com/in/josemerciline/"
    }
  ],
  specialization: [
    {
      category: "Candidate Experience & Ops Pro",
      name: "Jerryd Peter Marian Danny",
      image: "/images/winners/jerryd.jpeg",
      bio: "A champion of exceptional candidate experience, revolutionizing recruitment operations through innovative processes and technology integration.",
      linkedin: "https://www.linkedin.com/in/jerrydpeter89/"
    },
    {
      category: "Best Employer Branding Champion",
      name: "Sahil Nayar",
      image: "/images/winners/sahil.jpeg",
      bio: "A pioneering force in employer branding, crafting compelling employer value propositions and building strong talent communities.",
      linkedin: "https://www.linkedin.com/in/sahilnayar/"
    },
    {
      category: "Best DEI Advocate",
      name: "Ashish Banka",
      image: "/images/winners/ashish.jpeg",
      bio: "A passionate advocate for diversity, equity, and inclusion, driving meaningful change and creating inclusive hiring practices.",
      linkedin: "https://www.linkedin.com/in/ashish-banka-passionhr/"
    }
  ],
  sourcing: [
    {
      category: "Sourcing Games Winner",
      name: "Gajendra Singh",
      image: "/images/winners/gajendra.jpeg",
      bio: "Champion of the sourcing challenge, demonstrating exceptional talent discovery skills and innovative sourcing techniques.",
      linkedin: "https://www.linkedin.com/in/gpslive247/"
    },
    {
      category: "Sourcing Games Runner Up",
      name: "Sreekala Sreedhar",
      image: "/images/winners/sreekala.jpeg",
      bio: "Outstanding talent sourcer with remarkable abilities in identifying and engaging top talent through creative sourcing strategies.",
      linkedin: "https://www.linkedin.com/in/sreekala-sreedhar-b86ba0a3/"
    }
  ],
  startup: [
    {
      category: "Startup Pitch Winner",
      name: "Topin.Tech",
      image: "https://media.licdn.com/dms/image/v2/D560BAQEln4INrPmtAg/company-logo_200_200/company-logo_200_200/0/1737547860980/topin_tech2_logo?e=2147483647&v=beta&t=0A3g2sVylI1YdSmNY16olXWfwH6pgsWZLiem4o3ipNQ",
      bio: "An innovative recruitment technology solution revolutionizing the hiring landscape with cutting-edge AI and automation.",
      linkedin: "https://www.linkedin.com/company/topin-tech2/"
    },
    {
      category: "Startup Pitch (Special Mention)",
      name: "TA Buddy",
      image: "/images/winners/tabuddy_logo.jpeg",
      bio: "A groundbreaking talent acquisition platform that streamlines recruitment processes and enhances hiring efficiency.",
      linkedin: "https://www.linkedin.com/company/tabuddy/"
    }
  ]
};

export const WinnersPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Container>
      <CongratsBanner>
        <CongratsTitle>🎉 Congratulations to All Winners! 🏆</CongratsTitle>
        <CongratsText>
          A heartfelt thank you to our amazing community for participating in the voting process 
          and to our esteemed jury panel for their careful evaluation. Together, we've celebrated 
          the outstanding achievements in talent acquisition. Here's to the incredible winners who 
          are shaping the future of recruitment! 🌟
        </CongratsText>
      </CongratsBanner>

      <PageTitle>
        <FaTrophy />
        FiesTA Awards 2025 Winners
      </PageTitle>
      <SubTitle>Celebrating Excellence in Talent Acquisition</SubTitle>

      {Object.entries(winnersData).map(([section, winners], sectionIndex) => (
        <Section key={section} index={sectionIndex}>
          <SectionTitle>
            {section === 'leadership' && <FaUsers />}
            {section === 'recruitment' && <FaStar />}
            {section === 'specialization' && <FaAward />}
            {section === 'sourcing' && <FaStar />}
            {section === 'startup' && <FaLightbulb />}
            {section === 'leadership' && 'Leadership Excellence'}
            {section === 'recruitment' && 'Recruitment Champions'}
            {section === 'specialization' && 'Domain Excellence'}
            {section === 'sourcing' && 'Sourcing Excellence'}
            {section === 'startup' && 'Innovation Awards'}
          </SectionTitle>
          <WinnersGrid>
            {winners.map((winner, index) => (
              <WinnerCard 
                key={index}
                onMouseEnter={() => setHoveredCard(`${section}-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
                isHovered={hoveredCard === `${section}-${index}`}
              >
                <WinnerImage src={winner.image} alt={winner.name} />
                <Category>{winner.category}</Category>
                <Name>{winner.name}</Name>
                <Bio>{winner.bio}</Bio>
                <LinkedInButton href={winner.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin /> View Profile
                </LinkedInButton>
              </WinnerCard>
            ))}
          </WinnersGrid>
        </Section>
      ))}
    </Container>
  );
}; 