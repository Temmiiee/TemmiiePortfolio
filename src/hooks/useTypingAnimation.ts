'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypingAnimationProps {
  text: string;
  speed?: number;
  startDelay?: number;
  cursorDuration?: number;
}

export function useTypingAnimation({
  text,
  speed = 80,
  startDelay = 0,
  cursorDuration = 1500
}: UseTypingAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  
  const hasStartedRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (hasStartedRef.current || !text) return;
    
    hasStartedRef.current = true;
    setIsStarted(true);
    setShowCursor(true);
    setDisplayText('');
    
    timeoutRef.current = setTimeout(() => {
      let currentIndex = 0;
      
      intervalRef.current = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsComplete(true);
          
          // Masquer le curseur après un délai
          timeoutRef.current = setTimeout(() => {
            setShowCursor(false);
          }, cursorDuration);
        }
      }, speed);
    }, startDelay);
  }, [text, speed, startDelay, cursorDuration]);

  // Nettoyage au démontage
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Mise à jour du texte si changement de langue après animation
  useEffect(() => {
    if (isComplete && text && displayText !== text) {
      setDisplayText(text);
    }
  }, [text, displayText, isComplete]);

  return {
    displayText,
    showCursor,
    isComplete,
    isStarted,
    startAnimation
  };
}