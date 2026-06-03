import { avatarOptions, transportOptions, dayOptions, missionOptions, fuelOptions } from '../data/gameData';
import { useState, useEffect } from 'react';
import type { GameState } from '../App';
import { sfxClick } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  onConfirm: () => void;
  onEdit: () => void;
  gameState: GameState;
}

const BossBattle = ({ onConfirm, onEdit, gameState }: Props) => {
  const [calculating, setCalculating] = useState(true);
  const [successRate, setSuccessRate] = useState(0);

  const avatar = avatarOptions.find(a => a.id === gameState.avatarId);
  const transport = transportOptions.find(t => t.id === gameState.transportId);
  const day = dayOptions.find(d => d.id === gameState.dayId);
  const dest = missionOptions.find(m => m.id === gameState.destId);
  const fuel = fuelOptions.find(f => f.id === gameState.fuelId);

  useEffect(() => {
    // Simulate calculating success rate
    const timer = setTimeout(() => {
      // Calculate a pseudo-random success rate based on lengths of IDs (just for fun, usually 85-99%)
      const hash = (gameState.avatarId?.length || 0) + (gameState.transportId?.length || 0) + (gameState.destId?.length || 0);
      const rate = 85 + (hash % 15);
      setSuccessRate(rate);
      setCalculating(false);
    }, 3500);
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
      
      <ul className="inventory-list mt-3 mb-3">
        <li className="inventory-item">
          <div className="icon">{avatar?.emoji}</div>
          <div className="details">
            <strong>Avatar</strong>
            <span className="text-pixel" style={{ fontSize: '0.7rem' }}>{avatar?.name}</span>
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
          <div className="icon">{fuel?.emoji}</div>
          <div className="details">
            <strong>Combustible</strong>
            <span className="text-pixel" style={{ fontSize: '0.7rem' }}>{fuel?.name}</span>
          </div>
        </li>
      </ul>

      {calculating ? (
        <div className="panel mt-3 text-center" style={{ minHeight: '100px' }}>
          <Typewriter text="Analizando sinergia del equipo..." speed={50} />
          <div className="mt-3 text-pixel blink" style={{ color: '#ffd43b' }}>
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
