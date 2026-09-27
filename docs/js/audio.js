// Web Audio API Synthesizer for Museum Ambiance & Interaction Chimes
class MuseumAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingAmbiance = false;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.masterGain = null;
    this.ambianceGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.init();
    if (this.isPlayingAmbiance) {
      this.stopAmbiance();
    } else {
      this.startAmbiance();
    }
    this.updateUI();
  }

  startAmbiance() {
    if (this.isPlayingAmbiance) return;
    try {
      this.init();
      
      // Binaural 432 Hz Alpha Wave Drone
      this.ambianceGain = this.ctx.createGain();
      this.ambianceGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambianceGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);

      // Low harmonic fundamental
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(108, this.ctx.currentTime); // A2 harmonic

      // Detuned pair for subtle alpha-beat (10Hz difference)
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(118, this.ctx.currentTime); // 10Hz Alpha pulse

      // Warm low-pass filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      this.droneOsc1.connect(filter);
      this.droneOsc2.connect(filter);
      filter.connect(this.ambianceGain);
      this.ambianceGain.connect(this.masterGain);

      this.droneOsc1.start();
      this.droneOsc2.start();

      this.isPlayingAmbiance = true;
    } catch (e) {
      console.warn('Audio ambiance could not start:', e);
    }
  }

  stopAmbiance() {
    if (!this.isPlayingAmbiance) return;
    try {
      if (this.ambianceGain) {
        this.ambianceGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
      }
      setTimeout(() => {
        if (this.droneOsc1) { this.droneOsc1.stop(); this.droneOsc1.disconnect(); }
        if (this.droneOsc2) { this.droneOsc2.stop(); this.droneOsc2.disconnect(); }
        this.isPlayingAmbiance = false;
        this.updateUI();
      }, 1500);
    } catch (e) {
      this.isPlayingAmbiance = false;
      this.updateUI();
    }
  }

  // Interactive synthesized sound effects
  playSfx(type = 'click') {
    try {
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.masterGain);

      if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.08);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.26);
      } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
        osc.start(now);
        osc.stop(now + 0.27);
      } else if (type === 'badge') {
        // Pentatonic celebration chime
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const noteOsc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();
          noteOsc.type = 'sine';
          noteOsc.frequency.setValueAtTime(freq, now + i * 0.1);
          noteGain.gain.setValueAtTime(0.12, now + i * 0.1);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);
          noteOsc.connect(noteGain);
          noteGain.connect(this.masterGain);
          noteOsc.start(now + i * 0.1);
          noteOsc.stop(now + i * 0.1 + 0.45);
        });
      }
    } catch (e) {
      // Audio autoplay policy catch
    }
  }

  updateUI() {
    const icon = document.getElementById('audioIcon');
    const label = document.getElementById('audioLabel');
    if (icon && label) {
      if (this.isPlayingAmbiance) {
        icon.setAttribute('data-lucide', 'volume-2');
        label.textContent = 'Alpha: 432Hz';
        label.classList.add('text-cyan-400');
      } else {
        icon.setAttribute('data-lucide', 'volume-x');
        label.textContent = 'Sound: Off';
        label.classList.remove('text-cyan-400');
      }
      if (window.lucide) lucide.createIcons();
    }
  }
}

const AudioAmbiance = new MuseumAudioEngine();
