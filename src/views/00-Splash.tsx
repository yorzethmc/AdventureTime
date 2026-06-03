import { sfxClick } from '../utils/audio';

interface Props {
  onNext: () => void;
  onInteract: () => void;
}

const Splash = ({ onNext, onInteract }: Props) => {
  const handleStart = () => {
    onInteract();
    sfxClick();
    onNext();
  };

  return (
    <div className="flex-column flex-center fade-in" style={{ flex: 1 }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>RPG DATE QUEST</h1>
      <p className="text-pixel text-center mb-3" style={{ color: 'var(--text-highlight)' }}>
        Una aventura especial está por comenzar.
      </p>
      
      <div className="avatar-preview">
        ✨
      </div>

      <button className="btn-retro mt-3" onClick={handleStart} style={{ fontSize: '1.2rem', padding: '15px 30px', animation: 'float 2s infinite' }}>
        PRESS START
      </button>
    </div>
  );
};

export default Splash;
