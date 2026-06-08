import { useEffect, useState } from 'react';
import { WHATSAPP_PHONE, avatarOptions, transportOptions, dayOptions, missionOptions, fuelOptions, inventoryOptions, weatherOptions, sideQuestOptions, dressCodeOptions } from '../data/gameData';
import type { GameState } from '../App';
import { sfxVictory } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  gameState: GameState;
  onRestart: () => void;
}

const Victory = ({ gameState, onRestart }: Props) => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
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
  const sideQuest = sideQuestOptions.find(s => s.id === gameState.sideQuestId) || (gameState.sideQuestId === 'random_cat_pet' ? { name: 'Acarició al michi' } : gameState.sideQuestId === 'random_cat_ignore' ? { name: 'Ignoró al michi' } : null);
  const fuel = fuelOptions.find(f => f.id === gameState.fuelId);
  const dressCode = dressCodeOptions.find(d => d.id === gameState.dressId);

  // Calcular Stats RPG
  let aventura = 0;
  let romance = 0;
  let chill = 0;

  if (dest?.tags.includes('aventura')) aventura += 40;
  if (dest?.tags.includes('naturaleza')) { aventura += 20; chill += 10; }
  if (dest?.tags.includes('atardecer')) { romance += 40; chill += 20; }
  if (dest?.tags.includes('cafe')) { chill += 30; romance += 20; }
  if (dest?.tags.includes('chill')) chill += 40;
  if (dest?.tags.includes('cine')) { romance += 30; chill += 20; }
  if (dest?.tags.includes('cena')) romance += 15;

  if (gameState.weatherId === 'rainy') chill += 20;
  if (gameState.weatherId === 'sunny') aventura += 20;

  if (gameState.dressId === 'elegant') romance += 30;
  if (gameState.dressId === 'adventurer') aventura += 30;
  if (gameState.dressId === 'casual') chill += 20;

  if (gameState.transportId === 'moto') aventura += 20;
  if (gameState.transportId === 'chancha') aventura += 10;

  if (gameState.sideQuestId === 'random_cat_pet') { romance += 20; chill += 20; }
  if (gameState.sideQuestId === 'random_cat_ignore') romance -= 20;
  if (gameState.sideQuestId === 'photo') romance += 10;
  if (gameState.sideQuestId === 'scenic') romance += 20;
  if (gameState.sideQuestId === 'playlist') chill += 20;

  const getStars = (score: number) => {
    if (score >= 80) return '⭐⭐⭐⭐⭐';
    if (score >= 60) return '⭐⭐⭐⭐';
    if (score >= 40) return '⭐⭐⭐';
    if (score >= 20) return '⭐⭐';
    return '⭐';
  };

  const whatsappText = `✨ Misión Aceptada ✨

Avatar: ${avatar?.name}
Equipo/Acompañante: ${inventory?.name}
Clima previsto: ${weather?.name}
Outfit: ${dressCode?.name || 'Cualquiera'}
Transporte: ${transport?.name}
Día: ${day?.name} a las ${gameState.time}
Misión Principal: ${dest?.dest}
Desvío Opcional: ${sideQuest?.name || 'Ninguno'}
Combustible: ${fuel ? fuel.name : 'Incluido en el destino'}

🛡️ Probabilidad de Éxito: ${successRate}%
🎵 Reto Especial: "Te enviaré un audio cantando el opening de Corazón Encantado para confirmar esta misión."

⭐ ¡P1 READY!
¿Qué tal el plan? 🚀`;

  const whatsappLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(whatsappText)}`;

  if (showEasterEgg) {
    // Stop background music
    window.dispatchEvent(new Event('stopMusic'));

    return (
      <div className="rpg-panel fade-in flex-column flex-center" style={{ position: 'relative', height: '100%', borderColor: '#ff66c4', boxShadow: '0 0 30px rgba(255, 102, 196, 0.5)' }}>
        <h1 style={{ color: '#ff66c4', fontSize: '2rem', animation: 'pulse 0.5s infinite', textAlign: 'center' }}>¡CONGA!</h1>
        <h2 style={{ color: '#e2e8f0', fontSize: '1rem', marginTop: '10px' }}>¡Easter Egg Desbloqueado!</h2>
        
        <div className="mt-3" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <img key={i} src="https://emoji.discord.st/emojis/b7ef40c8-03ac-4367-9543-d705f48892e3.gif" alt="Ditto" width="80" />
          ))}
        </div>

        <button className="btn-retro mt-3" onClick={() => setShowEasterEgg(false)} style={{ backgroundColor: '#ff66c4', color: '#000', textShadow: 'none' }}>
          Volver a la Misión
        </button>

        <audio 
          src={`${import.meta.env.BASE_URL}audio/conga.m4a`} 
          autoPlay 
          loop 
        />
      </div>
    );
  }

  return (
    <div className="rpg-panel fade-in text-center" style={{ position: 'relative', borderColor: 'var(--success)', boxShadow: '0 0 20px rgba(81, 207, 102, 0.5)' }}>
      {/* Botón secreto en la esquina superior derecha */}
      <div 
        onClick={() => setShowEasterEgg(true)}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          zIndex: 100,
          opacity: 0
        }}
        title="?"
      />

      <h1 style={{ color: 'var(--success)', fontSize: '2rem', animation: 'float 2s infinite, pulse 2s infinite' }}>CITA DESBLOQUEADA</h1>
      
      <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '5px' }}>
        <Typewriter text="¡Nivel completado! Tu progreso ha sido guardado. Pero antes de terminar..." speed={30} />
      </div>

      <div className="rpg-card mt-3 mb-3" style={{ background: 'rgba(255, 107, 107, 0.2)', borderColor: '#ff6b6b', padding: '15px' }}>
        <h3 style={{ color: '#ff6b6b', fontSize: '1rem', marginBottom: '10px' }}>🎤 MISIÓN FINAL 🎤</h3>
        <p className="text-pixel" style={{ fontSize: '0.75rem', lineHeight: '1.5' }}>
          Para validar este plan, debes enviarle a tu Player 2 un mensaje de voz por WhatsApp cantando el opening de <strong>Dragon Ball GT (Mi Corazón Encantado)</strong> junto con la confirmación. ¡Es obligatorio para poder avanzar!
        </p>
      </div>

      <div className="rpg-card text-left mt-3 mb-3" style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '15px' }}>
        <h3 style={{ color: 'var(--text-highlight)', fontSize: '0.8rem', borderBottom: '1px dashed var(--panel-border)', paddingBottom: '10px', marginBottom: '10px' }}>Estadísticas de Relación</h3>
        
        <div className="flex-between mb-2">
          <span className="text-pixel" style={{ fontSize: '0.65rem' }}>🏹 Aventura</span>
          <span style={{ fontSize: '0.8rem' }}>{getStars(aventura)}</span>
        </div>
        <div className="flex-between mb-2">
          <span className="text-pixel" style={{ fontSize: '0.65rem' }}>💕 Romance</span>
          <span style={{ fontSize: '0.8rem' }}>{getStars(romance)}</span>
        </div>
        <div className="flex-between">
          <span className="text-pixel" style={{ fontSize: '0.65rem' }}>🎧 Chill / Relax</span>
          <span style={{ fontSize: '0.8rem' }}>{getStars(chill)}</span>
        </div>
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
