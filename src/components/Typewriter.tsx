import { useState, useEffect, useRef } from 'react';
import { playTone } from '../utils/audio';

interface Props {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const Typewriter = ({ text, speed = 30, onComplete }: Props) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    completedRef.current = false;
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        
        // Play sound on every few characters to avoid audio clipping
        if (currentIndex % 3 === 0 && text[currentIndex] !== ' ') {
          playTone(600 + Math.random() * 100, 'sine', 0.02);
        }
        
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else {
      if (onCompleteRef.current && !completedRef.current) {
        completedRef.current = true;
        onCompleteRef.current();
      }
    }
  }, [currentIndex, text, speed]);

  return <span>{displayedText}</span>;
};

export default Typewriter;
