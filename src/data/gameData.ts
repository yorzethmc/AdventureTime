export const WHATSAPP_PHONE = 'CONFIGURAR_NUMERO_AQUI';

const base = import.meta.env.BASE_URL;

export const avatarOptions = [
  {
    id: 'mage',
    name: 'Maga Estelar',
    emoji: '🪄',
    code: 'Hechizo de Curiosidad',
    desc: 'Ideal para quien desbloquea aventuras con una sonrisa.',
    image: `${base}avatars/maga.png`
  },
  {
    id: 'explorer',
    name: 'Exploradora de Mapas',
    emoji: '🗺️',
    code: 'Ruta Desconocida',
    desc: 'Lista para descubrir lugares, historias y planes inesperados.',
    image: `${base}avatars/exploradora.png`
  },
  {
    id: 'princess_random',
    name: 'Princesa Random',
    emoji: '👑',
    code: 'Modo Sorpresa',
    desc: 'Elegante, impredecible y con bonus de encanto.',
    image: `${base}avatars/princesa.png`
  }
];

export const transportOptions = [
  {
    id: 'moto',
    name: 'Motocicleta',
    emoji: '🏍️',
    code: 'Modo Viento',
    desc: 'Ruta con aire fresco, casco equipado y espíritu de aventura.',
    allowedMissionTags: ['aventura', 'naturaleza', 'atardecer', 'cafe', 'plan_corto']
  },
  {
    id: 'chancha',
    name: 'Chancha',
    emoji: '🚌',
    code: 'Modo Ruta Épica',
    desc: 'Transporte legendario del reino, ideal para aventura con historia.',
    allowedMissionTags: ['cafe', 'plan_corto', 'ciudad', 'comida']
  },
  {
    id: 'bus',
    name: 'Autobús',
    emoji: '🚍',
    code: 'Modo Relax',
    desc: 'Viaje tranquilo, conversación y paisaje desbloqueado.',
    allowedMissionTags: ['cafe', 'comida', 'cine', 'plan_corto']
  },
  {
    id: 'meet_place',
    name: 'Meet me on a place',
    emoji: '📍',
    code: 'Punto de Encuentro',
    desc: 'Cada quien llega al punto marcado en el mapa.',
    allowedMissionTags: ['all']
  },
  {
    id: 'she_suggests',
    name: 'Vos sugerís',
    emoji: '✨',
    code: 'Ruta Personalizada',
    desc: 'La protagonista desbloquea una opción secreta.',
    allowedMissionTags: ['all']
  }
];

export const missionOptions = [
  {
    id: 'poas',
    dest: 'Parque Nacional Volcán Poás',
    emoji: '🌋',
    code: 'Cráter Legendario',
    desc: 'Una misión de altura, frío rico y paisaje épico.',
    tags: ['aventura', 'naturaleza', 'plan_largo'],
    periods: ['morning', 'early_afternoon'] as const,
    warnings: ['Llevar abrigo.', 'Mejor con buen clima.', 'Plan recomendado de día.']
  },
  {
    id: 'fraijanes',
    dest: 'Laguna de Fraijanes',
    emoji: '🌲',
    code: 'Ruta del Bosque',
    desc: 'Naturaleza, aire fresco y pausa bonita entre árboles.',
    tags: ['aventura', 'naturaleza', 'plan_largo'],
    periods: ['morning', 'early_afternoon'] as const,
    warnings: ['Puede hacer frío.', 'Llevar abrigo.']
  },
  {
    id: 'poasito_secret',
    dest: 'Mirador secreto en Poasito',
    emoji: '🌄',
    code: 'Vista Oculta',
    desc: 'Un punto escondido para desbloquear conversación y paisaje.',
    tags: ['atardecer', 'naturaleza', 'plan_corto'],
    periods: ['early_afternoon', 'evening'] as const,
    warnings: ['Puede hacer frío.', 'Ideal con cielo despejado.']
  },
  {
    id: 'cartagos',
    dest: 'Mirador Los Cartagos',
    emoji: '⛰️',
    code: 'Vista Panorámica',
    desc: 'Un mirador con bonus de fotos, aire fresco y charla tranquila.',
    tags: ['atardecer', 'naturaleza', 'plan_corto'],
    periods: ['early_afternoon', 'evening'] as const,
    warnings: ['Llevar abrigo.', 'Mejor antes de que oscurezca demasiado.']
  },
  {
    id: 'cafe_pura_vida',
    dest: 'Cafetería Pura Vida',
    emoji: '☕',
    code: 'Checkpoint de Café',
    desc: 'Café, postre y conversación con modo relax activado.',
    tags: ['cafe', 'chill', 'plan_corto'],
    periods: ['morning', 'early_afternoon', 'evening', 'night'] as const,
    warnings: []
  },
  {
    id: 'random_cafe',
    dest: 'Cafetería random',
    emoji: '🍰',
    code: 'Ruta Sorpresa',
    desc: 'Una cafetería elegida por el destino.',
    tags: ['cafe', 'sorpresa', 'chill', 'plan_corto'],
    periods: ['morning', 'early_afternoon', 'evening', 'night'] as const,
    warnings: []
  },
  {
    id: 'street_burgers',
    dest: 'Hamburguesas callejeras',
    emoji: '🍔',
    code: 'Power Up Callejero',
    desc: 'Plan relajado con sabor fuerte y cero complicación.',
    tags: ['comida', 'cena', 'chill', 'plan_corto'],
    periods: ['evening', 'night'] as const,
    warnings: []
  },
  {
    id: 'tacos',
    dest: 'Tacos',
    emoji: '🌮',
    code: 'Combo Picante',
    desc: 'Una misión rápida, sabrosa y con bonus de risa.',
    tags: ['comida', 'cena', 'chill', 'plan_corto'],
    periods: ['evening', 'night'] as const,
    warnings: []
  },
  {
    id: 'anime_sushi',
    dest: 'Sushi en lugar estilo anime',
    emoji: '🍣',
    code: 'Combo Anime',
    desc: 'Sushi, estética bonita y vibra de episodio especial.',
    tags: ['comida', 'cena', 'anime', 'chill'],
    periods: ['early_afternoon', 'evening', 'night'] as const,
    warnings: []
  },
  {
    id: 'cine',
    dest: 'Cine',
    emoji: '🍿',
    code: 'Screening Room',
    desc: 'Misión en la oscuridad con bonus de palomitas.',
    tags: ['chill', 'cine', 'cena'],
    periods: ['early_afternoon', 'evening', 'night'] as const,
    warnings: []
  },
  {
    id: 'she_suggests_destination',
    dest: 'Otro / vos sugerís',
    emoji: '✨',
    code: 'Ruta Secreta',
    desc: 'La protagonista propone una misión personalizada.',
    tags: ['sorpresa'],
    periods: ['morning', 'early_afternoon', 'evening', 'night'] as const,
    warnings: []
  }
];

export const fuelOptions = [
  {
    id: 'burger',
    name: 'Hamburguesas callejeras',
    emoji: '🍔',
    title: 'Power Up Callejero',
    desc: 'Combustible fuerte para continuar la aventura.'
  },
  {
    id: 'tacos',
    name: 'Tacos',
    emoji: '🌮',
    title: 'Combo Picante',
    desc: 'Sabor desbloqueado y bonus de conversación.'
  },
  {
    id: 'sushi',
    name: 'Sushi estilo anime',
    emoji: '🍣',
    title: 'Combo Anime',
    desc: 'Una opción con estética bonita y sabor de episodio especial.'
  },
  {
    id: 'coffee_dessert',
    name: 'Postre y café',
    emoji: '🍰',
    title: 'Checkpoint Dulce',
    desc: 'Ideal para una misión tranquila y con chismecito.'
  },
  {
    id: 'drink',
    name: 'Solo algo de tomar',
    emoji: '🧋',
    title: 'Poción Ligera',
    desc: 'Una bebida, una charla y cero presión.'
  },
  {
    id: 'she_chooses',
    name: 'Vos escogés',
    emoji: '✨',
    title: 'Elección de la Protagonista',
    desc: 'La heroína desbloquea su propio combustible.'
  }
];

export const dayOptions = [
  {
    id: 'viernes',
    name: 'Viernes',
    emoji: '🌃',
    minTime: '18:00',
    maxTime: '23:00'
  },
  {
    id: 'sabado',
    name: 'Sábado',
    emoji: '🍕',
    minTime: '13:00',
    maxTime: '23:59'
  },
  {
    id: 'domingo',
    name: 'Domingo',
    emoji: '☀️',
    minTime: '08:00',
    maxTime: '21:00'
  }
];

// Helper: time validation per day
export const isTimeValidForDay = (time: string, dayId: string) => {
  const day = dayOptions.find(d => d.id === dayId);
  if (!day) return false;
  return time >= day.minTime && time <= day.maxTime;
};

// Helper: convert HH:MM string to a time period
export const getTimePeriod = (time: string): string => {
  if (!time) return 'morning';
  const hour = parseInt(time.split(':')[0], 10);
  if (hour < 12) return 'morning';
  if (hour < 15) return 'early_afternoon';
  if (hour < 20) return 'evening';
  return 'night';
};

// Period ordering for "this period or later" matching
const periodOrder = ['morning', 'early_afternoon', 'evening', 'night'];

// Filter missions: only show missions whose periods include the current period
// This means at 18:00 (evening), volcanes (morning/early_afternoon only) are hidden
export const filterMissionsByTime = (time: string) => {
  if (!time) return missionOptions;

  const currentPeriod = getTimePeriod(time);
  const currentIdx = periodOrder.indexOf(currentPeriod);

  return missionOptions.filter(mission => {
    // "sorpresa" / wildcard missions always show
    if (mission.tags.includes('sorpresa')) return true;

    // Mission must have at least one period that matches current or later
    return mission.periods.some(p => {
      const pIdx = periodOrder.indexOf(p);
      return pIdx >= currentIdx;
    });
  });
};
