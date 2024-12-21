import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FaLinkedin, FaTrophy, FaMedal, FaAward } from 'react-icons/fa';

const LeaderboardContainer = styled.div`
  padding: 2rem;
  margin: 0 auto;
`

const TableContainer = styled.div`
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`

const TableScroll = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 300px);
  
  /* Scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
    background: transparent;
  }
  
  tbody tr:hover td {
    background: rgba(255, 255, 255, 0.03);
  }
`

const TableHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background: #1a1a1a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }
  
  th {
    padding: 1rem;
    text-align: left;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    background: #1a1a1a;
  }
`

const CategoryTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`

const CategoryTab = styled.button`
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, ${props => props.$active ? '0.3' : '0.1'});
  background: rgba(255, 255, 255, ${props => props.$active ? '0.1' : '0.02'});
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  text-align: center;
  line-height: 1.2;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  white-space: normal;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }
`

const TopSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
`

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
`

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 0.8rem;
  width: 250px;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }
`

const RankBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  white-space: nowrap;
  
  ${props => {
    switch(props.$rank) {
      case 1:
        return `
          background: rgba(255, 223, 0, 0.15);
          color: #FFD700;
          border: 1px solid rgba(255, 223, 0, 0.3);
        `;
      case 2:
        return `
          background: rgba(192, 192, 192, 0.15);
          color: #C0C0C0;
          border: 1px solid rgba(192, 192, 192, 0.3);
        `;
      case 3:
        return `
          background: rgba(205, 127, 50, 0.15);
          color: #CD7F32;
          border: 1px solid rgba(205, 127, 50, 0.3);
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
        `;
    }
  }}
`

const ScoreChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  background: rgba(76, 175, 80, 0.1);
  color: #81c784;
  border: 1px solid rgba(76, 175, 80, 0.2);
`

const VoteChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  
  ${props => props.$type === 'jury' ? `
    background: rgba(33, 150, 243, 0.1);
    color: #90caf9;
    border: 1px solid rgba(33, 150, 243, 0.2);
  ` : `
    background: rgba(156, 39, 176, 0.1);
    color: #ce93d8;
    border: 1px solid rgba(156, 39, 176, 0.2);
  `}
`

const LinkedInButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background: rgba(10, 102, 194, 0.1);
  color: #0a66c2;
  border: 1px solid rgba(10, 102, 194, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(10, 102, 194, 0.2);
    transform: translateY(-2px);
  }
`

const NomineeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const NomineeName = styled.div`
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const JobTitle = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`

const categories = [
  "Best Tech Recruiter",
  "Best GTM/ Business Recruiter",
  "Best Leadership Recruiter",
  "Top TA Leader",
  "Candidate Experience & Ops Pro",
  "Best Employer Branding Champion",
  "Best DEI Advocate",
  "Best Referral Champion"
];

const calculateScore = (juryScore, juryVotes, communityVotes, optionalQuestionsAnswered = 0) => {
  return (juryScore * juryVotes) + (communityVotes * 10) + optionalQuestionsAnswered;
};

const getRankIcon = (rank) => {
  switch(rank) {
    case 1:
      return <FaTrophy />;
    case 2:
      return <FaMedal />;
    case 3:
      return <FaAward />;
    default:
      return `#${rank}`;
  }
};

export const LeaderboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNominations = async () => {
      try {
        const nominationsRef = collection(db, 'nominations');
        const q = query(nominationsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        
        const nominationsData = snapshot.docs.map(doc => {
          const data = doc.data();
          const juryScore = data.juryScore || 0;
          const juryVotes = data.juryVotes || 0;
          const communityVotes = data.totalVotes || 0;
          const optionalQuestionsAnswered = data.answers?.optional?.filter(answer => 
            answer?.situation?.trim() && 
            answer?.behavior?.trim() && 
            answer?.impact?.trim()
          )?.length || 0;
          
          return {
            id: doc.id,
            nominee: data.nominee,
            category: data.nominee.category,
            juryVoteCount: juryVotes,
            communityVotes: communityVotes,
            optionalQuestionsAnswered,
            totalScore: calculateScore(juryScore, juryVotes, communityVotes, optionalQuestionsAnswered)
          };
        });

        setNominations(nominationsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching nominations:', error);
        setLoading(false);
      }
    };

    fetchNominations();
  }, []);

  const filteredAndSortedNominations = nominations
    .filter(nom => {
      const matchesCategory = selectedCategory === "" || 
        nom.category === selectedCategory;
      
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        nom.nominee.name.toLowerCase().includes(searchLower) ||
        nom.nominee.company.toLowerCase().includes(searchLower) ||
        nom.nominee.jobTitle.toLowerCase().includes(searchLower) ||
        nom.category.toLowerCase().includes(searchLower);
      
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  if (loading) {
    return <LeaderboardContainer>Loading leaderboard...</LeaderboardContainer>;
  }

  return (
    <LeaderboardContainer>
      <TopSection>
        <SearchSection>
          <CategoryTab 
            $active={selectedCategory === ""}
            onClick={() => setSelectedCategory("")}
            style={{ width: '150px' }}
          >
            All Categories
          </CategoryTab>
          <SearchInput
            type="text"
            placeholder="Search nominees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchSection>
      </TopSection>
      
      <CategoryTabs>
        {categories.slice(0, 4).map(category => (
          <CategoryTab
            key={category}
            $active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryTab>
        ))}
      </CategoryTabs>
      
      <CategoryTabs>
        {categories.slice(4, 8).map(category => (
          <CategoryTab
            key={category}
            $active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryTab>
        ))}
      </CategoryTabs>

      <TableContainer>
        <TableWrapper>
          <TableHeader>
            <table>
              <tr>
                <th style={{ width: '100px' }}>Rank</th>
                <th style={{ width: '250px' }}>Nominee</th>
                <th style={{ width: '200px' }}>Category</th>
                <th style={{ width: '200px' }}>Company</th>
                <th style={{ width: '150px' }}>Community Votes</th>
                <th style={{ width: '150px' }}>Jury Votes</th>
                <th style={{ width: '150px' }}>Total Score</th>
              </tr>
            </table>
          </TableHeader>
          <TableScroll>
            <LeaderboardTable>
              <tbody>
                {filteredAndSortedNominations.map((nomination, index) => (
                  <tr key={nomination.id}>
                    <td style={{ width: '100px' }}>
                      <RankBadge $rank={index + 1}>
                        {getRankIcon(index + 1)}
                      </RankBadge>
                    </td>
                    <td style={{ width: '250px' }}>
                      <NomineeInfo>
                        <NomineeName>
                          {nomination.nominee.name}
                          {nomination.nominee.linkedinUrl && (
                            <LinkedInButton 
                              href={nomination.nominee.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaLinkedin />
                            </LinkedInButton>
                          )}
                        </NomineeName>
                        <JobTitle>{nomination.nominee.jobTitle}</JobTitle>
                      </NomineeInfo>
                    </td>
                    <td style={{ width: '200px' }}>{nomination.category}</td>
                    <td style={{ width: '200px' }}>{nomination.nominee.company}</td>
                    <td style={{ width: '150px' }}>
                      <VoteChip $type="community">
                        {nomination.communityVotes}
                      </VoteChip>
                    </td>
                    <td style={{ width: '150px' }}>
                      <VoteChip $type="jury">
                        {nomination.juryVoteCount}
                      </VoteChip>
                    </td>
                    <td style={{ width: '150px' }}>
                      <ScoreChip>
                        {nomination.totalScore}
                      </ScoreChip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </LeaderboardTable>
          </TableScroll>
        </TableWrapper>
      </TableContainer>
    </LeaderboardContainer>
  );
}; 