"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { useIntersectionObserver } from './use-intersection-observer';

interface UseSequentialAnimationProps {
  itemCount: number;
  delay?: number;
  stagger?: number;
  threshold?: number;
  rootMargin?: string;
}

export function useSequentialAnimation({
  itemCount,
  delay = 0,
  stagger = 150,
  threshold = 0.2,
  rootMargin = '-30px 0px -100px 0px'
}: UseSequentialAnimationProps) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));
  const [hasTriggered, setHasTriggered] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  
  const { ref, isIntersecting } = useIntersectionObserver({ 
    threshold, 
    rootMargin, 
    triggerOnce: true 
  });

  const triggerAnimation = useCallback(() => {
    if (hasTriggered) return;
    
    setHasTriggered(true);
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show all items immediately if user prefers reduced motion
      setVisibleItems(new Array(itemCount).fill(true));
      return;
    }

    // Clear any existing timeouts
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];
    
    // Trigger animations sequentially
    for (let i = 0; i < itemCount; i++) {
      const timeout = setTimeout(() => {
        setVisibleItems(prev => {
          const newState = [...prev];
          newState[i] = true;
          return newState;
        });
      }, delay + (i * stagger));
      timeoutsRef.current.push(timeout);
    }
  }, [itemCount, delay, stagger, hasTriggered]);

  useEffect(() => {
    if (isIntersecting) {
      triggerAnimation();
    }
    
    return () => {
      // Cleanup timeouts on unmount
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, [isIntersecting, triggerAnimation]);

  return { ref, visibleItems, isIntersecting };
}
