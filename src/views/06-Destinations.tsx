import { useState } from 'react';
import { filterMissions, calculateRemainingGold, avatarOptions } from '../data/gameData';
import type { GameState } from '../App';
import { sfxClick, sfxSelect, sfxBuzz } from '../utils/audio';
import Typewriter from '../components/Typewriter';
import Toast from '../components/Toast';

interface Props {
  onNext: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: string) => void;
}

const Destinations = ({ onNext, gameState, updateState }: Props) => {
  const availableMissions = filterMissions(gameState.time || '', gameState.transportId, gameState.avatarId, gameState.inventoryId, gameState.weatherId);
  const currentGold = calculateRemainingGold(gameState.transportId, null, gameState.fuelId, gameState.haggleDiscount); // Gold before paying for destination
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const getReaction = (destId: string, avatarId: string | null) => {
    if (destId === 'poas') {
      if (avatarId === 'mage') return '🌋 Siento una fuerte energía ancestral allí.';
      if (avatarId === 'warrior') return '⚔️ Terreno elevado. Táctico y peligroso.';
      return '🏔️ Preparando equipo de alta montaña.';
    }
    if (destId === 'barrio_chino') {
      if (avatarId === 'explorer') return '🗺️ Nuevo territorio urbano por descubrir.';
      return '🏮 Detectando luces y sabores ocultos.';
    }
    if (destId === 'cine') {
      if (avatarId === 'vampire') return '🦇 Excelente. Oscuridad garantizada.';
      return '🍿 Luces apagadas, pantalla lista.';
    }
    if (destId === 'cafe_chill' || destId === 'gemini_twin_cafe') {
      if (avatarId === 'princess_random') return '👑 Aprobado por la realeza.';
      if (avatarId === 'bard') return '☕ Un buen café es como una buena balada.';
      return '☕ Energía chill incrementada.';
    }
    if (destId === 'legos') {
      if (avatarId === 'gemini') return '🧩 Construcción y charla: nuestra especialidad.';
      return '🧱 Modo constructor activado.';
    }
    return '🎯 Destino fijado en el mapa.';
  };

  const handleSelect = (id: string, cost: number) => {
    if (currentGold < cost) {
      sfxBuzz();
      return;
    }
    updateState('destId', id);
    sfxSelect();

    const reaction = getReaction(id, gameState.avatarId);
    if (reaction) {
      setToastMsg(reaction);
      setShowToast(true);
    }
  };

  const handleNext = () => {
    if (gameState.destId) {
      setShowToast(false);
      sfxClick();
      onNext();
    }
  };

  const avatar = avatarOptions.find(a => a.id === gameState.avatarId);
  const narrativeText = avatar?.dialogues?.destinations || `El mapa se ha adaptado a la magia de las ${gameState.time}. Revisa las rutas disponibles y elige el rumbo de la expedición.`;

  return (
    <div className="rpg-panel fade-in">
      <h2>Selecciona Destino</h2>
      
      <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '5px' }}>
        <Typewriter text={narrativeText} speed={30} />
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

      <Toast message={toastMsg} show={showToast} onHide={() => setShowToast(false)} />
    </div>
  );
};

export default Destinations;
