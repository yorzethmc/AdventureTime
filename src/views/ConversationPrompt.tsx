import { useState } from 'react';
import { sfxClick, sfxSelect } from '../utils/audio';
import Typewriter from '../components/Typewriter';

export interface ConversationQuestion {
  id: string;
  emoji: string;
  question: string;
  type: 'text' | 'choice';
  placeholder?: string;
  choices?: { label: string; emoji: string }[];
}

// Preguntas conversacionales que aparecerán durante el juego
export const conversationQuestions: ConversationQuestion[] = [
  {
    id: 'mood',
    emoji: '💭',
    question: '¿Cómo te sentís hoy? Describí tu mood en una frase.',
    type: 'text',
    placeholder: 'Ej: Con ganas de aventura...'
  },
  {
    id: 'plan_vibe',
    emoji: '✨',
    question: '¿Qué tipo de energía querés para este plan?',
    type: 'choice',
    choices: [
      { label: 'Tranqui y chill', emoji: '☕' },
      { label: 'Con adrenalina', emoji: '🔥' },
      { label: 'Romántico', emoji: '💕' },
      { label: 'Sorprendeme vos', emoji: '🎲' }
    ]
  },
  {
    id: 'song',
    emoji: '🎵',
    question: '¿Qué canción te describe en este momento?',
    type: 'text',
    placeholder: 'Ej: Corazón Encantado 😉'
  },
  {
    id: 'nervous',
    emoji: '🦋',
    question: '¿Estás nerviosa por esta cita?',
    type: 'choice',
    choices: [
      { label: 'Sí, bastante', emoji: '😳' },
      { label: 'Un poquito', emoji: '🤭' },
      { label: 'Para nada, estoy ready', emoji: '😎' },
      { label: 'Más emocionada que nerviosa', emoji: '🥰' }
    ]
  },
  {
    id: 'wish',
    emoji: '🌟',
    question: '¿Hay algo especial que te gustaría que pase en esta cita? (Sé honesta)',
    type: 'text',
    placeholder: 'Ej: Que nos riamos mucho...'
  }
];

// Mapear qué pregunta se dispara en qué transición de step
// key = step destino, value = índice en conversationQuestions
export const questionTriggers: Record<number, number> = {
  2: 0,   // Después de Avatar → pregunta "mood"
  6: 1,   // Después de Weather → pregunta "plan_vibe"
  7: 2,   // Después de DressCode → pregunta "song"
  9: 3,   // Después de DateTime → pregunta "nervous"
  12: 4,  // Antes de BossBattle → pregunta "wish"
};

interface Props {
  question: ConversationQuestion;
  onAnswer: (questionId: string, answer: string) => void;
}

const ConversationPrompt = ({ question, onAnswer }: Props) => {
  const [textValue, setTextValue] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleTextSubmit = () => {
    if (textValue.trim()) {
      sfxSelect();
      onAnswer(question.id, textValue.trim());
    }
  };

  const handleChoice = (choice: { label: string; emoji: string }) => {
    sfxClick();
    onAnswer(question.id, `${choice.emoji} ${choice.label}`);
  };

  return (
    <div className="rpg-panel fade-in" style={{ borderColor: '#e879f9', boxShadow: '0 0 25px rgba(232, 121, 249, 0.3)' }}>
      <h2 style={{ color: '#e879f9', textAlign: 'center', fontSize: '1rem' }}>
        {question.emoji} Momento de Conversación {question.emoji}
      </h2>

      <div className="mb-3 text-pixel" style={{
        color: '#e2e8f0',
        lineHeight: '1.7',
        fontSize: '0.8rem',
        background: 'rgba(0,0,0,0.5)',
        padding: '15px',
        borderRadius: '8px',
        borderLeft: '3px solid #e879f9',
        textAlign: 'center'
      }}>
        <Typewriter text={question.question} speed={30} onComplete={() => setShowInput(true)} />
      </div>

      {showInput && question.type === 'text' && (
        <div className="fade-in mt-3">
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder={question.placeholder}
            maxLength={200}
            style={{
              width: '100%',
              minHeight: '80px',
              background: 'rgba(15, 23, 42, 0.9)',
              border: '2px solid #e879f9',
              borderRadius: '8px',
              color: '#e2e8f0',
              padding: '12px',
              fontSize: '0.8rem',
              fontFamily: "'Press Start 2P', monospace",
              resize: 'none',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            autoFocus
          />
          <div className="text-pixel" style={{ fontSize: '0.5rem', color: '#94a3b8', textAlign: 'right', marginTop: '4px' }}>
            {textValue.length}/200
          </div>
          <div className="flex-center mt-3">
            <button
              className="btn-retro"
              onClick={handleTextSubmit}
              disabled={!textValue.trim()}
              style={{ opacity: textValue.trim() ? 1 : 0.5 }}
            >
              Enviar respuesta &gt;
            </button>
          </div>
        </div>
      )}

      {showInput && question.type === 'choice' && (
        <div className="fade-in flex-column gap-3 mt-3">
          {question.choices?.map((choice, idx) => (
            <button
              key={idx}
              className="btn-retro fade-in"
              onClick={() => handleChoice(choice)}
              style={{
                fontSize: '0.75rem',
                animationDelay: `${idx * 0.12}s`,
                textAlign: 'left',
                padding: '10px 15px'
              }}
            >
              {choice.emoji} {choice.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversationPrompt;
