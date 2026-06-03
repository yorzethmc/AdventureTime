import { filterMissionsByTime } from '../data/gameData';
import type { GameState } from '../App';
import { sfxClick, sfxSelect } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  onNext: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: string) => void;
}

const Destinations = ({ onNext, gameState, updateState }: Props) => {
  const availableMissions = filterMissionsByTime(gameState.time || '');

  const handleSelect = (id: string) => {
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
        {availableMissions.map(mission => (
          <div 
            key={mission.id}
            className={`rpg-card ${gameState.destId === mission.id ? 'selected' : ''}`}
            onClick={() => handleSelect(mission.id)}
          >
            <div className="emoji">{mission.emoji}</div>
            <div className="title" style={{ fontSize: '0.8rem' }}>{mission.dest}</div>
            <div className="text-pixel" style={{ color: 'var(--text-highlight)', fontSize: '0.5rem', marginBottom: '5px' }}>{mission.code}</div>
            <div className="desc text-pixel" style={{ fontSize: '0.6rem' }}>{mission.desc}</div>
            {mission.warnings && mission.warnings.length > 0 && (
              <div className="text-pixel mt-3" style={{ color: '#ffc078', fontSize: '0.5rem' }}>
                ⚠️ {mission.warnings[0]}
              </div>
            )}
          </div>
        ))}
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
