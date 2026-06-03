import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const VIDEO_8BIT = 'PTUuQs90LDE';
const VIDEO_LOFI = 'GiE83-xFhCY';

const MusicPlayer = () => {
  const playerRef = useRef<any>(null);
  const [mode, setMode] = useState<'8bit' | 'lofi'>('8bit');
  const [volume, setVolume] = useState(25);

  useEffect(() => {
    // Inject YT script if not present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player('yt-player-hidden', {
          height: '0',
          width: '0',
          videoId: VIDEO_8BIT,
          playerVars: { autoplay: 0, controls: 0, modestbranding: 1, loop: 1, playlist: VIDEO_8BIT },
          events: {
            onReady: (event: any) => {
              event.target.setVolume(volume);
            },
            onStateChange: (event: any) => {
              // Force loop if ended
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.seekTo(0);
                event.target.playVideo();
              }
            }
          }
        });
      };
    }
  }, []);

  // Require first user interaction to start playing (browser autoplay policy)
  useEffect(() => {
    const handleInteraction = () => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        playerRef.current.playVideo();
      }
    };
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  // Make sure it keeps playing if it gets paused by any browser mechanic
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getPlayerState === 'function') {
        const state = playerRef.current.getPlayerState();
        if (state === window.YT.PlayerState.PAUSED || state === window.YT.PlayerState.UNSTARTED) {
          playerRef.current.playVideo();
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (val < 10) val = 10; // Mínimo 10% obligatorio
    setVolume(val);
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.setVolume(val);
    }
  };

  const toggleMode = () => {
    const newMode = mode === '8bit' ? 'lofi' : '8bit';
    setMode(newMode);
    
    if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
      const newVideoId = newMode === '8bit' ? VIDEO_8BIT : VIDEO_LOFI;
      playerRef.current.loadVideoById({
        videoId: newVideoId,
        startSeconds: 0
      });
      playerRef.current.setLoop(true);
      playerRef.current.setVolume(volume);
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="music-player-widget">
      <div id="yt-player-hidden" className="hidden-player"></div>
      
      <div className="music-controls-container">
        <div className="music-icon pulse-animation">🎧</div>
        
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
                min="10" 
                max="100" 
                value={volume} 
                onChange={handleVolumeChange} 
                className="volume-slider"
                title="Volumen (Mínimo 10%)"
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
