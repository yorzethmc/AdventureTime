import { inventoryOptions, avatarOptions } from '../data/gameData';
import type { GameState } from '../App';
import { sfxClick, sfxSelect } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  onNext: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: string) => void;
}

const Inventory = ({ onNext, gameState, updateState }: Props) => {
  const handleSelect = (id: string) => {
    updateState('inventoryId', id);
    sfxSelect();
  };

  const handleNext = () => {
    if (gameState.inventoryId) {
      sfxClick();
      onNext();
    }
  };

  const avatar = avatarOptions.find(a => a.id === gameState.avatarId);
  const narrativeText = avatar?.dialogues?.inventory || "Antes de salir de casa, elige un objeto o acompañante. Tu decisión afectará los planes disponibles más adelante.";

  return (
    <div className="rpg-panel fade-in">
      <h2>Equipamiento Inicial</h2>
      
      <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '5px' }}>
        <Typewriter text={narrativeText} speed={30} />
      </div>

      <div className="cards-grid">
        {inventoryOptions.map(item => (
          <div 
            key={item.id}
            className={`rpg-card ${gameState.inventoryId === item.id ? 'selected' : ''}`}
            onClick={() => handleSelect(item.id)}
          >
            <div className="emoji">{item.emoji}</div>
            <div className="title">{item.name}</div>
            <div className="text-pixel" style={{ color: 'var(--text-highlight)', fontSize: '0.5rem', marginBottom: '5px' }}>{item.code}</div>
            <div className="desc text-pixel">{item.desc}</div>
          </div>
        ))}
      </div>

      <div className="flex-center mt-3">
        <button 
          className="btn-retro" 
          onClick={handleNext}
          disabled={!gameState.inventoryId}
          style={{ opacity: gameState.inventoryId ? 1 : 0.5 }}
        >
          Equipar y Continuar
        </button>
      </div>
    </div>
  );
};

export default Inventory;
