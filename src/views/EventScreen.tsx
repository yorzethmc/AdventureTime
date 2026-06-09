import { useState, useEffect } from 'react';
import { sfxClick, sfxSelect, sfxBuzz } from '../utils/audio';
import type { GameState } from '../App';
import Typewriter from '../components/Typewriter';
import { getPlayerEnergy, getPlayerSong, isEnergyAdrenaline, isEnergyRomantic, isNervousHigh } from '../utils/memory';

interface Props {
  eventId: string;
  onResolve: () => void;
  gameState: GameState;
  updateState: (key: keyof GameState, value: any) => void;
}

// Helper para obtener nombre del avatar actual
const getAvatarName = (id: string | null): string => {
  const names: Record<string, string> = {
    mage: 'Maga Estelar', explorer: 'Exploradora', princess_random: 'Princesa Random',
    gemini: 'Gemela Cósmica', warrior: 'Caballera del Caos', bard: 'Barda Lo-Fi',
    vampire: 'Vampiresa', healer_glam: 'Sanadora Aesthetic', necromancer_goth: 'Nigromante',
    hunter_athletic: 'Cazadora Acrobática'
  };
  return names[id || ''] || 'Aventurero';
};

const eventData: Record<string, any> = {
  robin_hood: {
    name: 'Robin Hood — El Forajido',
    image: 'events/thief.png',
    emoji: '🏹',
    borderColor: '#a855f7',
    getText: (state: GameState) => {
      const name = getAvatarName(state.avatarId);
      let contextLine = `"Buenas noches, ${name}. Normalmente le robo a los ricos para darmelo a mí mismo..."`;
      
      if (state.weatherId === 'rainy') {
        contextLine = `"Perfecto. La lluvia borra las huellas. Buenas noches, ${name}..."`;
      } else if (state.dressId === 'elegant') {
        contextLine = `"Con esa ropa pareces alguien con dinero, ${name}..."`;
      } else if (isEnergyAdrenaline(state)) {
        contextLine = `"Alguien busca adrenalina esta noche. Me gusta tu actitud, ${name}..."`;
      }

      return `${contextLine} Se ríe entre dientes. "Pero hoy me siento generoso. ¿Cómo resolvemos esto?"`;
    },
    options: [
      {
        text: '💬 Usar la labia para convencerlo',
        action: (update: any, state: GameState) => {
          if (state.avatarId === 'gemini' || state.avatarId === 'bard' || state.avatarId === 'healer_glam') {
            update('haggleDiscount', 12);
          } else {
            update('haggleDiscount', -8);
          }
        },
        sfx: 'select',
        getResult: (state: GameState) => {
          if (state.avatarId === 'gemini' || state.avatarId === 'bard' || state.avatarId === 'healer_glam') {
            return 'Robin Hood se detiene, fascinado. "Eres... interesante. Toma, te regalo estas monedas que le robé a otro viajero." (+12 Oro). Desaparece en el bosque.';
          }
          return 'Robin escucha tu discurso, bosteza, y mientras estabas distraído, ya te robó 8 monedas. "Bonito intento." Desaparece riendo.';
        }
      },
      {
        text: '⚔️ Ponerse en guardia',
        action: (update: any, state: GameState) => {
          if (state.avatarId === 'warrior' || state.avatarId === 'hunter_athletic' || state.avatarId === 'explorer') {
            update('haggleDiscount', 5);
          } else {
            update('haggleDiscount', -5);
          }
        },
        sfx: 'select',
        getResult: (state: GameState) => {
          if (state.avatarId === 'warrior' || state.avatarId === 'hunter_athletic' || state.avatarId === 'explorer') {
            return 'Robin evalúa tu postura de combate y silba impresionado. "Mmm, no merece la pena el riesgo." Lanza 5 monedas al aire como propina y se esfuma.';
          }
          return 'Adoptas una pose extraña. Robin se ríe a carcajadas. Te roba 5 monedas "por el show".';
        }
      }
    ]
  },

  nostradamus: {
    name: 'Nostradamus — Oráculo del Tiempo',
    image: 'events/fortune_teller.png',
    emoji: '🔮',
    borderColor: '#c084fc',
    getText: (state: GameState) => {
      const name = getAvatarName(state.avatarId);
      const song = getPlayerSong(state);
      
      let contextLine = `"Las estrellas me hablaron de ti, ${name}..."`;
      
      if (isEnergyRomantic(state)) {
        contextLine = `"Las estrellas detectan una fuerte energía romántica a tu alrededor, ${name}..."`;
      } else if (isNervousHigh(state)) {
        contextLine = `"Veo dudas en tu futuro cercano, ${name}. Los nervios te traicionan..."`;
      } else if (song) {
        contextLine = `"Las estrellas tararean algo parecido a '${song}'... El universo tiene buen gusto musical, ${name}."`;
      }

      return `Una figura encapuchada surge de la niebla. ${contextLine} "Tengo una profecía para tu cita. ¿Te atreves a escuchar?"`;
    },
    options: [
      {
        text: '🔮 Escuchar la profecía',
        action: () => {},
        sfx: 'select',
        getResult: (state: GameState) => {
          if (isEnergyRomantic(state)) {
             return '"Veo miradas cruzadas... sonrisas discretas... y un momento donde el tiempo se detendrá." Nostradamus desaparece dejándote pensativa.';
          }
          return '"Veo... un momento incómodo con el mesero. Pedirán lo mismo y ambos dirán \'yo vi primero eso\'. Pero todo saldrá bien al final."';
        }
      },
      {
        text: '🚶 Ignorar el destino',
        action: () => {},
        sfx: 'click',
        getResult: () => '"¡El destino te alcanzará de todas formas!" grita Nostradamus mientras se desvanece en la niebla.'
      }
    ]
  },

  hachiko: {
    name: 'Hachiko — El Perrito Leal',
    image: 'events/slime.png',
    emoji: '🐕',
    borderColor: '#f59f00',
    getText: (state: GameState) => {
      const name = getAvatarName(state.avatarId);
      const mood = state.responses.mood || '';
      
      let contextLine = `Un perrito Akita Inu bloquea el camino. Te mira con ojitos tiernos.`;
      
      if (isNervousHigh(state)) {
        contextLine = `El perrito te mira, inclina la cabeza y hace un sonido que parece decir: "No te preocupes. Todo saldrá bien, ${name}."`;
      } else if (mood.includes('😊') || mood.includes('feliz') || mood.includes('feliz')) {
        contextLine = `El perrito mueve la cola frenéticamente. "Mueves la cola igual que yo," parece decirte telepáticamente.`;
      }

      return `${contextLine} Está esperando algo de ti.`;
    },
    options: [
      {
        text: '🍫 Ofrecerle un snack',
        action: (update: any, state: GameState) => {
          if (state.inventoryId === 'snacks') {
            update('haggleDiscount', 10);
          }
        },
        sfx: 'select',
        getResult: (state: GameState) => {
          if (state.inventoryId === 'snacks') {
            return '¡Hachiko devora el snack y vibra de felicidad! Rasca la tierra y desentierra... ¿10 monedas de oro? Buen chico.';
          }
          return 'Buscas en tu mochila pero no tienes snacks. Hachiko te mira decepcionado. Finalmente se aburre y se acuesta a esperar a alguien más.';
        }
      },
      {
        text: '👋 Acariciarlo',
        action: () => {},
        sfx: 'select',
        getResult: () => 'Le das unas palmaditas. Hachiko cierra los ojos contento. Te sientes llena de determinación y energía positiva para tu cita.'
      }
    ]
  },

  juana_arco: {
    name: 'Juana de Arco — La Guerrera Santa',
    image: 'events/knight.png',
    emoji: '⚔️',
    borderColor: '#60a5fa',
    getText: (state: GameState) => {
      const name = getAvatarName(state.avatarId);
      
      let contextLine = `"¡Detente, ${name}! El camino por delante requiere valor."`;
      
      if (state.destId === 'poas') {
        contextLine = `"¡Volcán Poás! Excelente elección estratégica, ${name}. Terreno elevado."`;
      } else if (state.dressId === 'adventurer') {
        contextLine = `"Veo que has venido preparada para la misión. Buena armadura."`;
      }

      return `Una guerrera en armadura brillante te corta el paso. ${contextLine} "Mi brújula divina se ha roto. ¿Hacia dónde queda el destino?"`;
    },
    options: [
      {
        text: '🗺️ Ayudarle con el mapa',
        action: (update: any) => update('haggleDiscount', 20),
        sfx: 'select',
        getResult: () => 'Le explicas las direcciones. Juana asiente con firmeza. "Gracias, guerrera." Te da 20 monedas de oro de las arcas reales. "¡Que la victoria sea tuya en esta cita!"'
      },
      {
        text: '😅 Confesar que tú también estás perdida',
        action: () => {},
        sfx: 'click',
        getResult: () => 'Juana suspira. "Supongo que ambas debemos forjar nuestro propio camino." Hace una reverencia y se marcha con paso marcial.'
      }
    ]
  },

  gato_mercader: {
    name: 'Gato Mercader',
    image: 'events/merchant.png',
    emoji: '🐱',
    borderColor: '#ffca28',
    getText: (state: GameState) => {
      const name = getAvatarName(state.avatarId);
      let contextLine = `"Miauu... Tengo mercancía si tienes oro, ${name}..."`;

      if (state.inventoryId === 'camera') {
        contextLine = `"Veo que te gusta coleccionar recuerdos. Te cambio una historia por unas fotos..."`;
      } else if (state.time && state.time.startsWith('2')) {
        contextLine = `"A los gatos nos encanta negociar de noche, ¿verdad ${name}?"`;
      }

      return `Un gato enorme con un sombrero de copa y una maleta aparece de la nada. ${contextLine}`;
    },
    options: [
      {
        text: '🐟 Invitarle a pescar (o darle de comer)',
        action: (update: any) => update('haggleDiscount', 15),
        sfx: 'select',
        getResult: () => 'El gato ronronea. "¡Un humano con cultura!" Se quita el sombrero de donde caen 15 monedas de oro. "Un trato justo." Desaparece en las sombras.'
      },
      {
        text: '🗣️ Intentar regatearle unos items',
        action: (update: any) => update('haggleDiscount', -10),
        sfx: 'click',
        getResult: () => 'El gato te mira con desdén. "Nadie estafa a Michi el Mercader." Usa sus garras para robarte 10 monedas antes de que puedas reaccionar.'
      }
    ]
  }
};

// Pool de eventos por punto de interrupción
const eventPools: Record<string, string[]> = {
  after_inventory: ['juana_arco', 'hachiko', 'gato_mercader'],
  after_transport: ['robin_hood', 'nostradamus', 'gato_mercader'],
  after_destinations: ['hachiko', 'robin_hood', 'gato_mercader'],
  after_fuel: ['nostradamus', 'juana_arco', 'gato_mercader']
};

export const rollForEvent = (trigger: string): string | null => {
  if (Math.random() >= 0.5) return null; // 50% chance no event
  const pool = eventPools[trigger];
  if (!pool || pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
};

const EventScreen = ({ eventId, onResolve, gameState, updateState }: Props) => {
  const [resolved, setResolved] = useState(false);
  const [resultText, setResultText] = useState('');
  
  const event = eventData[eventId];

  useEffect(() => {
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
    const result = option.getResult ? option.getResult(gameState) : option.result;
    setResultText(result);
    setResolved(true);
  };

  const displayText = event.getText ? event.getText(gameState) : event.text;

  return (
    <div className="rpg-panel fade-in" style={{ borderColor: event.borderColor || '#f59f00', boxShadow: `0 0 25px ${event.borderColor || '#f59f00'}66` }}>
      <h2 style={{ color: event.borderColor || '#f59f00', textAlign: 'center' }}>
        {event.emoji} EVENTO ALEATORIO {event.emoji}
      </h2>
      
      <div className="flex-center mt-3 mb-3">
        <img 
          src={`${import.meta.env.BASE_URL}${event.image}`} 
          alt={event.name} 
          style={{ 
            width: '140px', 
            height: '140px', 
            objectFit: 'contain', 
            borderRadius: '12px', 
            animation: 'float 3s infinite ease-in-out', 
            border: `2px solid ${event.borderColor || 'var(--panel-border)'}`,
            boxShadow: `0 0 15px ${event.borderColor || '#f59f00'}44`
          }}
        />
      </div>
      
      <h3 style={{ color: 'var(--text-highlight)', textAlign: 'center', marginBottom: '10px', fontSize: '0.9rem' }}>
        {event.name}
      </h3>

      {!resolved ? (
        <>
          <div className="mb-3 text-pixel" style={{ 
            color: '#e2e8f0', 
            lineHeight: '1.7', 
            fontSize: '0.7rem', 
            background: 'rgba(0,0,0,0.5)', 
            padding: '15px', 
            borderRadius: '8px',
            borderLeft: `3px solid ${event.borderColor || '#f59f00'}`
          }}>
            <Typewriter text={displayText} speed={25} />
          </div>

          <div className="flex-column gap-3 mt-3">
            {event.options.map((opt: any, idx: number) => (
              <button 
                key={idx}
                className="btn-retro fade-in" 
                onClick={() => handleOption(opt)}
                style={{ 
                  fontSize: '0.75rem', 
                  animationDelay: `${idx * 0.15}s`,
                  textAlign: 'left',
                  padding: '10px 15px'
                }}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="fade-in text-center mt-3">
          <div className="text-pixel mb-3" style={{ 
            color: '#e2e8f0', 
            fontSize: '0.7rem', 
            lineHeight: '1.7',
            background: 'rgba(0,0,0,0.4)', 
            padding: '15px', 
            borderRadius: '8px',
            borderLeft: '3px solid var(--success)'
          }}>
            {resultText}
          </div>
          <button className="btn-retro mt-3" onClick={() => { sfxClick(); onResolve(); }}>
            Continuar Viaje &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default EventScreen;
