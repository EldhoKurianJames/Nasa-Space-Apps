import { useEffect, useRef } from 'react';

// Web Audio API based sound effects for space ambiance
class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.isInitialized = true;
      this.createSounds();
    } catch (error) {
      console.log('Web Audio API not supported');
    }
  }

  createSounds() {
    if (!this.audioContext) return;

    // Create ambient space sound
    this.sounds.ambient = this.createAmbientSound();
    
    // Create button click sound
    this.sounds.click = this.createClickSound();
    
    // Create achievement sound
    this.sounds.achievement = this.createAchievementSound();
    
    // Create whoosh sound for transitions
    this.sounds.whoosh = this.createWhooshSound();
  }

  createAmbientSound() {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(60, this.audioContext.currentTime);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    return { oscillator, gainNode, filter };
  }

  createClickSound() {
    return () => {
      if (!this.audioContext) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.1);
    };
  }

  createAchievementSound() {
    return () => {
      if (!this.audioContext) return;
      
      const oscillator1 = this.audioContext.createOscillator();
      const oscillator2 = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator1.type = 'sine';
      oscillator1.frequency.setValueAtTime(523, this.audioContext.currentTime); // C5
      oscillator1.frequency.setValueAtTime(659, this.audioContext.currentTime + 0.1); // E5
      oscillator1.frequency.setValueAtTime(784, this.audioContext.currentTime + 0.2); // G5
      
      oscillator2.type = 'sine';
      oscillator2.frequency.setValueAtTime(1047, this.audioContext.currentTime + 0.3); // C6
      
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
      
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator1.start();
      oscillator1.stop(this.audioContext.currentTime + 0.3);
      oscillator2.start(this.audioContext.currentTime + 0.3);
      oscillator2.stop(this.audioContext.currentTime + 0.5);
    };
  }

  createWhooshSound() {
    return () => {
      if (!this.audioContext) return;
      
      const bufferSize = this.audioContext.sampleRate * 0.5;
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
      }
      
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      
      source.buffer = buffer;
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1000, this.audioContext.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.5);
      
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
      
      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      source.start();
    };
  }

  playSound(soundName) {
    if (this.sounds[soundName] && typeof this.sounds[soundName] === 'function') {
      this.sounds[soundName]();
    }
  }

  startAmbient() {
    if (this.sounds.ambient && this.sounds.ambient.oscillator) {
      this.sounds.ambient.oscillator.start();
    }
  }

  stopAmbient() {
    if (this.sounds.ambient && this.sounds.ambient.oscillator) {
      this.sounds.ambient.oscillator.stop();
    }
  }
}

// React hook for using sound effects
export const useSoundEffects = () => {
  const soundEffectsRef = useRef(null);

  useEffect(() => {
    soundEffectsRef.current = new SoundEffects();
    
    // Initialize on first user interaction
    const initializeAudio = () => {
      if (soundEffectsRef.current) {
        soundEffectsRef.current.initialize();
        document.removeEventListener('click', initializeAudio);
        document.removeEventListener('keydown', initializeAudio);
      }
    };

    document.addEventListener('click', initializeAudio);
    document.addEventListener('keydown', initializeAudio);

    return () => {
      document.removeEventListener('click', initializeAudio);
      document.removeEventListener('keydown', initializeAudio);
      if (soundEffectsRef.current && soundEffectsRef.current.audioContext) {
        soundEffectsRef.current.audioContext.close();
      }
    };
  }, []);

  const playSound = (soundName) => {
    if (soundEffectsRef.current) {
      soundEffectsRef.current.playSound(soundName);
    }
  };

  return { playSound };
};

export default SoundEffects;
