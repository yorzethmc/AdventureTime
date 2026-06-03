let audioCtx: AudioContext | null = null;

export const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const playTone = (freq: number, type: OscillatorType, duration: number, vol = 0.1) => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
};

export const sfxClick = () => {
  if (!audioCtx) return;
  playTone(600, 'square', 0.1);
  setTimeout(() => playTone(800, 'square', 0.15), 50);
};

export const sfxSelect = () => {
  if (!audioCtx) return;
  playTone(800, 'sine', 0.1);
  setTimeout(() => playTone(1200, 'sine', 0.15), 100);
};

export const sfxBuzz = () => {
  if (!audioCtx) return;
  playTone(150, 'sawtooth', 0.3, 0.2);
};

export const sfxVictory = () => {
  if (!audioCtx) return;
  const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 'square', 0.2, 0.15), i * 150);
  });
  setTimeout(() => playTone(880, 'square', 0.6, 0.2), notes.length * 150);
};
