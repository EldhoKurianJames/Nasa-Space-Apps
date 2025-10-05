import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import BuoyancySimulator from './BuoyancySimulator';
import TrainingMissions from './TrainingMissions';
import ProgressTracker from './ProgressTracker';
import LunarSimulation from './LunarSimulation';

const NBLContainer = styled.div`
  min-height: 100vh;
  padding: 100px 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h1)`
  font-family: 'Orbitron', monospace;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #00d4ff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  max-width: 600px;
  line-height: 1.6;
`;

const TrainingInterface = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  max-width: 1400px;
  width: 100%;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const MainPanel = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  min-height: 600px;
`;

const SidePanel = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GameModeSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ModeButton = styled(motion.button)`
  background: ${props => props.isActive ? 
    'linear-gradient(45deg, #0099cc, #00d4ff)' : 
    'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.isActive ? '#00d4ff' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 25px;
  padding: 1rem 2rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
  }
`;

const NBLTraining = () => {
  const [gameMode, setGameMode] = useState('buoyancy');
  const [astronautStats, setAstronautStats] = useState({
    completedMissions: 0,
    totalScore: 0
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const gameModes = [
    { id: 'buoyancy', label: 'Buoyancy Control', icon: '⚖️' },
    { id: 'missions', label: 'Training Missions', icon: '🎯' },
    { id: 'lunar', label: 'Lunar Simulation', icon: '🌙' }
  ];

  return (
    <NBLContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Title variants={itemVariants}>
          Neutral Buoyancy Laboratory Training
        </Title>
        
        <Subtitle variants={itemVariants}>
          Experience astronaut training in the world's largest indoor pool. Learn to control 
          buoyancy, complete spacewalk simulations, and prepare for lunar missions.
        </Subtitle>

        <GameModeSelector>
          {gameModes.map((mode) => (
            <ModeButton
              key={mode.id}
              isActive={gameMode === mode.id}
              onClick={() => setGameMode(mode.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span style={{ marginRight: '0.5rem' }}>{mode.icon}</span>
              {mode.label}
            </ModeButton>
          ))}
        </GameModeSelector>

        <TrainingInterface variants={itemVariants}>
          <MainPanel>
            <AnimatePresence mode="wait">
              {gameMode === 'buoyancy' && (
                <BuoyancySimulator
                  key="buoyancy"
                  astronautStats={astronautStats}
                  setAstronautStats={setAstronautStats}
                />
              )}
              {gameMode === 'missions' && (
                <TrainingMissions
                  key="missions"
                  astronautStats={astronautStats}
                  setAstronautStats={setAstronautStats}
                />
              )}
              {gameMode === 'lunar' && (
                <LunarSimulation
                  key="lunar"
                  astronautStats={astronautStats}
                  setAstronautStats={setAstronautStats}
                />
              )}
            </AnimatePresence>
          </MainPanel>

          <SidePanel>
            <ProgressTracker 
              astronautStats={astronautStats}
              gameMode={gameMode}
            />
          </SidePanel>
        </TrainingInterface>
      </motion.div>
    </NBLContainer>
  );
};

export default NBLTraining;
