import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { auth, signInWithGoogle } from './firebase'
import { signOut } from 'firebase/auth'
import { NominationModal } from './components/NominationModal'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { collection, query, orderBy, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import { NominationCard } from './components/NominationCard'
import { createOrUpdateUser } from './services/authService'
import { useNavigate, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { JuryPage } from './components/JuryPage'
import { RulesPage } from './components/RulesPage'
import { WinnersPage } from './components/WinnersPage'
import { FaTrophy } from 'react-icons/fa'

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const Title = styled.h1`
  margin: 0;
  color: white;
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 1px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
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
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    max-width: none;
    padding: 0.7rem 1rem;
    font-size: 0.85rem;
  }

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
    padding: 0.3rem;
    gap: 0.5rem;
    background: transparent;
    max-width: fit-content;
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
  gap: 1rem;
  margin-left: auto;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    gap: 0.5rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.25rem;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    button {
      flex: 1;
      min-width: max-content;
      padding: 0.5rem 0.75rem;
      font-size: 0.85rem;
    }
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

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
`

const Container = styled.div`
  min-height: 100vh;
  background: #121212;
`

const UserImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  object-fit: cover;
`

const UserInitials = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 500;
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

  @media (max-width: 768px) {
    display: none;
  }
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

const EmojiContainer = styled.div`
  font-size: 3rem;
  margin: 2rem 0;
`

const WinnersButton = styled(JuryButton)`
  &::before {
    content: '📋';
  }
`

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const NotificationBanner = styled.div`
  background: rgba(244, 67, 54, 0.1);
  color: #ef9a9a;
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid rgba(244, 67, 54, 0.2);
  font-size: 0.9rem;
`;

const isVotingPeriodActive = () => {
  const deadline = new Date('2025-01-15T23:59:00');
  return new Date() <= deadline;
};

const isNominationPeriodActive = () => {
  const deadline = new Date('2025-01-15T23:59:00');
  return new Date() <= deadline;
};

function AppContent() {
  const [user, setUser] = useState(null)
  const [showNominationModal, setShowNominationModal] = useState(false)
  const [nominations, setNominations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNominations, setFilteredNominations] = useState([]);
  const navigate = useNavigate()
  const location = useLocation();
  const isWinnersPage = location.pathname === '/winners';
  const isJuryPage = location.pathname === '/jury';
  const isRulesPage = location.pathname === '/rules';
  const isVotingExpired = !isVotingPeriodActive();

  const { currentUser, userDetails, signIn } = useAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
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
            nominee: data.nominee,
            ...(data.type === 'other' && {
              nominator: data.nominator,
              recommendation: data.recommendation
            }),
            categoryQuestions: data.categoryQuestions
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchTerm(decodeURIComponent(searchFromUrl));
      // Clear the search param from URL without affecting the browser history
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [location.search]);

  useEffect(() => {
    // Redirect to winners page if at root
    if (location.pathname === '/') {
      navigate('/winners');
    }
  }, [location, navigate]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in:", error)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
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
    return location.pathname !== '/rules' && location.pathname !== '/winners';
  };

  const shouldShowRulesButton = () => {
    return location.pathname !== '/rules' && location.pathname !== '/winners';
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
    <Container>
      {isVotingExpired && !isWinnersPage && !isJuryPage && !isRulesPage && (
        <NotificationBanner>
          Winner are already announced. Thank you for participating! 🎉
        </NotificationBanner>
      )}
      <Header>
        <Logo>
          <Title onClick={() => navigate('/')}>FiesTA Awwards</Title>
        </Logo>
        
        {!isWinnersPage && !isJuryPage && !isRulesPage && (
          <SearchBar 
            type="text" 
            placeholder="Search by name, category or nominator..."
            value={searchTerm}
            onChange={handleSearch}
          />
        )}

        <HeaderButtons>
          <JuryButton onClick={() => navigate('/jury')}>Jury</JuryButton>
        </HeaderButtons>
      </Header>

      <Routes>
        <Route path="/jury" element={<JuryPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/winners" element={<WinnersPage />} />
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
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to winners page if at root
    if (location.pathname === '/') {
      navigate('/winners');
    }
  }, [location, navigate]);

  const shouldShowSearchBar = () => {
    return location.pathname !== '/rules' && location.pathname !== '/winners';
  };

  const shouldShowRulesButton = () => {
    return location.pathname !== '/rules' && location.pathname !== '/winners';
  };

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App 