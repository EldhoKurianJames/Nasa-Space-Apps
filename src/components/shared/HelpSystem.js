import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const HelpButton = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #0099cc, #00d4ff);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 5px 20px rgba(0, 212, 255, 0.4);
  
  &:hover {
    box-shadow: 0 8px 25px rgba(0, 212, 255, 0.6);
  }
`;

const HelpModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 2rem;
`;

const HelpContent = styled(motion.div)`
  background: rgba(12, 12, 12, 0.95);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #00d4ff;
  font-size: 1.5rem;
  cursor: pointer;
  
  &:hover {
    color: white;
  }
`;

const HelpTitle = styled.h2`
  font-family: 'Orbitron', monospace;
  color: #00d4ff;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const HelpSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #00d4ff;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const HelpText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const HelpList = styled.ul`
  color: rgba(255, 255, 255, 0.9);
  margin-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }
`;

const KeyboardShortcut = styled.span`
  background: rgba(0, 212, 255, 0.2);
  border: 1px solid rgba(0, 212, 255, 0.4);
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  font-family: 'Orbitron', monospace;
  font-size: 0.8rem;
  color: #00d4ff;
`;

const FeatureHighlight = styled.div`
  background: rgba(0, 212, 255, 0.1);
  border-left: 3px solid #00d4ff;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0 10px 10px 0;
`;

const HelpSystem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const helpContent = {
    cupola: {
      title: "🌍 Cupola Experience Guide",
      sections: [
        {
          title: "Character Customization",
          content: "Personalize your astronaut with different appearance options, suit colors, and equipment. Your choices affect how your character appears in the cupola view."
        },
        {
          title: "Earth Observation",
          content: "Click on different location buttons to explore various geographical regions. Each location provides real facts and educational information about that area."
        },
        {
          title: "Weather Data",
          content: "Click the Weather button in the status bar to see simulated current conditions for the selected location, including temperature, humidity, and cloud cover."
        }
      ]
    },
    nbl: {
      title: "🏊‍♂️ NBL Training Guide",
      sections: [
        {
          title: "Buoyancy Control",
          content: "Adjust your body weight and equipment to achieve neutral buoyancy. The goal is to neither sink nor float - just like real astronaut training!"
        },
        {
          title: "Training Missions",
          content: "Complete various missions including EVA simulations, maintenance tasks, and emergency procedures. Each completed task earns you points."
        },
        {
          title: "Achievements",
          content: "Unlock achievements by reaching milestones in your training. These track your progress and celebrate your accomplishments."
        }
      ]
    },
    general: {
      title: "🚀 General Navigation",
      sections: [
        {
          title: "Navigation",
          content: "Use the header menu to switch between different experiences. Each section offers unique interactive learning opportunities."
        },
        {
          title: "Educational Content",
          content: "Throughout the app, you'll find real facts about the ISS, space exploration, and how these missions benefit humanity on Earth."
        }
      ]
    }
  };

  return (
    <>
      <HelpButton
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: [
            "0 5px 20px rgba(0, 212, 255, 0.4)",
            "0 5px 25px rgba(0, 212, 255, 0.6)",
            "0 5px 20px rgba(0, 212, 255, 0.4)"
          ]
        }}
        transition={{ 
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        ?
      </HelpButton>

      <AnimatePresence>
        {isOpen && (
          <HelpModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <HelpContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </CloseButton>

              <HelpTitle>ISS Experience Help Guide</HelpTitle>

              <HelpSection>
                <SectionTitle>🌍 Cupola Experience</SectionTitle>
                <HelpText>
                  Experience Earth from the International Space Station's observation deck. 
                  Customize your astronaut and explore different locations around our planet.
                </HelpText>
                <HelpList>
                  <li>Customize your astronaut's appearance and equipment</li>
                  <li>Select different Earth locations to observe</li>
                  <li>View real-time weather data for each location</li>
                  <li>Learn fascinating facts about each geographical region</li>
                </HelpList>
              </HelpSection>

              <HelpSection>
                <SectionTitle>🏊‍♂️ NBL Training</SectionTitle>
                <HelpText>
                  Train like a real astronaut in the Neutral Buoyancy Laboratory. 
                  Master buoyancy control and complete challenging missions.
                </HelpText>
                <HelpList>
                  <li>Adjust weight and equipment to achieve neutral buoyancy</li>
                  <li>Complete EVA simulations and maintenance missions</li>
                  <li>Earn points and unlock achievements</li>
                  <li>Track your progress as you become an expert trainer</li>
                </HelpList>
              </HelpSection>

              <FeatureHighlight>
                <SectionTitle>💡 Pro Tips</SectionTitle>
                <HelpList>
                  <li>Try different character customizations to see how they appear in space</li>
                  <li>Pay attention to the educational content - it's based on real NASA data</li>
                  <li>Complete all training missions to become an expert astronaut</li>
                  <li>Check the weather overlay to understand Earth's atmospheric conditions</li>
                </HelpList>
              </FeatureHighlight>

              <HelpSection>
                <SectionTitle>🎯 Learning Objectives</SectionTitle>
                <HelpText>
                  This app is designed to help you understand:
                </HelpText>
                <HelpList>
                  <li>How astronauts live and work on the International Space Station</li>
                  <li>The importance of Earth observation from space</li>
                  <li>How astronaut training prepares them for space missions</li>
                  <li>The scientific benefits of space exploration for humanity</li>
                </HelpList>
              </HelpSection>

              <FeatureHighlight>
                <SectionTitle>🚀 Did You Know?</SectionTitle>
                <HelpText>
                  The real ISS travels at 27,600 km/h and completes an orbit around Earth 
                  every 90 minutes. Astronauts see 16 sunrises and sunsets each day!
                </HelpText>
              </FeatureHighlight>
            </HelpContent>
          </HelpModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default HelpSystem;
