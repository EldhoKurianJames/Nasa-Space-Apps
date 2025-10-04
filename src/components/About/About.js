import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 100px 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h1)`
  font-family: 'Orbitron', monospace;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #00d4ff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ContentGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const InfoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  color: #00d4ff;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const CardContent = styled.div`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  
  p {
    margin-bottom: 1rem;
  }
  
  ul {
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const FactsSection = styled(motion.div)`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const FactsTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  color: #00d4ff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const FactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const FactItem = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
`;

const FactNumber = styled.div`
  font-family: 'Orbitron', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: #00d4ff;
  margin-bottom: 0.5rem;
`;

const FactLabel = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FactDescription = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.4;
`;

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  return (
    <AboutContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Title variants={itemVariants}>
          About the ISS Experience
        </Title>

        <ContentGrid variants={itemVariants}>
          <InfoCard whileHover={{ scale: 1.02 }}>
            <CardIcon>🛰️</CardIcon>
            <CardTitle>International Space Station</CardTitle>
            <CardContent>
              <p>
                The International Space Station (ISS) is humanity's home in space, orbiting Earth 
                at an altitude of approximately 408 kilometers (254 miles) above sea level.
              </p>
              <p>
                The Cupola, known as the "window to the world," provides astronauts with 
                breathtaking 360-degree views of Earth, allowing them to conduct Earth 
                observations, assist with robotics operations, and simply marvel at our planet.
              </p>
            </CardContent>
          </InfoCard>

          <InfoCard whileHover={{ scale: 1.02 }}>
            <CardIcon>🏊‍♂️</CardIcon>
            <CardTitle>Neutral Buoyancy Laboratory</CardTitle>
            <CardContent>
              <p>
                The NBL at NASA's Johnson Space Center in Houston is the world's largest indoor 
                pool, containing 6.2 million gallons of water and measuring 62m x 31m x 12m deep.
              </p>
              <p>
                Astronauts train underwater to simulate the weightless environment of space, 
                practicing spacewalks (EVAs) and learning to work with tools in a microgravity-like 
                environment.
              </p>
            </CardContent>
          </InfoCard>

          <InfoCard whileHover={{ scale: 1.02 }}>
            <CardIcon>🌍</CardIcon>
            <CardTitle>Earth Observation Benefits</CardTitle>
            <CardContent>
              <p>
                ISS observations contribute to numerous scientific fields:
              </p>
              <ul>
                <li>Climate change monitoring and research</li>
                <li>Disaster response and management</li>
                <li>Agricultural and environmental studies</li>
                <li>Urban planning and development</li>
                <li>Ocean and atmospheric research</li>
              </ul>
            </CardContent>
          </InfoCard>

          <InfoCard whileHover={{ scale: 1.02 }}>
            <CardIcon>🚀</CardIcon>
            <CardTitle>Future Missions</CardTitle>
            <CardContent>
              <p>
                Training in the NBL prepares astronauts for:
              </p>
              <ul>
                <li>ISS maintenance and construction</li>
                <li>Future lunar missions (Artemis program)</li>
                <li>Mars exploration preparation</li>
                <li>Commercial space station operations</li>
                <li>Deep space exploration missions</li>
              </ul>
            </CardContent>
          </InfoCard>
        </ContentGrid>

        <FactsSection variants={itemVariants}>
          <FactsTitle>Amazing ISS & NBL Facts</FactsTitle>
          <FactsGrid>
            <FactItem whileHover={{ scale: 1.05 }}>
              <FactNumber>27,600</FactNumber>
              <FactLabel>km/h</FactLabel>
              <FactDescription>Speed of the ISS orbiting Earth</FactDescription>
            </FactItem>
            
            <FactItem whileHover={{ scale: 1.05 }}>
              <FactNumber>90</FactNumber>
              <FactLabel>minutes</FactLabel>
              <FactDescription>Time for ISS to complete one orbit</FactDescription>
            </FactItem>
            
            <FactItem whileHover={{ scale: 1.05 }}>
              <FactNumber>16</FactNumber>
              <FactLabel>sunrises</FactLabel>
              <FactDescription>Astronauts see per day on the ISS</FactDescription>
            </FactItem>
            
            <FactItem whileHover={{ scale: 1.05 }}>
              <FactNumber>6.2M</FactNumber>
              <FactLabel>gallons</FactLabel>
              <FactDescription>Water capacity of the NBL pool</FactDescription>
            </FactItem>
            
            <FactItem whileHover={{ scale: 1.05 }}>
              <FactNumber>7</FactNumber>
              <FactLabel>hours</FactLabel>
              <FactDescription>Typical NBL training session duration</FactDescription>
            </FactItem>
            
            <FactItem whileHover={{ scale: 1.05 }}>
              <FactNumber>100+</FactNumber>
              <FactLabel>hours</FactLabel>
              <FactDescription>NBL training per spacewalk hour</FactDescription>
            </FactItem>
          </FactsGrid>
        </FactsSection>
      </motion.div>
    </AboutContainer>
  );
};

export default About;
