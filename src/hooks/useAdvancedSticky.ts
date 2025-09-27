import { useEffect, useState, useCallback } from 'react';

interface UseAdvancedStickyOptions {
  threshold?: number; // Seuil de déclenchement du mode sticky (en pixels)
  offset?: number; // Offset depuis le haut quand sticky
  parallaxFactor?: number; // Facteur de parallaxe pour le mouvement
  smoothness?: number; // Facteur de lissage pour les animations
}

export function useAdvancedSticky({
  threshold = 100,
  offset = 32, // equivalent à top-8 (8 * 0.25rem = 2rem = 32px)
  parallaxFactor = 0.05,
  smoothness = 0.1
}: UseAdvancedStickyOptions = {}) {
  const [scrollY, setScrollY] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [smoothScrollY, setSmoothScrollY] = useState(0);

  // Gestion du scroll avec throttling pour les performances
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);
    setIsSticky(currentScrollY > threshold);
  }, [threshold]);

  // Throttle function pour limiter les appels
  const throttledHandleScroll = useCallback(() => {
    let ticking = false;
    
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
  }, [handleScroll])();

  // Animation fluide du parallax
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      setSmoothScrollY(prev => {
        const diff = scrollY - prev;
        const newValue = prev + (diff * smoothness);
        
        // Si la différence est très petite, on arrête l'animation
        if (Math.abs(diff) < 0.1) {
          return scrollY;
        }
        
        animationId = requestAnimationFrame(animate);
        return newValue;
      });
    };

    if (isSticky) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [scrollY, isSticky, smoothness]);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    // Optimisation avec passive listeners et throttling
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Initialisation
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, throttledHandleScroll]);

  // Calcul de la position Y avec parallax
  const parallaxY = isSticky ? Math.min(smoothScrollY * parallaxFactor, 50) : 0;

  // Classes CSS dynamiques
  const stickyClasses = isSticky 
    ? `md:fixed md:z-50 md:transition-all md:duration-300 md:ease-out`
    : `md:sticky md:transition-all md:duration-300`;

  // Style inline pour la transformation
  const stickyStyle = {
    transform: isSticky ? `translateY(${parallaxY}px)` : 'none',
    top: isSticky ? `${offset}px` : undefined,
    right: isSticky ? '2rem' : undefined, // equivalent à right-8
    maxWidth: isSticky ? '320px' : undefined,
  };

  // Classes pour les effets visuels
  const visualClasses = isSticky
    ? 'shadow-2xl shadow-primary/20 ring-2 ring-primary/10 scale-105 backdrop-blur-sm'
    : 'shadow-lg';

  return {
    isSticky,
    scrollY,
    smoothScrollY,
    parallaxY,
    viewportHeight,
    stickyClasses,
    stickyStyle,
    visualClasses,
  };
}
