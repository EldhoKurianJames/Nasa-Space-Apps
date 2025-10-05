import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const LunarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const PoolContainer = styled.div`
  flex: 1;
  background: linear-gradient(180deg, 
    rgba(70, 130, 180, 0.5) 0%,
    rgba(25, 25, 112, 0.7) 50%,
    rgba(0, 0, 50, 0.9) 100%);
  border: 2px solid #00d4ff;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
`;

const Astronaut = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  z-index: 10;
`;

const LunarFloor = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(0deg, #555, #888);
    border-top: 2px solid #aaa;
`;

const Rock = styled(motion.div)`
    position: absolute;
    bottom: ${props => props.bottom}px;
    left: ${props => props.left}%;
    font-size: 1.5rem;
    cursor: pointer;
`;

const ControlPanel = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    margin-top: 1rem;
`;

const ControlGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`;

const WeightControl = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 200px;
`;

const WeightValue = styled.div`
    font-family: 'Orbitron', monospace;
    font-size: 1.2rem;
    color: #00d4ff;
    text-align: center;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
`;

const Button = styled(motion.button)`
    padding: 0.5rem 1rem;
    background: ${props => props.primary ? '#00d4ff' : 'transparent'};
    color: ${props => props.primary ? '#000' : '#00d4ff'};
    border: 1px solid #00d4ff;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Orbitron', sans-serif;
    transition: all 0.3s ease;
    flex: 1;
    
    &:hover {
        background: rgba(0, 212, 255, 0.2);
        transform: translateY(-2px);
    }
    
    &:active {
        transform: translateY(0);
    }
`;

const LunarSimulation = ({ astronautStats, setAstronautStats }) => {
  const [phase, setPhase] = useState('descending'); // descending, on_surface, complete
  const [addedWeight, setAddedWeight] = useState(2); // Start with 2kg as minimum
  const [rocks, setRocks] = useState([
    { id: 1, left: 20, bottom: 10, collected: false },
    { id: 2, left: 40, bottom: 5, collected: false },
    { id: 3, left: 70, bottom: 15, collected: false },
  ]);

  const descentRate = Math.max(0, (addedWeight / 10 - 0.1) * 0.5); // Slower descent rate for better control
  const astronautDepth = Math.min(100, (astronautStats.depth || 0) + descentRate);

  useEffect(() => {
    let interval;
    if (phase === 'descending' && astronautDepth < 100) {
      interval = setInterval(() => {
        setAstronautStats(prev => ({ ...prev, depth: Math.min(100, (prev.depth || 0) + descentRate) }));
      }, 100);
    } else if (astronautDepth >= 100 && phase === 'descending') {
      setPhase('on_surface');
    }
    return () => clearInterval(interval);
  }, [phase, descentRate, astronautStats.depth, setAstronautStats, astronautDepth]);

  const handleCollectRock = (id) => {
    setRocks(rocks.map(r => r.id === id ? { ...r, collected: true } : r));
    const allCollected = rocks.every(r => r.collected || r.id === id);
    if (allCollected) {
        setPhase('complete');
        setAstronautStats(prev => ({...prev, totalScore: prev.totalScore + 200}));
    }
  };

  return (
    <LunarContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PoolContainer>
        <AnimatePresence>
            {phase !== 'descending' && (
                <LunarFloor />
            )}
        </AnimatePresence>
        <Astronaut style={{ top: `${astronautDepth - 10}%` }}>👨‍🚀</Astronaut>
        {phase === 'on_surface' && rocks.map(rock => 
            !rock.collected && (
                <Rock 
                    key={rock.id} 
                    left={rock.left} 
                    bottom={rock.bottom} 
                    onClick={() => handleCollectRock(rock.id)}
                    whileHover={{scale: 1.2}}
                >🌑</Rock>
            )
        )}
      </PoolContainer>
      <ControlPanel>
        {phase === 'descending' && (
            <>
                <p>Add weight to descend to the lunar surface.</p>
                <WeightControl>
                    <div>Added Weight</div>
                    <WeightValue>{addedWeight.toFixed(1)} kg</WeightValue>
                    <ControlGroup>
                        <Button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setAddedWeight(w => Math.max(2, Math.floor(w) - 2))}
                        >
                            -2kg
                        </Button>
                        <Button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setAddedWeight(w => Math.min(20, Math.floor(w) + 2))}
                            primary
                        >
                            +2kg
                        </Button>
                    </ControlGroup>
                </WeightControl>
                
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <div>Descent Rate: {descentRate.toFixed(2)} m/s</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Depth: {astronautDepth.toFixed(1)}%</div>
                </div>
            </>
        )}
        
        {phase === 'complete' && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: 'rgba(0, 200, 0, 0.2)',
                    padding: '1rem',
                    borderRadius: '5px',
                    marginTop: '1rem',
                    textAlign: 'center',
                    border: '1px solid #0f0'
                }}
            >
                Mission Complete! +200 points
            </motion.div>
        )}
      </ControlPanel>
    </LunarContainer>
  );
};
export default LunarSimulation;
