import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const WeatherContainer = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 10px;
  padding: 1rem;
  min-width: 200px;
  z-index: 5;
`;

const WeatherTitle = styled.h4`
  color: #00d4ff;
  font-family: 'Orbitron', monospace;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const WeatherItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem;
`;

const WeatherIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;

const WeatherValue = styled.span`
  font-family: 'Orbitron', monospace;
  color: #00d4ff;
`;

const ToggleButton = styled(motion.button)`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(45deg, #0099cc, #00d4ff);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;

const WeatherOverlay = ({ location, isVisible, onToggle }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate weather data based on location
  useEffect(() => {
    if (isVisible && location) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const simulatedWeather = generateWeatherData(location);
        setWeatherData(simulatedWeather);
        setIsLoading(false);
      }, 1000);
    }
  }, [location, isVisible]);

  const generateWeatherData = (loc) => {
    // Generate realistic weather data based on location
    const weatherPatterns = {
      'Amazon Rainforest': {
        temperature: 28,
        humidity: 85,
        cloudCover: 70,
        windSpeed: 12,
        condition: 'Partly Cloudy',
        icon: '⛅'
      },
      'Sahara Desert': {
        temperature: 42,
        humidity: 15,
        cloudCover: 5,
        windSpeed: 8,
        condition: 'Clear',
        icon: '☀️'
      },
      'Great Barrier Reef': {
        temperature: 26,
        humidity: 75,
        cloudCover: 40,
        windSpeed: 15,
        condition: 'Scattered Clouds',
        icon: '🌤️'
      },
      'Himalayas': {
        temperature: -5,
        humidity: 60,
        cloudCover: 80,
        windSpeed: 25,
        condition: 'Snow',
        icon: '🌨️'
      },
      'Aurora Borealis': {
        temperature: -15,
        humidity: 70,
        cloudCover: 20,
        windSpeed: 18,
        condition: 'Clear Night',
        icon: '🌌'
      },
      'Pacific Ocean': {
        temperature: 22,
        humidity: 80,
        cloudCover: 60,
        windSpeed: 20,
        condition: 'Overcast',
        icon: '☁️'
      }
    };

    return weatherPatterns[loc.name] || {
      temperature: 20,
      humidity: 50,
      cloudCover: 30,
      windSpeed: 10,
      condition: 'Variable',
      icon: '🌍'
    };
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <WeatherContainer
        initial={{ opacity: 0, scale: 0.8, x: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.8, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <ToggleButton
          onClick={onToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </ToggleButton>
        
        <WeatherTitle>Current Conditions</WeatherTitle>
        
        {isLoading ? (
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
            Loading weather data...
          </div>
        ) : weatherData ? (
          <>
            <WeatherItem>
              <span>
                <WeatherIcon>{weatherData.icon}</WeatherIcon>
                {weatherData.condition}
              </span>
            </WeatherItem>
            
            <WeatherItem>
              <span>🌡️ Temperature</span>
              <WeatherValue>{weatherData.temperature}°C</WeatherValue>
            </WeatherItem>
            
            <WeatherItem>
              <span>💧 Humidity</span>
              <WeatherValue>{weatherData.humidity}%</WeatherValue>
            </WeatherItem>
            
            <WeatherItem>
              <span>☁️ Cloud Cover</span>
              <WeatherValue>{weatherData.cloudCover}%</WeatherValue>
            </WeatherItem>
            
            <WeatherItem>
              <span>💨 Wind Speed</span>
              <WeatherValue>{weatherData.windSpeed} km/h</WeatherValue>
            </WeatherItem>
          </>
        ) : null}
      </WeatherContainer>
    </AnimatePresence>
  );
};

export default WeatherOverlay;
