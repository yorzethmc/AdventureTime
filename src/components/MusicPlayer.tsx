import { useRef, useState, useEffect } from 'react';

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [mode, setMode] = useState<'8bit' | 'lofi'>('8bit');
  const [volume, setVolume] = useState(25);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

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
    
    const handleStopMusic = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener('stopMusic', handleStopMusic);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('stopMusic', handleStopMusic);
    };
  }, [isPlaying]);



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
    ? `${import.meta.env.BASE_URL}music_8bit.m4a` 
    : `${import.meta.env.BASE_URL}music_lofi.m4a`;

  if (isHidden) return null;

  return (
    <div className="music-player-widget">
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        loop 
        autoPlay={isPlaying}
      />
      
      <div className="music-controls-container" style={{ padding: isCollapsed ? '8px' : '12px 15px', position: 'relative' }}>
        {isCollapsed && (
          <div 
            onClick={(e) => { e.stopPropagation(); setIsHidden(true); }}
            style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ff6b6b', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
            title="Ocultar música"
          >
            ×
          </div>
        )}
        <div 
          className="music-icon pulse-animation" 
          title="Música"
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ cursor: 'pointer', margin: 0 }}
        >
          🎧
        </div>
        
        {!isCollapsed && (
          <div className="music-controls">
            <div 
              onClick={(e) => { e.stopPropagation(); setIsHidden(true); }}
              style={{ position: 'absolute', top: '5px', right: '5px', color: '#ff6b6b', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
              title="Ocultar música"
            >
              [X]
            </div>
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
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
