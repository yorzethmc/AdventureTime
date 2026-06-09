import { useEffect, useState, useMemo } from 'react';
import { WHATSAPP_PHONE, avatarOptions, transportOptions, dayOptions, missionOptions, fuelOptions, weatherOptions, sideQuestOptions, dressCodeOptions } from '../data/gameData';
import type { GameState } from '../App';
import { sfxVictory } from '../utils/audio';
import Typewriter from '../components/Typewriter';
import { getPlayerMood, getPlayerEnergy, getPlayerSong, getPlayerNervousness, getPlayerWish } from '../utils/memory';

interface Props {
  gameState: GameState;
  onRestart: () => void;
}

const finalChallenges = [
  "Cantar el opening de Dragon Ball GT (Mi Corazón Encantado) en un mensaje de voz.",
  "Enviar un audio imitando a un narrador de documentales describiendo cómo aceptaste esta misión.",
  "Mandar un audio cantando el estribillo de tu canción favorita de Disney.",
  "Enviar un mensaje de voz actuando como si estuvieras reportando una misión secreta desde una radio militar.",
  "Mandar un audio diciendo 'Acepto el reto' con el acento más exagerado que te salga (español, argentino, colombiano, etc).",
  "Cantar un pedacito de la última canción que escuchaste en Spotify.",
  "Enviar un audio recitando un poema inventado en 10 segundos sobre por qué aceptaste el plan."
];

const Victory = ({ gameState, onRestart }: Props) => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  // Select a random challenge on mount
  const challenge = useMemo(() => {
    return finalChallenges[Math.floor(Math.random() * finalChallenges.length)];
  }, []);

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
  const weather = weatherOptions.find(w => w.id === gameState.weatherId);
  const transport = transportOptions.find(t => t.id === gameState.transportId);
  const day = dayOptions.find(d => d.id === gameState.dayId);
  const dest = missionOptions.find(m => m.id === gameState.destId);
  const sideQuest = sideQuestOptions.find(s => s.id === gameState.sideQuestId) || (gameState.sideQuestId === 'random_cat_pet' ? { name: 'Acarició al michi' } : gameState.sideQuestId === 'random_cat_ignore' ? { name: 'Ignoró al michi' } : null);
  const fuel = fuelOptions.find(f => f.id === gameState.fuelId);
  const dressCode = dressCodeOptions.find(d => d.id === gameState.dressId);

  // Título dinámico
  const dynamicTitle = `La Expedición de ${avatar?.name || 'la Aventurera'} ${dest?.dest.includes('Volcán') ? 'hacia las Alturas' : dest?.dest.includes('Chino') ? 'por el Barrio Chino' : 'hacia ' + (dest?.dest || 'lo Desconocido')}`;

  // Helper values
  const mood = getPlayerMood(gameState);
  const energy = getPlayerEnergy(gameState);
  const song = getPlayerSong(gameState);
  const nerves = getPlayerNervousness(gameState);
  const wish = getPlayerWish(gameState);

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

  const whatsappText = `✨ ${dynamicTitle} ✨

Avatar: ${avatar?.name}
Destino: ${dest?.dest}
Día: ${day?.name} a las ${gameState.time}
Outfit: ${dressCode?.name || 'Cualquiera'}
Transporte: ${transport?.name}
Clima previsto: ${weather?.name}
Combustible: ${fuel ? fuel.name : 'Incluido en el destino'}
Desvío Opcional: ${sideQuest?.name || 'Ninguno'}

🎵 Banda sonora oficial:
${song || 'N/A'}

🎯 Misión secundaria:
${wish || 'N/A'}

⚡ Energía detectada:
${energy || 'N/A'}

💭 Mood actual:
${mood || 'N/A'}

🦋 Nervios: ${nerves || 'N/A'}

🛡️ Probabilidad de Éxito: ${successRate}%
🌟 Reto Especial: "${challenge}"

⭐ ¡P1 READY!
¿Qué tal el plan? 🚀`;

  // Uso de deeplink nativo (whatsapp://) para intentar forzar la apertura en móviles
  const whatsappLink = `whatsapp://send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(whatsappText)}`;
  // Fallback a api.whatsapp.com para desktop
  const whatsappFallback = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(whatsappText)}`;

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Intenta abrir el deeplink nativo, si falla en 500ms, abre el fallback en nueva pestaña
    window.location.href = whatsappLink;
    setTimeout(() => {
      window.open(whatsappFallback, '_blank');
    }, 500);
  };

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

      <h1 style={{ color: 'var(--success)', fontSize: '1.2rem', animation: 'float 2s infinite, pulse 2s infinite' }}>{dynamicTitle}</h1>
      
      <div className="mb-3 mt-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '15px', borderRadius: '5px', borderLeft: '3px solid var(--success)' }}>
        <Typewriter text="¡Nivel completado! Tu progreso ha sido guardado. Gracias por llegar hasta aquí. Esta aventura fue construida especialmente para ti." speed={30} />
      </div>

      <div className="rpg-card mt-3 mb-3" style={{ background: 'rgba(255, 107, 107, 0.2)', borderColor: '#ff6b6b', padding: '15px' }}>
        <h3 style={{ color: '#ff6b6b', fontSize: '1rem', marginBottom: '10px' }}>🎤 MISIÓN FINAL 🎤</h3>
        <p className="text-pixel" style={{ fontSize: '0.75rem', lineHeight: '1.5' }}>
          Para validar este plan, debes enviarle a tu Player 2 un mensaje por WhatsApp cumpliendo este reto: <br/><br/>
          <strong style={{ color: '#ffd43b' }}>{challenge}</strong>
          <br/><br/>
          ¡Es obligatorio para poder avanzar!
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

      <div className="rpg-card text-left mt-3 mb-3" style={{ background: 'rgba(232, 121, 249, 0.1)', padding: '15px', borderColor: '#e879f9' }}>
        <h3 style={{ color: '#e879f9', fontSize: '0.8rem', borderBottom: '1px dashed #e879f966', paddingBottom: '10px', marginBottom: '10px' }}>💬 Resumen de Personalidad</h3>
        
        <div className="mb-2">
          <span className="text-pixel" style={{ fontSize: '0.55rem', color: '#94a3b8' }}>Avatar:</span>
          <p className="text-pixel" style={{ fontSize: '0.65rem', color: '#e2e8f0', margin: '2px 0 0 0' }}>{avatar?.name}</p>
        </div>
        {mood && (
          <div className="mb-2">
            <span className="text-pixel" style={{ fontSize: '0.55rem', color: '#94a3b8' }}>Su mood:</span>
            <p className="text-pixel" style={{ fontSize: '0.65rem', color: '#e2e8f0', margin: '2px 0 0 0' }}>"{mood}"</p>
          </div>
        )}
        {energy && (
          <div className="mb-2">
            <span className="text-pixel" style={{ fontSize: '0.55rem', color: '#94a3b8' }}>Energía que quiere:</span>
            <p className="text-pixel" style={{ fontSize: '0.65rem', color: '#e2e8f0', margin: '2px 0 0 0' }}>{energy}</p>
          </div>
        )}
        {song && (
          <div className="mb-2">
            <span className="text-pixel" style={{ fontSize: '0.55rem', color: '#94a3b8' }}>Banda sonora oficial:</span>
            <p className="text-pixel" style={{ fontSize: '0.65rem', color: '#e2e8f0', margin: '2px 0 0 0' }}>🎵 "{song}"</p>
          </div>
        )}
        {nerves && (
          <div className="mb-2">
            <span className="text-pixel" style={{ fontSize: '0.55rem', color: '#94a3b8' }}>¿Nerviosa?:</span>
            <p className="text-pixel" style={{ fontSize: '0.65rem', color: '#e2e8f0', margin: '2px 0 0 0' }}>{nerves}</p>
          </div>
        )}
        {wish && (
          <div className="mb-2">
            <span className="text-pixel" style={{ fontSize: '0.55rem', color: '#94a3b8' }}>Deseo especial:</span>
            <p className="text-pixel" style={{ fontSize: '0.65rem', color: '#e2e8f0', margin: '2px 0 0 0' }}>🌟 "{wish}"</p>
          </div>
        )}
      </div>

      <div className="flex-center mt-3 mb-3">
        <button 
          onClick={handleWhatsAppClick}
          className="btn-retro"
          style={{ padding: '15px 30px', fontSize: '1.2rem' }}
        >
          Enviar Confirmación a WhatsApp
        </button>
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
