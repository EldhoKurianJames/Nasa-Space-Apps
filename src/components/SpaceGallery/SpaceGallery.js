import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryContainer = styled(motion.div)`
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid #00d4ff;
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 1000px;
  backdrop-filter: blur(15px);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
`;

const GalleryTitle = styled.h2`
  font-family: 'Orbitron', monospace;
  color: #00d4ff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ImageCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(0, 212, 255, 0.3);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  aspect-ratio: 16/9;
  
  &:hover {
    border-color: rgba(0, 212, 255, 0.8);
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ImageCard}:hover & {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
  padding: 1rem;
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  ${ImageCard}:hover & {
    transform: translateY(0);
  }
`;

const ImageTitle = styled.h4`
  color: #00d4ff;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
`;

const ImageDescription = styled.p`
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.9;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: rgba(0, 212, 255, 0.2);
  border: 2px solid #00d4ff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #00d4ff;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(0, 212, 255, 0.4);
  }
`;

const SpaceGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const spaceImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80',
      title: 'Earth from Space',
      description: 'Our beautiful blue planet as seen from the International Space Station'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&q=80',
      title: 'Galaxy Spiral',
      description: 'A magnificent spiral galaxy showcasing the beauty of deep space'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80',
      title: 'Nebula Formation',
      description: 'Colorful cosmic clouds where new stars are born'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
      title: 'Milky Way',
      description: 'Our home galaxy stretching across the night sky'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=800&q=80',
      title: 'Solar System',
      description: 'Artistic representation of our solar system and its planets'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80',
      title: 'Space Station',
      description: 'International Space Station orbiting high above Earth'
    }
  ];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <>
      <GalleryContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GalleryTitle>🌌 Space Gallery</GalleryTitle>
        
        <ImageGrid>
          {spaceImages.map((image, index) => (
            <ImageCard
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => openModal(image)}
            >
              <Image src={image.url} alt={image.title} />
              <ImageOverlay>
                <ImageTitle>{image.title}</ImageTitle>
                <ImageDescription>{image.description}</ImageDescription>
              </ImageOverlay>
            </ImageCard>
          ))}
        </ImageGrid>
      </GalleryContainer>

      <AnimatePresence>
        {selectedImage && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>×</CloseButton>
              <ModalImage src={selectedImage.url} alt={selectedImage.title} />
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default SpaceGallery;
