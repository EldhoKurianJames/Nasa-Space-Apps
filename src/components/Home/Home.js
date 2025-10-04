import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
  position: relative;
  margin-top: 80px;
`;

const HeroSection = styled(motion.div)`
  max-width: 800px;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-family: 'Orbitron', monospace;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #00d4ff, #0099cc, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
`;

const ExperienceCards = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  width: 100%;
`;

const ExperienceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
    border-color: rgba(0, 212, 255, 0.5);
  }
`;

const CardIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #00d4ff;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const CardButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(45deg, #0099cc, #00d4ff);
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  color: rgba(0, 212, 255, 0.3);
  font-size: ${props => props.size || '2rem'};
`;

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 180, 360],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <HomeContainer>
      <FloatingElements>
        <FloatingElement
          variants={floatingVariants}
          animate="animate"
          style={{ top: '10%', left: '10%' }}
          size="1.5rem"
        >
          🛰️
        </FloatingElement>
        <FloatingElement
          variants={floatingVariants}
          animate="animate"
          style={{ top: '20%', right: '15%', animationDelay: '2s' }}
          size="2rem"
        >
          🌍
        </FloatingElement>
        <FloatingElement
          variants={floatingVariants}
          animate="animate"
          style={{ bottom: '20%', left: '20%', animationDelay: '4s' }}
          size="1.8rem"
        >
          👨‍🚀
        </FloatingElement>
        <FloatingElement
          variants={floatingVariants}
          animate="animate"
          style={{ bottom: '30%', right: '10%', animationDelay: '6s' }}
          size="1.6rem"
        >
          🌌
        </FloatingElement>
      </FloatingElements>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroSection>
          <Title variants={itemVariants}>
            Experience the International Space Station
          </Title>
          <Subtitle variants={itemVariants}>
            Discover the breathtaking views from the ISS Cupola and experience the unique training 
            astronauts undergo in the Neutral Buoyancy Laboratory. Learn how these extraordinary 
            experiences benefit humanity and expand our understanding of Earth and space.
          </Subtitle>
        </HeroSection>

        <ExperienceCards variants={itemVariants}>
          <ExperienceCard
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CardIcon>🌍</CardIcon>
            <CardTitle>Cupola Experience</CardTitle>
            <CardDescription>
              Step into the ISS Cupola, the "window to the world," and witness Earth from 
              250 miles above. Customize your astronaut character and explore different 
              geographical locations with real NASA imagery and scientific data.
            </CardDescription>
            <CardButton to="/cupola">Enter Cupola</CardButton>
          </ExperienceCard>

          <ExperienceCard
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CardIcon>🏊‍♂️</CardIcon>
            <CardTitle>NBL Training</CardTitle>
            <CardDescription>
              Train like an astronaut in the Neutral Buoyancy Laboratory! Learn about 
              weightlessness, adjust your buoyancy, and complete underwater missions 
              that simulate spacewalks and lunar exploration tasks.
            </CardDescription>
            <CardButton to="/nbl">Start Training</CardButton>
          </ExperienceCard>
        </ExperienceCards>
      </motion.div>
    </HomeContainer>
  );
};

export default Home;
