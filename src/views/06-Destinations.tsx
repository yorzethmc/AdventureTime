import { filterMissions, calculateRemainingGold } from '../data/gameData';
import type { GameState } from '../App';
import { sfxClick, sfxSelect, sfxBuzz } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  onNext: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: string) => void;
}

const Destinations = ({ onNext, gameState, updateState }: Props) => {
  const availableMissions = filterMissions(gameState.time || '', gameState.transportId, gameState.avatarId);
  const currentGold = calculateRemainingGold(gameState.transportId, null, gameState.fuelId); // Gold before paying for destination

  const handleSelect = (id: string, cost: number) => {
    if (currentGold < cost) {
      sfxBuzz();
      return;
    }
    updateState('destId', id);
    sfxSelect();
  };

  const handleNext = () => {
    if (gameState.destId) {
      sfxClick();
      onNext();
    }
  };

  return (
    <div className="rpg-panel fade-in">
      <h2>Selecciona Destino</h2>
      
      <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '5px' }}>
        <Typewriter text={`El mapa se ha adaptado a la magia de las ${gameState.time}. Revisa las rutas disponibles y elige el rumbo de la expedición.`} speed={30} />
      </div>
      
      <div className="cards-grid">
        {availableMissions.map(mission => {
          const isAffordable = currentGold >= mission.cost;
          return (
            <div 
              key={mission.id}
              className={`rpg-card ${gameState.destId === mission.id ? 'selected' : ''}`}
              onClick={() => handleSelect(mission.id, mission.cost)}
              style={{ opacity: isAffordable ? 1 : 0.4 }}
            >
              <div className="emoji">{mission.emoji}</div>
              <div className="title" style={{ fontSize: '0.8rem' }}>{mission.dest}</div>
              <div className="text-pixel" style={{ color: 'var(--text-highlight)', fontSize: '0.5rem', marginBottom: '5px' }}>{mission.code}</div>
              <div className="desc text-pixel" style={{ fontSize: '0.6rem' }}>{mission.desc}</div>
              <div className="text-pixel mt-3" style={{ color: isAffordable ? '#ffd43b' : '#ff6b6b', fontSize: '0.6rem' }}>
                Costo: {mission.cost} Oro
              </div>
              {mission.warnings && mission.warnings.length > 0 && (
                <div className="text-pixel mt-2" style={{ color: '#ffc078', fontSize: '0.5rem' }}>
                  ⚠️ {mission.warnings[0]}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex-center mt-3">
        <button 
          className="btn-retro" 
          onClick={handleNext}
          disabled={!gameState.destId}
          style={{ opacity: gameState.destId ? 1 : 0.5 }}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default Destinations;
