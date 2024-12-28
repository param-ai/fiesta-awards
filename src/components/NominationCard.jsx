import styled from 'styled-components';
import { FaLinkedin, FaThumbsUp, FaShare } from 'react-icons/fa';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { submitVote } from '../services/votingService';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { NominationDetailModal } from './NominationDetailModal';
import { JuryVoteModal } from './JuryVoteModal';
import { Toast } from './Toast';

const Card = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 1.5rem;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  min-height: 320px;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.$type === 'self' ? 
      'linear-gradient(to right, #9c27b0, #673ab7)' : 
      'linear-gradient(to right, #2196f3, #00bcd4)'};
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
    border-radius: 12px;
    min-height: 280px;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const NameRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
`

const Name = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const NominationType = styled.span`
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  background: ${props => props.$type === 'self' ? 
    'rgba(103, 58, 183, 0.1)' : 
    'rgba(33, 150, 243, 0.1)'};
  color: ${props => props.$type === 'self' ? 
    '#b39ddb' : 
    '#90caf9'};
  flex-shrink: 0;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
  }
`

const NominationTypeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 28px;

  @media (max-width: 768px) {
    height: auto;
  }
`

const CompanyInfo = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 1.3;
  }
`

const Category = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  background: rgba(76, 175, 80, 0.1);
  color: #81c784;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  align-self: flex-start;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
    margin-top: 0.375rem;
  }
`

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 15px;
  margin-top: auto;

  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 12px;
  }
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    gap: 0.375rem;
  }

  svg {
    opacity: 0.7;
    font-size: 14px;
  }

  span {
    color: white;
    font-weight: 500;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding-top: 0.875rem;
    gap: 0.75rem;
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
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  min-width: 120px;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => props.$voted && `
    background: rgba(76, 175, 80, 0.1);
    color: #81c784;
    border-color: rgba(76, 175, 80, 0.2);
  `}

  ${props => props.$isJury && !props.$voted && `
    background: rgba(255, 193, 7, 0.1);
    color: #ffd54f;
    border-color: rgba(255, 193, 7, 0.2);
  `}

  @media (max-width: 768px) {
    padding: 0.625rem 0.875rem;
    min-width: 100px;
    font-size: 0.8rem;
    gap: 0.375rem;
  }
`

const NominatorInfo = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);

  @media (max-width: 768px) {
    margin-top: 0.625rem;
    padding-top: 0.625rem;
    font-size: 0.75rem;
    border-top-color: rgba(255, 255, 255, 0.05);
  }
`

const NominatorName = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`

const Tooltip = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  pointer-events: none;
  transition: all 0.2s ease;
  opacity: 0;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  white-space: nowrap;
  z-index: 1000;

  ${props => props.$show && `
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  `}

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.9) transparent transparent transparent;
  }
`

const DesktopShareButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.75rem;

  @media (min-width: 769px) {
    display: flex;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }
`

const MobileShareButton = styled(Button)`
  @media (min-width: 769px) {
    display: none;
  }
`

const ShareToastMessage = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  z-index: 1000;
  opacity: ${props => props.$show ? 1 : 0};
  transition: opacity 0.3s ease;
`

const LinkedInButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background: rgba(10, 102, 194, 0.1);
  color: #0a66c2;
  border: 1px solid rgba(10, 102, 194, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(10, 102, 194, 0.2);
    transform: translateY(-2px);
  }

  svg {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    
    svg {
      font-size: 12px;
    }
  }
`

export const NominationCard = ({ nomination }) => {
  const { currentUser, userDetails } = useAuth();
  const [hasVoted, setHasVoted] = useState(false);
  const isJury = userDetails?.jury || false;
  const [showTooltip, setShowTooltip] = useState(false);
  const [showJuryModal, setShowJuryModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isToastHiding, setIsToastHiding] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  useEffect(() => {
    if (currentUser && userDetails) {
      console.log('User status:', {
        isJury: userDetails.jury,
        normalUser: userDetails.normalUser
      });
    }
  }, [currentUser, userDetails]);

  const { nominee, type, nominator, totalVotes, juryScore } = nomination;

  const handleVote = useCallback(async (e) => {
    // Stop event propagation to prevent card click
    e.stopPropagation();
    
    if (!currentUser || hasVoted) return;

    if (isJury) {
      setShowJuryModal(true);
    } else {
      try {
        await submitVote(nomination.id, currentUser.uid, false);
        setHasVoted(true);
        // Show toast
        setShowToast(true);
        // Start hiding animation after 700ms
        setTimeout(() => setIsToastHiding(true), 700);
        // Remove toast after animation (300ms)
        setTimeout(() => setShowToast(false), 1000);
      } catch (error) {
        console.error('Error voting:', error);
      }
    }
  }, [currentUser, hasVoted, nomination.id, isJury]);

  const handleJuryVote = async (nominationId, points) => {
    try {
      await submitVote(nominationId, currentUser.uid, true, points);
      setHasVoted(true);
    } catch (error) {
      console.error('Error submitting jury vote:', error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const checkVote = async () => {
      if (!currentUser) return;
      
      try {
        const voteDoc = await getDoc(
          doc(db, 'votes', `${currentUser.uid}_${nomination.id}`)
        );
        if (isMounted) {
          setHasVoted(voteDoc.exists());
        }
      } catch (error) {
        console.error('Error checking vote:', error);
      }
    };

    if (currentUser) {
      checkVote();
    }

    return () => {
      isMounted = false;
    };
  }, [currentUser, nomination.id]);

  // Add state for modal
  const [showDetail, setShowDetail] = useState(false);

  const handleShare = async (e) => {
    e.stopPropagation();
    const searchParam = encodeURIComponent(nomination.nominee.name);
    const url = `${window.location.origin}/?search=${searchParam}`;
    
    try {
      await navigator.clipboard.writeText(url);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  if (!nominee) {
    return null;
  }

  const memoizedContent = useMemo(() => (
    <Card $type={type} onClick={() => setShowDetail(true)} style={{ cursor: 'pointer' }}>
      <Content>
        <Header>
          <NameRow>
            <Name>
              {nomination.nominee.name}
            </Name>
            <NominationTypeGroup>
              <DesktopShareButton onClick={handleShare}>
                <FaShare style={{ marginRight: '4px' }} /> Share
              </DesktopShareButton>
              <NominationType $type={type}>
                {type === 'self' ? 'Self' : 'Peer'}
              </NominationType>
              {nomination.nominee.linkedinUrl && (
                <LinkedInButton 
                  href={nomination.nominee.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </LinkedInButton>
              )}
            </NominationTypeGroup>
          </NameRow>
          <CompanyInfo>
            {nominee.company} • {nominee.jobTitle}
          </CompanyInfo>
          <Category>{nominee.category}</Category>
        </Header>

        <Stats>
          <StatItem>
            <FaThumbsUp size={14} /> 
            <span>{totalVotes || 0}</span> votes
          </StatItem>
          <StatItem>
            Jury Score: <span>{juryScore || 0}</span>
          </StatItem>
        </Stats>

        <Actions>
          <Button 
            as="a"
            href={nominee.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin /> Profile
          </Button>
          
          <MobileShareButton onClick={handleShare}>
            <FaShare /> Share
          </MobileShareButton>
          
          <div 
            onMouseEnter={() => !currentUser && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Button
              onClick={handleVote}
              disabled={hasVoted}
              $voted={hasVoted}
              $isJury={isJury}
              style={{ cursor: currentUser ? 'pointer' : 'not-allowed' }}
            >
              <FaThumbsUp />
              {hasVoted ? 'Voted' : isJury ? 'Jury (+50)' : 'Vote'}
            </Button>
            {!currentUser && (
              <Tooltip $show={showTooltip}>
                Login to upvote please
              </Tooltip>
            )}
          </div>
        </Actions>

        <NominatorInfo>
          Nominated by {nomination.type === 'self' ? 'Self' : nominator.name}
        </NominatorInfo>
      </Content>
    </Card>
  ), [nominee, type, nominator, totalVotes, juryScore, hasVoted, currentUser, isJury, showTooltip]);

  return (
    <>
      {memoizedContent}

      {showDetail && (
        <NominationDetailModal 
          nomination={nomination}
          onClose={() => setShowDetail(false)}
        />
      )}

      {showJuryModal && (
        <JuryVoteModal
          onClose={() => setShowJuryModal(false)}
          onSubmit={handleJuryVote}
          nominationId={nomination.id}
          nomineeName={nominee.name}
        />
      )}

      {showToast && (
        <Toast 
          message="Your vote has been recorded. Great job! 🎉" 
          hiding={isToastHiding}
        />
      )}

      {showShareToast && (
        <ShareToastMessage $show={true}>
          Link copied to clipboard! 🎉
        </ShareToastMessage>
      )}
    </>
  );
}; 