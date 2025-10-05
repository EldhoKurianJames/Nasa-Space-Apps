import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const TrackerContainer = styled(motion.div)`
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid #00d4ff;
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
`;

const TrackerTitle = styled.h2`
  font-family: 'Orbitron', monospace;
  color: #00d4ff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const ISSInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const InfoCard = styled(motion.div)`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
`;

const InfoLabel = styled.div`
  color: #00d4ff;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const InfoValue = styled.div`
  color: white;
  font-family: 'Orbitron', monospace;
  font-size: 1.2rem;
  font-weight: 700;
`;

const CrewSection = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 212, 255, 0.3);
`;

const CrewTitle = styled.h3`
  color: #00d4ff;
  font-family: 'Orbitron', monospace;
  margin-bottom: 1rem;
  text-align: center;
`;

const CrewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const CrewMember = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
`;

const AstronautEmoji = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const AstronautName = styled.div`
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
`;

const StatusIndicator = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 255, 0, 0.2);
  border: 1px solid #00ff00;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  margin: 1rem auto;
  font-size: 0.9rem;
  color: #00ff00;
  font-weight: 600;
`;

const StatusDot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background: #00ff00;
  border-radius: 50%;
`;

const ISSTracker = () => {
  const [issData, setIssData] = useState({
    latitude: 0,
    longitude: 0,
    altitude: 408,
    velocity: 27600,
    visibility: 'daylight'
  });

  const [crew] = useState([
    { name: 'Commander', emoji: '👨‍🚀' },
    { name: 'Flight Engineer 1', emoji: '👩‍🚀' },
    { name: 'Flight Engineer 2', emoji: '👨‍🚀' },
    { name: 'Flight Engineer 3', emoji: '👩‍🚀' },
    { name: 'Mission Specialist', emoji: '👨‍🚀' },
    { name: 'Science Officer', emoji: '👩‍🚀' }
  ]);

  useEffect(() => {
    // Simulate ISS position updates
    const interval = setInterval(() => {
      setIssData(prev => ({
        ...prev,
        latitude: (Math.random() - 0.5) * 180,
        longitude: (Math.random() - 0.5) * 360,
        altitude: 408 + (Math.random() - 0.5) * 10,
        velocity: 27600 + (Math.random() - 0.5) * 100
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TrackerContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <TrackerTitle>🛰️ ISS Live Tracker</TrackerTitle>
      
      <StatusIndicator>
        <StatusDot
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        ISS Status: Active & Operational
      </StatusIndicator>

      <ISSInfo>
        <InfoCard whileHover={{ scale: 1.05 }}>
          <InfoLabel>Latitude</InfoLabel>
          <InfoValue>{issData.latitude.toFixed(4)}°</InfoValue>
        </InfoCard>
        
        <InfoCard whileHover={{ scale: 1.05 }}>
          <InfoLabel>Longitude</InfoLabel>
          <InfoValue>{issData.longitude.toFixed(4)}°</InfoValue>
        </InfoCard>
        
        <InfoCard whileHover={{ scale: 1.05 }}>
          <InfoLabel>Altitude</InfoLabel>
          <InfoValue>{issData.altitude.toFixed(1)} km</InfoValue>
        </InfoCard>
        
        <InfoCard whileHover={{ scale: 1.05 }}>
          <InfoLabel>Velocity</InfoLabel>
          <InfoValue>{issData.velocity.toFixed(0)} km/h</InfoValue>
        </InfoCard>
      </ISSInfo>

      <CrewSection>
        <CrewTitle>👥 Current Crew (Expedition 70)</CrewTitle>
        <CrewGrid>
          {crew.map((member, index) => (
            <CrewMember
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AstronautEmoji>{member.emoji}</AstronautEmoji>
              <AstronautName>{member.name}</AstronautName>
            </CrewMember>
          ))}
        </CrewGrid>
      </CrewSection>
    </TrackerContainer>
  );
};

export default ISSTracker;
