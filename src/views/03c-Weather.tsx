import { useState } from 'react';
import { weatherOptions, avatarOptions } from '../data/gameData';
import type { GameState } from '../App';
import { sfxClick, sfxSelect } from '../utils/audio';
import Typewriter from '../components/Typewriter';
import Toast from '../components/Toast';

interface Props {
  onNext: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: string) => void;
}

const Weather = ({ onNext, gameState, updateState }: Props) => {
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const getReaction = (weatherId: string, avatarId: string | null) => {
    if (weatherId === 'rainy') {
      if (avatarId === 'vampire') return '🦇 Lluvia... perfecto para mis dominios.';
      if (avatarId === 'healer_glam') return '💅 ¡Oh no, mi pelo!';
      return '🌧️ Perfecto para historias memorables.';
    }
    if (weatherId === 'sunny') {
      if (avatarId === 'vampire') return '🦇 Odio el sol. Llevaremos bloqueador SPF 1000.';
      if (avatarId === 'princess_random') return '👑 Sol... excelente para el bronceado real.';
      return '☀️ Nivel de vitamina D incrementado.';
    }
    if (weatherId === 'cloudy') {
      if (avatarId === 'necromancer_goth') return '💀 Sombras... mi clima ideal.';
      return '☁️ Misterio detectado.';
    }
    return '';
  };

  const handleSelect = (id: string) => {
    updateState('weatherId', id);
    sfxSelect();
    
    const reaction = getReaction(id, gameState.avatarId);
    if (reaction) {
      setToastMsg(reaction);
      setShowToast(true);
    }
  };

  const handleNext = () => {
    if (gameState.weatherId) {
      setShowToast(false);
      sfxClick();
      onNext();
    }
  };

  const avatar = avatarOptions.find(a => a.id === gameState.avatarId);
  const narrativeText = avatar?.dialogues?.weather || "Miras por la ventana. ¿Qué tal está el clima hoy en la ciudad? Esto podría complicar algunas misiones...";

  return (
    <div className="rpg-panel fade-in">
      <h2>Clima del Día</h2>
      
      <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '5px' }}>
        <Typewriter text={narrativeText} speed={30} />
      </div>

      <div className="cards-grid">
        {weatherOptions.map(weather => (
          <div 
            key={weather.id}
            className={`rpg-card ${gameState.weatherId === weather.id ? 'selected' : ''}`}
            onClick={() => handleSelect(weather.id)}
          >
            <div className="emoji">{weather.emoji}</div>
            <div className="title">{weather.name}</div>
            <div className="text-pixel" style={{ color: 'var(--text-highlight)', fontSize: '0.5rem', marginBottom: '5px' }}>{weather.code}</div>
            <div className="desc text-pixel">{weather.desc}</div>
          </div>
        ))}
      </div>

      <div className="flex-center mt-3">
        <button 
          className="btn-retro" 
          onClick={handleNext}
          disabled={!gameState.weatherId}
          style={{ opacity: gameState.weatherId ? 1 : 0.5 }}
        >
          Confirmar Clima
        </button>
      </div>

      <Toast message={toastMsg} show={showToast} onHide={() => setShowToast(false)} />
    </div>
  );
};

export default Weather;
