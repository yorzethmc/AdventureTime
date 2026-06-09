import { useState, useCallback } from 'react';
import { sfxClick, sfxBuzz } from '../utils/audio';
import Typewriter from '../components/Typewriter';

import { avatarOptions } from '../data/gameData';
import type { GameState } from '../App';

interface Props {
  onAccept: () => void;
  onReject: () => void;
  gameState: GameState;
}

const evasivePhrases = [
  "Casi, pero el destino hizo dodge.",
  "Ese botón tiene evasión nivel 99.",
  "La misión insiste en ser aceptada.",
  "Huir no desbloquea recompensas.",
  "Intento registrado en el historial del reino.",
  "El botón usó teletransporte.",
  "La aventura todavía cree en vos.",
  "No tan rápido, viajera.",
  "Última oportunidad antes del modo drama."
];

const MissionBriefing = ({ onAccept, onReject, gameState }: Props) => {
  const [rejectAttempts, setRejectAttempts] = useState(0);
  const [rejectPhrase, setRejectPhrase] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  const handleAccept = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    sfxClick();
    onAccept();
  };

  const handleEvade = useCallback(() => {
    if (rejectAttempts >= 9) return;

    sfxBuzz();
    const newAttempts = rejectAttempts + 1;
    setRejectAttempts(newAttempts);
    setRejectPhrase(evasivePhrases[rejectAttempts % evasivePhrases.length]);
  }, [rejectAttempts]);

  const handleRejectClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (rejectAttempts >= 9) {
      sfxClick();
      onReject();
    } else {
      handleEvade();
    }
  };

  const gameOver = rejectAttempts >= 9;

  const avatar = avatarOptions.find(a => a.id === gameState.avatarId);
  const narrativeText = avatar?.dialogues?.briefing || "Hay misiones que no aparecen todos los días. Esta fue preparada con cuidado, un poco de magia retro y una intención muy simple: invitarte a una cita diferente. Si aceptás, vas a elegir el camino, la hora, el destino y el combustible de esta aventura.";

  return (
    <div className="rpg-panel fade-in">
      <h2 style={{ color: 'var(--text-highlight)' }}>Mission Briefing</h2>

      <div className="text-pixel mb-3" style={{ fontSize: '0.8rem', lineHeight: '1.8' }}>
        <Typewriter 
            text={narrativeText}
            speed={35}
            onComplete={() => setShowButtons(true)}
        />
      </div>

      {showButtons && (
        <div className="fade-in">
          {/* Accept button - always in normal flow, never overlapped */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '20px 0', position: 'relative', zIndex: 200 }}>
            <button
              className="btn-retro"
              onClick={handleAccept}
              onTouchEnd={handleAccept}
              style={{ width: '80%', position: 'relative', zIndex: 200 }}
            >
              Acepto, iniciar aventura
            </button>
          </div>

          {/* Evasive phrase display */}
          {rejectPhrase && !gameOver && (
            <p className="text-pixel text-center" style={{ color: 'var(--primary)', fontSize: '0.6rem', margin: '10px 0' }}>
              💨 {rejectPhrase}
            </p>
          )}

          {/* Attempt counter */}
          {rejectAttempts > 0 && !gameOver && (
            <p className="text-pixel text-center" style={{ color: '#868e96', fontSize: '0.5rem', margin: '5px 0' }}>
              Intentos de escape: {rejectAttempts}/9
            </p>
          )}

          {/* Game over message */}
          {gameOver && (
            <p className="text-pixel mb-3 text-center" style={{ color: 'var(--text-highlight)', fontSize: '0.6rem', margin: '10px 0' }}>
              Ok... si de verdad querés escapar, el portal se abrió.
              Pero la aventura se va a quedar con carita triste.
            </p>
          )}

          {/* Reject button */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0', minHeight: '50px' }}>
            <button
              className="btn-retro evasive"
              onClick={handleRejectClick}
              style={{
                width: gameOver ? '80%' : 'auto',
                transform: gameOver ? 'none' : `scale(${Math.max(0.2, 1 - rejectAttempts * 0.1)})`,
                transition: 'transform 0.2s',
                opacity: rejectAttempts > 0 && !gameOver ? Math.max(0.4, 1 - rejectAttempts * 0.08) : 1
              }}
            >
              Huir de la misión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionBriefing;
