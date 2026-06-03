import { filterFuel, calculateRemainingGold } from '../data/gameData';
import type { GameState } from '../App';
import { sfxClick, sfxSelect, sfxBuzz } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  onNext: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: string) => void;
}

const Fuel = ({ onNext, gameState, updateState }: Props) => {
  const currentGold = calculateRemainingGold(gameState.transportId, gameState.destId, null); // Gold before paying for fuel
  const availableFuels = filterFuel(gameState.destId);

  const handleSelect = (id: string, cost: number) => {
    if (currentGold < cost) {
      sfxBuzz();
      return;
    }
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
      
      <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '5px' }}>
        <Typewriter text="El camino es largo y nuestros puntos de magia (MP) se agotarán. ¿Qué raciones nos darán la energía para continuar?" speed={30} />
      </div>
      
      <div className="cards-grid">
        {availableFuels.map(fuel => {
          const isAffordable = currentGold >= fuel.cost;
          return (
            <div 
              key={fuel.id}
              className={`rpg-card ${gameState.fuelId === fuel.id ? 'selected' : ''}`}
              onClick={() => handleSelect(fuel.id, fuel.cost)}
              style={{ opacity: isAffordable ? 1 : 0.4 }}
            >
              <div className="emoji">{fuel.emoji}</div>
              <div className="title" style={{ fontSize: '0.8rem' }}>{fuel.name}</div>
              <div className="text-pixel" style={{ color: 'var(--text-highlight)', fontSize: '0.5rem', marginBottom: '5px' }}>{fuel.title}</div>
              <div className="desc text-pixel" style={{ fontSize: '0.6rem' }}>{fuel.desc}</div>
              <div className="text-pixel mt-3" style={{ color: isAffordable ? '#ffd43b' : '#ff6b6b', fontSize: '0.6rem' }}>
                Costo: {fuel.cost} Oro
              </div>
            </div>
          );
        })}
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
