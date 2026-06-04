import { useState, useEffect } from 'react';
import { sideQuestOptions, avatarOptions } from '../data/gameData';
import type { GameState } from '../App';
import { sfxClick, sfxSelect, sfxBuzz } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  onNext: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: string) => void;
}

const SideQuests = ({ onNext, gameState, updateState }: Props) => {
  const [isRandomEncounter, setIsRandomEncounter] = useState(false);
  const [encounterResolved, setEncounterResolved] = useState(false);

  // 40% chance of random encounter when entering this screen
  useEffect(() => {
    if (Math.random() < 0.4 && !gameState.sideQuestId) {
      setIsRandomEncounter(true);
    }
  }, [gameState.sideQuestId]);

  const handleSelect = (id: string) => {
    updateState('sideQuestId', id);
    sfxSelect();
  };

  const handleNext = () => {
    if (gameState.sideQuestId) {
      sfxClick();
      onNext();
    }
  };

  const avatar = avatarOptions.find(a => a.id === gameState.avatarId);
  const narrativeText = avatar?.dialogues?.sideQuests || "¡La ruta principal está clara! Pero tal vez haya tiempo para un pequeño desvío rápido para mejorar la aventura...";

  if (isRandomEncounter) {
    return (
      <div className="rpg-panel fade-in" style={{ borderColor: '#ff6b6b', boxShadow: '0 0 20px rgba(255,107,107,0.4)' }}>
        <h2 style={{ color: '#ff6b6b' }}>🚨 ¡EVENTO ALEATORIO! 🚨</h2>
        
        <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.8rem', background: 'rgba(0,0,0,0.4)', padding: '15px', borderRadius: '5px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px', animation: 'float 2s infinite' }}>🐈</div>
          <Typewriter text="¡Un pequeño gatito callejero se ha cruzado en el camino y te está pidiendo mimos!" speed={30} />
        </div>

        {!encounterResolved ? (
          <div className="flex-column gap-3 mt-3">
            <button 
              className="btn-retro" 
              onClick={() => {
                updateState('sideQuestId', 'random_cat_pet');
                setEncounterResolved(true);
                sfxSelect();
              }}
              style={{ backgroundColor: 'rgba(163, 230, 53, 0.2)', borderColor: '#a3e635' }}
            >
              Acariciar al michi (+20 Romance/Chill)
            </button>
            <button 
              className="btn-retro" 
              onClick={() => {
                updateState('sideQuestId', 'random_cat_ignore');
                setEncounterResolved(true);
                sfxBuzz();
              }}
              style={{ backgroundColor: 'rgba(255, 107, 107, 0.2)', borderColor: '#ff6b6b' }}
            >
              Seguir de largo (-10 Karma)
            </button>
          </div>
        ) : (
          <div className="fade-in text-center">
            <p className="text-pixel mb-3" style={{ color: 'var(--text-highlight)' }}>
              {gameState.sideQuestId === 'random_cat_pet' ? 'El gatito ronronea feliz. Te sientes en paz con el universo.' : 'Sientes la mirada decepcionada del gatito a tus espaldas...'}
            </p>
            <button className="btn-retro mt-3" onClick={handleNext}>
              Continuar Viaje
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rpg-panel fade-in">
      <h2>Misión Secundaria (Gratuita)</h2>
      
      <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '5px' }}>
        <Typewriter text={narrativeText} speed={30} />
      </div>

      <div className="cards-grid">
        {sideQuestOptions.map(quest => (
          <div 
            key={quest.id}
            className={`rpg-card ${gameState.sideQuestId === quest.id ? 'selected' : ''}`}
            onClick={() => handleSelect(quest.id)}
          >
            <div className="emoji">{quest.emoji}</div>
            <div className="title">{quest.name}</div>
            <div className="text-pixel" style={{ color: 'var(--text-highlight)', fontSize: '0.5rem', marginBottom: '5px' }}>{quest.code}</div>
            <div className="desc text-pixel">{quest.desc}</div>
          </div>
        ))}
      </div>

      <div className="flex-center mt-3">
        <button 
          className="btn-retro" 
          onClick={handleNext}
          disabled={!gameState.sideQuestId}
          style={{ opacity: gameState.sideQuestId ? 1 : 0.5 }}
        >
          Confirmar Desvío
        </button>
      </div>
    </div>
  );
};

export default SideQuests;
