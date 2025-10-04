import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterCustomization from './CharacterCustomization';
import EarthViewer from './EarthViewer';
import LocationInfo from './LocationInfo';

const CupolaContainer = styled.div`
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
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #00d4ff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ExperienceWrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  gap: 2rem;
  max-width: 1400px;
  width: 100%;
  height: 70vh;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 1rem;
  }
`;

const SidePanel = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 1.5rem;
  height: fit-content;
  
  @media (max-width: 1200px) {
    order: ${props => props.order || 0};
  }
`;

const CupolaViewport = styled(motion.div)`
  position: relative;
  background: rgba(0, 0, 0, 0.8);
  border: 3px solid #00d4ff;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.3) 70%);
    pointer-events: none;
    z-index: 2;
  }
`;

const ViewportHeader = styled.div`
  background: rgba(0, 212, 255, 0.2);
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid rgba(0, 212, 255, 0.3);
  position: relative;
  z-index: 3;
`;

const ViewportTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  color: #00d4ff;
  margin: 0;
`;

const CupolaExperience = () => {
  const [character, setCharacter] = useState({
    skinTone: 'light',
    hairColor: 'brown',
    suitColor: 'white',
    helmet: true
  });

  const [selectedLocation, setSelectedLocation] = useState({
    name: 'Pacific Ocean',
    coordinates: { lat: 0, lng: -140 },
    description: 'The vast Pacific Ocean stretches endlessly below, showing the incredible scale of our planet\'s water systems.',
    facts: [
      'Covers about 46% of Earth\'s water surface',
      'Contains more than half of the free water on Earth',
      'Home to the Ring of Fire - a major area of volcanic activity'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800'
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <CupolaContainer>
      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        ISS Cupola Experience
      </Title>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <ExperienceWrapper>
          <SidePanel variants={itemVariants} order={2}>
            <CharacterCustomization 
              character={character}
              setCharacter={setCharacter}
            />
          </SidePanel>

          <CupolaViewport variants={itemVariants}>
            <ViewportHeader>
              <ViewportTitle>Cupola - Window to the World</ViewportTitle>
            </ViewportHeader>
            <EarthViewer 
              character={character}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </CupolaViewport>

          <SidePanel variants={itemVariants} order={3}>
            <LocationInfo location={selectedLocation} />
          </SidePanel>
        </ExperienceWrapper>
      </motion.div>
    </CupolaContainer>
  );
};

export default CupolaExperience;
