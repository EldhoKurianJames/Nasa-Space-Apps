import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWeightHanging, FaSwimmingPool, FaTint, FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

// ... (Keep all existing styled-components: SimulatorContainer, PoolContainer, etc.)
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
  display: flex;
  flex-direction: column;
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
  margin-top: auto;
`;

const ControlButton = styled(motion.button)`
  background: ${props => props.variant === 'add' ? 
    'linear-gradient(45deg, #00a1ff, #00f7ff)' : 
    'linear-gradient(45deg, #ff6b00, #ff9d00)'};
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  color: white;
  cursor: pointer;
  font-weight: 600;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Orbitron', sans-serif;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  svg {
    font-size: 1.2em;
  }
`;

const StatusDisplay = styled(motion.div)`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 212, 255, 0.5);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin: 0 auto;
  
  h3 {
    color: #00d4ff;
    margin-top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1.4rem;
  }
  
  p {
    margin: 1rem 0;
    line-height: 1.6;
  }
`;

const StatusText = styled.div`
  color: ${props => {
    if (props.status === 'success') return '#44ff44';
    if (props.status === 'fail') return '#ff4444';
    return '#ffaa44';
  }};
  font-family: 'Orbitron', monospace;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const GamePhaseContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
  padding: 2rem;
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const GalleryImage = styled(motion.img)`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  cursor: pointer;
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid #00d4ff;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  text-align: center;
  width: 150px;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
  
  &:focus {
    outline: none;
    border-color: #00f7ff;
    box-shadow: 0 0 20px rgba(0, 247, 255, 0.4);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const BuoyancySimulator = ({ astronautStats, setAstronautStats, images }) => {
  const [gameState, setGameState] = useState('setup'); // setup, adjust, testing, result
  const [userWeight, setUserWeight] = useState(75);
  const [addedWeight, setAddedWeight] = useState(0);
  const [addedFloaties, setAddedFloaties] = useState(0);
  const [testResult, setTestResult] = useState(null); // 'success' or 'fail'
  const [showHint, setShowHint] = useState(false);
  const poolDepth = 12; // meters

  const targetBuoyancy = useMemo(() => {
    // Simplified physics: assume average human density is slightly less than water.
    // A 75kg person needs about 2-3kg of weight to be neutral.
    return (userWeight / 30).toFixed(1);
  }, [userWeight]);

  const currentBuoyancy = useMemo(() => {
    const weightEffect = addedWeight;
    const floatyEffect = addedFloaties * -1.5; // Floaties have a stronger upward force
    return weightEffect + floatyEffect;
  }, [addedWeight, addedFloaties]);

  const buoyancyDifference = useMemo(() => {
    return currentBuoyancy - targetBuoyancy;
  }, [currentBuoyancy, targetBuoyancy]);

  const getAstronautDepth = () => {
    if (gameState !== 'testing') return poolDepth * 0.1; // At surface
    const diff = buoyancyDifference;
    if (diff > 10) return poolDepth * 0.9; // Sinking fast
    if (diff > 2) return poolDepth * 0.6;
    if (Math.abs(diff) <= 2) return poolDepth * 0.4; // Neutral depth
    if (diff < -10) return poolDepth * 0.05; // Floating fast
    if (diff < -2) return poolDepth * 0.2;
    return poolDepth * 0.4;
  };

  const handleStartAdjusting = () => {
    if (userWeight >= 40 && userWeight <= 150) {
      setGameState('adjust');
      setShowHint(true);
      setTimeout(() => setShowHint(false), 5000);
    }
  };

  const handleBuoyancyTest = () => {
    setGameState('testing');
    setShowHint(false);
    
    // Add visual feedback during test
    const testDuration = 4000; // 4 seconds
    
    setTimeout(() => {
      const isSuccess = Math.abs(buoyancyDifference) <= 2;
      setTestResult(isSuccess ? 'success' : 'fail');
      setGameState('result');
      
      if (isSuccess) {
        setAstronautStats(prev => ({ 
          ...prev, 
          completedMissions: prev.completedMissions + 1, 
          totalScore: prev.totalScore + 100 
        }));
      }
    }, testDuration);
  };

  const handleReset = () => {
    setGameState('setup');
    setAddedWeight(0);
    setAddedFloaties(0);
    setTestResult(null);
  };

  const renderGameState = () => {
    switch (gameState) {
      case 'setup':
        return (
          <GamePhaseContainer 
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
          >
            <StatusDisplay>
              <h3><FaSwimmingPool /> Neutral Buoyancy Lab</h3>
              <p>Welcome to the Neutral Buoyancy Laboratory (NBL), a massive indoor pool where astronauts train for spacewalks. By achieving neutral buoyancy, we can simulate the weightless environment of space.</p>
              <ImageGallery>
                {images && images.slice(0, 4).map((img, index) => (
                  <GalleryImage 
                    key={index} 
                    src={img} 
                    alt={`NBL Training Image ${index + 1}`} 
                    whileHover={{ scale: 1.05, borderColor: '#00f7ff' }}
                  />
                ))}
              </ImageGallery>
              
              <div style={{margin: '2rem 0'}}>
                <ControlLabel>Enter your weight to begin</ControlLabel>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem'}}>
                  <Input 
                    type="number" 
                    value={userWeight} 
                    onChange={e => setUserWeight(Math.max(40, Math.min(150, Number(e.target.value))))}
                    min={40}
                    max={150}
                    placeholder="40-150 kg"
                  />
                  <span style={{fontSize: '1.2rem'}}>kg</span>
                </div>
              </div>
              
              <ControlButton 
                variant="add" 
                onClick={handleStartAdjusting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTint /> Begin Training
              </ControlButton>
              
              <p style={{marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.8}}>
                <FaInfoCircle /> Tip: The NBL helps astronauts practice in an environment that simulates microgravity.
              </p>
            </StatusDisplay>
          </GamePhaseContainer>
        );
      case 'result':
        return (
          <GamePhaseContainer 
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            transition={{type: 'spring', stiffness: 300}}
          >
            <StatusDisplay>
              {testResult === 'success' ? (
                <>
                  <StatusText status="success">
                    <FaCheckCircle /> MISSION ACCOMPLISHED!
                  </StatusText>
                  <p>You've successfully achieved neutral buoyancy! This is crucial for spacewalk training as it simulates the microgravity environment of space.</p>
                  <p>Your score: <strong>+100 points</strong></p>
                </>
              ) : (
                <>
                  <StatusText status="fail">
                    <FaTimesCircle /> TRY AGAIN
                  </StatusText>
                  <p>Your buoyancy wasn't quite right. In space, being too heavy or too light could make it difficult to work effectively.</p>
                  <p>Target Buoyancy: <strong>{targetBuoyancy} kg</strong></p>
                  <p>Your Buoyancy: <strong>{currentBuoyancy.toFixed(1)} kg</strong></p>
                  <p>Difference: <strong>{Math.abs(buoyancyDifference).toFixed(1)} kg</strong></p>
                </>
              )}
              
              <ControlButton 
                variant={testResult === 'success' ? 'add' : 'remove'}
                onClick={handleReset}
                style={{marginTop: '1.5rem'}}
              >
                {testResult === 'success' ? 'Continue Training' : 'Try Again'}
              </ControlButton>
            </StatusDisplay>
          </GamePhaseContainer>
        )
      default: // 'adjust' and 'testing' phases share the main view
        return (
          <>
            <PoolContainer>
              <WaterSurface />
              <DepthMarkers><div>0m</div><div>6m</div><div>12m</div></DepthMarkers>
              <AstronautInPool
                animate={{ top: `${(getAstronautDepth() / poolDepth) * 100}%` }}
                transition={{ duration: 3, ease: 'easeInOut' }}
              >👨‍🚀</AstronautInPool>
            </PoolContainer>
            <ControlPanel>
              <ControlGroup>
                <ControlLabel><FaWeightHanging /> Target Buoyancy</ControlLabel>
                <ControlValue style={{fontSize: '1.8rem', color: '#00f7ff'}}>{targetBuoyancy} kg</ControlValue>
                <div style={{ 
                  height: '4px', 
                  background: 'rgba(255,255,255,0.1)', 
                  margin: '0.5rem 0',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <motion.div 
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #00a1ff, #00f7ff)',
                      width: '100%',
                      borderRadius: '2px'
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <p style={{fontSize: '0.8rem', margin: '0.5rem 0 0', opacity: 0.8}}>
                  <FaInfoCircle /> Adjust weights and floaties to match this target
                </p>
              </ControlGroup>
              
              <ControlGroup>
                <ControlLabel><FaWeightHanging /> Weights</ControlLabel>
                <ControlValue style={{fontSize: '1.5rem'}}>{addedWeight} kg</ControlValue>
                <ControlButtons>
                  <ControlButton 
                    variant="remove" 
                    onClick={() => setAddedWeight(w => Math.max(0, w - 2))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    -2kg
                  </ControlButton>
                  <ControlButton 
                    variant="add" 
                    onClick={() => setAddedWeight(w => w + 2)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +2kg
                  </ControlButton>
                </ControlButtons>
                <p style={{fontSize: '0.8rem', margin: '0.5rem 0 0', opacity: 0.6}}>
                  Adds downward force
                </p>
              </ControlGroup>
              
              <ControlGroup>
                <ControlLabel><FaTint /> Floaties</ControlLabel>
                <ControlValue style={{fontSize: '1.5rem'}}>{addedFloaties} units</ControlValue>
                <ControlButtons>
                  <ControlButton 
                    variant="remove" 
                    onClick={() => setAddedFloaties(f => Math.max(0, f - 1))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    -1
                  </ControlButton>
                  <ControlButton 
                    variant="add" 
                    onClick={() => setAddedFloaties(f => f + 1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +1
                  </ControlButton>
                </ControlButtons>
                <p style={{fontSize: '0.8rem', margin: '0.5rem 0 0', opacity: 0.6}}>
                  Adds upward force (1 unit = 1.5kg buoyancy)
                </p>
              </ControlGroup>
            </ControlPanel>
            
            {showHint && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(0, 168, 255, 0.1)',
                  border: '1px solid rgba(0, 168, 255, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginTop: '1rem',
                  textAlign: 'center',
                  maxWidth: '600px',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
              >
                <FaInfoCircle style={{ marginRight: '0.5rem' }} />
                <strong>Tip:</strong> Try to match the target buoyancy by adjusting weights and floaties. 
                Each floatie adds 1.5kg of upward force.
              </motion.div>
            )}
            <motion.button
              className="button-primary"
              onClick={handleBuoyancyTest}
              disabled={gameState === 'testing'}
              style={{ alignSelf: 'center', padding: '1rem 2rem', fontSize: '1.1rem' }}
            >
              {gameState === 'testing' ? 'Testing...' : 'Initiate Buoyancy Test'}
            </motion.button>
          </>
        );
    }
  };

  return (
    <SimulatorContainer>
      <AnimatePresence mode="wait">
        {renderGameState()}
      </AnimatePresence>
    </SimulatorContainer>
  );
};

export default BuoyancySimulator;
