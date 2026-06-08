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
  merchant: {
    name: 'Don Cornelio — Mercader de Caminos',
    image: 'events/merchant.png',
    emoji: '🧳',
    borderColor: '#f59f00',
    getText: (state: GameState) => {
      const name = getAvatarName(state.avatarId);
      return `"¡Ah, pero si es ${name}! Llevo 40 años recorriendo estos senderos y jamás he visto a alguien con tanta determinación en la mirada. Tengo algo especial en mi carreta... un paquete de Snacks Legendarios traídos desde tierras lejanas. Solo 10 monedas de oro. ¿Qué dice, aventurero?"`;
    },
    options: [
      {
        text: '💰 Comprar Snacks Legendarios (-10 Oro)',
        action: (update: any) => {
          update('inventoryId', 'snacks');
          update('haggleDiscount', -10);
        },
        sfx: 'select',
        getResult: () => '"¡Sabia elección!" Don Cornelio envuelve los snacks en un pañuelo bordado. "Si la cita sale mal, al menos tendrán algo rico que compartir en el silencio incómodo." Te guiña un ojo y empuja su carreta colina abajo.'
      },
      {
        text: '🤝 Regatear como profesional',
        action: (update: any, state: GameState) => {
          if (state.avatarId === 'gemini' || state.avatarId === 'bard' || state.avatarId === 'princess_random') {
            update('inventoryId', 'snacks');
            update('haggleDiscount', -3);
          } else {
            update('haggleDiscount', -10);
          }
        },
        sfx: 'select',
        getResult: (state: GameState) => {
          if (state.avatarId === 'gemini' || state.avatarId === 'bard' || state.avatarId === 'princess_random') {
            return '"¡Pero qué labia! Me recuerdas a mi difunta esposa." Don Cornelio suspira nostálgico y te da los snacks por solo 3 monedas. "Llévalos, y que el amor les sonría."';
          }
          return 'Don Cornelio se ríe a carcajadas. "¿Regatear conmigo? Llevo 40 años en esto." Te cobra el precio completo pero te regala un consejo: "El mejor plan es el que no se planea demasiado."';
        }
      },
      {
        text: '👋 Declinar con respeto',
        action: () => {},
        sfx: 'click',
        getResult: () => 'Don Cornelio asiente con dignidad. "Entiendo. El verdadero tesoro no se compra con oro de todas formas." Se ajusta el sombrero y desaparece por el sendero, tarareando una vieja melodía.'
      }
    ]
  },

  slime: {
    name: 'Gomita — El Slime Ancestral',
    image: 'events/slime.png',
    emoji: '👾',
    borderColor: '#4c6ef5',
    getText: (state: GameState) => {
      const name = getAvatarName(state.avatarId);
      return `Un enorme slime azul gelatinoso emerge del suelo bloqueando completamente el camino. Tiene dibujada una carita feliz que... ¿se está moviendo? El slime hace un ruido que suena sospechosamente a "¿quién va?". ${name} se detiene en seco.`;
    },
    options: [
      {
        text: '⚔️ ¡A la batalla!',
        action: (update: any, state: GameState) => {
          if (state.avatarId === 'warrior' || state.avatarId === 'mage' || state.avatarId === 'hunter_athletic') {
            update('haggleDiscount', 15);
          } else if (state.avatarId === 'necromancer_goth') {
            update('haggleDiscount', 20);
          } else {
            update('haggleDiscount', -5);
          }
        },
        sfx: 'select',
        getResult: (state: GameState) => {
          if (state.avatarId === 'warrior' || state.avatarId === 'mage' || state.avatarId === 'hunter_athletic') {
            return '¡CRITICAL HIT! Tu entrenamiento de combate dio frutos. Gomita explota en confeti azul y deja caer 15 monedas de oro. Detrás de los restos encuentras un cartel que dice: "Este slime fue patrocinado por el Gremio de Aventureros."';
          }
          if (state.avatarId === 'necromancer_goth') {
            return 'Invocas las sombras y Gomita se disuelve aterrorizado. En su lugar queda un charco brillante con 20 monedas. Sonríes satisfecha. "Demasiado fácil."';
          }
          return 'La batalla fue... complicada. Gomita te lanzó baba pegajosa y perdiste 5 monedas de oro intentando limpiarte. Pero al menos el camino está libre y tienes una historia que contar.';
        }
      },
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
            return '¡Gomita devora el snack y vibra de felicidad! Se hace a un lado y regurgita... ¿10 monedas de oro? Asqueroso pero útil. Te despide con un "BLOOP" amistoso.';
          }
          return 'Buscas en tu mochila pero no tienes snacks. Gomita te mira decepcionado con su carita triste. Finalmente se aburre y se arrastra fuera del camino, dejando un rastro baboso.';
        }
      },
      {
        text: '🏃 ¡Huir corriendo!',
        action: () => {},
        sfx: 'buzz',
        getResult: () => 'Sales corriendo gritando "¡NOPE NOPE NOPE!" mientras Gomita te persigue en cámara lenta. Afortunadamente los slimes no son muy rápidos. Escapas con tu dignidad parcialmente intacta.'
      }
    ]
  },

  thief: {
    name: 'Sombra — La Pícara del Mercado',
    image: 'events/thief.png',
    emoji: '🗡️',
    borderColor: '#a855f7',
    getText: (state: GameState) => {
      const name = getAvatarName(state.avatarId);
      return `Una figura encapuchada cae del tejado más cercano, aterriza con una pirueta perfecta y hace una reverencia teatral. "Buenas noches, ${name}. Mi nombre es Sombra, y normalmente me llevo lo que quiero. Pero hoy me siento generosa... o quizás te doy la oportunidad de conservar tu oro. Depende de ti."`;
    },
    options: [
      {
        text: '💬 Usar la labia para convencerla',
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
            return 'Sombra se detiene a mitad de robo, fascinada por tu conversación. "Eres... interesante. Toma, te regalo estas monedas que le robé a otro viajero. Él no las merecía tanto como tú." (+12 Oro). Desaparece en el humo con un guiño.';
          }
          return 'Sombra escucha tu discurso, bosteza, y mientras estabas distraído hablando, ya te robó 8 monedas. "Bonito intento. Trabaja en tu poker face." Desaparece entre las sombras riendo.';
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
            return 'Sombra evalúa tu postura de combate y silba impresionada. "Mmm, no merece la pena el riesgo. Respeto a quien sabe defenderse." Lanza 5 monedas al aire como propina y se esfuma entre las sombras.';
          }
          return 'Adoptas una pose de kung fu que claramente aprendiste de una película. Sombra se ríe tanto que casi se cae del muro. Te roba 5 monedas "por el show". Ouch.';
        }
      },
      {
        text: '💰 Soltar las monedas y salir corriendo',
        action: (update: any) => update('haggleDiscount', -5),
        sfx: 'buzz',
        getResult: () => 'Dejas caer 5 monedas y escapas a toda velocidad. Sombra recoge el oro y grita: "¡Vuelve pronto, fue un placer hacer negocios!" Al menos estás vivo.'
      }
    ]
  },

  fortune_teller: {
    name: 'Madame Lunara — Oráculo Errante',
    image: 'events/fortune_teller.png',
    emoji: '🔮',
    borderColor: '#c084fc',
    getText: (state: GameState) => {
      const name = getAvatarName(state.avatarId);
      return `Una carpa morada aparece de la nada en medio del camino. De su interior sale humo con olor a incienso y una voz susurra: "Entra, ${name}... Las estrellas me dijeron que vendrías. Tu futuro romántico pende de un hilo, y yo tengo las tijeras. ¿Quieres saber qué depara el destino para esta cita?"`;
    },
    options: [
      {
        text: '🔮 Pedir la lectura completa (-5 Oro)',
        action: (update: any) => update('haggleDiscount', -5),
        sfx: 'select',
        getResult: () => {
          const fortunes = [
            '"Veo... un momento incómodo con el mesero. Pedirán lo mismo y ambos dirán \'yo vi primero eso\'. Pero todo saldrá bien al final."',
            '"Las cartas dicen que habrá una risa tan fuerte que todo el restaurante los mirará. Esto es bueno. Muy bueno."',
            '"Cuidado con el tercer tema de conversación... será polémico. Pero si sobreviven eso, nada los detendrá."',
            '"Veo comida cayendo de un plato. No preguntes de quién. Solo lleva servilletas extra."'
          ];
          return `Madame Lunara cierra los ojos, sus manos brillan sobre la bola de cristal.\n\n${fortunes[Math.floor(Math.random() * fortunes.length)]}\n\nLa carpa se desvanece en humo morado. Solo queda el olor a incienso.`;
        }
      },
      {
        text: '🃏 Pedir solo una carta gratis',
        action: () => {},
        sfx: 'select',
        getResult: () => 'Madame Lunara voltea una carta del tarot: El Loco. "Interesante... significa nuevos comienzos, aventura sin miedo. Tu cita será exactamente eso." Sonríe enigmáticamente y cierra la cortina de la carpa.'
      },
      {
        text: '🚶 Pasar de largo',
        action: () => {},
        sfx: 'click',
        getResult: () => '"¡Ignorar al destino tiene consecuencias!" grita Lunara desde la carpa. Pero luego añade en voz baja: "...que generalmente son ninguna. Buen viaje." La carpa se desvanece como si nunca hubiera estado ahí.'
      }
    ]
  },

  knight: {
    name: 'Sir Gastón — Caballero Sin Rumbo',
    image: 'events/knight.png',
    emoji: '🛡️',
    borderColor: '#60a5fa',
    getText: (state: GameState) => {
      const name = getAvatarName(state.avatarId);
      return `Un caballero con armadura reluciente pero un casco puesto al revés tropieza frente a ti. Se levanta con dificultad, se quita el casco revelando un bigote magnífico, y te mira con ojos esperanzados. "¡${name}! Gracias al cielo. Llevo 3 horas dando vueltas. ¿Dónde diablos queda el castillo del Rey? Mi GPS (Gran Pergamino Señalizador) se mojó con la lluvia."`;
    },
    options: [
      {
        text: '🗺️ Ayudarle a leer el mapa',
        action: (update: any) => update('haggleDiscount', 20),
        sfx: 'select',
        getResult: () => 'Le das vuelta al mapa (lo tenía al revés todo el rato). Sir Gastón se sonroja debajo del bigote. "Ah... eso explica mucho." Te da 20 monedas de oro y un sermón sobre el honor y la caballerosidad que no pediste pero que en el fondo disfrutas. "¡Que el viento guíe tu cita, noble aventurero!"'
      },
      {
        text: '🧭 Darle indicaciones inventadas',
        action: (update: any) => update('haggleDiscount', 5),
        sfx: 'select',
        getResult: () => 'Le señalas una dirección random con absoluta confianza. Sir Gastón te da 5 monedas por la ayuda y marcha decidido... hacia la panadería del barrio. En algún lugar, un panadero está a punto de tener un día muy confuso.'
      },
      {
        text: '😅 Confesar que tú también estás perdido',
        action: () => {},
        sfx: 'click',
        getResult: () => 'Sir Gastón te abraza con la fuerza de alguien que lleva armadura de 30 kilos. "¡Al fin alguien honesto! La mayoría me manda para cualquier lado." Se van juntos un rato hasta que él reconoce un arbusto ("¡este lo he visto 7 veces!") y se despide con un saludo militar.'
      }
    ]
  }
};

// Pool de eventos por punto de interrupción
const eventPools: Record<string, string[]> = {
  after_inventory: ['knight', 'merchant'],
  after_transport: ['merchant', 'fortune_teller'],
  after_destinations: ['slime', 'thief'],
  after_fuel: ['fortune_teller', 'knight']
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
