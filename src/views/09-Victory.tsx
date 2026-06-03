import { useEffect } from 'react';
import { WHATSAPP_PHONE, avatarOptions, transportOptions, dayOptions, missionOptions, fuelOptions, inventoryOptions, weatherOptions, sideQuestOptions } from '../data/gameData';
import type { GameState } from '../App';
import { sfxVictory } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  gameState: GameState;
  onRestart: () => void;
}

const Victory = ({ gameState, onRestart }: Props) => {
  const [successRate] = useState(() => {
    const hash = (gameState.avatarId?.length || 0) + (gameState.transportId?.length || 0) + (gameState.destId?.length || 0);
    let rate = 85 + (hash % 15);
    if (gameState.sideQuestId && gameState.sideQuestId !== 'none') {
      rate = Math.min(100, rate + 10);
    }
    return rate;
  });

  useEffect(() => {
    sfxVictory();
  }, []);

  const avatar = avatarOptions.find(a => a.id === gameState.avatarId);
  const inventory = inventoryOptions.find(i => i.id === gameState.inventoryId);
  const weather = weatherOptions.find(w => w.id === gameState.weatherId);
  const transport = transportOptions.find(t => t.id === gameState.transportId);
  const day = dayOptions.find(d => d.id === gameState.dayId);
  const dest = missionOptions.find(m => m.id === gameState.destId);
  const sideQuest = sideQuestOptions.find(s => s.id === gameState.sideQuestId);
  const fuel = fuelOptions.find(f => f.id === gameState.fuelId);

  const whatsappText = `✨ Misión Aceptada ✨

Avatar: ${avatar?.name}
Equipo/Acompañante: ${inventory?.name}
Clima previsto: ${weather?.name}
Transporte: ${transport?.name}
Día: ${day?.name} a las ${gameState.time}
Misión Principal: ${dest?.dest}
Desvío Opcional: ${sideQuest?.name}
Combustible: ${fuel ? fuel.name : 'Incluido en el destino'}

🛡️ Probabilidad de Éxito: ${successRate}%
⭐ ¡P1 READY!
¿Qué tal el plan? 🚀`;

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
