import { avatarOptions } from '../data/gameData';
import { useState } from 'react';
import type { GameState } from '../App';
import { sfxClick, sfxSelect } from '../utils/audio';

interface Props {
  onNext: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: string) => void;
}

const AvatarSelection = ({ onNext, gameState, updateState }: Props) => {
  const [viewingAvatarId, setViewingAvatarId] = useState<string | null>(null);

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

  const handleView = (id: string) => {
    sfxSelect();
    setViewingAvatarId(id);
  };

  if (viewingAvatarId) {
    const avatar = avatarOptions.find(a => a.id === viewingAvatarId);
    if (!avatar) return null;
    return (
      <div className="rpg-panel fade-in flex-column flex-center text-center">
        <h2>Inspeccionando Avatar</h2>
        <div className="rpg-card" style={{ cursor: 'default', transform: 'none', margin: '20px 0', padding: '20px' }}>
          {avatar.image ? (
            <img src={avatar.image} alt={avatar.name} className="avatar-img" style={{ width: '80px', height: '80px' }} />
          ) : (
            <div className="emoji" style={{ fontSize: '3rem' }}>{avatar.emoji}</div>
          )}
          <div className="title" style={{ fontSize: '1.2rem', marginTop: '10px' }}>{avatar.name}</div>
          <div className="text-pixel" style={{ color: 'var(--text-highlight)', fontSize: '0.6rem', marginBottom: '10px' }}>{avatar.code}</div>
          <div className="desc text-pixel" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>{avatar.desc}</div>
        </div>

        <div className="flex-column gap-3 mt-3">
          <button 
            className="btn-retro" 
            onClick={() => {
              updateState('avatarId', avatar.id);
              sfxClick();
              onNext();
            }}
            style={{ backgroundColor: '#5c940d' }}
          >
            CONFIRMAR SELECCIÓN
          </button>
          <button 
            className="btn-retro evasive" 
            onClick={() => {
              sfxClick();
              setViewingAvatarId(null);
            }}
            style={{ backgroundColor: '#ff6b6b' }}
          >
            VOLVER AL MENÚ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rpg-panel fade-in">
      <h2>Selecciona tu Avatar</h2>
      
      <div className="cards-grid">
        {avatarOptions.map(avatar => (
          <div 
            key={avatar.id}
            className={`rpg-card`}
            onClick={() => handleView(avatar.id)}
          >
            {avatar.image ? (
              <img src={avatar.image} alt={avatar.name} className="avatar-img" />
            ) : (
              <div className="emoji">{avatar.emoji}</div>
            )}
            <div className="title">{avatar.name}</div>
            <div className="text-pixel" style={{ color: 'var(--text-highlight)', fontSize: '0.5rem', marginBottom: '5px' }}>{avatar.code}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelection;
