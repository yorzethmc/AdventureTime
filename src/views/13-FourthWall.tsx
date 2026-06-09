import { useState, useEffect } from 'react';
import { sfxClick } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  onNext: () => void;
}

const FourthWall = ({ onNext }: Props) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 0: Black screen, typing "Sistema detenido."
    // Stage 1: "Fuera de personaje por un momento."
    // Stage 2: "Gracias por dedicar tiempo a esta pequeña aventura..."
    // Stage 3: Button to continue
    
    // Stop background music temporarily if we want full silence, but let's just make it visually distinct
  }, []);

  const handleNext = () => {
    sfxClick();
    onNext();
  };

  return (
    <div 
      className="fade-in flex-column flex-center" 
      style={{ 
        width: '100%', 
        height: '100%', 
        background: '#000', 
        padding: '20px', 
        boxSizing: 'border-box' 
      }}
    >
      <div style={{ maxWidth: '400px', width: '100%', textAlign: 'left' }}>
        
        <div className="text-pixel mb-3" style={{ color: '#ff6b6b', fontSize: '0.8rem' }}>
          {stage >= 0 && (
            <Typewriter text="> Sistema detenido." speed={50} onComplete={() => setTimeout(() => setStage(1), 800)} />
          )}
        </div>

        <div className="text-pixel mb-3" style={{ color: '#e2e8f0', fontSize: '0.7rem', lineHeight: '1.8' }}>
          {stage >= 1 && (
            <Typewriter text="Fuera de personaje por un momento." speed={40} onComplete={() => setTimeout(() => setStage(2), 1000)} />
          )}
        </div>

        <div className="text-pixel mb-3" style={{ color: '#e2e8f0', fontSize: '0.7rem', lineHeight: '1.8' }}>
          {stage >= 2 && (
            <Typewriter 
              text="Gracias por dedicar tiempo a jugar esta pequeña aventura. Fue construida con mucho cariño y espero sinceramente que te hayas divertido al menos un poquito." 
              speed={40} 
              onComplete={() => setTimeout(() => setStage(3), 1200)} 
            />
          )}
        </div>

        <div className="text-pixel mb-3" style={{ color: '#51cf66', fontSize: '0.7rem' }}>
          {stage >= 3 && (
            <Typewriter text="> Reanudando simulación..." speed={50} onComplete={() => setTimeout(() => setStage(4), 500)} />
          )}
        </div>

        <div className="mt-3 text-center" style={{ minHeight: '50px' }}>
          {stage >= 4 && (
            <button className="btn-retro fade-in" onClick={handleNext}>
              Ver Resultado Final &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FourthWall;
