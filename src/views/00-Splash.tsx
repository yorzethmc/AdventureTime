import { useState } from 'react';
import { sfxClick } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  onNext: () => void;
  onInteract: () => void;
  onContinue?: () => void;
  hasSave?: boolean;
}

const Splash = ({ onNext, onInteract, onContinue, hasSave }: Props) => {
  const [showButton, setShowButton] = useState(false);

  const handleStart = () => {
    onInteract();
    sfxClick();
    onNext();
  };

  const handleContinueClick = () => {
    onInteract();
    sfxClick();
    if (onContinue) onContinue();
  };

  return (
    <div className="flex-column flex-center fade-in" style={{ flex: 1 }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>RPG DATE QUEST</h1>
      <div className="fade-in">
        <p className="text-pixel mb-3" style={{ color: '#ecfeff', textShadow: '1px 1px 0px #000' }}>
          <Typewriter 
            text="Una aventura especial está por comenzar." 
            speed={40} 
            onComplete={() => setShowButton(true)} 
          />
        </p>
      </div>
      
      <div className="avatar-preview">
        ✨
      </div>

      <div className={`flex-column gap-3 mt-3 ${showButton ? 'fade-in' : 'hidden'}`} style={{ visibility: showButton ? 'visible' : 'hidden' }}>
        {hasSave && (
          <button className="btn-retro" onClick={handleContinueClick} style={{ fontSize: '1rem', padding: '10px 20px', backgroundColor: '#5c940d' }}>
            CONTINUAR PARTIDA
          </button>
        )}
        <button className="btn-retro" onClick={handleStart} style={{ fontSize: '1.2rem', padding: '15px 30px', animation: 'float 2s infinite' }}>
          {hasSave ? 'NUEVA PARTIDA' : 'PRESS START'}
        </button>
      </div>
    </div>
  );
};

export default Splash;
