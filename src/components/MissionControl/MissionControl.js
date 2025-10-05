import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ControlContainer = styled(motion.div)`
  background: rgba(0, 0, 0, 0.95);
  border: 2px solid #ff6b00;
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 900px;
  backdrop-filter: blur(15px);
  box-shadow: 0 0 30px rgba(255, 107, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff6b00, #00d4ff, #ff6b00);
    animation: scan 3s linear infinite;
  }
  
  @keyframes scan {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ControlTitle = styled.h2`
  font-family: 'Orbitron', monospace;
  color: #ff6b00;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  text-shadow: 0 0 10px rgba(255, 107, 0, 0.5);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ff6b00, transparent);
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
`;

const StatLabel = styled.div`
  color: #ff6b00;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StatValue = styled(motion.div)`
  color: white;
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const StatusPanel = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const StatusTitle = styled.h3`
  color: #00d4ff;
  font-family: 'Orbitron', monospace;
  margin-bottom: 1rem;
  text-align: center;
`;

const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StatusItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  background: rgba(0, 212, 255, 0.05);
  border-left: 3px solid ${props => props.status === 'active' ? '#00ff00' : props.status === 'warning' ? '#ffaa00' : '#00d4ff'};
  border-radius: 5px;
`;

const StatusIndicator = styled(motion.div)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.status === 'active' ? '#00ff00' : props.status === 'warning' ? '#ffaa00' : '#00d4ff'};
  box-shadow: 0 0 10px ${props => props.status === 'active' ? '#00ff00' : props.status === 'warning' ? '#ffaa00' : '#00d4ff'};
`;

const StatusText = styled.div`
  color: white;
  flex: 1;
  font-size: 0.9rem;
`;

const MissionControl = () => {
  const [stats, setStats] = useState({
    altitude: 408,
    velocity: 27600,
    orbits: 0,
    experiments: 3247,
    crewMembers: 6,
    daysInSpace: 8000
  });

  const [systemStatus] = useState([
    { id: 1, system: 'Life Support Systems', status: 'active', message: 'All systems nominal' },
    { id: 2, system: 'Solar Array Performance', status: 'active', message: 'Generating 84kW power' },
    { id: 3, system: 'Communication Array', status: 'active', message: 'Strong signal to ground' },
    { id: 4, system: 'Thermal Control', status: 'warning', message: 'Minor temperature fluctuation' },
    { id: 5, system: 'Attitude Control', status: 'active', message: 'Station orientation stable' },
    { id: 6, system: 'Research Modules', status: 'active', message: '12 experiments running' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        altitude: 408 + (Math.random() - 0.5) * 5,
        velocity: 27600 + (Math.random() - 0.5) * 50,
        orbits: prev.orbits + 0.001,
        experiments: prev.experiments + Math.floor(Math.random() * 2),
        daysInSpace: prev.daysInSpace + 0.01
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ControlContainer
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <ControlTitle>🎛️ Mission Control Center</ControlTitle>
      
      <StatsGrid>
        <StatCard whileHover={{ scale: 1.05 }}>
          <StatLabel>Altitude</StatLabel>
          <StatValue
            key={stats.altitude}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {stats.altitude.toFixed(1)} km
          </StatValue>
        </StatCard>
        
        <StatCard whileHover={{ scale: 1.05 }}>
          <StatLabel>Velocity</StatLabel>
          <StatValue
            key={stats.velocity}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {stats.velocity.toFixed(0)} km/h
          </StatValue>
        </StatCard>
        
        <StatCard whileHover={{ scale: 1.05 }}>
          <StatLabel>Orbits Today</StatLabel>
          <StatValue>
            {stats.orbits.toFixed(3)}
          </StatValue>
        </StatCard>
        
        <StatCard whileHover={{ scale: 1.05 }}>
          <StatLabel>Experiments</StatLabel>
          <StatValue
            key={stats.experiments}
            initial={{ scale: 1.2, color: '#00ff00' }}
            animate={{ scale: 1, color: '#ffffff' }}
            transition={{ duration: 0.5 }}
          >
            {stats.experiments}
          </StatValue>
        </StatCard>
        
        <StatCard whileHover={{ scale: 1.05 }}>
          <StatLabel>Crew Members</StatLabel>
          <StatValue>
            {stats.crewMembers}
          </StatValue>
        </StatCard>
        
        <StatCard whileHover={{ scale: 1.05 }}>
          <StatLabel>Days in Space</StatLabel>
          <StatValue>
            {stats.daysInSpace.toFixed(0)}
          </StatValue>
        </StatCard>
      </StatsGrid>

      <StatusPanel>
        <StatusTitle>🔧 System Status</StatusTitle>
        <StatusList>
          {systemStatus.map((item, index) => (
            <StatusItem
              key={item.id}
              status={item.status}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatusIndicator
                status={item.status}
                animate={{
                  scale: item.status === 'active' ? [1, 1.2, 1] : [1, 1.1, 1],
                  opacity: item.status === 'warning' ? [1, 0.5, 1] : 1
                }}
                transition={{
                  duration: item.status === 'active' ? 2 : 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <StatusText>
                <strong>{item.system}:</strong> {item.message}
              </StatusText>
            </StatusItem>
          ))}
        </StatusList>
      </StatusPanel>
    </ControlContainer>
  );
};

export default MissionControl;
