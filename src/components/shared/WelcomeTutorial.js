import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const TutorialOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
`;

const TutorialCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(12, 12, 12, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%);
  border: 2px solid #00d4ff;
  border-radius: 25px;
  padding: 3rem;
  max-width: 700px;
  width: 100%;
  text-align: center;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 212, 255, 0.3);
`;

const WelcomeTitle = styled(motion.h1)`
  font-family: 'Orbitron', monospace;
  font-size: 2.5rem;
  background: linear-gradient(45deg, #00d4ff, #ffffff, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const WelcomeSubtitle = styled(motion.p)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const FeatureItem = styled(motion.div)`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  color: #00d4ff;
  font-family: 'Orbitron', monospace;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const TutorialButton = styled(motion.button)`
  background: ${props => props.primary ? 
    'linear-gradient(45deg, #0099cc, #00d4ff)' : 
    'transparent'};
  border: 2px solid #00d4ff;
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background: ${props => props.primary ? 
      'linear-gradient(45deg, #00b3e6, #1ae6ff)' : 
      'rgba(0, 212, 255, 0.1)'};
  }
`;

const SkipButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    color: #00d4ff;
  }
`;

const WelcomeTutorial = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user has seen the tutorial before
    const hasSeenTutorial = localStorage.getItem('hasSeenWelcomeTutorial');
    if (!hasSeenTutorial) {
      setIsVisible(true);
    }
  }, []);

  const tutorialSteps = [
    {
      title: "Welcome to the ISS Experience! 🚀",
      subtitle: "Explore space through the eyes of an astronaut and learn how space exploration benefits humanity.",
      features: [
        {
          icon: "🌍",
          title: "Cupola Experience",
          description: "View Earth from the ISS observation deck with real NASA imagery"
        },
        {
          icon: "🏊‍♂️",
          title: "NBL Training",
          description: "Train like an astronaut in the Neutral Buoyancy Laboratory"
        },
        {
          icon: "🎓",
          title: "Learn & Discover",
          description: "Discover fascinating facts about space and Earth science"
        }
      ]
    }
  ];

  const handleStart = () => {
    localStorage.setItem('hasSeenWelcomeTutorial', 'true');
    setIsVisible(false);
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenWelcomeTutorial', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <AnimatePresence>
      <TutorialOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TutorialCard
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SkipButton
            onClick={handleSkip}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Skip ✕
          </SkipButton>

          <WelcomeTitle
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {currentTutorial.title}
          </WelcomeTitle>

          <WelcomeSubtitle
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {currentTutorial.subtitle}
          </WelcomeSubtitle>

          <FeatureGrid
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {currentTutorial.features.map((feature, index) => (
              <FeatureItem
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureItem>
            ))}
          </FeatureGrid>

          <ButtonGroup
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <TutorialButton
              primary
              onClick={handleStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Start Exploring
            </TutorialButton>
            <TutorialButton
              onClick={handleSkip}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Maybe Later
            </TutorialButton>
          </ButtonGroup>
        </TutorialCard>
      </TutorialOverlay>
    </AnimatePresence>
  );
};

export default WelcomeTutorial;
