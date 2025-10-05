import React, { createContext, useContext, useState, useEffect } from 'react';

const MissionContext = createContext();

export const MissionProvider = ({ children }) => {
  const [completedMissions, setCompletedMissions] = useState(() => {
    // Load completed missions from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('completedMissions');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save to localStorage whenever completedMissions changes
  useEffect(() => {
    localStorage.setItem('completedMissions', JSON.stringify(completedMissions));
  }, [completedMissions]);

  const completeMission = (missionName) => {
    if (!completedMissions.includes(missionName)) {
      setCompletedMissions(prev => [...prev, missionName]);
    }
  };

  const resetMissions = () => {
    setCompletedMissions([]);
  };

  return (
    <MissionContext.Provider value={{ 
      completedMissions, 
      completeMission, 
      resetMissions 
    }}>
      {children}
    </MissionContext.Provider>
  );
};

export const useMission = () => {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error('useMission must be used within a MissionProvider');
  }
  return context;
};

export default MissionContext;
