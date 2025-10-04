import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherOverlay from './WeatherOverlay';

const ViewerContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const EarthView = styled.div`
  flex: 1;
  background: linear-gradient(180deg, #000011 0%, #001122 50%, #003366 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EarthImage = styled(motion.div)`
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background: ${props => props.backgroundImage ? 
    `url(${props.backgroundImage})` : 
    'linear-gradient(45deg, #4a90e2, #7bb3f0, #a8d0f0)'};
  background-size: cover;
  background-position: center;
  position: relative;
  box-shadow: 
    inset -20px -20px 50px rgba(0, 0, 0, 0.5),
    0 0 50px rgba(74, 144, 226, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.1) 30%, 
      transparent 50%, 
      rgba(0, 0, 0, 0.2) 100%);
  }
`;

const CloudLayer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, 
    rgba(255, 255, 255, 0.3) 0%, 
    transparent 20%),
    radial-gradient(circle at 70% 60%, 
    rgba(255, 255, 255, 0.2) 0%, 
    transparent 25%),
    radial-gradient(circle at 20% 80%, 
    rgba(255, 255, 255, 0.25) 0%, 
    transparent 15%);
`;

const AstronautOverlay = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 3rem;
  z-index: 10;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
`;

const LocationSelector = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  border-top: 1px solid rgba(0, 212, 255, 0.3);
`;

const LocationButton = styled(motion.button)`
  background: ${props => props.isSelected ? 
    'linear-gradient(45deg, #0099cc, #00d4ff)' : 
    'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.isSelected ? '#00d4ff' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 15px;
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  
  &:hover {
    background: ${props => props.isSelected ? 
      'linear-gradient(45deg, #0099cc, #00d4ff)' : 
      'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-2px);
  }
`;

const StatusBar = styled.div`
  background: rgba(0, 212, 255, 0.1);
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Orbitron', monospace;
  font-size: 0.8rem;
  color: #00d4ff;
  border-top: 1px solid rgba(0, 212, 255, 0.3);
`;

const EarthViewer = ({ character, selectedLocation, setSelectedLocation }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showWeather, setShowWeather] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const locations = [
    {
      name: 'Amazon Rainforest',
      coordinates: { lat: -3.4653, lng: -62.2159 },
      description: 'The lungs of our planet, producing 20% of the world\'s oxygen.',
      facts: [
        'Covers 5.5 million square kilometers',
        'Home to 10% of known species on Earth',
        'Produces 20% of the world\'s oxygen'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
    },
    {
      name: 'Sahara Desert',
      coordinates: { lat: 23.4162, lng: 25.6628 },
      description: 'The world\'s largest hot desert, visible from space due to its vast golden expanse.',
      facts: [
        'Covers 9 million square kilometers',
        'Sand dunes can reach heights of 180 meters',
        'Dust from Sahara fertilizes Amazon rainforest'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800'
    },
    {
      name: 'Great Barrier Reef',
      coordinates: { lat: -18.2871, lng: 147.6992 },
      description: 'The world\'s largest coral reef system, visible from space.',
      facts: [
        'Stretches over 2,300 kilometers',
        'Home to 1,500 species of fish',
        'Can be seen from space'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800'
    },
    {
      name: 'Himalayas',
      coordinates: { lat: 27.9881, lng: 86.9250 },
      description: 'The world\'s highest mountain range, including Mount Everest.',
      facts: [
        'Contains 9 of the 10 highest peaks on Earth',
        'Mount Everest is 8,848 meters tall',
        'Formed by collision of tectonic plates'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    },
    {
      name: 'Aurora Borealis',
      coordinates: { lat: 64.2008, lng: -149.4937 },
      description: 'The Northern Lights, a spectacular natural light display.',
      facts: [
        'Caused by solar particles hitting Earth\'s atmosphere',
        'Occur at altitudes of 80-500 kilometers',
        'Best viewed from Arctic regions'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800'
    },
    {
      name: 'Pacific Ocean',
      coordinates: { lat: 0, lng: -140 },
      description: 'The vast Pacific Ocean, Earth\'s largest body of water.',
      facts: [
        'Covers about 46% of Earth\'s water surface',
        'Contains more than half of the free water on Earth',
        'Home to the Ring of Fire'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800'
    }
  ];

  const getAstronautEmoji = () => {
    if (!character.helmet) return '👨';
    
    // Different astronaut emojis based on character customization
    const baseEmojis = {
      light: '👨‍🚀',
      medium: '👨🏽‍🚀',
      dark: '👨🏿‍🚀'
    };
    
    return baseEmojis[character.skinTone] || '👨‍🚀';
  };

  return (
    <ViewerContainer>
      <EarthView>
        <WeatherOverlay 
          location={selectedLocation}
          isVisible={showWeather}
          onToggle={() => setShowWeather(false)}
        />
        
        <EarthImage
          backgroundImage={selectedLocation.imageUrl}
          animate={{ 
            rotate: 360,
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            rotate: { duration: 120, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <CloudLayer
            animate={{ 
              rotate: -360,
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              rotate: { duration: 80, repeat: Infinity, ease: "linear" },
              opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </EarthImage>
        
        <AstronautOverlay
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {getAstronautEmoji()}
        </AstronautOverlay>
      </EarthView>

      <LocationSelector>
        {locations.map((location) => (
          <LocationButton
            key={location.name}
            isSelected={selectedLocation.name === location.name}
            onClick={() => setSelectedLocation(location)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {location.name}
          </LocationButton>
        ))}
      </LocationSelector>

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
