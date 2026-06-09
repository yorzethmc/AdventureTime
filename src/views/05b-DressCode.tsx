import { useState } from 'react';
import { sfxClick } from '../utils/audio';
import { dressCodeOptions } from '../data/gameData';
import type { GameState } from '../App';
import Typewriter from '../components/Typewriter';
import Toast from '../components/Toast';

interface Props {
  onNext: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: string | null) => void;
}

const DressCode = ({ onNext, gameState, updateState }: Props) => {
  const [showButton, setShowButton] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const getReaction = (dressId: string, avatarId: string | null) => {
    if (dressId === 'elegant') {
      if (avatarId === 'vampire') return '🦇 Vestida para cazar... corazones.';
      return '👗 Preparando apariencia de alto impacto.';
    }
    if (dressId === 'adventurer') {
      if (avatarId === 'warrior') return '⚔️ Armadura ligera equipada.';
      return '🧗‍♀️ Equipo de expedición confirmado.';
    }
    if (dressId === 'casual') {
      if (avatarId === 'bard') return '🎸 Estilo relajado. Perfecto para tocar unas notas.';
      return '👟 Comodidad al máximo para la misión.';
    }
    if (dressId === 'streetwear') {
      if (avatarId === 'necromancer_goth') return '💀 Estilo urbano... pero oscuro.';
      return '🛹 Estilo urbano activado.';
    }
    return '';
  };

  const handleSelect = (id: string) => {
    sfxClick();
    updateState('dressId', id);

    const reaction = getReaction(id, gameState.avatarId);
    if (reaction) {
      setToastMsg(reaction);
      setShowToast(true);
    }
  };

  const handleNext = () => {
    setShowToast(false);
    sfxClick();
    onNext();
  };

  return (
    <div className="rpg-panel fade-in">
      <h2 style={{ color: 'var(--text-highlight)' }}>Dress Code</h2>

      <div className="text-pixel mb-3" style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
        <Typewriter 
            text="El clima y los accesorios están listos, pero la estética es vital. ¿Cuál será tu estilo o 'skin' para la misión de hoy?"
            speed={35}
            onComplete={() => setShowButton(true)}
        />
      </div>

      <div className="cards-grid">
        {dressCodeOptions.map((opt, index) => (
          <div 
            key={opt.id} 
            className={`rpg-card fade-in ${gameState.dressId === opt.id ? 'selected' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleSelect(opt.id)}
          >
            <div className="emoji">{opt.emoji}</div>
            <div className="title">{opt.name}</div>
            <div className="text-pixel" style={{ color: 'var(--primary)', fontSize: '0.5rem', margin: '4px 0' }}>[{opt.code}]</div>
            <div className="desc">{opt.desc}</div>
          </div>
        ))}
      </div>

      <div className="text-center mt-3" style={{ minHeight: '50px' }}>
        {gameState.dressId && showButton && (
          <button className="btn-retro fade-in" onClick={handleNext}>
            Confirmar Outfit &gt;
          </button>
        )}
      </div>

      <Toast message={toastMsg} show={showToast} onHide={() => setShowToast(false)} />
    </div>
  );
};

export default DressCode;
