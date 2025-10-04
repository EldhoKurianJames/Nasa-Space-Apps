import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const SimulatorContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1.5rem;
`;

const PoolContainer = styled.div`
  flex: 1;
  background: linear-gradient(180deg, 
    rgba(135, 206, 235, 0.3) 0%,
    rgba(70, 130, 180, 0.5) 30%,
    rgba(25, 25, 112, 0.7) 70%,
    rgba(0, 0, 139, 0.9) 100%);
  border: 2px solid #00d4ff;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  min-height: 300px;
`;

const WaterSurface = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(90deg, 
    rgba(135, 206, 235, 0.8) 0%,
    rgba(173, 216, 230, 0.9) 50%,
    rgba(135, 206, 235, 0.8) 100%);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(90deg,
      transparent 0px,
      rgba(255, 255, 255, 0.3) 10px,
      transparent 20px);
    animation: wave 3s linear infinite;
  }
  
  @keyframes wave {
    0% { transform: translateX(0); }
    100% { transform: translateX(20px); }
  }
`;

const AstronautInPool = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  z-index: 10;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
`;

const DepthMarkers = styled.div`
  position: absolute;
  left: 10px;
  top: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Orbitron', monospace;
  font-size: 0.8rem;
`;

const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const ControlGroup = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 10px;
  padding: 1rem;
`;

const ControlLabel = styled.label`
  display: block;
  color: #00d4ff;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const ControlValue = styled.div`
  color: white;
  font-family: 'Orbitron', monospace;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ControlButton = styled(motion.button)`
  background: ${props => props.variant === 'add' ? 
    'linear-gradient(45deg, #00cc44, #00ff55)' : 
    'linear-gradient(45deg, #cc4400, #ff5500)'};
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
  font-weight: 600;
  flex: 1;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StatusDisplay = styled.div`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
`;

const StatusText = styled.div`
  color: ${props => {
    if (props.buoyancy > 5) return '#ff4444';
    if (props.buoyancy < -5) return '#ff4444';
    if (Math.abs(props.buoyancy) <= 2) return '#44ff44';
    return '#ffaa44';
  }};
  font-family: 'Orbitron', monospace;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const BuoyancyBar = styled.div`
  width: 100%;
  height: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  margin-top: 1rem;
`;

const BuoyancyIndicator = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: ${props => Math.min(Math.abs(props.buoyancy) * 2, 100)}%;
  height: 100%;
  background: ${props => {
    if (props.buoyancy > 0) return 'linear-gradient(90deg, #ff4444, #ff6666)';
    if (props.buoyancy < 0) return 'linear-gradient(90deg, #4444ff, #6666ff)';
    return 'linear-gradient(90deg, #44ff44, #66ff66)';
  }};
  border-radius: 10px;
`;

const BuoyancySimulator = ({ astronautStats, setAstronautStats }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  
  const poolDepth = 12; // meters (actual NBL depth is about 12m)
  
  // Calculate buoyancy based on weight, equipment, and added weights/floaties
  const calculateBuoyancy = () => {
    const totalWeight = astronautStats.weight + astronautStats.equipment;
    // Simplified buoyancy calculation
    return totalWeight - 70; // 70kg is roughly neutral in water
  };

  const updateAstronautStats = (property, change) => {
    setAstronautStats(prev => ({
      ...prev,
      [property]: Math.max(0, prev[property] + change)
    }));
  };

  const getBuoyancyStatus = () => {
    const buoyancy = calculateBuoyancy();
    if (Math.abs(buoyancy) <= 2) return 'NEUTRAL BUOYANCY ACHIEVED!';
    if (buoyancy > 5) return 'TOO HEAVY - SINKING FAST';
    if (buoyancy < -5) return 'TOO LIGHT - FLOATING UP';
    if (buoyancy > 0) return 'SLIGHTLY NEGATIVE - SINKING';
    return 'SLIGHTLY POSITIVE - FLOATING';
  };

  const getAstronautDepth = () => {
    const buoyancy = calculateBuoyancy();
    if (buoyancy > 10) return poolDepth * 0.9; // Near bottom
    if (buoyancy > 5) return poolDepth * 0.7;
    if (buoyancy > 2) return poolDepth * 0.5;
    if (Math.abs(buoyancy) <= 2) return poolDepth * 0.4; // Neutral depth
    if (buoyancy > -5) return poolDepth * 0.3;
    return poolDepth * 0.1; // Near surface
  };

  const startSimulation = () => {
    setIsSimulating(true);
    // Auto-stop simulation after 10 seconds
    setTimeout(() => setIsSimulating(false), 10000);
  };

  return (
    <SimulatorContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PoolContainer>
        <WaterSurface />
        
        <DepthMarkers>
          <div>0m</div>
          <div>3m</div>
          <div>6m</div>
          <div>9m</div>
          <div>12m</div>
        </DepthMarkers>
        
        <AstronautInPool
          animate={{
            top: `${(getAstronautDepth() / poolDepth) * 100}%`,
            rotate: isSimulating ? [0, 10, -10, 0] : 0,
            scale: isSimulating ? [1, 1.1, 1] : 1
          }}
          transition={{
            top: { duration: 2, ease: "easeInOut" },
            rotate: { duration: 2, repeat: isSimulating ? Infinity : 0 },
            scale: { duration: 1, repeat: isSimulating ? Infinity : 0 }
          }}
        >
          👨‍🚀
        </AstronautInPool>
      </PoolContainer>

      <ControlPanel>
        <ControlGroup>
          <ControlLabel>Body Weight</ControlLabel>
          <ControlValue>{astronautStats.weight} kg</ControlValue>
          <ControlButtons>
            <ControlButton
              variant="remove"
              onClick={() => updateAstronautStats('weight', -5)}
              disabled={astronautStats.weight <= 50}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              -5kg
            </ControlButton>
            <ControlButton
              variant="add"
              onClick={() => updateAstronautStats('weight', 5)}
              disabled={astronautStats.weight >= 120}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              +5kg
            </ControlButton>
          </ControlButtons>
        </ControlGroup>

        <ControlGroup>
          <ControlLabel>Equipment & Weights</ControlLabel>
          <ControlValue>{astronautStats.equipment} kg</ControlValue>
          <ControlButtons>
            <ControlButton
              variant="remove"
              onClick={() => updateAstronautStats('equipment', -2)}
              disabled={astronautStats.equipment <= 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Remove Weight
            </ControlButton>
            <ControlButton
              variant="add"
              onClick={() => updateAstronautStats('equipment', 2)}
              disabled={astronautStats.equipment >= 50}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Weight
            </ControlButton>
          </ControlButtons>
        </ControlGroup>

        <StatusDisplay>
          <ControlLabel>Buoyancy Status</ControlLabel>
          <StatusText buoyancy={calculateBuoyancy()}>
            {getBuoyancyStatus()}
          </StatusText>
          <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
            Depth: {getAstronautDepth().toFixed(1)}m
          </div>
          <BuoyancyBar>
            <BuoyancyIndicator 
              buoyancy={calculateBuoyancy()}
              animate={{ width: `${Math.min(Math.abs(calculateBuoyancy()) * 2, 100)}%` }}
            />
          </BuoyancyBar>
        </StatusDisplay>
      </ControlPanel>

      <motion.button
        className="button-primary"
        onClick={startSimulation}
        disabled={isSimulating}
        style={{ 
          alignSelf: 'center',
          padding: '1rem 2rem',
          fontSize: '1.1rem'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSimulating ? 'Simulating...' : 'Start Buoyancy Test'}
      </motion.button>
    </SimulatorContainer>
  );
};

export default BuoyancySimulator;
