import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const MissionsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1.5rem;
`;

const MissionSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const MissionCard = styled(motion.div)`
  background: ${props => props.isSelected ? 
    'rgba(0, 212, 255, 0.2)' : 
    'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.isSelected ? '#00d4ff' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 15px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 212, 255, 0.2);
  }
`;

const MissionImage = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 0.5rem;
`;

const MissionIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const MissionTitle = styled.h4`
  color: #00d4ff;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const MissionDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  line-height: 1.4;
`;

const MissionInterface = styled.div`
  flex: 1;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const MissionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 212, 255, 0.3);
`;

const MissionName = styled.h3`
  color: #00d4ff;
  font-family: 'Orbitron', monospace;
`;

const MissionTimer = styled.div`
  color: white;
  font-family: 'Orbitron', monospace;
  font-size: 1.2rem;
`;

const TaskList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TaskItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${props => {
    if (props.status === 'completed') return '#44ff44';
    if (props.status === 'active') return '#00d4ff';
    return 'rgba(255, 255, 255, 0.2)';
  }};
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskInfo = styled.div`
  flex: 1;
`;

const TaskTitle = styled.div`
  color: white;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const TaskDetails = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
`;

const TaskButton = styled(motion.button)`
  background: ${props => {
    if (props.status === 'completed') return 'linear-gradient(45deg, #44aa44, #44ff44)';
    if (props.status === 'active') return 'linear-gradient(45deg, #0099cc, #00d4ff)';
    return 'rgba(255, 255, 255, 0.1)';
  }};
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: white;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-weight: 600;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 1rem;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #0099cc, #00d4ff);
  border-radius: 4px;
`;

const TrainingMissions = ({ astronautStats, setAstronautStats, images }) => {
  const [selectedMission, setSelectedMission] = useState('eva');
  const [missionProgress, setMissionProgress] = useState({});
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);

    const missions = [
    {
      id: 'eva',
      title: 'EVA Simulation',
      icon: '🚶‍♂️',
      description: 'Practice spacewalk procedures and tool handling',
      duration: 180, // 3 minutes
      tasks: [
        { id: 1, title: 'Enter Airlock', details: 'Practice entering and sealing the airlock', points: 10 },
        { id: 2, title: 'Tool Retrieval', details: 'Collect required tools from storage', points: 15 },
        { id: 3, title: 'Component Repair', details: 'Simulate repairing a station component', points: 25 },
        { id: 4, title: 'Exit Procedure', details: 'Safely exit and secure equipment', points: 10 }
      ],
      imageUrl: images && images.length > 0 ? images[0] : ''
    },
    {
      id: 'maintenance',
      title: 'ISS Maintenance',
      icon: '🔧',
      description: 'Perform routine maintenance tasks on station mockups',
      duration: 240, // 4 minutes
      tasks: [
        { id: 1, title: 'System Check', details: 'Inspect all systems for anomalies', points: 15 },
        { id: 2, title: 'Filter Replacement', details: 'Replace air filtration components', points: 20 },
        { id: 3, title: 'Cable Management', details: 'Organize and secure loose cables', points: 15 },
        { id: 4, title: 'Documentation', details: 'Record all maintenance activities', points: 10 }
      ],
      imageUrl: images && images.length > 1 ? images[1] : ''
    },
    {
      id: 'emergency',
      title: 'Emergency Response',
      icon: '🚨',
      description: 'Practice emergency procedures and rapid response',
      duration: 120, // 2 minutes
      tasks: [
        { id: 1, title: 'Alarm Response', details: 'Identify and respond to emergency alarm', points: 20 },
        { id: 2, title: 'Isolation Procedure', details: 'Isolate affected systems quickly', points: 25 },
        { id: 3, title: 'Backup Activation', details: 'Activate backup systems', points: 20 },
        { id: 4, title: 'Status Report', details: 'Communicate status to mission control', points: 15 }
      ],
      imageUrl: images && images.length > 2 ? images[2] : ''
    }
  ];

  const currentMission = missions.find(m => m.id === selectedMission);
  const currentProgress = missionProgress[selectedMission] || { completedTasks: [], score: 0 };

  const startMission = () => {
    setIsActive(true);
    setTimer(currentMission.duration);
    
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const completeTask = (taskId) => {
    const task = currentMission.tasks.find(t => t.id === taskId);
    const newProgress = {
      ...currentProgress,
      completedTasks: [...currentProgress.completedTasks, taskId],
      score: currentProgress.score + task.points
    };
    
    setMissionProgress(prev => ({
      ...prev,
      [selectedMission]: newProgress
    }));

    // Update astronaut stats
    setAstronautStats(prev => ({
      ...prev,
      totalScore: prev.totalScore + task.points,
      completedMissions: newProgress.completedTasks.length === currentMission.tasks.length ? 
        prev.completedMissions + 1 : prev.completedMissions
    }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTaskStatus = (taskId) => {
    if (currentProgress.completedTasks.includes(taskId)) return 'completed';
    if (isActive && (currentProgress.completedTasks.length + 1) === taskId) return 'active';
    return 'pending';
  };

  const getProgressPercentage = () => {
    return (currentProgress.completedTasks.length / currentMission.tasks.length) * 100;
  };

  return (
    <MissionsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MissionSelector>
        {missions.map(mission => (
          <MissionCard
            key={mission.id}
            isSelected={selectedMission === mission.id}
            onClick={() => setSelectedMission(mission.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
                        {mission.imageUrl ? <MissionImage src={mission.imageUrl} alt={mission.title} /> : <MissionIcon>{mission.icon}</MissionIcon>}
            <MissionTitle>{mission.title}</MissionTitle>
            <MissionDescription>{mission.description}</MissionDescription>
          </MissionCard>
        ))}
      </MissionSelector>

      <MissionInterface>
        <MissionHeader>
          <MissionName>{currentMission.title}</MissionName>
          <MissionTimer>
            {isActive ? formatTime(timer) : formatTime(currentMission.duration)}
          </MissionTimer>
        </MissionHeader>

        <TaskList>
          {currentMission.tasks.map(task => (
            <TaskItem
              key={task.id}
              status={getTaskStatus(task.id)}
              whileHover={{ scale: 1.02 }}
            >
              <TaskInfo>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskDetails>{task.details} (+{task.points} points)</TaskDetails>
              </TaskInfo>
              <TaskButton
                status={getTaskStatus(task.id)}
                disabled={getTaskStatus(task.id) === 'pending' || getTaskStatus(task.id) === 'completed'}
                onClick={() => completeTask(task.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getTaskStatus(task.id) === 'completed' ? '✓ Done' : 
                 getTaskStatus(task.id) === 'active' ? 'Complete' : 'Waiting'}
              </TaskButton>
            </TaskItem>
          ))}
        </TaskList>

        <ProgressBar>
          <ProgressFill
            animate={{ width: `${getProgressPercentage()}%` }}
            transition={{ duration: 0.5 }}
          />
        </ProgressBar>

        <motion.button
          className="button-primary"
          onClick={startMission}
          disabled={isActive || getProgressPercentage() === 100}
          style={{ 
            marginTop: '1rem',
            alignSelf: 'center',
            padding: '1rem 2rem'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isActive ? 'Mission In Progress...' : 
           getProgressPercentage() === 100 ? 'Mission Complete!' : 'Start Mission'}
        </motion.button>
      </MissionInterface>
    </MissionsContainer>
  );
};

export default TrainingMissions;
