# 📦 RPG Date Quest – Game Data Reference

Este documento contiene toda la data que alimenta el juego.

---

## 🎭 Avatares

| ID | Nombre | Emoji | Código | Descripción |
|---|---|---|---|---|
| `mage` | Maga Estelar | 🪄 | Hechizo de Curiosidad | Ideal para quien desbloquea aventuras con una sonrisa. |
| `explorer` | Exploradora de Mapas | 🗺️ | Ruta Desconocida | Lista para descubrir lugares, historias y planes inesperados. |
| `princess_random` | Princesa Random | 👑 | Modo Sorpresa | Elegante, impredecible y con bonus de encanto. |

---

## 🚗 Transportes

| ID | Nombre | Emoji | Código | Descripción |
|---|---|---|---|---|
| `moto` | Motocicleta | 🏍️ | Modo Viento | Ruta con aire fresco, casco equipado y espíritu de aventura. |
| `chancha` | Chancha | 🚌 | Modo Ruta Épica | Transporte legendario del reino, ideal para aventura con historia. |
| `bus` | Autobús | 🚍 | Modo Relax | Viaje tranquilo, conversación y paisaje desbloqueado. |
| `meet_place` | Meet me on a place | 📍 | Punto de Encuentro | Cada quien llega al punto marcado en el mapa. |
| `she_suggests` | Vos sugerís | ✨ | Ruta Personalizada | La protagonista desbloquea una opción secreta. |

---

## 🗺️ Misiones / Destinos

| ID | Destino | Emoji | Código | Períodos | Tags |
|---|---|---|---|---|---|
| `poas` | Parque Nacional Volcán Poás | 🌋 | Cráter Legendario | morning, early_afternoon | aventura, naturaleza, plan_largo |
| `fraijanes` | Laguna de Fraijanes | 🌲 | Ruta del Bosque | morning, early_afternoon | aventura, naturaleza, plan_largo |
| `poasito_secret` | Mirador secreto en Poasito | 🌄 | Vista Oculta | early_afternoon, evening | atardecer, naturaleza, plan_corto |
| `cartagos` | Mirador Los Cartagos | ⛰️ | Vista Panorámica | early_afternoon, evening | atardecer, naturaleza, plan_corto |
| `cafe_pura_vida` | Cafetería Pura Vida | ☕ | Checkpoint de Café | all | cafe, chill, plan_corto |
| `random_cafe` | Cafetería random | 🍰 | Ruta Sorpresa | all | cafe, sorpresa, chill, plan_corto |
| `street_burgers` | Hamburguesas callejeras | 🍔 | Power Up Callejero | evening, night | comida, cena, chill, plan_corto |
| `tacos` | Tacos | 🌮 | Combo Picante | evening, night | comida, cena, chill, plan_corto |
| `anime_sushi` | Sushi en lugar estilo anime | 🍣 | Combo Anime | early_afternoon, evening, night | comida, cena, anime, chill |
| `cine` | Cine | 🍿 | Screening Room | early_afternoon, evening, night | chill, cine, cena |
| `she_suggests_destination` | Otro / vos sugerís | ✨ | Ruta Secreta | all | sorpresa |

### Lógica de filtrado por período

```
Hora < 12:00     → morning           → Todos los destinos
12:00 – 14:59    → early_afternoon   → Todos excepto solo-morning
15:00 – 19:59    → evening           → Solo planes con evening/night
20:00+           → night             → Solo planes con night
```

**Viernes** empieza a las 18:00 → período `evening` → NO se muestran volcanes ni lagunas.

---

## ⛽ Combustible / Comida

| ID | Nombre | Emoji | Título | Descripción |
|---|---|---|---|---|
| `burger` | Hamburguesas callejeras | 🍔 | Power Up Callejero | Combustible fuerte para continuar la aventura. |
| `tacos` | Tacos | 🌮 | Combo Picante | Sabor desbloqueado y bonus de conversación. |
| `sushi` | Sushi estilo anime | 🍣 | Combo Anime | Una opción con estética bonita y sabor de episodio especial. |
| `coffee_dessert` | Postre y café | 🍰 | Checkpoint Dulce | Ideal para una misión tranquila y con chismecito. |
| `drink` | Solo algo de tomar | 🧋 | Poción Ligera | Una bebida, una charla y cero presión. |
| `she_chooses` | Vos escogés | ✨ | Elección de la Protagonista | La heroína desbloquea su propio combustible. |

---

## 📅 Días y Horarios

| Día | Emoji | Hora mínima | Hora máxima |
|---|---|---|---|
| Viernes | 🌃 | 18:00 | 23:00 |
| Sábado | 🍕 | 13:00 | 23:59 |
| Domingo | ☀️ | 08:00 | 21:00 |

---

## 💬 Frases del Botón Evasivo (intentos 1-9)

1. Casi, pero el destino hizo dodge.
2. Ese botón tiene evasión nivel 99.
3. La misión insiste en ser aceptada.
4. Huir no desbloquea recompensas.
5. Intento registrado en el historial del reino.
6. El botón usó teletransporte.
7. La aventura todavía cree en vos.
8. No tan rápido, viajera.
9. Última oportunidad antes del modo drama.

### Mensaje intento 10

> Ok... si de verdad querés escapar, el portal se abrió.
> Pero la aventura se va a quedar con carita triste.

---

## 📱 Mensaje de WhatsApp

```
RPG DATE QUEST - MISION CONFIRMADA

Resumen de la aventura:

Avatar: {avatar}
Transporte: {transport}
Dia/Fecha: {date}
Hora: {time}
Destino: {mission}
Combustible: {fuel}

Estado: CITA DESBLOQUEADA
```
