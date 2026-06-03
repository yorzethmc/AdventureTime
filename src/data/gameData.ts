export const WHATSAPP_PHONE = '50688292124';

const base = import.meta.env.BASE_URL;

export const avatarOptions = [
  {
    id: 'mage',
    name: 'Maga Estelar',
    emoji: '🪄',
    code: 'Hechizo de Curiosidad',
    desc: 'Ideal para quien desbloquea aventuras con una sonrisa.',
    image: `${base}avatars/maga.png`,
    dialogues: {
      briefing: 'Siento una anomalía mágica muy interesante en el mapa. ¿Me acompañas a investigar este misterio?',
      inventory: 'Necesitaremos canalizadores arcanos. Escoge bien tu amuleto para esta expedición.',
      weather: 'Las fluctuaciones atmosféricas afectan el maná. Dime, ¿cómo están los elementos allá afuera?',
      transport: 'Un portal sería más rápido, pero elijamos un vehículo mundano para disfrutar el paisaje.',
      datetime: 'El flujo del tiempo es crucial para la hechicería. ¿En qué ciclo nos encontraremos?',
      destinations: 'He revelado puntos de alta energía en mi mapa estelar. Selecciona nuestro destino.',
      sideQuests: 'Percibo un eco mágico cercano... ¿Deberíamos investigar antes de seguir la ruta principal?',
      fuel: 'Mis reservas de maná están bajando. Requerimos consumir alguna poción revitalizante o postre.'
    }
  },
  {
    id: 'explorer',
    name: 'Exploradora de Mapas',
    emoji: '🗺️',
    code: 'Ruta Desconocida',
    desc: 'Lista para descubrir lugares, historias y planes inesperados.',
    image: `${base}avatars/exploradora.png`,
    dialogues: {
      briefing: '¡Encontré un nuevo territorio sin cartografiar! Prepara tu mochila porque vamos de expedición.',
      inventory: 'Todo buen explorador lleva su equipo de supervivencia. ¿Qué será esencial para hoy?',
      weather: 'Un buen aventurero no le teme al clima, pero siempre revisa el pronóstico. ¿Cómo está el cielo?',
      transport: 'Necesitamos movilidad. ¿En qué vehículo cruzaremos las fronteras de lo conocido?',
      datetime: 'Quien madruga atrapa a la presa, ¡pero la noche también es emocionante! ¿A qué hora salimos?',
      destinations: 'Tengo las coordenadas listas. Señala en el mapa hacia dónde nos dirigimos.',
      sideQuests: 'Vi algo curioso fuera de nuestra ruta marcada. ¿Hacemos un desvío de exploración?',
      fuel: '¡Tanta caminata da hambre! Busquemos la mejor ración local para recuperar energía.'
    }
  },
  {
    id: 'princess_random',
    name: 'Princesa Random',
    emoji: '👑',
    code: 'Modo Sorpresa',
    desc: 'Elegante, impredecible y con bonus de encanto.',
    image: `${base}avatars/princesa.png`,
    dialogues: {
      briefing: 'El aburrimiento del castillo es terrible. ¡Sácame de aquí y vivamos una aventura muy random!',
      inventory: 'Incluso la realeza necesita accesorios prácticos. ¿Qué llevaremos para no perder el estilo?',
      weather: 'Espero que el clima no arruine mis planes reales... Asómate por la ventana, plebeyo.',
      transport: 'Mi carruaje está en mantenimiento. ¿Qué transporte usarás para llevarme?',
      datetime: 'La puntualidad es virtud de reyes, pero llegar tarde es de divas. Dime la hora exacta.',
      destinations: 'Cualquier lugar del reino me parece bien, ¡sorpréndeme o elige tú el dominio a visitar!',
      sideQuests: '¡Uy, espera! Acabo de ver algo súper divertido por allá. ¿Hacemos una pausa rápida?',
      fuel: '¡Exijo un banquete! O al menos un antojo delicioso para mantener mi energía real.'
    }
  },
  {
    id: 'gemini',
    name: 'Gemela Cósmica',
    emoji: '♊',
    code: 'Doble Naturaleza',
    desc: 'Curiosa, adaptable y con energía inagotable. Perfecta para planes cambiantes y charlas eternas.',
    image: `${base}avatars/gemini.png`,
    dialogues: {
      briefing: 'A veces quiero un plan súper chill, a veces quiero salir corriendo. ¿Me sigues en esta locura?',
      inventory: 'Como no me decido, elige tú qué vamos a llevar. Todo me sirve, la verdad.',
      weather: 'El clima cambia tan rápido como yo de opinión. ¿Lloverá o habrá sol? ¡Todo me encanta!',
      transport: 'Cualquier opción es buena mientras vayamos conversando. ¿En qué nos vamos?',
      datetime: '¿De día para tomar café o de noche para algo intenso? Tú pon la hora, yo pongo la plática.',
      destinations: 'Tengo mil lugares en mente y no me decido por ninguno. ¡Te toca elegir a ti!',
      sideQuests: 'Literal me acabo de distraer con algo en el camino. ¿Podemos parar un ratito?',
      fuel: 'Quiero dulce... o tal vez salado. Bueno, ¡comamos algo rico para seguir la charla!'
    }
  },
  {
    id: 'warrior',
    name: 'Caballera del Caos',
    emoji: '⚔️',
    code: 'Modo Acción',
    desc: 'Guerrera imparable. Disfruta los planes intensos, la comida fuerte y no le teme a ninguna misión.',
    image: `${base}avatars/warrior.png`,
    dialogues: {
      briefing: 'Has sido convocado para una cruzada. Mi espada está afilada y mi espíritu arde. ¿Aceptas el reto?',
      inventory: 'Todo buen guerrero prepara su armadura antes de marchar. ¿Qué llevaremos al campo de batalla?',
      weather: 'Los cielos de batalla cambian rápido. Observa el horizonte y dinos a qué nos enfrentamos.',
      transport: 'Tu fiel montura te espera. ¿Cómo cruzaremos estas tierras salvajes hasta nuestro destino?',
      datetime: 'Un guerrero sabe cuándo atacar. Elige el momento táctico para iniciar la expedición.',
      destinations: 'Los exploradores han marcado estos territorios en el mapa. Elige nuestro próximo frente.',
      sideQuests: '¿Un pequeño desvío táctico para ganar ventaja antes del encuentro principal?',
      fuel: 'Un ejército marcha sobre su estómago. ¡Es hora de un banquete digno del Valhalla!'
    }
  },
  {
    id: 'bard',
    name: 'Barda Lo-Fi',
    emoji: '🎧',
    code: 'Modo Chill',
    desc: 'Amante de la música, el café a medianoche y las vibras relajadas. Su especialidad es conversar por horas.',
    image: `${base}avatars/bard.png`,
    dialogues: {
      briefing: 'Tengo una playlist perfecta y ganas de fluir. ¿Qué te parece si hacemos algo relajado hoy?',
      inventory: 'Solo necesitamos buena vibra y algo cómodo. ¿Qué objeto encaja con nuestro mood?',
      weather: 'Si llueve ponemos lofi, si hay sol ponemos algo chill. ¿Cómo se ve el cielo?',
      transport: 'El viaje es parte de la melodía. ¿Qué transporte nos dará el mejor ritmo?',
      datetime: 'No hay prisa. El tiempo fluye a nuestro favor. ¿A qué hora sintonizamos la aventura?',
      destinations: 'Busquemos un rincón tranquilo donde podamos escuchar buena música y hablar. ¿A dónde vamos?',
      sideQuests: 'Podemos hacer una paradita técnica para armar una mejor playlist en el camino...',
      fuel: 'Una buena bebida caliente y un antojo son el estribillo perfecto para esta tarde.'
    }
  },
  {
    id: 'vampire',
    name: 'Vampiresa Nocturna',
    emoji: '🦇',
    code: 'Criatura de la Noche',
    desc: 'Despierta cuando el sol se oculta. Experta en misiones nocturnas, cenas oscuras y cine clásico.',
    image: `${base}avatars/vampiresa.png`,
    dialogues: {
      briefing: 'He despertado de mi largo sueño solo para invitarte a mis dominios. ¿Me concederás esta eternidad?',
      inventory: 'Incluso los inmortales necesitamos llevar algún talismán. ¿Qué accesorio profano elegiremos?',
      weather: 'Espero que las nubes oculten el odioso sol... Observa el cielo por mí, mi querido mortal.',
      transport: 'Mis alas de murciélago están cansadas hoy. Elijamos un carruaje adecuado para criaturas como nosotros.',
      datetime: 'La luna nos llama, pero si insistes en desafiar al sol, que sea en el momento adecuado.',
      destinations: 'Estos lugares tienen un aura tentadora. ¿Dónde derramaremos nuestra presencia esta velada?',
      sideQuests: 'Un paseo por las sombras antes del evento principal suena exquisitamente tentador...',
      fuel: 'Siento una sed atroz... y no precisamente de sangre hoy. Es hora de un banquete digno de la nobleza.'
    }
  },
  {
    id: 'healer_glam',
    name: 'Sanadora Aesthetic',
    emoji: '🎀',
    code: 'Magia Rosa',
    desc: 'Impecable hasta en la mazmorra más sucia. Le encantan los planes bonitos, lugares fotogénicos y salvar el día con estilo.',
    image: `${base}avatars/fresita.png`,
    dialogues: {
      briefing: '¡Hola, hola! El reino nos necesita, pero eso no significa perder el glamour. ¿Lista para brillar juntos?',
      inventory: '¡No podemos salir así nada más! Elige el accesorio perfecto para complementar el outfit de la misión.',
      weather: 'Ojalá no llueva, arruinaría mi peinado... Asómate a la ventana, ¿qué tal pinta el día?',
      transport: 'Necesitamos llegar intactos y fabulosos. ¿Qué medio de transporte tiene más estilo?',
      datetime: 'La iluminación es clave para las fotos. ¿A qué hora nos veremos para aprovechar la golden hour?',
      destinations: '¡Encontré los lugares más cute y fotogénicos en mi mapa rosa! ¿A cuál vamos?',
      sideQuests: '¡Ay! Vi un lugarcito divino cerca. ¿Hacemos una parada rápida para turistear?',
      fuel: 'Tanta sanación me dejó sin energía. Vamos por un matcha o algo súper rico para recargar.'
    }
  },
  {
    id: 'necromancer_goth',
    name: 'Nigromante de las Sombras',
    emoji: '🖤',
    code: 'Conjuro Oscuro',
    desc: 'Sarcástica, misteriosa y viste de negro. Prefiere misiones de noche, cine de terror o planes con estética alternativa.',
    image: `${base}avatars/gotica.png`,
    dialogues: {
      briefing: 'He convocado espíritus antiguos y todos me dijeron que debía invocarte a ti hoy. ¿Aceptas el pacto?',
      inventory: 'Las reliquias malditas siempre son útiles. Escoge tu artefacto de perdición favorito.',
      weather: 'Mientras más gris y lúgubre, mejor para mi alma marchita. Dime, ¿el cielo llora hoy?',
      transport: 'No traje a mi corcel esquelético, así que tendremos que usar el transporte de los vivos.',
      datetime: 'La hora de las brujas es la ideal, pero supongo que me adaptaré a tus horarios mundanos.',
      destinations: 'El inframundo ofrece varios portales. ¿Hacia cuál pozo de desesperación (o diversión) nos dirigimos?',
      sideQuests: 'Las ánimas murmuran sobre un camino alterno muy peculiar. ¿Nos desviamos hacia las sombras?',
      fuel: 'Incluso los nigromantes necesitan nutrientes. Encontremos un festín para aplacar este vacío terrenal.'
    }
  },
  {
    id: 'hunter_athletic',
    name: 'Cazadora Acrobática',
    emoji: '🏹',
    code: 'Energía Inagotable',
    desc: 'Activa y lista para la acción. Perfecta para caminatas largas, aventuras al aire libre y misiones dinámicas.',
    image: `${base}avatars/deportista.png`,
    dialogues: {
      briefing: '¡La adrenalina me llama! Preparé una ruta llena de acción y necesito un compañero de aventuras. ¿Te animas?',
      inventory: 'Un buen explorador revisa su mochila dos veces. ¿Qué equipo nos dará ventaja táctica hoy?',
      weather: 'No hay mal clima, solo mala preparación. Aunque es bueno saber a qué nos enfrentaremos allá afuera.',
      transport: 'Mis piernas están listas para correr, pero si está muy lejos, mejor elegimos un transporte eficiente.',
      datetime: 'Quien madruga atrapa a la presa, ¡pero la noche también tiene lo suyo! ¿A qué hora iniciamos?',
      destinations: 'El bosque, la ciudad o la montaña; todo es nuestro terreno de caza. ¡Elige nuestro blanco!',
      sideQuests: '¡Ey! Si corremos un poco podemos cubrir más terreno. ¿Hacemos un desvío rápido?',
      fuel: '¡Quemar tantas calorías requiere proteínas! Busquemos la mejor ración de combate para recuperar estamina.'
    }
  }
];

export const transportOptions = [
  {
    id: 'moto',
    name: 'Motocicleta',
    emoji: '🏍️',
    code: 'Modo Viento',
    desc: 'Ruta con aire fresco, casco equipado y espíritu de aventura.',
    allowedMissionTags: ['aventura', 'naturaleza', 'atardecer', 'cafe', 'plan_corto', 'comida', 'cena', 'anime', 'cine'],
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

export const inventoryOptions = [
  { id: 'camera', name: 'Cámara Vintage', emoji: '📸', code: 'Aesthetic Mode', desc: 'Promete recuerdos memorables y fotos increíbles.' },
  { id: 'sunglasses', name: 'Lentes de Sol', emoji: '🕶️', code: 'Modo Diurno', desc: 'Solo planes bajo la luz del sol.' },
  { id: 'sweater', name: 'Suéter Gigante', emoji: '🧣', code: 'A prueba de frío', desc: 'Permite explorar montañas de noche.' },
  { id: 'umbrella', name: 'Paraguas Resistente', emoji: '☂️', code: 'Escudo Climático', desc: 'Inmunidad a las penalizaciones por lluvia.' },
  { id: 'snacks', name: 'Snacks de Emergencia', emoji: '🍫', code: 'Supervivencia', desc: 'Permite saltarse el restaurante si no hay oro.' }
];

export const weatherOptions = [
  { id: 'sunny', name: 'Despejado', emoji: '☀️', code: 'Cielo Claro', desc: 'Ideal para planes al aire libre y fotos.' },
  { id: 'rainy', name: 'Lluvioso', emoji: '🌧️', code: 'Días Grises', desc: 'Perfecto para estar bajo techo, con café y buena charla.' },
  { id: 'cloudy', name: 'Nublado', emoji: '☁️', code: 'Vibra Misteriosa', desc: 'Ideal para misiones alternativas o de terror.' }
];

export const sideQuestOptions = [
  { id: 'photo', name: 'Spot Fotográfico', emoji: '✨', code: '+10 Aesthetic', desc: 'Detenerse 5 min para una foto aesthetic antes de llegar.' },
  { id: 'playlist', name: 'Batalla de DJ', emoji: '🎵', code: '+15 Vibe', desc: 'Armar una playlist colaborativa en el camino.' },
  { id: 'scenic', name: 'Ruta Escénica', emoji: '🌅', code: '+10 Romance', desc: 'Tomar el camino largo solo por la vista.' },
  { id: 'none', name: 'Directo al grano', emoji: '⏭️', code: 'Speedrun', desc: 'Sin desvíos, la misión principal aguarda.' }
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
  },
  {
    id: 'use_snacks',
    name: 'Usar Snacks',
    emoji: '🍫',
    title: 'Ración de Supervivencia',
    desc: 'Consumir los snacks del inventario. No gasta oro.',
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
export const filterMissions = (time: string, transportId: string | null, avatarId: string | null = null, inventoryId: string | null = null, weatherId: string | null = null) => {
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
      // Inventory overrides time
      if (inventoryId === 'sunglasses' && (currentPeriod === 'evening' || currentPeriod === 'night')) return false;
      if (inventoryId === 'sweater' && mission.dest.includes('Poás')) timeValid = true; // Sweater allows Poas anytime
    }
    
    // 2. Transport filtering
    let transportValid = true;
    if (transport && !transport.allowedMissionTags.includes('all')) {
      transportValid = mission.tags.some(tag => transport.allowedMissionTags.includes(tag));
    }

    // 3. Inventory/Weather filtering
    if (weatherId === 'rainy' && mission.tags.includes('aventura') && inventoryId !== 'umbrella') return false;

    return timeValid && transportValid;
  });
};

export const filterFuel = (destId: string | null, inventoryId: string | null = null) => {
  if (!destId) return fuelOptions.filter(f => f.id !== 'use_snacks');
  const dest = missionOptions.find(d => d.id === destId);
  if (!dest) return fuelOptions.filter(f => f.id !== 'use_snacks');

  return fuelOptions.filter(fuel => {
    if (fuel.id === 'use_snacks') {
      return inventoryId === 'snacks';
    }
    if (fuel.allowedDestTags.includes('all')) return true;
    return dest.tags.some(tag => fuel.allowedDestTags.includes(tag));
  });
};

export const MAX_GOLD = 100;

export const calculateRemainingGold = (transportId: string | null, destId: string | null, fuelId: string | null, haggleDiscount: number = 0) => {
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
  
  gold += haggleDiscount;
  
  return gold;
};
