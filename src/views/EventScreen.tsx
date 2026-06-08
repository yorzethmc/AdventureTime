import { useState, useEffect } from 'react';
import { sfxClick, sfxSelect, sfxBuzz } from '../utils/audio';
import type { GameState } from '../App';
import Typewriter from '../components/Typewriter';

interface Props {
  eventId: string;
  onResolve: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: any) => void;
}

const eventData: Record<string, any> = {
  merchant: {
    name: 'Mercader Errante',
    image: 'events/merchant.png',
    text: '¡Saludos viajero! Tengo justo lo que necesitas para tu aventura. ¿Te interesa un Snack Misterioso por 10 monedas de Oro?',
    options: [
      {
        text: 'Comprar Snack (-10 Oro)',
        action: (update: any) => {
          update('inventoryId', 'snacks');
          update('haggleDiscount', -10);
        },
        sfx: 'select',
        result: '¡Excelente elección! El mercader te entrega una bolsita con snacks exóticos.'
      },
      {
        text: 'Rechazar cortésmente',
        action: () => {},
        sfx: 'click',
        result: 'El mercader asiente con la cabeza y sigue su camino.'
      }
    ]
  },
  slime: {
    name: 'Slime Gigante',
    image: 'events/slime.png',
    text: 'Un slime gigante y pegajoso bloquea el camino. ¡Parece hambriento!',
    options: [
      {
        text: 'Luchar valientemente',
        action: (update: any, state: GameState) => {
          if (state.avatarId === 'warrior' || state.avatarId === 'mage') {
            update('haggleDiscount', 15); // Ganas oro
          } else {
            update('haggleDiscount', -5); // Pierdes oro
          }
        },
        sfx: 'select',
        result: '¡Batalla épica! Saliste victorioso del encuentro.'
      },
      {
        text: 'Huir despavorido',
        action: () => {},
        sfx: 'buzz',
        result: 'Escapaste corriendo, perdiste un poco de dignidad pero estás a salvo.'
      }
    ]
  },
  thief: {
    name: 'Ladrona Sigilosa',
    image: 'events/thief.png',
    text: '¡Una sombra salta de los arbustos! Es una ladrona buscando oro fácil.',
    options: [
      {
        text: 'Lanzarle unas monedas (-5 Oro)',
        action: (update: any) => update('haggleDiscount', -5),
        sfx: 'select',
        result: 'La ladrona atrapa el oro y desaparece sonriendo en las sombras.'
      },
      {
        text: 'Negociar con ella',
        action: (update: any, state: GameState) => {
          if (state.avatarId === 'gemini' || state.avatarId === 'bard') {
            update('haggleDiscount', 10);
          } else {
            update('haggleDiscount', -15);
          }
        },
        sfx: 'select',
        result: 'Usaste tu carisma para lidiar con la situación.'
      }
    ]
  },
  dog: {
    name: 'Perrito Callejero',
    image: 'events/dog.png',
    text: 'Un perrito callejero se te acerca moviendo la cola, trae un palito en el hocico.',
    options: [
      {
        text: 'Jugar y acariciar (+15 Chill)',
        action: (update: any) => update('sideQuestId', 'random_cat_pet'), // Reusing the stat booster
        sfx: 'select',
        result: 'El perrito salta de felicidad. Tu nivel de paz mental ha aumentado.'
      },
      {
        text: 'Ignorarlo',
        action: (update: any) => update('sideQuestId', 'random_cat_ignore'),
        sfx: 'buzz',
        result: 'El perrito se va triste arrastrando su palito...'
      }
    ]
  },
  fortune_teller: {
    name: 'Adivina Misteriosa',
    image: 'events/fortune_teller.png',
    text: '"Acércate... leo en las estrellas un destino incierto. Por una moneda de oro te revelaré tu suerte."',
    options: [
      {
        text: 'Pagarle (-1 Oro)',
        action: (update: any) => update('haggleDiscount', -1),
        sfx: 'select',
        result: '"Veo una cita muy exitosa... pero cuidado con el picante." (Te sientes más seguro de ti mismo)'
      },
      {
        text: 'No creo en esas cosas',
        action: () => {},
        sfx: 'click',
        result: 'La adivina vuelve a cubrir su bola de cristal en silencio.'
      }
    ]
  },
  knight: {
    name: 'Caballero Desorientado',
    image: 'events/knight.png',
    text: 'Un caballero con armadura completa sostiene un mapa al revés. "Disculpe buen samaritano, ¿dónde queda el castillo?"',
    options: [
      {
        text: 'Ayudarle con el mapa',
        action: (update: any) => update('haggleDiscount', 20),
        sfx: 'select',
        result: '"¡Gracias! Tomad esta recompensa por vuestra amabilidad." (+20 Oro)'
      },
      {
        text: 'Señalar a un lado random',
        action: () => {},
        sfx: 'buzz',
        result: 'El caballero marcha confiado hacia un callejón sin salida...'
      }
    ]
  }
};

const EventScreen = ({ eventId, onResolve, gameState, updateState }: Props) => {
  const [resolved, setResolved] = useState(false);
  const [resultText, setResultText] = useState('');
  
  const event = eventData[eventId];

  useEffect(() => {
    // Play a surprise sound when entering
    sfxSelect();
  }, []);

  if (!event) {
    onResolve();
    return null;
  }

  const handleOption = (option: any) => {
    if (option.sfx === 'select') sfxSelect();
    if (option.sfx === 'buzz') sfxBuzz();
    if (option.sfx === 'click') sfxClick();
    
    option.action(updateState, gameState);
    setResultText(option.result);
    setResolved(true);
  };

  return (
    <div className="rpg-panel fade-in" style={{ borderColor: '#f59f00', boxShadow: '0 0 20px rgba(245, 159, 0, 0.4)' }}>
      <h2 style={{ color: '#f59f00' }}>⚠️ EVENTO ALEATORIO ⚠️</h2>
      
      <div className="flex-center mt-3 mb-3">
        <img 
          src={`${import.meta.env.BASE_URL}${event.image}`} 
          alt={event.name} 
          style={{ width: '150px', height: '150px', objectFit: 'contain', borderRadius: '10px', animation: 'slide-in-right 0.5s ease-out, float 3s infinite ease-in-out', border: '2px solid var(--panel-border)' }}
        />
      </div>
      
      <h3 style={{ color: 'var(--text-highlight)', textAlign: 'center', marginBottom: '10px' }}>{event.name}</h3>

      {!resolved ? (
        <>
          <div className="mb-3 text-pixel" style={{ color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.8rem', background: 'rgba(0,0,0,0.4)', padding: '15px', borderRadius: '5px', textAlign: 'center' }}>
            <Typewriter text={event.text} speed={30} />
          </div>

          <div className="flex-column gap-3 mt-3">
            {event.options.map((opt: any, idx: number) => (
              <button 
                key={idx}
                className="btn-retro" 
                onClick={() => handleOption(opt)}
                style={{ fontSize: '0.8rem' }}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="fade-in text-center mt-3">
          <p className="text-pixel mb-3" style={{ color: 'var(--success)' }}>
            {resultText}
          </p>
          <button className="btn-retro mt-3" onClick={() => { sfxClick(); onResolve(); }}>
            Continuar Viaje &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default EventScreen;
