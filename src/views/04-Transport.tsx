import { transportOptions, calculateRemainingGold } from '../data/gameData';
import type { GameState } from '../App';
import { sfxClick, sfxSelect, sfxBuzz } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  onNext: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: string) => void;
}

const Transport = ({ onNext, gameState, updateState }: Props) => {
  const currentGold = calculateRemainingGold(null, gameState.destId, gameState.fuelId); // Gold before paying for transport

  const handleSelect = (id: string, cost: number) => {
    if (currentGold < cost) {
      sfxBuzz();
      return;
    }
    updateState('transportId', id);
    sfxSelect();
  };

  const handleNext = () => {
    if (gameState.transportId) {
      sfxClick();
      onNext();
    }
  };

  return (
    <div className="rpg-panel fade-in">
      <h2>Selecciona Transporte</h2>
      
      <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '5px' }}>
        <Typewriter text="El viaje es largo y está lleno de misterios. ¿Qué medio de transporte elegiremos para esta travesía?" speed={30} />
      </div>

      <div className="cards-grid">
        {transportOptions.map(transport => {
          const isAffordable = currentGold >= transport.cost;
          return (
            <div 
              key={transport.id}
              className={`rpg-card ${gameState.transportId === transport.id ? 'selected' : ''}`}
              onClick={() => handleSelect(transport.id, transport.cost)}
              style={{ opacity: isAffordable ? 1 : 0.4 }}
            >
              <div className="emoji">{transport.emoji}</div>
              <div className="title">{transport.name}</div>
              <div className="text-pixel" style={{ color: 'var(--text-highlight)', fontSize: '0.5rem', marginBottom: '5px' }}>{transport.code}</div>
              <div className="desc text-pixel">{transport.desc}</div>
              <div className="text-pixel mt-3" style={{ color: isAffordable ? '#ffd43b' : '#ff6b6b', fontSize: '0.6rem' }}>
                Costo: {transport.cost} Oro
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-center mt-3">
        <button 
          className="btn-retro" 
          onClick={handleNext}
          disabled={!gameState.transportId}
          style={{ opacity: gameState.transportId ? 1 : 0.5 }}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default Transport;
