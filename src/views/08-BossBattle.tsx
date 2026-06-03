import { avatarOptions, transportOptions, dayOptions, missionOptions, fuelOptions } from '../data/gameData';
import type { GameState } from '../App';
import { sfxClick } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  onConfirm: () => void;
  onEdit: () => void;
  gameState: GameState;
}

const BossBattle = ({ onConfirm, onEdit, gameState }: Props) => {
  const avatar = avatarOptions.find(a => a.id === gameState.avatarId);
  const transport = transportOptions.find(t => t.id === gameState.transportId);
  const day = dayOptions.find(d => d.id === gameState.dayId);
  const dest = missionOptions.find(m => m.id === gameState.destId);
  const fuel = fuelOptions.find(f => f.id === gameState.fuelId);

  return (
    <div className="rpg-panel fade-in">
      <h2 style={{ color: 'var(--primary)' }}>Boss Battle: Confirmar la cita</h2>
      
      <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '5px' }}>
        <Typewriter text="Estás a punto de desbloquear la aventura final. Revisa tu inventario y confirma tu equipo. No hay vuelta atrás..." speed={30} />
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

      <div className="flex-column gap-3 mt-3">
        <button 
          className="btn-retro" 
          onClick={() => { sfxClick(); onConfirm(); }}
        >
          Confirmar misión
        </button>
        <button 
          className="btn-retro evasive" 
          onClick={() => { sfxClick(); onEdit(); }}
        >
          Editar selección
        </button>
      </div>
    </div>
  );
};

export default BossBattle;
