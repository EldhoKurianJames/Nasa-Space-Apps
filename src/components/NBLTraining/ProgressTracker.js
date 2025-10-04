import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { showNotification } from '../shared/NotificationSystem';

const TrackerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TrackerCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  color: #00d4ff;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #00d4ff;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
`;

const SkillBar = styled.div`
  margin-bottom: 1rem;
`;

const SkillLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
`;

const SkillProgress = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;
`;

const SkillFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #0099cc, #00d4ff);
  border-radius: 4px;
`;

const AchievementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Achievement = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${props => props.unlocked ? 
    'rgba(0, 212, 255, 0.1)' : 
    'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.unlocked ? 
    'rgba(0, 212, 255, 0.3)' : 
    'rgba(255, 255, 255, 0.1)'};
  border-radius: 8px;
  opacity: ${props => props.unlocked ? 1 : 0.6};
`;

const AchievementIcon = styled.div`
  font-size: 1.5rem;
  filter: ${props => props.unlocked ? 'none' : 'grayscale(1)'};
`;

const AchievementInfo = styled.div`
  flex: 1;
`;

const AchievementTitle = styled.div`
  color: ${props => props.unlocked ? '#00d4ff' : 'rgba(255, 255, 255, 0.6)'};
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const AchievementDesc = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
`;

const TipCard = styled(motion.div)`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 10px;
  padding: 1rem;
  margin-top: 1rem;
`;

const TipTitle = styled.div`
  color: #00d4ff;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const TipText = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  line-height: 1.4;
`;

const ProgressTracker = ({ astronautStats, gameMode }) => {
  const calculateSkillLevel = (stat, max) => {
    return Math.min((stat / max) * 100, 100);
  };

  // Track achievements and show notifications
  useEffect(() => {
    const achievements = [
      {
        id: 'first_neutral',
        title: 'Neutral Buoyancy Achieved!',
        description: 'You successfully achieved neutral buoyancy for the first time.',
        unlocked: Math.abs(astronautStats.weight + astronautStats.equipment - 70) <= 2
      },
      {
        id: 'mission_complete',
        title: 'Mission Specialist',
        description: 'Congratulations on completing your first training mission!',
        unlocked: astronautStats.completedMissions > 0
      },
      {
        id: 'score_100',
        title: 'Point Collector',
        description: 'You have earned 100 total points in training!',
        unlocked: astronautStats.totalScore >= 100
      },
      {
        id: 'expert_trainer',
        title: 'Expert Trainer',
        description: 'Amazing! You have completed 5 training missions.',
        unlocked: astronautStats.completedMissions >= 5
      }
    ];

    // Check for newly unlocked achievements
    achievements.forEach(achievement => {
      if (achievement.unlocked) {
        const wasUnlocked = localStorage.getItem(`achievement_${achievement.id}`);
        if (!wasUnlocked) {
          localStorage.setItem(`achievement_${achievement.id}`, 'true');
          showNotification('achievement', achievement.title, achievement.description, 6000);
        }
      }
    });
  }, [astronautStats]);

  const achievements = [
    {
      id: 'first_neutral',
      title: 'Neutral Buoyancy',
      description: 'Achieve neutral buoyancy for the first time',
      icon: '⚖️',
      unlocked: Math.abs(astronautStats.weight + astronautStats.equipment - 70) <= 2
    },
    {
      id: 'mission_complete',
      title: 'Mission Specialist',
      description: 'Complete your first training mission',
      icon: '🎯',
      unlocked: astronautStats.completedMissions > 0
    },
    {
      id: 'score_100',
      title: 'Point Collector',
      description: 'Earn 100 total points',
      icon: '💯',
      unlocked: astronautStats.totalScore >= 100
    },
    {
      id: 'expert_trainer',
      title: 'Expert Trainer',
      description: 'Complete 5 training missions',
      icon: '🏆',
      unlocked: astronautStats.completedMissions >= 5
    }
  ];

  const getTipForMode = () => {
    const tips = {
      buoyancy: {
        title: 'Buoyancy Control Tip',
        text: 'In real NBL training, astronauts wear weighted belts and use foam blocks to achieve neutral buoyancy. The goal is to neither sink nor float, allowing for realistic spacewalk simulation.'
      },
      missions: {
        title: 'Mission Training Tip',
        text: 'Real astronauts spend hundreds of hours in the NBL practicing specific EVA procedures. Each mission is carefully choreographed and timed to match actual spacewalk requirements.'
      },
      lunar: {
        title: 'Lunar Training Tip',
        text: 'The NBL can simulate lunar gravity by having astronauts descend to the pool floor. This helps prepare for future Moon missions where gravity is 1/6th of Earth\'s.'
      }
    };
    
    return tips[gameMode] || tips.buoyancy;
  };

  return (
    <TrackerContainer
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <TrackerCard>
        <CardTitle>Training Stats</CardTitle>
        <StatGrid>
          <StatItem>
            <StatValue>{astronautStats.completedMissions}</StatValue>
            <StatLabel>Missions</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{astronautStats.totalScore}</StatValue>
            <StatLabel>Points</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{astronautStats.weight}kg</StatValue>
            <StatLabel>Weight</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{astronautStats.equipment}kg</StatValue>
            <StatLabel>Equipment</StatLabel>
          </StatItem>
        </StatGrid>

        <SkillBar>
          <SkillLabel>
            <span>Buoyancy Control</span>
            <span>{Math.round(calculateSkillLevel(astronautStats.totalScore, 200))}%</span>
          </SkillLabel>
          <SkillProgress>
            <SkillFill
              animate={{ width: `${calculateSkillLevel(astronautStats.totalScore, 200)}%` }}
              transition={{ duration: 0.8 }}
            />
          </SkillProgress>
        </SkillBar>

        <SkillBar>
          <SkillLabel>
            <span>Mission Experience</span>
            <span>{Math.round(calculateSkillLevel(astronautStats.completedMissions, 10))}%</span>
          </SkillLabel>
          <SkillProgress>
            <SkillFill
              animate={{ width: `${calculateSkillLevel(astronautStats.completedMissions, 10)}%` }}
              transition={{ duration: 0.8 }}
            />
          </SkillProgress>
        </SkillBar>
      </TrackerCard>

      <TrackerCard>
        <CardTitle>Achievements</CardTitle>
        <AchievementsList>
          {achievements.map(achievement => (
            <Achievement
              key={achievement.id}
              unlocked={achievement.unlocked}
              whileHover={{ scale: achievement.unlocked ? 1.02 : 1 }}
            >
              <AchievementIcon unlocked={achievement.unlocked}>
                {achievement.icon}
              </AchievementIcon>
              <AchievementInfo>
                <AchievementTitle unlocked={achievement.unlocked}>
                  {achievement.title}
                </AchievementTitle>
                <AchievementDesc>
                  {achievement.description}
                </AchievementDesc>
              </AchievementInfo>
            </Achievement>
          ))}
        </AchievementsList>
      </TrackerCard>

      <TipCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <TipTitle>{getTipForMode().title}</TipTitle>
        <TipText>{getTipForMode().text}</TipText>
      </TipCard>
    </TrackerContainer>
  );
};

export default ProgressTracker;
