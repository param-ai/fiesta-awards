import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { auth, googleProvider } from './firebase'
import { signInWithPopup, signOut, signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { NominationModal } from './components/NominationModal'
import { AuthProvider } from './contexts/AuthContext'
import { collection, query, orderBy, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import { NominationCard } from './components/NominationCard'
import { createOrUpdateUser } from './services/authService'
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom'
import { JuryPage } from './components/JuryPage'
import { RulesPage } from './components/RulesPage'
import { LeaderboardPage } from './components/LeaderboardPage'

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`

const Title = styled.h1`
  margin: 0;
  color: white;
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 1px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
`

const Countdown = styled.p`
  color: #ff4444;
  font-size: 0.8rem;
  margin: 0.2rem 0 0 0;
  opacity: 0.9;
  font-family: 'Roboto Mono', monospace;
  min-width: 380px;
  text-align: left;
  white-space: nowrap;
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
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
`

const SignInButton = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  color: white;
  cursor: pointer;
  flex-shrink: 0;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.3rem 0.3rem 0.3rem 1rem;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.05);
  max-width: 300px;

  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0.75rem;
    justify-content: space-between;
    width: 100%;
    max-width: none;
  }
`

const JuryButton = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  border: 1px solid rgba(255, 193, 7, 0.2);
  background: rgba(255, 193, 7, 0.08);
  color: #ffd54f;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 193, 7, 0.15);
    border-color: rgba(255, 193, 7, 0.3);
  }

  &::before {
    content: '👥';
    font-size: 1.2rem;
  }
`

const NominateButton = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  &::before {
    content: '+';
    font-size: 1.2rem;
    font-weight: 300;
  }
`

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: auto;
  
  & > *:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -7.5px;
    height: 20px;
    width: 1px;
    background: rgba(255, 255, 255, 0.1);
  }
`

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  background-color: #121212;
  z-index: 100;
  backdrop-filter: blur(8px);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 0.75rem;
    
    ${HeaderButtons} {
      width: 100%;
      justify-content: center;
    }
    
    ${Logo} {
      width: 100%;
      align-items: center;
      text-align: center;
    }

    ${Title} {
      font-size: 1.5rem;
    }

    ${Countdown} {
      min-width: unset;
      width: 100%;
      text-align: center;
      font-size: 0.75rem;
    }
    
    ${SearchBar} {
      width: 100%;
      max-width: none;
    }

    ${UserInfo} {
      width: 100%;
      max-width: none;
      justify-content: center;
    }

    ${JuryButton}, ${NominateButton} {
      padding: 0.6rem 1rem;
      font-size: 0.85rem;
    }

    ${SignInButton} {
      width: 100%;
      justify-content: center;
    }
  }
`

const Container = styled.div`
  padding: 2rem;
  padding-top: 0;
  background-color: #121212;
  min-height: 100vh;
`

const UserImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  object-fit: cover;
`

const UserName = styled.span`
  color: white;
  font-size: 0.9rem;
  font-weight: 300;
  letter-spacing: 0.5px;
  margin-right: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`

const NominationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1rem;
  }
`

const LoadingState = styled.div`
  color: white;
  text-align: center;
  padding: 2rem;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px); // Account for header height
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
`

const EmptyStateTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: white;
`

const EmptyStateText = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  line-height: 1.6;
`

const EmptyStateButton = styled(SignInButton)`
  background: rgba(255, 255, 255, 0.08);
  padding: 1rem 2rem;
  font-size: 1rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
`

const FloatingRulesButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 2rem;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 90;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &::before {
    content: '📋';
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.85rem;
    
    &::before {
      font-size: 1rem;
    }
  }
`

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
  padding: 1rem;

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

  @media (max-width: 768px) {
    max-height: 95vh;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: none;
  }
`

const MobileOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #121212;
  z-index: 9999;
  padding: 2rem;
  text-align: center;
  color: white;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const MobileMessage = styled.h2`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1rem;
  font-weight: 500;
`

const MobileSubtext = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-top: 1rem;
`

const EmojiContainer = styled.div`
  font-size: 3rem;
  margin: 2rem 0;
`

const LeaderboardButton = styled(JuryButton)`
  &::before {
    content: '🏆';
  }
`

function App() {
  const [timeLeft, setTimeLeft] = useState('')
  const [user, setUser] = useState(null)
  const [showNominationModal, setShowNominationModal] = useState(false)
  const [nominations, setNominations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNominations, setFilteredNominations] = useState([]);
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-01-15T23:59:00')
      const now = new Date()
      const difference = targetDate - now

      const days = Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(3, '0')
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0')
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0')
      const seconds = Math.floor((difference % (1000 * 60)) / 1000).toString().padStart(2, '0')

      return `${days}d ${hours}h ${minutes}m ${seconds}s until Jan 15, 2025 11:59 PM`
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Save/update user data in Firestore when they sign in
        try {
          await createOrUpdateUser(user);
          console.log('User data saved/updated in Firestore');
        } catch (error) {
          console.error('Error saving user data:', error);
        }
      }
      setUser(user);
    });

    return () => {
      clearInterval(timer)
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    let unsubscribe;

    const setupNominationsListener = () => {
      const nominationsRef = collection(db, 'nominations');
      const q = query(nominationsRef, orderBy('createdAt', 'desc'));
      
      unsubscribe = onSnapshot(q, (snapshot) => {
        const nominationsData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            type: data.type,
            createdAt: data.createdAt,
            totalVotes: data.totalVotes || 0,
            juryScore: data.juryScore || 0,
            nominee: data.nominationData.nominee,
            ...(data.type === 'other' && {
              nominator: data.nominationData.nominator,
              recommendation: data.nominationData.recommendation
            }),
            categoryQuestions: data.nominationData.categoryQuestions
          };
        }).filter(nomination => nomination.nominee);
        
        setNominations(nominationsData);
        setFilteredNominations(nominationsData);
        setLoading(false);
      }, (error) => {
        console.error('Error fetching nominations:', error);
        setLoading(false);
      });
    };

    setupNominationsListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    console.log('Search effect running with term:', searchTerm);
    if (!nominations || nominations.length === 0) {
      setFilteredNominations([]);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = nominations.filter(nomination => {
      if (!nomination || !nomination.nominee) return false;
      
      const nameMatch = nomination.nominee.name?.toLowerCase().includes(searchTermLower);
      const categoryMatch = nomination.nominee.category?.toLowerCase().includes(searchTermLower);
      const nominatorMatch = nomination.type === 'other' && 
        nomination.nominator?.name?.toLowerCase().includes(searchTermLower);

      return nameMatch || categoryMatch || nominatorMatch;
    });

    setFilteredNominations(filtered);
  }, [searchTerm, nominations]);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await createOrUpdateUser(result.user);
        console.log('User signed in successfully');
      }
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Sign-in popup was closed');
      } else {
        console.error('Error signing in:', error);
      }
    }
  };

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          // User successfully signed in
          await createOrUpdateUser(result.user);
          console.log('User data saved/updated in Firestore');
        }
      } catch (error) {
        if (error.code !== 'auth/popup-closed-by-user') {
          console.error('Error signing in:', error);
        }
      }
    };

    handleRedirectResult();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const handleNominateClick = () => {
    setShowNominationModal(true)
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    console.log('Search term:', value);
  };

  const shouldShowSearch = () => {
    return !['/leaderboard', '/jury'].includes(location.pathname);
  };

  const shouldShowRulesButton = () => {
    return location.pathname !== '/rules';
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingState>Loading nominations...</LoadingState>;
    }

    if (!nominations.length) {
      return (
        <EmptyState>
          <EmptyStateTitle>No nominations yet</EmptyStateTitle>
          <EmptyStateText>
            Be the first one to kick things off!
          </EmptyStateText>
          {!user && (
            <EmptyStateButton onClick={handleSignIn}>
              Sign In to Get Started
            </EmptyStateButton>
          )}
        </EmptyState>
      );
    }

    if (searchTerm && !filteredNominations.length) {
      return (
        <EmptyState>
          <EmptyStateTitle>No results found</EmptyStateTitle>
          <EmptyStateText>
            Try adjusting your search terms
          </EmptyStateText>
        </EmptyState>
      );
    }

    return (
      <NominationsGrid>
        {filteredNominations.map(nomination => (
          <NominationCard 
            key={nomination.id} 
            nomination={nomination}
          />
        ))}
      </NominationsGrid>
    );
  };

  return (
    <AuthProvider>
      <Container>
        <MobileOverlay>
          <MobileMessage>FiesTA Awwards is best suited for desktop view</MobileMessage>
          <EmojiContainer>🏆</EmojiContainer>
          <MobileSubtext>
            These amazing recruiters deserve a bigger space to shine! ✨
            <br /><br />
            Please visit us on your desktop for the full experience.
          </MobileSubtext>
        </MobileOverlay>

        <Header>
          <Logo>
            <Title onClick={() => navigate('/')}>FiesTA Awwards</Title>
            <Countdown>{timeLeft}</Countdown>
          </Logo>
          {shouldShowSearch() && (
            <SearchBar 
              type="text" 
              placeholder="Search by name, category or nominator..."
              value={searchTerm}
              onChange={handleSearch}
            />
          )}
          <HeaderButtons>
            <LeaderboardButton onClick={() => navigate('/leaderboard')}>
              Leaderboard
            </LeaderboardButton>
            <JuryButton onClick={() => navigate('/jury')}>Jury</JuryButton>
            {user ? (
              <>
                <NominateButton onClick={handleNominateClick}>Nominate</NominateButton>
                <UserInfo>
                  <UserImage src={user.photoURL} alt={user.displayName} />
                  <UserName>{user.displayName}</UserName>
                  <SignInButton onClick={handleSignOut}>Sign Out</SignInButton>
                </UserInfo>
              </>
            ) : (
              <SignInButton onClick={handleSignIn}>Sign In with Google</SignInButton>
            )}
          </HeaderButtons>
        </Header>

        <Routes>
          <Route path="/jury" element={<JuryPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/" element={renderContent()} />
        </Routes>

        {showNominationModal && (
          <NominationModal onClose={() => setShowNominationModal(false)} />
        )}

        {shouldShowRulesButton() && (
          <FloatingRulesButton onClick={() => navigate('/rules')}>
            Rules
          </FloatingRulesButton>
        )}
      </Container>
    </AuthProvider>
  );
}

export default App 