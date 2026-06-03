import { useState } from 'react';
import { sfxClick } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  onNext: () => void;
  onInteract: () => void;
}

const Splash = ({ onNext, onInteract }: Props) => {
  const [showButton, setShowButton] = useState(false);

  const handleStart = () => {
    onInteract();
    sfxClick();
    onNext();
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

      <button className={`btn-retro mt-3 ${showButton ? 'fade-in' : 'hidden'}`} onClick={handleStart} style={{ fontSize: '1.2rem', padding: '15px 30px', animation: 'float 2s infinite', visibility: showButton ? 'visible' : 'hidden' }}>
        PRESS START
      </button>
    </div>
  );
};

export default Splash;
