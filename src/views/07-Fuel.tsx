import { fuelOptions } from '../data/gameData';
import type { GameState } from '../App';
import { sfxClick, sfxSelect } from '../utils/audio';

interface Props {
  onNext: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: string) => void;
}

const Fuel = ({ onNext, gameState, updateState }: Props) => {
  const handleSelect = (id: string) => {
    updateState('fuelId', id);
    sfxSelect();
  };

  const handleNext = () => {
    if (gameState.fuelId) {
      sfxClick();
      onNext();
    }
  };

  return (
    <div className="rpg-panel fade-in">
      <h2>Combustible</h2>
      <p className="text-pixel text-center mb-3" style={{ fontSize: '0.6rem', color: '#adb5bd' }}>
        Selecciona las provisiones para la aventura.
      </p>
      
      <div className="cards-grid">
        {fuelOptions.map(fuel => (
          <div 
            key={fuel.id}
            className={`rpg-card ${gameState.fuelId === fuel.id ? 'selected' : ''}`}
            onClick={() => handleSelect(fuel.id)}
          >
            <div className="emoji">{fuel.emoji}</div>
            <div className="title" style={{ fontSize: '0.8rem' }}>{fuel.name}</div>
            <div className="text-pixel" style={{ color: 'var(--text-highlight)', fontSize: '0.5rem', marginBottom: '5px' }}>{fuel.title}</div>
            <div className="desc text-pixel" style={{ fontSize: '0.6rem' }}>{fuel.desc}</div>
          </div>
        ))}
      </div>

      <div className="flex-center mt-3">
        <button 
          className="btn-retro" 
          onClick={handleNext}
          disabled={!gameState.fuelId}
          style={{ opacity: gameState.fuelId ? 1 : 0.5 }}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default Fuel;
