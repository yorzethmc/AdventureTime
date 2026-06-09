import { useEffect, useState } from 'react';

interface Props {
  message: string;
  emoji?: string;
  show: boolean;
  onHide: () => void;
  duration?: number;
}

const Toast = ({ message, emoji, show, onHide, duration = 2500 }: Props) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onHide]);

  if (!show) return null;

  return (
    <div 
      className="fade-in text-pixel" 
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.85)',
        border: '2px solid var(--primary)',
        color: '#e2e8f0',
        padding: '10px 20px',
        borderRadius: '8px',
        zIndex: 9999,
        fontSize: '0.7rem',
        boxShadow: '0 0 15px rgba(255, 102, 196, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        pointerEvents: 'none'
      }}
    >
      {emoji && <span style={{ fontSize: '1.2rem' }}>{emoji}</span>}
      <span>{message}</span>
    </div>
  );
};

export default Toast;
