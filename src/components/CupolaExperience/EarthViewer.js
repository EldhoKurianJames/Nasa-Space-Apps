import React, { useState, useEffect, useMemo, useRef, useContext } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Globe from 'react-globe.gl';
import WeatherOverlay from './WeatherOverlay';
import { useMission } from '../../contexts/MissionContext';

const ViewerContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #0a0a1a;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const EarthView = styled.div`
  flex: 1;
  background: radial-gradient(ellipse at center, #0a0a2a 0%, #000011 70%, #000000 100%);
  position: relative;
  overflow: hidden;
  cursor: grab;
  border-radius: 10px;
  border: 2px solid #333344;
  box-shadow: inset 0 0 50px rgba(0, 150, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px),
      linear-gradient(0deg, rgba(0,212,255,0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    z-index: 1;
    pointer-events: none;
    opacity: 0.5;
  }
  
  &:active { 
    cursor: grabbing; 
  }
`;

const AstronautOverlay = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 4rem;
  z-index: 10;
  filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.5));
  pointer-events: none;
  will-change: transform;
  perspective: 1000px;
  transform-style: preserve-3d;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid rgba(0, 212, 255, 0.3);
    border-radius: 50%;
    animation: pulse 4s infinite ease-in-out;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.1); opacity: 0.8; }
  }
`;

const MissionPromptContainer = styled(motion.div)`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(10, 20, 40, 0.95);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #00f7ff;
  color: white;
  z-index: 1000;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  
  h3 {
    color: #00f7ff;
    margin-top: 0;
    border-bottom: 1px solid rgba(0, 212, 255, 0.3);
    padding-bottom: 0.5rem;
  }
  
  p {
    margin: 0.5rem 0;
    line-height: 1.5;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  
  button {
    padding: 0.5rem 1rem;
    border: 1px solid #00f7ff;
    background: transparent;
    color: #00f7ff;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Orbitron', sans-serif;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(0, 212, 255, 0.1);
    }
    
    &.primary {
      background: #00f7ff;
      color: #0a0a1a;
      font-weight: bold;
      
      &:hover {
        background: #00d4ff;
      }
    }
  }
`;

const StatusBar = styled.div`
  background: rgba(10, 20, 40, 0.8);
  padding: 0.8rem 1.5rem;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Orbitron', monospace;
  font-size: 0.9rem;
  color: #00f7ff;
  border-radius: 8px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 150, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.5), transparent);
  }
  
  span {
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
      content: '◉';
      color: #00f7ff;
      font-size: 0.6em;
      filter: drop-shadow(0 0 5px #00f7ff);
      animation: blink 2s infinite;
    }
  }
  
  @keyframes blink {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
`;

const EarthViewer = ({ character, selectedLocation, setSelectedLocation }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showWeather, setShowWeather] = useState(false);
  const [showMissionPrompt, setShowMissionPrompt] = useState(null);
  const globeRef = useRef();
  const { completeMission, completedMissions } = useMission();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Keep track of auto-rotation state
  const isAutoRotating = useRef(true);
  const animationId = useRef();
  
  // Handle globe click events
  const handleGlobeClick = (event) => {
    if (event.point) {
      isAutoRotating.current = false;
      const { lat, lng } = event;
      
      // Find if clicked location is a mission location
      const missionLocation = locations.find(loc => 
        Math.abs(loc.coordinates.lat - lat) < 1 && 
        Math.abs(loc.coordinates.lng - lng) < 1
      );
      
      if (missionLocation && !completedMissions.includes(missionLocation.name)) {
        setShowMissionPrompt(missionLocation);
      }
      
      setSelectedLocation(prev => ({
        ...prev,
        coordinates: { lat, lng }
      }));
    }
  };

  // Initialize the globe with a better default view
  useEffect(() => {
    if (globeRef.current) {
      // Set initial view
      
      // Add slight rotation for dynamic feel
      let rotation = 0;
      const rotateGlobe = () => {
        if (globeRef.current && isAutoRotating.current) {
          rotation += 0.1;
          const currentPOV = globeRef.current.pointOfView();
          globeRef.current.pointOfView({
            ...currentPOV,
            lng: currentPOV.lng + 0.1, // Slower rotation
            lat: currentPOV.lat + Math.sin(rotation * 0.1) * 0.05
          }, 1000);
        }
        animationId.current = requestAnimationFrame(rotateGlobe);
      };
      
      // Start rotation
      animationId.current = requestAnimationFrame(rotateGlobe);
      
      // Handle window resize
      const handleResize = () => {
        if (globeRef.current) {
          globeRef.current.width(window.innerWidth);
          globeRef.current.height(window.innerHeight * 0.8);
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        if (animationId.current) {
          cancelAnimationFrame(animationId.current);
        }
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Update view when selected location changes
  useEffect(() => {
    if (globeRef.current) {
      isAutoRotating.current = false;
      
      // Stop any ongoing animation
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      
      // Move to new location
      globeRef.current.pointOfView({ 
        lat: selectedLocation.coordinates.lat,
        lng: selectedLocation.coordinates.lng,
        altitude: 1.8
      }, 1000);
      
      // Re-enable auto-rotation after a delay
      const timer = setTimeout(() => {
        isAutoRotating.current = true;
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [selectedLocation]);

  const handleCompleteMission = (location) => {
    completeMission(location.name);
    setShowMissionPrompt(null);
    
    // Show completion feedback
    const missionCompleteEvent = new CustomEvent('missionComplete', { 
      detail: { 
        mission: location.name,
        nblTraining: location.nblTraining
      } 
    });
    window.dispatchEvent(missionCompleteEvent);
  };

  const locations = useMemo(() => [
    // ... (same locations as before)
    {
      name: 'Amazon Rainforest',
      coordinates: { lat: -3.4653, lng: -62.2159 },
      description: 'The lungs of our planet, producing 20% of the world\'s oxygen.',
      facts: [
        'NASA\'s MODIS sensor provides daily data for near-real-time deforestation alerts.',
        'Brazil\'s DETER system uses this data to dispatch enforcement teams within a day.',
        'Satellite monitoring has led deforesters to create smaller, harder-to-detect clearings.'
      ],
      imageUrl: 'https://www.nasa.gov/wp-content/uploads/2020/12/iss064e014990.jpg',
      nblTraining: {
        title: 'Rainforest Monitoring Training',
        description: 'Practice using observation tools to monitor deforestation patterns',
        objective: 'Collect 5 clear images of deforestation areas',
        duration: '15 minutes',
        skills: ['Camera operation', 'Data collection', 'Environmental monitoring']
      }
    },
    {
      name: 'Sahara Desert',
      coordinates: { lat: 23.4162, lng: 25.6628 },
      description: 'The world\'s largest hot desert, visible from space due to its vast golden expanse.',
      facts: [
        'The Richat Structure, or "Eye of the Sahara," is a 40km-wide geological feature used as a landmark by astronauts.',
        'Once thought to be an impact crater, it is now considered a deeply eroded geological dome.',
        'Students can take photos of Earth from the ISS using the Sally Ride EarthKAM camera.'
      ],
      imageUrl: 'https://d2pn8kiwq2w21t.cloudfront.net/images/images.ctfassets.net/cnu0m8re1nob/5V3p84S3v515l1sX2s0p5G/a6f1f124b65d03c9b28a514864f7596f/saharadesert.jpg',
      nblTraining: {
        title: 'Desert Landmark Navigation',
        description: 'Practice using desert landmarks for navigation',
        objective: 'Identify and mark 3 key landmarks from orbit',
        duration: '10 minutes',
        skills: ['Navigation', 'Landmark identification', 'Spatial awareness']
      }
    },
    {
        name: 'Great Barrier Reef',
        coordinates: { lat: -18.2871, lng: 147.6992 },
        description: 'The world\'s largest coral reef system, visible from space.',
        facts: [
        'NASA\'s CORAL mission uses airborne instruments to survey the health of the reef.',
        'Astronauts on the ISS photograph the reef to help monitor its vast ecosystem.',
        'It is a composite of over 2,900 individual reefs and 900 islands.'
      ],
        imageUrl: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/145000/145196/gulfofcarpentaria_oli_2019153_lrg.jpg'
    },
    {
        name: 'Himalayas',
        coordinates: { lat: 27.9881, lng: 86.9250 },
        description: 'The world\'s highest mountain range, including Mount Everest.',
        facts: [
        'Astronauts photograph the Himalayas from an altitude of over 260 miles.',
        'Instruments on the ISS, like COWVR, help monitor weather patterns in the region.',
        'The range is made up of three parallel mountain ranges stretching over 1,800 miles.'
      ],
        imageUrl: 'https://www.nasa.gov/wp-content/uploads/2023/04/iss068e040577.jpg'
    },
    {
        name: 'Aurora Borealis',
        coordinates: { lat: 64.2008, lng: -149.4937 },
        description: 'The Northern Lights, a spectacular natural light display.',
        facts: [
        'Astronauts on the ISS often photograph auroras from the Cupola window.',
        'The frequency and intensity of auroras are linked to the 11-year solar cycle.',
        'They are caused by energized particles from the Sun hitting Earth\'s upper atmosphere.'
      ],
        imageUrl: 'https://www.nasa.gov/wp-content/uploads/2016/02/iss046e0278z.jpg'
    },
    {
        name: 'Pacific Ocean',
        coordinates: { lat: 0, lng: -140 },
        description: 'The vast Pacific Ocean, Earth\'s largest body of water.',
        facts: [
        'The ISS orbits over the Pacific multiple times a day, enabling continuous monitoring.',
        'Instruments like EMIT on the ISS can track pollution and wastewater plumes.',
        'The ISS deploys CubeSats to gather data on climate patterns and ocean phenomena.'
      ],
        imageUrl: 'https://www.nasa.gov/wp-content/uploads/2022/01/iss066e095532.jpg'
    }
  ], []);

  const gData = useMemo(() => locations.map(loc => ({
    lat: loc.coordinates.lat,
    lng: loc.coordinates.lng,
    size: 0.1,
    color: 'lightblue',
    ...loc
  })), [locations]);

  const getAstronautEmoji = () => {
    // Base emoji based on gender
    let baseEmoji = character.gender === 'female' ? '👩' : '👨';
    
    // Add skin tone if available
    if (character.skinTone) {
      const skinToneModifiers = {
        light: '🏻',
        medium: '🏽',
        dark: '🏿'
      };
      baseEmoji += skinToneModifiers[character.skinTone] || '';
    }
    
    // Add helmet if equipped
    if (character.helmet) {
      baseEmoji += '‍🚀';
    }
    
    return baseEmoji;
  };

  // Mission prompt component
  const MissionPrompt = ({ location, onComplete, onClose }) => (
    <MissionPromptContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <h3>Mission: {location.nblTraining.title}</h3>
      <p>{location.nblTraining.description}</p>
      <p><strong>Objective:</strong> {location.nblTraining.objective}</p>
      <p><strong>Skills:</strong> {location.nblTraining.skills.join(', ')}</p>
      <p><strong>Duration:</strong> {location.nblTraining.duration}</p>
      <ButtonGroup>
        <button onClick={onClose}>Maybe Later</button>
        <button className="primary" onClick={() => onComplete(location)}>Start Training</button>
      </ButtonGroup>
    </MissionPromptContainer>
  );

  return (
    <ViewerContainer>
      <AnimatePresence>
        {showMissionPrompt && (
          <MissionPrompt 
            location={showMissionPrompt}
            onComplete={handleCompleteMission}
            onClose={() => setShowMissionPrompt(null)}
          />
        )}
      </AnimatePresence>
      <EarthView>
        <WeatherOverlay 
          location={selectedLocation}
          isVisible={showWeather}
          onToggle={() => setShowWeather(false)}
        />
        <Globe
          ref={globeRef}
          style={{
            width: '100%',
            height: '100%',
            margin: '0 auto',
            display: 'block'
          }}
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl=""
          showAtmosphere={true}
          atmosphereColor="rgba(65, 154, 249, 0.4)"
          atmosphereAltitude={0.25}
          enablePointerInteraction={true}
          animateIn={true}
          animateInPreload={false}
          onZoom={pov => {
            if (globeRef.current) {
              const { lat, lng, altitude } = pov;
              const targetAlt = Math.max(1.2, Math.min(altitude, 2.5));
              isAutoRotating.current = false;
              globeRef.current.pointOfView({
                lat,
                lng,
                altitude: targetAlt
              }, 500);
              
              // Re-enable auto-rotation after a delay
              clearTimeout(window.autoRotateTimeout);
              window.autoRotateTimeout = setTimeout(() => {
                isAutoRotating.current = true;
              }, 3000);
            }
          }}
          onGlobeClick={handleGlobeClick}
          onZoomEnd={() => {
            // Ensure we can still interact after zooming
            if (globeRef.current) {
              globeRef.current.controls().autoRotate = false;
            }
          }}
          pointsData={gData}
          pointAltitude="size"
          pointColor="color"
          onPointClick={(point) => setSelectedLocation(point)}
          pointLabel={point => `<div style="background: rgba(0,0,0,0.6); color: white; padding: 5px; border-radius: 3px;">${point.name}</div>`}
          labelsData={gData}
          labelLat={d => d.lat}
          labelLng={d => d.lng}
          labelText={d => d.name}
          labelSize={0.5}
          labelDotRadius={0.3}
          labelColor={() => 'rgba(255, 255, 255, 0.75)'}
          labelResolution={2}
          onLabelClick={(label) => setSelectedLocation(label)}
        />
        <AstronautOverlay
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            default: { duration: 0.5 }
          }}
          key={`astronaut-${character.gender}-${character.skinTone}-${character.helmet}`}
        >
          {getAstronautEmoji()}
        </AstronautOverlay>
      </EarthView>

      <StatusBar>
        <span>ISS Altitude: 408 km</span>
        <span>Speed: 27,600 km/h</span>
        <span>Time: {currentTime.toLocaleTimeString()}</span>
        <motion.button
          onClick={() => setShowWeather(!showWeather)}
          style={{
            background: showWeather ? 'rgba(0, 212, 255, 0.3)' : 'transparent',
            border: '1px solid #00d4ff',
            borderRadius: '15px',
            padding: '0.25rem 0.75rem',
            color: '#00d4ff',
            cursor: 'pointer',
            fontSize: '0.7rem',
            fontFamily: 'Orbitron, monospace'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🌤️ Weather
        </motion.button>
      </StatusBar>
    </ViewerContainer>
  );
};

export default EarthViewer;
