import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
`;

const SectionTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  color: #00d4ff;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const LocationName = styled(motion.h4)`
  color: white;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const LocationImage = styled(motion.img)`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const LocationDescription = styled(motion.p)`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const FactsList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FactItem = styled(motion.div)`
  background: rgba(0, 212, 255, 0.1);
  border-left: 3px solid #00d4ff;
  padding: 0.75rem;
  border-radius: 0 8px 8px 0;
  font-size: 0.85rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
`;

const CoordinatesBox = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 10px;
  padding: 1rem;
  margin-top: auto;
`;

const CoordinateLabel = styled.div`
  color: #00d4ff;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
`;

const CoordinateValue = styled.div`
  color: white;
  font-family: 'Orbitron', monospace;
  font-size: 0.9rem;
`;

const BenefitsSection = styled(motion.div)`
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 10px;
  padding: 1rem;
  margin-top: 1rem;
`;

const BenefitsTitle = styled.h5`
  color: #00d4ff;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const BenefitsText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  line-height: 1.4;
`;

const LocationInfo = ({ location }) => {
  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const getBenefitsText = (locationName) => {
    const benefits = {
      'Amazon Rainforest': 'Monitoring deforestation helps protect biodiversity and climate regulation. ISS observations aid in conservation efforts and understanding carbon cycles.',
      'Sahara Desert': 'Tracking dust storms helps predict weather patterns and understand how desert dust fertilizes distant ecosystems like the Amazon.',
      'Great Barrier Reef': 'Satellite monitoring helps track coral bleaching and reef health, crucial for marine ecosystem conservation and climate research.',
      'Himalayas': 'Observing glacial changes helps scientists understand climate change impacts on water resources for billions of people.',
      'Aurora Borealis': 'Studying auroras helps us understand space weather and its effects on satellites, GPS, and power grids on Earth.',
      'Pacific Ocean': 'Ocean monitoring helps track climate patterns, sea level changes, and marine ecosystem health affecting global weather.'
    };
    
    return benefits[locationName] || 'ISS observations of this region contribute to our understanding of Earth systems and climate change.';
  };

  return (
    <InfoContainer>
      <SectionTitle>Location Details</SectionTitle>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={location.name}
      >
        <LocationName variants={itemVariants}>
          {location.name}
        </LocationName>
        
        <LocationImage 
          src={location.imageUrl} 
          alt={location.name} 
          variants={itemVariants}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 150, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <LocationDescription variants={itemVariants}>
          {location.description}
        </LocationDescription>

        <div>
          <h5 style={{ 
            color: '#00d4ff', 
            fontSize: '0.9rem', 
            marginBottom: '0.75rem',
            fontWeight: 600
          }}>
            Key Facts
          </h5>
          <FactsList variants={itemVariants}>
            {location.facts.map((fact, index) => (
              <FactItem
                key={index}
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                • {fact}
              </FactItem>
            ))}
          </FactsList>
        </div>

        <BenefitsSection variants={itemVariants}>
          <BenefitsTitle>How This Benefits Humanity</BenefitsTitle>
          <BenefitsText>
            {getBenefitsText(location.name)}
          </BenefitsText>
        </BenefitsSection>

        <CoordinatesBox variants={itemVariants}>
          <CoordinateLabel>COORDINATES</CoordinateLabel>
          <CoordinateValue>
            Lat: {location.coordinates.lat.toFixed(4)}°
          </CoordinateValue>
          <CoordinateValue>
            Lng: {location.coordinates.lng.toFixed(4)}°
          </CoordinateValue>
        </CoordinatesBox>
      </motion.div>
    </InfoContainer>
  );
};

export default LocationInfo;
