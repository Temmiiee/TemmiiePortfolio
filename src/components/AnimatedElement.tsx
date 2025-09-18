"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { ANIMATION_CONFIG } from '@/lib/animation-config';

interface AnimatedElementProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  duration = ANIMATION_CONFIG.durations.normal,
  threshold = ANIMATION_CONFIG.thresholds.medium,
  rootMargin = ANIMATION_CONFIG.rootMargins.medium,
  triggerOnce = true,
  as = 'div',
  ...props
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all ease-out';
    
    if (isIntersecting) {
      return cn(baseClasses, 'opacity-100 translate-x-0 translate-y-0 scale-100');
    }

    switch (animation) {
      case 'fade-up':
        return cn(baseClasses, 'opacity-0 translate-y-6');
      case 'fade-down':
        return cn(baseClasses, 'opacity-0 -translate-y-6');
      case 'fade-left':
        return cn(baseClasses, 'opacity-0 translate-x-6');
      case 'fade-right':
        return cn(baseClasses, 'opacity-0 -translate-x-6');
      case 'scale':
        return cn(baseClasses, 'opacity-0 scale-95');
      case 'none':
        return cn(baseClasses, 'opacity-100');
      default:
        return cn(baseClasses, 'opacity-0 translate-y-6');
    }
  };

  const elementProps = {
    ref,
    className: cn(getAnimationClasses(), className),
    style: {
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
    },
    ...props,
  };

  return React.createElement(as, elementProps, children);
};