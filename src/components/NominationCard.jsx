import styled from 'styled-components';
import { FaLinkedin, FaThumbsUp } from 'react-icons/fa';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { submitVote } from '../services/votingService';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { NominationDetailModal } from './NominationDetailModal';

const Card = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 1.5rem;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.1);
  }

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
`

const Header = styled.div`
  margin-bottom: 0.75rem;
`

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`

const Name = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;
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
`

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
`

const Category = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  background: rgba(76, 175, 80, 0.1);
  color: #81c784;
  font-size: 0.875rem;
  margin-top: 0.75rem;
`

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 1.5rem 0;
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;

  svg {
    opacity: 0.7;
  }

  span {
    color: white;
    font-weight: 500;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  position: relative;
`

const Button = styled.button`
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
`

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 1rem 0;
`

const NominatorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
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
  bottom: 100%;
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

export const NominationCard = ({ nomination }) => {
  const { currentUser, userDetails } = useAuth();
  const [hasVoted, setHasVoted] = useState(false);
  const isJury = userDetails?.jury || false;
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (currentUser && userDetails) {
      console.log('User status:', {
        isJury: userDetails.jury,
        normalUser: userDetails.normalUser
      });
    }
  }, [currentUser, userDetails]);

  const { nominee, type, nominator, totalVotes, juryScore } = nomination;

  const handleVote = useCallback(async () => {
    if (!currentUser || hasVoted) return;

    try {
      console.log('Submitting vote with jury status:', isJury); // Debug log
      await submitVote(nomination.id, currentUser.uid, isJury);
      setHasVoted(true);
    } catch (error) {
      console.error('Error voting:', error);
    }
  }, [currentUser, hasVoted, nomination.id, isJury]);

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

  if (!nominee) {
    return null;
  }

  const memoizedContent = useMemo(() => (
    <Card $type={type} onClick={() => setShowDetail(true)} style={{ cursor: 'pointer' }}>
      <Header>
        <NameRow>
          <Name>{nominee.name}</Name>
          <NominationType $type={type}>
            {type === 'self' ? '🎯 Self' : '👥 Peer'}
          </NominationType>
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
        
        <div 
          onMouseEnter={() => !currentUser && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Button
            onClick={currentUser ? handleVote : undefined}
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

      {type === 'other' && nominator && (
        <>
          <Divider />
          <NominatorInfo>
            Nominated by <NominatorName>{nominator.name}</NominatorName>
          </NominatorInfo>
        </>
      )}
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
    </>
  );
}; 