import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { MissionProvider } from './contexts/MissionContext';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import CupolaExperience from './components/CupolaExperience/CupolaExperience';
import NBLTraining from './components/NBLTraining/NBLTraining';
import About from './components/About/About';
import ParticleBackground from './components/shared/ParticleBackground';
import NotificationSystem from './components/shared/NotificationSystem';
import HelpSystem from './components/shared/HelpSystem';
import WelcomeTutorial from './components/shared/WelcomeTutorial';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
  position: relative;
  overflow-x: hidden;
`;

const StarsBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #eee, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, #fff, transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: twinkle 20s linear infinite;
  z-index: -1;
  
  @keyframes twinkle {
    0% { transform: translateY(0px); }
    100% { transform: translateY(-100px); }
  }
`;

const MainContent = styled(motion.main)`
  position: relative;
  z-index: 1;
`;

function App() {
  return (
    <MissionProvider>
      <Router>
      <AppContainer>
        <ParticleBackground />
        <StarsBackground />
        <Header />
        <MainContent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cupola" element={<CupolaExperience />} />
            <Route path="/nbl" element={<NBLTraining />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </MainContent>
        <NotificationSystem />
        <HelpSystem />
        <WelcomeTutorial />
        </AppContainer>
      </Router>
    </MissionProvider>
  );
}

export default App;
