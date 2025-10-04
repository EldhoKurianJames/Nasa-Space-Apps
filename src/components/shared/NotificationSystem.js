import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationContainer = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  pointer-events: none;
`;

const Notification = styled(motion.div)`
  background: ${props => {
    switch (props.type) {
      case 'achievement': return 'linear-gradient(45deg, #ffd700, #ffed4e)';
      case 'success': return 'linear-gradient(45deg, #00cc44, #00ff55)';
      case 'info': return 'linear-gradient(45deg, #0099cc, #00d4ff)';
      case 'warning': return 'linear-gradient(45deg, #ff8800, #ffaa00)';
      default: return 'linear-gradient(45deg, #0099cc, #00d4ff)';
    }
  }};
  color: ${props => props.type === 'achievement' ? '#000' : '#fff'};
  padding: 1rem 1.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 300px;
  pointer-events: auto;
  cursor: pointer;
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

const NotificationIcon = styled.div`
  font-size: 1.5rem;
`;

const NotificationTitle = styled.div`
  font-weight: 700;
  font-family: 'Orbitron', monospace;
  font-size: 0.9rem;
`;

const NotificationMessage = styled.div`
  font-size: 0.8rem;
  line-height: 1.4;
  opacity: 0.9;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

let notificationId = 0;

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for custom notification events
    const handleNotification = (event) => {
      const { type, title, message, duration = 5000 } = event.detail;
      
      const id = ++notificationId;
      const notification = {
        id,
        type,
        title,
        message,
        duration
      };

      setNotifications(prev => [...prev, notification]);

      // Auto-remove after duration
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    };

    window.addEventListener('showNotification', handleNotification);
    
    return () => {
      window.removeEventListener('showNotification', handleNotification);
    };
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'achievement': return '🏆';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return '🔔';
    }
  };

  return (
    <NotificationContainer>
      <AnimatePresence>
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            type={notification.type}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => removeNotification(notification.id)}
            whileHover={{ scale: 1.02 }}
          >
            <CloseButton onClick={() => removeNotification(notification.id)}>
              ×
            </CloseButton>
            <NotificationHeader>
              <NotificationIcon>{getIcon(notification.type)}</NotificationIcon>
              <NotificationTitle>{notification.title}</NotificationTitle>
            </NotificationHeader>
            <NotificationMessage>{notification.message}</NotificationMessage>
          </Notification>
        ))}
      </AnimatePresence>
    </NotificationContainer>
  );
};

// Helper function to show notifications from anywhere in the app
export const showNotification = (type, title, message, duration) => {
  const event = new CustomEvent('showNotification', {
    detail: { type, title, message, duration }
  });
  window.dispatchEvent(event);
};

export default NotificationSystem;
