import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ModelContainer = styled(motion.div)`
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid #00d4ff;
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
`;

const ModelTitle = styled.h2`
  font-family: 'Orbitron', monospace;
  color: #00d4ff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const ISSViewer = styled.div`
  width: 100%;
  height: 400px;
  background: radial-gradient(ellipse at center, #001122 0%, #000000 70%);
  border: 2px solid rgba(0, 212, 255, 0.3);
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`;

const ISSModel = styled(motion.div)`
  font-size: 8rem;
  filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.5));
  user-select: none;
`;

const Stars = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #eee, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, #fff, transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 160px 30px, #fff, transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: twinkle 4s linear infinite;
  
  @keyframes twinkle {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
`;

const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const ControlButton = styled(motion.button)`
  background: rgba(0, 212, 255, 0.1);
  border: 2px solid #00d4ff;
  border-radius: 10px;
  padding: 1rem;
  color: white;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 212, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
  }
  
  &.active {
    background: rgba(0, 212, 255, 0.3);
    border-color: #00f7ff;
  }
`;

const InfoPanel = styled(motion.div)`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const InfoTitle = styled.h3`
  color: #00d4ff;
  font-family: 'Orbitron', monospace;
  margin-bottom: 1rem;
`;

const InfoText = styled.p`
  color: white;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ISSModelViewer = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [selectedView, setSelectedView] = useState('overview');
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const views = {
    overview: {
      title: 'ISS Overview',
      info: 'The International Space Station is a marvel of international cooperation and engineering. It serves as a microgravity laboratory, Earth observation platform, and technology testbed for future deep space missions.',
      rotation: { x: 0, y: 0 }
    },
    solar: {
      title: 'Solar Arrays',
      info: 'The ISS has eight solar array wings that generate electricity from sunlight. These arrays can produce 84-120 kilowatts of power and automatically track the sun as the station orbits Earth.',
      rotation: { x: 15, y: 45 }
    },
    modules: {
      title: 'Station Modules',
      info: 'The ISS consists of multiple pressurized modules including laboratories, living quarters, and docking ports. Each module serves specific functions for crew life support, research, and operations.',
      rotation: { x: -15, y: -30 }
    },
    cupola: {
      title: 'Cupola Observatory',
      info: 'The Cupola is a seven-windowed observatory that provides panoramic views of Earth and space. It serves as a control center for robotic operations and offers the best views for Earth observation.',
      rotation: { x: 30, y: 90 }
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const selectView = (viewKey) => {
    setSelectedView(viewKey);
    setRotation(views[viewKey].rotation);
  };

  return (
    <ModelContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <ModelTitle>🛰️ ISS 3D Model Viewer</ModelTitle>
      
      <ISSViewer
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Stars />
        <ISSModel
          animate={{
            rotateX: rotation.x,
            rotateY: rotation.y,
            scale: [1, 1.05, 1]
          }}
          transition={{
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotateX: { duration: 0.5 },
            rotateY: { duration: 0.5 }
          }}
        >
          🛰️
        </ISSModel>
      </ISSViewer>

      <ControlPanel>
        {Object.entries(views).map(([key, view]) => (
          <ControlButton
            key={key}
            className={selectedView === key ? 'active' : ''}
            onClick={() => selectView(key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {view.title}
          </ControlButton>
        ))}
      </ControlPanel>

      <InfoPanel
        key={selectedView}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <InfoTitle>{views[selectedView].title}</InfoTitle>
        <InfoText>{views[selectedView].info}</InfoText>
      </InfoPanel>
    </ModelContainer>
  );
};

export default ISSModelViewer;
