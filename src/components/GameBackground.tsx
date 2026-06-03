import { useMemo } from 'react';

// Floating game objects: stars, coins, hearts, clouds, sparkles
const gameObjects = ['⭐', '🪙', '💖', '✨', '🌙', '🍄', '🔮', '💫', '🌟'];
const cloudEmojis = ['☁️', '⛅'];

interface FloatingObj {
  id: number;
  emoji: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
  animation: string;
}

const GameBackground = () => {
  const objects = useMemo<FloatingObj[]>(() => {
    const items: FloatingObj[] = [];

    // 18 floating game objects drifting upward
    for (let i = 0; i < 18; i++) {
      items.push({
        id: i,
        emoji: gameObjects[i % gameObjects.length],
        left: `${Math.random() * 100}%`,
        size: `${0.8 + Math.random() * 1.2}rem`,
        delay: `${Math.random() * 20}s`,
        duration: `${15 + Math.random() * 25}s`,
        animation: i % 3 === 0 ? 'driftDiag' : 'driftUp',
      });
    }

    return items;
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${2 + Math.random() * 4}s`,
    }));
  }, []);

  const clouds = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      emoji: cloudEmojis[i % cloudEmojis.length],
      top: `${10 + Math.random() * 30}%`,
      delay: `${i * 15}s`,
      duration: `${40 + Math.random() * 30}s`,
    }));
  }, []);

  return (
    <div className="game-bg">
      <div className="orb a"></div>
      <div className="orb b"></div>
      <div className="gridbg"></div>

      {/* Twinkling pixel stars */}
      {stars.map(s => (
        <div
          key={`star-${s.id}`}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}

      {/* Floating game objects */}
      {objects.map(obj => (
        <div
          key={`obj-${obj.id}`}
          className="obj"
          style={{
            left: obj.left,
            fontSize: obj.size,
            animationName: obj.animation,
            animationDelay: obj.delay,
            animationDuration: obj.duration,
          }}
        >
          {obj.emoji}
        </div>
      ))}

      {/* Drifting pixel clouds */}
      {clouds.map(c => (
        <div
          key={`cloud-${c.id}`}
          className="cloud"
          style={{
            top: c.top,
            animationName: 'cloudDrift',
            animationDelay: c.delay,
            animationDuration: c.duration,
          }}
        >
          {c.emoji}
        </div>
      ))}
    </div>
  );
};

export default GameBackground;
