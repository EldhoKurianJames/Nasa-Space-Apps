import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const FactsContainer = styled(motion.div)`
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid #ff6b00;
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(255, 107, 0, 0.3);
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FactsTitle = styled.h2`
  font-family: 'Orbitron', monospace;
  color: #ff6b00;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const FactCard = styled(motion.div)`
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FactIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FactText = styled.div`
  color: white;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const FactCategory = styled.div`
  color: #ff6b00;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const NavButton = styled(motion.button)`
  background: rgba(255, 107, 0, 0.2);
  border: 2px solid #ff6b00;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: #ff6b00;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 107, 0, 0.3);
    transform: scale(1.1);
  }
`;

const ISSFacts = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const facts = [
    {
      icon: '🚀',
      text: 'The ISS travels at 17,500 mph (28,000 km/h), completing an orbit around Earth every 90 minutes!',
      category: 'Speed & Orbit'
    },
    {
      icon: '🏠',
      text: 'The ISS is about the size of a football field and weighs approximately 925,000 pounds (420,000 kg).',
      category: 'Size & Weight'
    },
    {
      icon: '🌅',
      text: 'Astronauts on the ISS experience 16 sunrises and sunsets every day due to their rapid orbit.',
      category: 'Daily Life'
    },
    {
      icon: '🔬',
      text: 'Over 3,000 scientific experiments have been conducted on the ISS since it became operational.',
      category: 'Science'
    },
    {
      icon: '🌍',
      text: 'The ISS has been continuously inhabited for over 20 years, making it humanity\'s longest-running space habitat.',
      category: 'History'
    },
    {
      icon: '💧',
      text: 'The ISS recycles 93% of all water onboard, including humidity from the air and even urine!',
      category: 'Life Support'
    },
    {
      icon: '⚡',
      text: 'The ISS generates power using solar panels that cover an area larger than a basketball court.',
      category: 'Power Systems'
    },
    {
      icon: '🌡️',
      text: 'The ISS experiences temperature extremes from -250°F (-157°C) to +250°F (+121°C) as it orbits Earth.',
      category: 'Environment'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % facts.length);
    }, 8000); // Auto-advance every 8 seconds

    return () => clearInterval(interval);
  }, [facts.length]);

  const nextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % facts.length);
  };

  const prevFact = () => {
    setCurrentFactIndex((prev) => (prev - 1 + facts.length) % facts.length);
  };

  return (
    <FactsContainer
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FactsTitle>🌟 Amazing ISS Facts</FactsTitle>
      
      <AnimatePresence mode="wait">
        <FactCard
          key={currentFactIndex}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -90 }}
          transition={{ duration: 0.5 }}
        >
          <FactIcon>{facts[currentFactIndex].icon}</FactIcon>
          <FactText>{facts[currentFactIndex].text}</FactText>
          <FactCategory>{facts[currentFactIndex].category}</FactCategory>
        </FactCard>
      </AnimatePresence>

      <NavigationButtons>
        <NavButton
          onClick={prevFact}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </NavButton>
        <NavButton
          onClick={nextFact}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          →
        </NavButton>
      </NavigationButtons>
    </FactsContainer>
  );
};

export default ISSFacts;
