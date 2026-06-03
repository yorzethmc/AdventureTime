import { sideQuestOptions, avatarOptions } from '../data/gameData';
import type { GameState } from '../App';
import { sfxClick, sfxSelect } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  onNext: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: string) => void;
}

const SideQuests = ({ onNext, gameState, updateState }: Props) => {
  const handleSelect = (id: string) => {
    updateState('sideQuestId', id);
    sfxSelect();
  };

  const handleNext = () => {
    if (gameState.sideQuestId) {
      sfxClick();
      onNext();
    }
  };

  const avatar = avatarOptions.find(a => a.id === gameState.avatarId);
  const narrativeText = avatar?.dialogues?.sideQuests || "¡La ruta principal está clara! Pero tal vez haya tiempo para un pequeño desvío rápido para mejorar la aventura...";

  return (
    <div className="rpg-panel fade-in">
      <h2>Misión Secundaria (Gratuita)</h2>
      
      <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '5px' }}>
        <Typewriter text={narrativeText} speed={30} />
      </div>

      <div className="cards-grid">
        {sideQuestOptions.map(quest => (
          <div 
            key={quest.id}
            className={`rpg-card ${gameState.sideQuestId === quest.id ? 'selected' : ''}`}
            onClick={() => handleSelect(quest.id)}
          >
            <div className="emoji">{quest.emoji}</div>
            <div className="title">{quest.name}</div>
            <div className="text-pixel" style={{ color: 'var(--text-highlight)', fontSize: '0.5rem', marginBottom: '5px' }}>{quest.code}</div>
            <div className="desc text-pixel">{quest.desc}</div>
          </div>
        ))}
      </div>

      <div className="flex-center mt-3">
        <button 
          className="btn-retro" 
          onClick={handleNext}
          disabled={!gameState.sideQuestId}
          style={{ opacity: gameState.sideQuestId ? 1 : 0.5 }}
        >
          Confirmar Desvío
        </button>
      </div>
    </div>
  );
};

export default SideQuests;
