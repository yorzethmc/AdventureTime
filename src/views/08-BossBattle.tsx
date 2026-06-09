import { avatarOptions, transportOptions, dayOptions, missionOptions, fuelOptions, inventoryOptions, weatherOptions, sideQuestOptions, getTimePeriod } from '../data/gameData';
import { useState, useEffect } from 'react';
import type { GameState } from '../App';
import { sfxClick } from '../utils/audio';
import Typewriter from '../components/Typewriter';
import { getPlayerWish, isNervousHigh, isEnergyRomantic, isEnergyAdrenaline } from '../utils/memory';

interface Props {
  onConfirm: () => void;
  onEdit: () => void;
  gameState: GameState;
}

const BossBattle = ({ onConfirm, onEdit, gameState }: Props) => {
  const [calculating, setCalculating] = useState(true);
  const [successRate, setSuccessRate] = useState(0);

  const avatar = avatarOptions.find(a => a.id === gameState.avatarId);
  const inventory = inventoryOptions.find(i => i.id === gameState.inventoryId);
  const weather = weatherOptions.find(w => w.id === gameState.weatherId);
  const transport = transportOptions.find(t => t.id === gameState.transportId);
  const day = dayOptions.find(d => d.id === gameState.dayId);
  const dest = missionOptions.find(m => m.id === gameState.destId);
  const sideQuest = sideQuestOptions.find(s => s.id === gameState.sideQuestId);
  const fuel = fuelOptions.find(f => f.id === gameState.fuelId);

  // Evaluar sinergias
  const timePeriod = getTimePeriod(gameState.time || '');
  let synergyEvent = '';
  
  if (gameState.avatarId === 'vampire' && gameState.weatherId === 'rainy' && (timePeriod === 'evening' || timePeriod === 'night')) {
    synergyEvent = 'Noche Perfecta para una Vampiresa';
  } else if (gameState.avatarId === 'warrior' && gameState.dressId === 'adventurer' && gameState.destId === 'poas') {
    synergyEvent = 'Preparación táctica perfecta';
  } else if (gameState.avatarId === 'mage' && (timePeriod === 'evening' || timePeriod === 'night')) {
    synergyEvent = 'Convergencia Arcana';
  } else if (gameState.avatarId === 'gemini' && (gameState.destId === 'cafe_chill' || gameState.destId === 'gemini_twin_cafe')) {
    synergyEvent = 'Debate Existencial Interdimensional';
  }

  const wish = getPlayerWish(gameState);

  useEffect(() => {
    // Simulate calculating success rate
    const timer = setTimeout(() => {
      // Calculate a pseudo-random success rate based on lengths of IDs (just for fun, usually 85-99%)
      const hash = (gameState.avatarId?.length || 0) + (gameState.transportId?.length || 0) + (gameState.destId?.length || 0);
      let rate = 85 + (hash % 15);
      if (gameState.sideQuestId && gameState.sideQuestId !== 'none') {
        rate = Math.min(100, rate + 10);
      }
      setSuccessRate(rate);
      setCalculating(false);
    }, 4500); // Un poco más de tiempo para leer los análisis emocionales
    return () => clearTimeout(timer);
  }, [gameState]);

  const handleConfirm = () => {
    sfxClick();
    onConfirm();
  };

  const handleEdit = () => {
    sfxClick();
    onEdit();
  };

  return (
    <div className="rpg-panel fade-in">
      <h2 style={{ color: 'var(--primary)' }}>⚔️ BOSS BATTLE: LA DECISIÓN</h2>
      
      <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '5px' }}>
        <Typewriter text="Estás a punto de desbloquear la aventura final. Revisa tu inventario y confirma tu equipo." speed={30} />
      </div>

      {synergyEvent && (
        <div className="fade-in mb-3 text-pixel text-center" style={{ color: '#ffd43b', fontSize: '0.7rem', border: '1px dashed #ffd43b', padding: '10px', borderRadius: '8px' }}>
          ✨ Evento Especial Desbloqueado: {synergyEvent} ✨
        </div>
      )}
      
      <ul className="inventory-list mt-3 mb-3">
        <li className="inventory-item">
          <div className="icon">{avatar?.emoji}</div>
          <div className="details">
            <strong>Avatar</strong>
            <span className="text-pixel" style={{ fontSize: '0.7rem' }}>{avatar?.name}</span>
          </div>
        </li>
        <li className="inventory-item">
          <div className="icon">{inventory?.emoji}</div>
          <div className="details">
            <strong>Equipamiento</strong>
            <span className="text-pixel" style={{ fontSize: '0.7rem' }}>{inventory?.name}</span>
          </div>
        </li>
        <li className="inventory-item">
          <div className="icon">{weather?.emoji}</div>
          <div className="details">
            <strong>Clima Esperado</strong>
            <span className="text-pixel" style={{ fontSize: '0.7rem' }}>{weather?.name}</span>
          </div>
        </li>
        <li className="inventory-item">
          <div className="icon">{transport?.emoji}</div>
          <div className="details">
            <strong>Transporte</strong>
            <span className="text-pixel" style={{ fontSize: '0.7rem' }}>{transport?.name}</span>
          </div>
        </li>
        <li className="inventory-item">
          <div className="icon">📅</div>
          <div className="details">
            <strong>Día y Hora</strong>
            <span className="text-pixel" style={{ fontSize: '0.7rem' }}>{day?.name} a las {gameState.time}</span>
          </div>
        </li>
        <li className="inventory-item">
          <div className="icon">{dest?.emoji}</div>
          <div className="details">
            <strong>Destino</strong>
            <span className="text-pixel" style={{ fontSize: '0.7rem' }}>{dest?.dest}</span>
          </div>
        </li>
        <li className="inventory-item">
          <div className="icon">{sideQuest?.emoji}</div>
          <div className="details">
            <strong>Desvío / Extra</strong>
            <span className="text-pixel" style={{ fontSize: '0.7rem' }}>{sideQuest?.name}</span>
          </div>
        </li>
        <li className="inventory-item">
          <div className="icon">{fuel ? fuel.emoji : '🍽️'}</div>
          <div className="details">
            <strong>Combustible</strong>
            <span className="text-pixel" style={{ fontSize: '0.7rem' }}>{fuel ? fuel.name : 'Incluido en el destino'}</span>
          </div>
        </li>
      </ul>

      {wish && (
        <div className="rpg-card mt-3 mb-3" style={{ background: 'rgba(232, 121, 249, 0.1)', borderColor: '#e879f9', padding: '10px' }}>
          <h3 style={{ color: '#e879f9', fontSize: '0.7rem', marginBottom: '5px' }}>🌟 MISIÓN SECUNDARIA DETECTADA</h3>
          <p className="text-pixel" style={{ fontSize: '0.65rem', color: '#e2e8f0', margin: 0 }}>"{wish}"</p>
        </div>
      )}

      {calculating ? (
        <div className="panel mt-3 text-center" style={{ minHeight: '130px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typewriter text="Analizando sinergia del equipo..." speed={50} />
          
          <div className="fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'both' }}>
            {isNervousHigh(gameState) ? (
              <span className="text-pixel" style={{ color: '#ffb7b2', fontSize: '0.6rem' }}>Nervios detectados: 87%. Resultado: completamente normal.</span>
            ) : (
              <span className="text-pixel" style={{ color: '#51cf66', fontSize: '0.6rem' }}>Nivel de confianza: 100%. Todo en orden.</span>
            )}
          </div>
          
          <div className="fade-in" style={{ animationDelay: '2.5s', animationFillMode: 'both' }}>
            {isEnergyRomantic(gameState) && <span className="text-pixel" style={{ color: '#ff66c4', fontSize: '0.6rem' }}>Energía romántica identificada.</span>}
            {isEnergyAdrenaline(gameState) && <span className="text-pixel" style={{ color: '#ff922b', fontSize: '0.6rem' }}>Energía aventurera identificada.</span>}
          </div>

          <div className="mt-3 text-pixel blink" style={{ color: '#ffd43b', animationDelay: '3.5s', animationFillMode: 'both' }}>
            Calculando probabilidades...
          </div>
        </div>
      ) : (
        <>
          <div className="panel mt-3 text-center">
            <Typewriter text="Análisis completado. ¿Iniciamos la misión?" speed={30} />
            <div className="mt-3 text-pixel" style={{ color: successRate > 90 ? '#5c940d' : '#ffc078', fontSize: '1.2rem' }}>
              Probabilidad de Éxito: {successRate}%
            </div>
          </div>
          <div className="flex-column gap-3 mt-3">
            <button className="btn-retro" onClick={handleConfirm} style={{ backgroundColor: '#5c940d', animation: 'pulse 1.5s infinite' }}>
              INICIAR MISIÓN
            </button>
            <button className="btn-retro evasive" onClick={handleEdit} style={{ backgroundColor: '#ff6b6b' }}>
              REVISAR PLAN (VOLVER)
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BossBattle;
