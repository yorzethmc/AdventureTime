import { dayOptions, isTimeValidForDay, avatarOptions } from '../data/gameData';
import type { GameState } from '../App';
import { sfxClick, sfxSelect, sfxBuzz } from '../utils/audio';
import Typewriter from '../components/Typewriter';

interface Props {
  onNext: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: string) => void;
}

const generateTimeSlots = () => {
  const slots = [];
  for (let h = 8; h <= 23; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`);
    if (h !== 23) slots.push(`${h.toString().padStart(2, '0')}:30`);
  }
  slots.push('23:59');
  return slots;
};

const allTimeSlots = generateTimeSlots();

const DateTime = ({ onNext, gameState, updateState }: Props) => {
  const handleDaySelect = (id: string) => {
    updateState('dayId', id);
    // Reset time if invalid for new day
    if (gameState.time && !isTimeValidForDay(gameState.time, id)) {
      updateState('time', '');
    }
    sfxSelect();
  };

  const handleTimeSelect = (time: string) => {
    if (gameState.dayId && !isTimeValidForDay(time, gameState.dayId)) {
      sfxBuzz();
      return;
    }
    updateState('time', time);
    sfxSelect();
  };

  const handleNext = () => {
    if (gameState.dayId && gameState.time) {
      sfxClick();
      onNext();
    }
  };

  const avatar = avatarOptions.find(a => a.id === gameState.avatarId);
  const narrativeText = avatar?.dialogues?.datetime || "El tiempo en este reino fluye de forma misteriosa. ¿En qué momento deberán encontrarse nuestros héroes?";

  return (
    <div className="rpg-panel fade-in">
      <h2>Día y Hora</h2>
      
      <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '5px' }}>
        <Typewriter text={narrativeText} speed={30} />
      </div>
      
      <div className="cards-grid mb-3">
        {dayOptions.map(day => (
          <div 
            key={day.id}
            className={`rpg-card ${gameState.dayId === day.id ? 'selected' : ''}`}
            onClick={() => handleDaySelect(day.id)}
            style={{ padding: '10px' }}
          >
            <div className="emoji" style={{ fontSize: '1.5rem' }}>{day.emoji}</div>
            <div className="title">{day.name}</div>
            <div className="text-pixel" style={{ opacity: 0.7, fontSize: '0.5rem' }}>
              De {day.minTime} a {day.maxTime}
            </div>
          </div>
        ))}
      </div>

      {gameState.dayId && (
        <div className="fade-in">
          <h3 className="mb-3" style={{ fontSize: '0.8rem', color: 'var(--text-highlight)' }}>Elige la hora</h3>
          <div className="time-grid">
            {allTimeSlots.map(time => {
              const isValid = isTimeValidForDay(time, gameState.dayId!);
              return (
                <button
                  key={time}
                  className={`time-btn ${gameState.time === time ? 'selected' : ''}`}
                  disabled={!isValid}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex-center mt-3">
        <button 
          className="btn-retro" 
          onClick={handleNext}
          disabled={!gameState.dayId || !gameState.time}
          style={{ opacity: (gameState.dayId && gameState.time) ? 1 : 0.5 }}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default DateTime;
