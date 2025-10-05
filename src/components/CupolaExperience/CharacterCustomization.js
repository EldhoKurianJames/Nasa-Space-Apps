import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CustomizationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  color: #00d4ff;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const CharacterPreview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  margin-bottom: 1rem;
`;

const getAstronautEmoji = (character) => {
  const { skinTone, helmet } = character;
  
  // Base emoji based on skin tone
  let emoji;
  switch(skinTone) {
    case 'dark': emoji = '👨🏿' + (helmet ? '🚀' : ''); break;
    case 'medium': emoji = '👨🏽' + (helmet ? '🚀' : ''); break;
    default: emoji = '👨' + (helmet ? '🚀' : '');
  }
  
  return emoji;
};

const AstronautFigure = styled.div`
  font-size: 4rem;
  filter: ${props => {
    const filters = [];
    
    // Suit color filter - only apply when helmet is on
    if (props.helmet) {
      if (props.suitColor === 'orange') filters.push('sepia(1) saturate(2) hue-rotate(15deg)');
      if (props.suitColor === 'blue') filters.push('sepia(1) saturate(2) hue-rotate(200deg)');
    }
    
    // Hair color filter - only when helmet is off
    if (!props.helmet) {
      if (props.hairColor === 'black') filters.push('brightness(0.7)');
      if (props.hairColor === 'blonde') filters.push('brightness(1.4) saturate(1.5) hue-rotate(10deg)');
      if (props.hairColor === 'red') filters.push('hue-rotate(-20deg) saturate(1.5)');
    }
    
    return filters.join(' ') || 'none';
  }};
  transition: all 0.3s ease;
  opacity: ${props => props.helmet ? 1 : 0.8};
`;

const CustomizationGroup = styled.div`
  margin-bottom: 1rem;
`;

const GroupLabel = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: 0.5rem;
`;

const OptionButton = styled(motion.button)`
  background: ${props => props.isSelected ? 
    'linear-gradient(45deg, #0099cc, #00d4ff)' : 
    'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.isSelected ? '#00d4ff' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 10px;
  padding: 0.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  text-align: center;
  
  &:hover {
    background: ${props => props.isSelected ? 
      'linear-gradient(45deg, #0099cc, #00d4ff)' : 
      'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-2px);
  }
`;

const ToggleButton = styled(motion.button)`
  background: ${props => props.isActive ? 
    'linear-gradient(45deg, #0099cc, #00d4ff)' : 
    'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.isActive ? '#00d4ff' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
  }
`;

const CharacterCustomization = ({ character, setCharacter }) => {
  const updateCharacter = (property, value) => {
    setCharacter(prev => {
      const newCharacter = {
        ...prev,
        [property]: value
      };
      
      // If helmet is turned off, ensure suit color is visible
      if (property === 'helmet' && !value) {
        newCharacter.suitColor = 'white';
      }
      
      return newCharacter;
    });
  };

  const skinToneOptions = [
    { value: 'light', label: 'Light', emoji: '👨‍🚀' },
    { value: 'medium', label: 'Medium', emoji: '👨🏽‍🚀' },
    { value: 'dark', label: 'Dark', emoji: '👨🏿‍🚀' }
  ];

  const hairColorOptions = [
    { value: 'brown', label: 'Brown' },
    { value: 'black', label: 'Black' },
    { value: 'blonde', label: 'Blonde' },
    { value: 'red', label: 'Red' }
  ];

  const suitColorOptions = [
    { value: 'white', label: 'White' },
    { value: 'orange', label: 'Orange' },
    { value: 'blue', label: 'Blue' }
  ];

  return (
    <CustomizationContainer>
      <SectionTitle>Customize Your Astronaut</SectionTitle>
      
      <CharacterPreview>
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <AstronautFigure 
            skinTone={character.skinTone}
            suitColor={character.suitColor}
          >
            {getAstronautEmoji(character)}
          </AstronautFigure>
          {!character.helmet && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '1rem',
              background: 'rgba(0,0,0,0.7)',
              padding: '0.25rem 0.5rem',
              borderRadius: '10px',
              color: '#fff',
              whiteSpace: 'nowrap'
            }}>
              Helmet Off
            </div>
          )}
        </div>
      </CharacterPreview>

      <CustomizationGroup>
        <GroupLabel>Appearance</GroupLabel>
        <OptionGrid>
          {skinToneOptions.map(option => (
            <OptionButton
              key={option.value}
              isSelected={character.skinTone === option.value}
              onClick={() => updateCharacter('skinTone', option.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                {option.emoji}
              </div>
              {option.label}
            </OptionButton>
          ))}
        </OptionGrid>
      </CustomizationGroup>

      <CustomizationGroup>
        <GroupLabel>Hair Color</GroupLabel>
        <OptionGrid>
          {hairColorOptions.map(option => (
            <OptionButton
              key={option.value}
              isSelected={character.hairColor === option.value}
              onClick={() => updateCharacter('hairColor', option.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option.label}
            </OptionButton>
          ))}
        </OptionGrid>
      </CustomizationGroup>

      <CustomizationGroup>
        <GroupLabel>Suit Color</GroupLabel>
        <OptionGrid>
          {suitColorOptions.map(option => (
            <OptionButton
              key={option.value}
              isSelected={character.suitColor === option.value}
              onClick={() => updateCharacter('suitColor', option.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option.label}
            </OptionButton>
          ))}
        </OptionGrid>
      </CustomizationGroup>

      <CustomizationGroup>
        <GroupLabel>Equipment</GroupLabel>
        <ToggleButton
          isActive={character.helmet}
          onClick={() => updateCharacter('helmet', !character.helmet)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {character.helmet ? '🪖 Helmet ON' : '🪖 Helmet OFF'}
        </ToggleButton>
      </CustomizationGroup>
    </CustomizationContainer>
  );
};

export default CharacterCustomization;
