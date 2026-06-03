import { useEffect } from 'react';
import { WHATSAPP_PHONE, avatarOptions, transportOptions, dayOptions, missionOptions, fuelOptions } from '../data/gameData';
import type { GameState } from '../App';
import { sfxVictory } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  gameState: GameState;
  onRestart: () => void;
}

const Victory = ({ gameState, onRestart }: Props) => {
  useEffect(() => {
    sfxVictory();
  }, []);

  const avatar = avatarOptions.find(a => a.id === gameState.avatarId);
  const transport = transportOptions.find(t => t.id === gameState.transportId);
  const day = dayOptions.find(d => d.id === gameState.dayId);
  const dest = missionOptions.find(m => m.id === gameState.destId);
  const fuel = fuelOptions.find(f => f.id === gameState.fuelId);

  const whatsappText = `✨ ¡MISION ACEPTADA! ✨

¡Me presento lista para la aventura! Aquí te paso mi inventario:

🎮 *Avatar:* ${avatar?.name || ''}
🚗 *Montura:* ${transport?.name || ''}
⏰ *Día de incursión:* ${day?.name || ''} a las ${gameState.time || ''}
🗺️ *Quest:* ${dest?.dest || ''}
🌮 *Pociones:* ${fuel?.name || ''}

¡Nos vemos pronto para empezar esta partida! 👾💖`;

  const whatsappLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="rpg-panel fade-in text-center" style={{ borderColor: 'var(--success)', boxShadow: '0 0 20px rgba(81, 207, 102, 0.5)' }}>
      <h1 style={{ color: 'var(--success)', fontSize: '2rem', animation: 'float 2s infinite, pulse 2s infinite' }}>CITA DESBLOQUEADA</h1>
      
      <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '5px' }}>
        <Typewriter text="¡Nivel completado! Tu progreso ha sido guardado. Ahora envíale este pergamino a tu Player 2 por WhatsApp para hacer oficial la partida." speed={30} />
      </div>

      <div className="flex-center mt-3 mb-3">
        <a 
          href={whatsappLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-retro"
          style={{ padding: '15px 30px', fontSize: '1.2rem', textDecoration: 'none' }}
        >
          Enviar Confirmación a WhatsApp
        </a>
      </div>

      <div className="flex-center mt-3">
        <button 
          className="btn-retro evasive" 
          onClick={onRestart}
          style={{ fontSize: '0.8rem' }}
        >
          Reiniciar Aventura
        </button>
      </div>

      {/* Confetti effect using pure CSS */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: #f00;
            animation: fall 3s linear infinite;
          }
          @keyframes fall {
            to { transform: translateY(100vh) rotate(360deg); }
          }
        `}
      </style>
      {Array.from({ length: 30 }).map((_, i) => (
        <div 
          key={i} 
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            backgroundColor: ['#ffb7b2', '#ff6b6b', '#51cf66', '#4c6ef5', '#ffd43b'][Math.floor(Math.random() * 5)],
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );
};

export default Victory;
