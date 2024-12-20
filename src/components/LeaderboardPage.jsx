import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FaLinkedin } from 'react-icons/fa';

const LeaderboardContainer = styled.div`
  padding: 2rem;
  color: white;
`

const CategoriesContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const CategoryButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`

const TableContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  max-height: calc(100vh - 250px); // Adjust based on your header height
  position: relative;
  
  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  
  /* For Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  
  th {
    position: sticky;
    top: 0;
    background: #121212;
    z-index: 1;
    padding: 1rem;
    text-align: left;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
  
  td {
    padding: 1rem;
    text-align: left;
    color: rgba(255, 255, 255, 0.8);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  tr:hover td {
    background: rgba(255, 255, 255, 0.02);
  }
`

const CategoryTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
  margin: 2rem 0 1rem;
  font-weight: 400;
`

const categories = [
  "Best Tech Recruiter",
  "Best GTM/ Business Recruiter",
  "Best Leadership Recruiter",
  "Top TA Leader",
  "Best Candidate Experience Specialist",
  "Best Employer Branding Champion",
  "Best DEI Advocate",
  "Best Referral Champion",
  "Lifetime Achievement Award"
];

const calculateScore = (juryScore, juryVotes, communityVotes) => {
  return (juryScore * juryVotes) + (communityVotes * 10);
};

const RankChip = styled.div`
  background: rgba(255, 193, 7, 0.1);
  color: #ffd54f;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  min-width: 2rem;
`

const VoteChip = styled.div`
  background: rgba(33, 150, 243, 0.1);
  color: #90caf9;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`

const ScoreChip = styled.div`
  background: rgba(76, 175, 80, 0.1);
  color: #81c784;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`

const CategoryChip = styled.div`
  background: rgba(156, 39, 176, 0.1);
  color: #ce93d8;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  display: inline-block;
  font-size: 0.9rem;
`

const LinkedInLink = styled.a`
  color: #90caf9;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
`

const SearchBar = styled.input`
  padding: 0.8rem 1.2rem;
  width: 100%;
  max-width: 500px;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`

export const LeaderboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
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
          
          console.log('Nomination category:', data.nominationData.nominee.category);
          
          return {
            id: doc.id,
            nominee: data.nominationData.nominee,
            category: data.nominationData.nominee.category,
            juryVoteCount: juryVotes,
            communityVotes: communityVotes,
            totalScore: calculateScore(juryScore, juryVotes, communityVotes)
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
      const matchesCategory = selectedCategory === "All" || 
        nom.category === selectedCategory;
      
      console.log({
        nominationCategory: nom.category,
        selectedCategory,
        matches: matchesCategory
      });
      
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
      <SearchBar
        type="text"
        placeholder="Search by name, company, job title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <CategoriesContainer>
        <CategoryButton 
          $active={selectedCategory === "All"}
          onClick={() => setSelectedCategory("All")}
        >
          All Categories
        </CategoryButton>
        {categories.map(category => (
          <CategoryButton
            key={category}
            $active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoriesContainer>

      {selectedCategory !== "All" && (
        <CategoryTitle>{selectedCategory}</CategoryTitle>
      )}

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Nominee</th>
              <th>Company</th>
              <th>Job Title</th>
              <th>LinkedIn</th>
              {selectedCategory === "All" && <th>Category</th>}
              <th>Jury Vote Count</th>
              <th>Community Votes</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedNominations.map((nomination, index) => (
              <tr key={nomination.id}>
                <td>
                  <RankChip>#{index + 1}</RankChip>
                </td>
                <td>{nomination.nominee.name}</td>
                <td>{nomination.nominee.company}</td>
                <td>{nomination.nominee.jobTitle}</td>
                <td>
                  <LinkedInLink 
                    href={nomination.nominee.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin /> Profile
                  </LinkedInLink>
                </td>
                {selectedCategory === "All" && (
                  <td>
                    <CategoryChip>{nomination.category}</CategoryChip>
                  </td>
                )}
                <td>
                  <VoteChip>{nomination.juryVoteCount}</VoteChip>
                </td>
                <td>
                  <VoteChip>{nomination.communityVotes}</VoteChip>
                </td>
                <td>
                  <ScoreChip>{nomination.totalScore}</ScoreChip>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </LeaderboardContainer>
  );
}; 