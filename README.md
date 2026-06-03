# 🎮 Invite98 - Aventura Interactiva Retro

Invite98 es una experiencia web interactiva al estilo de los videojuegos RPG retro de los 90s, diseñada como una forma original y divertida de invitar a alguien a una cita. 

La aplicación cuenta con selección de avatares, misiones, diálogos interactivos, música de fondo (8-bit) y minijuegos, culminando en una batalla contra un "jefe final" (la indecisión) y un final victorioso donde se revelan los detalles de la cita.

## 🌟 Características

- **Estilo Retro Pixel Art**: Interfaz de usuario inspirada en consolas clásicas (ventanas con bordes pixelados, tipografía monospace, colores vibrantes).
- **Selección de Personaje**: El jugador puede elegir entre tres avatares distintos (Exploradora, Maga o Princesa).
- **Narrativa Interactiva**: Diálogos tipo RPG con el "Rey del Reino" que asigna la misión principal (la cita).
- **Sistema de Opciones**: 
  - Elección de Fecha y Hora.
  - Elección de Destino.
  - Elección del Medio de Transporte.
- **Música y Efectos de Sonido**: Integración de audio para enriquecer la experiencia inmersiva.
- **Batalla Final**: Un combate simulado por turnos al estilo Final Fantasy/Pokémon contra "La Indecisión".
- **Finales Múltiples**: Dependiendo de si la persona acepta la misión o se rinde, se muestra un Final Victorioso o un Final Triste.

## 🚀 Tecnologías Utilizadas

- **React 19**
- **TypeScript**
- **Vite**
- **CSS3** (Variables CSS, Animaciones y Diseño Responsivo)

## 💻 Instalación y Ejecución Local

Si deseas correr este proyecto en tu propia máquina:

1. Clona este repositorio o descarga el código fuente.
2. Abre una terminal en la carpeta del proyecto.
3. Instala las dependencias ejecutando:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
5. Abre tu navegador y visita la URL proporcionada (generalmente `http://localhost:5173/`).

## 🌐 Publicación (Deploy) en GitHub Pages

Este proyecto está configurado para publicarse de manera muy sencilla usando GitHub Pages:

1. Asegúrate de tener el código en un repositorio de GitHub llamado `Invite98`.
2. En tu terminal, ejecuta el siguiente comando:
   ```bash
   npm run deploy
   ```
3. Esto construirá la versión de producción de la aplicación y la subirá automáticamente a la rama `gh-pages` de tu repositorio.
4. Tu invitación estará en línea y accesible a través de tu enlace personalizado de GitHub.

## 📝 Personalización

Puedes modificar la historia, las opciones de los lugares, horas y diálogos editando el archivo `src/data/gameData.ts`. Toda la información de la cita está centralizada ahí para que sea fácil de actualizar.

---
*Desarrollado con ❤️ y mucha nostalgia por los juegos de 8-bits.*
