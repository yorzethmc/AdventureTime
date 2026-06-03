import { avatarOptions } from '../data/gameData';
import type { GameState } from '../App';
import { sfxClick, sfxSelect } from '../utils/audio';

interface Props {
  onNext: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: string) => void;
}

const AvatarSelection = ({ onNext, gameState, updateState }: Props) => {
  const handleSelect = (id: string) => {
    updateState('avatarId', id);
    sfxSelect();
  };

  const handleNext = () => {
    if (gameState.avatarId) {
      sfxClick();
      onNext();
    }
  };

  return (
    <div className="rpg-panel fade-in">
      <h2>Selecciona tu Avatar</h2>
      
      <div className="cards-grid">
        {avatarOptions.map(avatar => (
          <div 
            key={avatar.id}
            className={`rpg-card ${gameState.avatarId === avatar.id ? 'selected' : ''}`}
            onClick={() => handleSelect(avatar.id)}
          >
            {avatar.image ? (
              <img src={avatar.image} alt={avatar.name} className="avatar-img" />
            ) : (
              <div className="emoji">{avatar.emoji}</div>
            )}
            <div className="title">{avatar.name}</div>
            <div className="text-pixel" style={{ color: 'var(--text-highlight)', fontSize: '0.5rem', marginBottom: '5px' }}>{avatar.code}</div>
            <div className="desc text-pixel">{avatar.desc}</div>
          </div>
        ))}
      </div>

      <div className="flex-center mt-3">
        <button 
          className="btn-retro" 
          onClick={handleNext}
          disabled={!gameState.avatarId}
          style={{ opacity: gameState.avatarId ? 1 : 0.5 }}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default AvatarSelection;
