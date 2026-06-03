export const WHATSAPP_PHONE = '50688292124';

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
  },
  {
    id: 'gemini',
    name: 'Gemela Cósmica',
    emoji: '♊',
    code: 'Doble Naturaleza',
    desc: 'Curiosa, adaptable y con energía inagotable. Perfecta para planes cambiantes y charlas eternas.',
    image: `${base}avatars/gemini.png`
  },
  {
    id: 'warrior',
    name: 'Caballera del Caos',
    emoji: '⚔️',
    code: 'Modo Acción',
    desc: 'Guerrera imparable. Disfruta los planes intensos, la comida fuerte y no le teme a ninguna misión.',
    image: `${base}avatars/warrior.png`
  },
  {
    id: 'bard',
    name: 'Barda Lo-Fi',
    emoji: '🎧',
    code: 'Modo Chill',
    desc: 'Amante de la música, el café a medianoche y las vibras relajadas. Su especialidad es conversar por horas.',
    image: `${base}avatars/bard.png`
  },
  {
    id: 'druid',
    name: 'Elfa Botánica',
    emoji: '🍃',
    code: 'Conexión Natural',
    desc: 'Adora los parques, los atardeceres y respirar aire fresco. Si hay árboles cerca, ella es feliz.',
    image: `${base}avatars/druid.png`
  },
  {
    id: 'vampire',
    name: 'Vampiresa Nocturna',
    emoji: '🦇',
    code: 'Criatura de la Noche',
    desc: 'Despierta cuando el sol se oculta. Experta en misiones nocturnas, cenas oscuras y cine clásico.',
  }
];

export const transportOptions = [
  {
    id: 'moto',
    name: 'Motocicleta',
    emoji: '🏍️',
    code: 'Modo Viento',
    desc: 'Ruta con aire fresco, casco equipado y espíritu de aventura.',
    allowedMissionTags: ['aventura', 'naturaleza', 'atardecer', 'cafe', 'plan_corto'],
    cost: 15
  },
  {
    id: 'chancha',
    name: 'Chancha',
    emoji: '🚌',
    code: 'Modo Ruta Épica',
    desc: 'Transporte legendario del reino, ideal para aventura con historia.',
    allowedMissionTags: ['cafe', 'plan_corto', 'ciudad', 'comida'],
    cost: 5
  },
  {
    id: 'bus',
    name: 'Autobús',
    emoji: '🚍',
    code: 'Modo Relax',
    desc: 'Viaje tranquilo, conversación y paisaje desbloqueado.',
    allowedMissionTags: ['cafe', 'comida', 'cine', 'plan_corto'],
    cost: 5
  },
  {
    id: 'meet_place',
    name: 'Meet me on a place',
    emoji: '📍',
    code: 'Punto de Encuentro',
    desc: 'Cada quien llega al punto marcado en el mapa.',
    allowedMissionTags: ['all'],
    cost: 0
  },
  {
    id: 'she_suggests',
    name: 'Vos sugerís',
    emoji: '✨',
    code: 'Ruta Personalizada',
    desc: 'La protagonista desbloquea una opción secreta.',
    allowedMissionTags: ['all'],
    cost: 0
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
    warnings: ['Llevar abrigo.', 'Mejor con buen clima.', 'Plan recomendado de día.'],
    cost: 30
  },
  {
    id: 'fraijanes',
    dest: 'Laguna de Fraijanes',
    emoji: '🌲',
    code: 'Ruta del Bosque',
    desc: 'Naturaleza, aire fresco y pausa bonita entre árboles.',
    tags: ['aventura', 'naturaleza', 'plan_largo'],
    periods: ['morning', 'early_afternoon'] as const,
    warnings: ['Puede hacer frío.', 'Llevar abrigo.'],
    cost: 25
  },
  {
    id: 'poasito_secret',
    dest: 'Mirador secreto en Poasito',
    emoji: '🌄',
    code: 'Vista Oculta',
    desc: 'Un punto escondido para desbloquear conversación y paisaje.',
    tags: ['atardecer', 'naturaleza', 'plan_corto'],
    periods: ['early_afternoon', 'evening'] as const,
    warnings: ['Puede hacer frío.', 'Ideal con cielo despejado.'],
    cost: 10
  },
  {
    id: 'cartagos',
    dest: 'Mirador Los Cartagos',
    emoji: '⛰️',
    code: 'Vista Panorámica',
    desc: 'Un mirador con bonus de fotos, aire fresco y charla tranquila.',
    tags: ['atardecer', 'naturaleza', 'plan_corto'],
    periods: ['early_afternoon', 'evening'] as const,
    warnings: ['Llevar abrigo.', 'Mejor antes de que oscurezca demasiado.'],
    cost: 10
  },
  {
    id: 'cafe_pura_vida',
    dest: 'Cafetería Pura Vida',
    emoji: '☕',
    code: 'Checkpoint de Café',
    desc: 'Café, postre y conversación con modo relax activado.',
    tags: ['cafe', 'chill', 'plan_corto'],
    periods: ['morning', 'early_afternoon', 'evening', 'night'] as const,
    warnings: [],
    cost: 20
  },
  {
    id: 'random_cafe',
    dest: 'Cafetería random',
    emoji: '🍰',
    code: 'Ruta Sorpresa',
    desc: 'Una cafetería elegida por el destino.',
    tags: ['cafe', 'sorpresa', 'chill', 'plan_corto'],
    periods: ['morning', 'early_afternoon', 'evening', 'night'] as const,
    warnings: [],
    cost: 15
  },
  {
    id: 'street_burgers',
    dest: 'Hamburguesas callejeras',
    emoji: '🍔',
    code: 'Power Up Callejero',
    desc: 'Plan relajado con sabor fuerte y cero complicación.',
    tags: ['comida', 'cena', 'chill', 'plan_corto'],
    periods: ['evening', 'night'] as const,
    warnings: [],
    cost: 25
  },
  {
    id: 'tacos',
    dest: 'Tacos',
    emoji: '🌮',
    code: 'Combo Picante',
    desc: 'Una misión rápida, sabrosa y con bonus de risa.',
    tags: ['comida', 'cena', 'chill', 'plan_corto'],
    periods: ['evening', 'night'] as const,
    warnings: [],
    cost: 25
  },
  {
    id: 'anime_sushi',
    dest: 'Sushi en lugar estilo anime',
    emoji: '🍣',
    code: 'Combo Anime',
    desc: 'Sushi, estética bonita y vibra de episodio especial.',
    tags: ['comida', 'cena', 'anime', 'chill'],
    periods: ['early_afternoon', 'evening', 'night'] as const,
    warnings: [],
    cost: 40
  },
  {
    id: 'cine',
    dest: 'Cine',
    emoji: '🍿',
    code: 'Screening Room',
    desc: 'Misión en la oscuridad con bonus de palomitas.',
    tags: ['chill', 'cine', 'cena'],
    periods: ['early_afternoon', 'evening', 'night'] as const,
    warnings: [],
    cost: 30
  },
  {
    id: 'she_suggests_destination',
    dest: 'Otro / vos sugerís',
    emoji: '✨',
    code: 'Ruta Secreta',
    desc: 'La protagonista propone una misión personalizada.',
    tags: ['sorpresa'],
    periods: ['morning', 'early_afternoon', 'evening', 'night'] as const,
    warnings: [],
    cost: 0
  },
  {
    id: 'secret_mage_tower',
    dest: 'Torre del Observatorio Estelar',
    emoji: '🔭',
    code: 'Misión Secreta',
    desc: 'Has desbloqueado este destino por ser la Maga Estelar. Un lugar para ver las estrellas y conjurar magia.',
    tags: ['easter_egg', 'atardecer', 'chill'],
    periods: ['evening', 'night'] as const,
    warnings: ['Llevar abrigo.', 'Solo para portadores de magia.'],
    cost: 0
  },
  {
    id: 'gemini_twin_cafe',
    dest: 'Café de los Espejos (Secreto)',
    emoji: '👯‍♀️',
    code: 'Dimensión Dual',
    desc: 'Un café oculto donde puedes hablar por horas, saltar de un tema a otro y disfrutar de postres de dos sabores.',
    tags: ['easter_egg', 'cafe', 'chill'],
    periods: ['morning', 'early_afternoon', 'evening', 'night'] as const,
    warnings: ['Cuidado con la sobreestimulación de cafeína.', 'Solo para Géminis.'],
    cost: 0
  }
];

export const fuelOptions = [
  {
    id: 'burger',
    name: 'Hamburguesas callejeras',
    emoji: '🍔',
    title: 'Power Up Callejero',
    desc: 'Combustible fuerte para continuar la aventura.',
    allowedDestTags: ['ciudad', 'chill', 'comida', 'sorpresa', 'all'],
    cost: 20
  },
  {
    id: 'tacos',
    name: 'Tacos',
    emoji: '🌮',
    title: 'Combo Picante',
    desc: 'Sabor desbloqueado y bonus de conversación.',
    allowedDestTags: ['ciudad', 'chill', 'comida', 'sorpresa', 'all'],
    cost: 20
  },
  {
    id: 'sushi',
    name: 'Sushi estilo anime',
    emoji: '🍣',
    title: 'Combo Anime',
    desc: 'Una opción con estética bonita y sabor de episodio especial.',
    allowedDestTags: ['anime', 'cena', 'ciudad', 'sorpresa', 'all'],
    cost: 35
  },
  {
    id: 'coffee_dessert',
    name: 'Postre y café',
    emoji: '🍰',
    title: 'Checkpoint Dulce',
    desc: 'Ideal para una misión tranquila y con chismecito.',
    allowedDestTags: ['cafe', 'chill', 'naturaleza', 'atardecer', 'sorpresa', 'all'],
    cost: 15
  },
  {
    id: 'drink',
    name: 'Solo algo de tomar',
    emoji: '🧋',
    title: 'Poción Ligera',
    desc: 'Una bebida, una charla y cero presión.',
    allowedDestTags: ['all'],
    cost: 10
  },
  {
    id: 'she_chooses',
    name: 'Vos escogés',
    emoji: '✨',
    title: 'Elección de la Protagonista',
    desc: 'La heroína desbloquea su propio combustible.',
    allowedDestTags: ['all'],
    cost: 0
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
export const filterMissions = (time: string, transportId: string | null, avatarId: string | null = null) => {
  if (!time) return missionOptions;

  const currentPeriod = getTimePeriod(time);
  const currentIdx = periodOrder.indexOf(currentPeriod);

  const transport = transportOptions.find(t => t.id === transportId);

  return missionOptions.filter(mission => {
    // 0. Easter Egg Check
    if (mission.tags.includes('easter_egg')) {
      if (mission.id === 'secret_mage_tower' && avatarId === 'mage' && (currentPeriod === 'evening' || currentPeriod === 'night')) {
        return true;
      }
      if (mission.id === 'gemini_twin_cafe' && avatarId === 'gemini') {
        return true;
      }
      return false; // Hide other easter eggs if they don't match conditions
    }

    // 1. Time filtering
    let timeValid = false;
    if (mission.tags.includes('sorpresa')) {
      timeValid = true;
    } else {
      timeValid = mission.periods.some(p => {
        const pIdx = periodOrder.indexOf(p);
        return pIdx >= currentIdx;
      });
    }
    
    // 2. Transport filtering
    let transportValid = true;
    if (transport && !transport.allowedMissionTags.includes('all')) {
      transportValid = mission.tags.some(tag => transport.allowedMissionTags.includes(tag));
    }

    return timeValid && transportValid;
  });
};

export const filterFuel = (destId: string | null) => {
  if (!destId) return fuelOptions;
  const dest = missionOptions.find(d => d.id === destId);
  if (!dest) return fuelOptions;

  return fuelOptions.filter(fuel => {
    if (fuel.allowedDestTags.includes('all')) return true;
    return dest.tags.some(tag => fuel.allowedDestTags.includes(tag));
  });
};

export const MAX_GOLD = 100;

export const calculateRemainingGold = (transportId: string | null, destId: string | null, fuelId: string | null) => {
  let gold = MAX_GOLD;
  
  if (transportId) {
    const t = transportOptions.find(o => o.id === transportId);
    if (t) gold -= t.cost;
  }
  
  if (destId) {
    const d = missionOptions.find(o => o.id === destId);
    if (d) gold -= d.cost;
  }
  
  if (fuelId) {
    const f = fuelOptions.find(o => o.id === fuelId);
    if (f) gold -= f.cost;
  }
  
  return gold;
};
