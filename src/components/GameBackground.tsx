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

interface Props {
  currentStep?: number;
}

const GameBackground = ({ currentStep = 0 }: Props) => {
  const getBgImage = () => {
    const base = import.meta.env.BASE_URL;
    switch (currentStep) {
      case 0: return `${base}backgrounds/bg_splash.png`;
      case 1: return `${base}backgrounds/bg_avatar.png`;
      case 2: return `${base}backgrounds/bg_mission.png`;
      case 3: return `${base}backgrounds/bg_mission.png`; // sad ending
      case 4: return `${base}backgrounds/bg_transport.png`; // inventory
      case 5: return `${base}backgrounds/bg_time.png`; // weather
      case 6: return `${base}backgrounds/bg_avatar.png`; // dress code
      case 7: return `${base}backgrounds/bg_transport.png`; // transport
      case 8: return `${base}backgrounds/bg_time.png`; // datetime
      case 9: return `${base}backgrounds/bg_mission.png`; // destinations
      case 10: return `${base}backgrounds/bg_mission.png`; // side quests
      case 11: return `${base}backgrounds/bg_fuel.png`; // fuel
      case 12: return `${base}backgrounds/bg_fuel.png`; // boss battle
      case 13: return `${base}backgrounds/bg_summary.png`; // victory
      default: return `${base}backgrounds/bg_splash.png`;
    }
  };

  const bgImage = getBgImage();
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
    <div className="game-bg" style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'background-image 0.8s ease-in-out'
    }}>
      <div className="gridbg" style={{ opacity: 0.25 }}></div>

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
