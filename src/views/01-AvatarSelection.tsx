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

  const handleView = (id: string) => {
    sfxSelect();
    setViewingAvatarId(id);
  };

  if (viewingAvatarId) {
    const currentIndex = avatarOptions.findIndex(a => a.id === viewingAvatarId);
    const avatar = avatarOptions[currentIndex];
    
    if (!avatar) return null;

    const handlePrev = () => {
      sfxSelect();
      const prevIndex = (currentIndex - 1 + avatarOptions.length) % avatarOptions.length;
      setViewingAvatarId(avatarOptions[prevIndex].id);
    };

    const handleNext = () => {
      sfxSelect();
      const nextIndex = (currentIndex + 1) % avatarOptions.length;
      setViewingAvatarId(avatarOptions[nextIndex].id);
    };

    return (
      <div className="rpg-panel fade-in flex-column flex-center text-center">
        <h2>Inspeccionando Avatar</h2>
        <div className="flex-center" style={{ width: '100%', gap: '15px' }}>
          <button 
            className="btn-retro" 
            onClick={handlePrev} 
            style={{ padding: '10px 15px', fontSize: '1.2rem', minWidth: 'auto' }}
          >
            ◀
          </button>
          
          <div className="rpg-card fade-in" key={avatar.id} style={{ cursor: 'default', transform: 'none', margin: '20px 0', padding: '20px', flex: 1, maxWidth: '300px' }}>
            {avatar.image ? (
              <img src={avatar.image} alt={avatar.name} className="avatar-img" style={{ width: '80px', height: '80px' }} />
            ) : (
              <div className="emoji" style={{ fontSize: '3rem' }}>{avatar.emoji}</div>
            )}
            <div className="title" style={{ fontSize: '1.2rem', marginTop: '10px' }}>{avatar.name}</div>
            <div className="text-pixel" style={{ color: 'var(--text-highlight)', fontSize: '0.6rem', marginBottom: '10px' }}>{avatar.code}</div>
            <div className="desc text-pixel" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>{avatar.desc}</div>
          </div>

          <button 
            className="btn-retro" 
            onClick={handleNext} 
            style={{ padding: '10px 15px', fontSize: '1.2rem', minWidth: 'auto' }}
          >
            ▶
          </button>
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
