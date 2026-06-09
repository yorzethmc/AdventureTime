import { transportOptions, calculateRemainingGold, avatarOptions } from '../data/gameData';
import type { GameState } from '../App';
import { sfxClick, sfxSelect, sfxBuzz } from '../utils/audio';
import Typewriter from '../components/Typewriter';
import Toast from '../components/Toast';

import { useState } from 'react';

interface Props {
  onNext: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: any) => void;
}

const Transport = ({ onNext, gameState, updateState }: Props) => {
  const currentGold = calculateRemainingGold(null, gameState.destId, gameState.fuelId, gameState.haggleDiscount);
  const [hasHaggled, setHasHaggled] = useState(gameState.haggleDiscount !== 0);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const getReaction = (transportId: string, avatarId: string | null) => {
    if (transportId === 'moto') {
      if (avatarId === 'warrior') return '⚔️ Montura de acero. Excelente.';
      return '🏍️ Modo protagonista desbloqueado.';
    }
    if (transportId === 'chancha') {
      if (avatarId === 'bard') return '🎸 El pueblo viaja en bus, y el bardo con ellos.';
      return '🚌 Ruta legendaria iniciada.';
    }
    if (transportId === 'uber') {
      if (avatarId === 'princess_random') return '👑 Por supuesto, la realeza no camina.';
      return '🚗 Viaje premium activado.';
    }
    return '';
  };

  const handleHaggle = () => {
    sfxSelect();
    const isSuccess = Math.random() > 0.5;
    if (isSuccess) {
      updateState('haggleDiscount', 5); // Ahorra 5 de oro
    } else {
      updateState('haggleDiscount', -5); // Pierde 5 de oro
    }
    setHasHaggled(true);
  };

  const handleSelect = (id: string, cost: number) => {
    if (currentGold < cost) {
      sfxBuzz();
      return;
    }
    updateState('transportId', id);
    sfxSelect();

    const reaction = getReaction(id, gameState.avatarId);
    if (reaction) {
      setToastMsg(reaction);
      setShowToast(true);
    }
  };

  const handleNext = () => {
    if (gameState.transportId) {
      setShowToast(false);
      sfxClick();
      onNext();
    }
  };

  const avatar = avatarOptions.find(a => a.id === gameState.avatarId);
  const narrativeText = avatar?.dialogues?.transport || "El viaje es largo y está lleno de misterios. ¿Qué medio de transporte elegiremos para esta travesía?";

  return (
    <div className="rpg-panel fade-in">
      <h2>Selecciona Transporte</h2>
      
      <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '5px' }}>
        <Typewriter text={narrativeText} speed={30} />
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

      <div className="flex-column flex-center mt-3 gap-3">
        {!hasHaggled && (
          <button 
            className="btn-retro" 
            onClick={handleHaggle}
            style={{ backgroundColor: '#ff922b', fontSize: '0.8rem', padding: '8px 15px' }}
          >
            🎲 Regatear Precio (+/- 5G)
          </button>
        )}
        
        {hasHaggled && (
          <div className="text-pixel" style={{ color: gameState.haggleDiscount > 0 ? '#51cf66' : '#ff6b6b' }}>
            {gameState.haggleDiscount > 0 ? '¡Regateo exitoso! (+5G)' : '¡Se ofendió! Perdiste oro (-5G)'}
          </div>
        )}
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

      <Toast message={toastMsg} show={showToast} onHide={() => setShowToast(false)} />
    </div>
  );
};

export default Transport;
