import { useRef, useState, useEffect } from 'react';

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [mode, setMode] = useState<'8bit' | 'lofi'>('8bit');
  const [volume, setVolume] = useState(25);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Handle first interaction to play music
  useEffect(() => {
    const handleInteraction = () => {
      if (!isPlaying && audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMode = () => {
    const nextMode = mode === '8bit' ? 'lofi' : '8bit';
    setMode(nextMode);
    // When changing track, ensure it plays automatically if it was already playing
    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play().catch(() => {});
      }, 50);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value, 10));
  };

  // We use standard HTML5 audio to prevent YouTube ads
  const audioSrc = mode === '8bit' 
    ? `${import.meta.env.BASE_URL}music_8bit.mp3` 
    : `${import.meta.env.BASE_URL}music_lofi.mp3`;

  return (
    <div className="music-player-widget">
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        loop 
        autoPlay={isPlaying}
      />
      
      <div className="music-controls-container">
        <div className="music-icon pulse-animation" onClick={togglePlay} style={{ cursor: 'pointer' }} title="Play/Pause">
          {isPlaying ? '🎧' : '⏸️'}
        </div>
        
        <div className="music-controls">
          <div className="track-info">
            <span>Now Playing: {mode === '8bit' ? 'Mi Corazón Encantado (8-Bit)' : 'Mi Corazón Encantado (Lo-Fi)'}</span>
          </div>

          <div className="control-row">
            <button className="btn-track-switch" onClick={toggleMode}>
              Cambiar a {mode === '8bit' ? 'Lo-Fi 🎵' : '8-Bit 👾'}
            </button>

            <div className="volume-control">
              <span>🔈</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume} 
                onChange={handleVolumeChange} 
                className="volume-slider"
                title="Volumen"
              />
              <span>🔊</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
