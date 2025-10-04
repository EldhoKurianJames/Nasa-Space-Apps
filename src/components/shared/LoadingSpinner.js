import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const orbit = keyframes`
  0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
`;

const SpinnerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
`;

const MainSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid rgba(0, 212, 255, 0.2);
  border-top: 3px solid #00d4ff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const OrbitingDot = styled.div`
  width: 8px;
  height: 8px;
  background: #00d4ff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  animation: ${orbit} 2s linear infinite;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
`;

const LoadingText = styled(motion.div)`
  color: #00d4ff;
  font-family: 'Orbitron', monospace;
  font-size: 1rem;
  text-align: center;
`;

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <SpinnerContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <SpinnerWrapper>
        <MainSpinner />
        <OrbitingDot />
      </SpinnerWrapper>
      <LoadingText
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
      </LoadingText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
