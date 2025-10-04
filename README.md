# ISS Experience App 🛰️

An interactive React application that simulates the International Space Station Cupola experience and Neutral Buoyancy Laboratory (NBL) training. This educational tool helps students and the public understand astronaut experiences and how space exploration benefits humanity.

## Features

### 🌍 Cupola Experience
- **Character Customization**: Create your own astronaut with different appearance options
- **Earth Observation**: View different geographical locations from the ISS perspective
- **Weather Overlay**: Real-time weather simulation for each location
- **Educational Content**: Learn about each location with real facts and NASA imagery
- **Interactive Interface**: Navigate between locations and see real-time ISS data

### 🏊‍♂️ NBL Training Simulation
- **Buoyancy Control**: Learn to achieve neutral buoyancy like real astronauts
- **Training Missions**: Complete EVA simulations, maintenance tasks, and emergency procedures
- **Progress Tracking**: Monitor your training progress and unlock achievements
- **Achievement System**: Unlock rewards and get notifications for milestones
- **Realistic Physics**: Experience weight and equipment adjustments

### 🎯 Enhanced Features
- **Welcome Tutorial**: Interactive onboarding for new users
- **Help System**: Comprehensive guide accessible anytime
- **Notification System**: Achievement alerts and progress updates
- **Particle Effects**: Dynamic space-themed background animations
- **Sound Effects**: Immersive audio feedback (Web Audio API)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Engaging transitions and interactive elements powered by Framer Motion
- **Educational Focus**: Learn how ISS observations benefit Earth and humanity
- **Gamification**: Points, achievements, and progress tracking with local storage

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 14.0 or higher)
- **npm** (comes with Node.js) or **yarn**

## Installation & Setup

1. **Navigate to the project directory**:
   ```bash
   cd d:/nasa
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   
   Or if you prefer yarn:
   ```bash
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   
   Or with yarn:
   ```bash
   yarn start
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

The app will automatically reload when you make changes to the source code.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Removes the single build dependency (⚠️ irreversible)

## Project Structure

```
d:/nasa/
├── public/
│   └── index.html          # Main HTML template
├── src/
│   ├── components/
│   │   ├── Header/         # Navigation header
│   │   ├── Home/           # Landing page
│   │   ├── CupolaExperience/
│   │   │   ├── CupolaExperience.js
│   │   │   ├── CharacterCustomization.js
│   │   │   ├── EarthViewer.js
│   │   │   └── LocationInfo.js
│   │   ├── NBLTraining/
│   │   │   ├── NBLTraining.js
│   │   │   ├── BuoyancySimulator.js
│   │   │   ├── TrainingMissions.js
│   │   │   └── ProgressTracker.js
│   │   └── About/          # Information about ISS and NBL
│   ├── App.js              # Main application component
│   ├── App.css             # Global styles
│   ├── index.js            # Application entry point
│   └── index.css           # Base styles
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Technologies Used

- **React 18** - Frontend framework
- **React Router** - Navigation and routing
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Animations and transitions
- **Modern CSS** - Gradients, backdrop filters, and responsive design

## Educational Content

This app is designed to teach users about:

- **ISS Operations**: How astronauts live and work in space
- **Earth Observation**: The importance of monitoring our planet from space
- **Astronaut Training**: The rigorous preparation required for space missions
- **Scientific Benefits**: How space research helps solve problems on Earth
- **Future Missions**: Preparation for lunar and Mars exploration

## Browser Compatibility

This app works best on modern browsers that support:
- CSS Grid and Flexbox
- CSS Custom Properties
- ES6+ JavaScript features
- WebGL (for smooth animations)

Recommended browsers:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Troubleshooting

### Common Issues:

1. **Port 3000 already in use**:
   - The app will automatically try to use port 3001
   - Or manually specify a port: `PORT=3001 npm start`

2. **Dependencies not installing**:
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again

3. **App not loading**:
   - Check that Node.js version is 14.0 or higher
   - Ensure all dependencies installed successfully

## Performance Tips

- The app uses lazy loading for optimal performance
- Images are optimized and served from CDN sources
- Animations are GPU-accelerated where possible
- The app is fully responsive and mobile-friendly

## Contributing

This is an educational project. Feel free to:
- Add new Earth observation locations
- Create additional training missions
- Improve the UI/UX design
- Add more educational content

## License

This project is created for educational purposes and uses publicly available NASA imagery and data.

---

**Ready to explore space? Run `npm start` and begin your ISS experience! 🚀**
