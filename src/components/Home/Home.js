import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ISSTracker from '../ISSTracker/ISSTracker';
import ISSFacts from '../ISSFacts/ISSFacts';
import ISSModelViewer from '../ISSModel/ISSModel';
import SpaceGallery from '../SpaceGallery/SpaceGallery';
import MissionControl from '../MissionControl/MissionControl';

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
  background: 
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&q=80') center/cover;
  background-attachment: fixed;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(ellipse at top, rgba(0, 100, 200, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at bottom, rgba(0, 50, 100, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }
  
  & > * {
    position: relative;
    z-index: 2;
  }
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
  background: linear-gradient(45deg, #00d4ff, #0099cc, #ffffff, #00d4ff);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease-in-out infinite;
  text-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  padding: 1rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ExperienceCards = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  width: 100%;
`;

const ExperienceCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(0, 212, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 212, 255, 0.3);
    border-color: rgba(0, 212, 255, 0.7);
    
    &::before {
      left: 100%;
    }
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
  color: rgba(0, 212, 255, 0.4);
  font-size: ${props => props.size || '2rem'};
  filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.5));
`;

const ParticleField = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(0,212,255,0.2), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.4), transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(0,212,255,0.3), transparent),
    radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.2), transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: twinkle 3s ease-in-out infinite alternate;
  
  @keyframes twinkle {
    0% { opacity: 0.3; }
    100% { opacity: 0.8; }
  }
`;

const CreativeElement = styled(motion.div)`
  position: absolute;
  font-size: ${props => props.size || '1.5rem'};
  color: ${props => props.color || 'rgba(0, 212, 255, 0.6)'};
  filter: drop-shadow(0 0 8px ${props => props.color || 'rgba(0, 212, 255, 0.4)'});
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
        <ParticleField />
        
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
        
        {/* Additional creative elements */}
        <CreativeElement
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '15%', left: '50%' }}
          size="1.2rem"
          color="rgba(255, 107, 0, 0.6)"
        >
          ☄️
        </CreativeElement>
        
        <CreativeElement
          animate={{
            x: [-15, 15, -15],
            rotate: [0, -180, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{ top: '60%', left: '80%' }}
          size="1.4rem"
          color="rgba(255, 255, 255, 0.7)"
        >
          🌙
        </CreativeElement>
        
        <CreativeElement
          animate={{
            y: [-20, 20, -20],
            x: [-5, 5, -5],
            scale: [0.8, 1.1, 0.8]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          style={{ bottom: '40%', left: '5%' }}
          size="1.3rem"
          color="rgba(255, 20, 147, 0.5)"
        >
          🚀
        </CreativeElement>
        
        <CreativeElement
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '70%', right: '25%' }}
          size="1.1rem"
          color="rgba(50, 205, 50, 0.6)"
        >
          ⭐
        </CreativeElement>
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

        {/* Mission Control Center */}
        <motion.div
          variants={itemVariants}
          style={{ width: '100%', marginTop: '4rem' }}
        >
          <MissionControl />
        </motion.div>

        {/* New ISS Components */}
        <motion.div
          variants={itemVariants}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '2rem', 
            width: '100%', 
            maxWidth: '1200px',
            marginTop: '2rem'
          }}
        >
          <ISSTracker />
          <ISSFacts />
        </motion.div>

        {/* 3D ISS Model Viewer */}
        <motion.div
          variants={itemVariants}
          style={{ width: '100%', marginTop: '2rem' }}
        >
          <ISSModelViewer />
        </motion.div>

        {/* Space Gallery */}
        <motion.div
          variants={itemVariants}
          style={{ width: '100%', marginTop: '2rem' }}
        >
          <SpaceGallery />
        </motion.div>
      </motion.div>
    </HomeContainer>
  );
};

export default Home;
