// Configuration centralisée pour les animations
export const ANIMATION_CONFIG = {
  // Durées d'animation (en ms)
  durations: {
    fast: 300,
    normal: 500,
    slow: 800,
    hero: 1000,
  },
  
  // Délais d'animation (en ms)
  delays: {
    none: 0,
    short: 100,
    medium: 200,
    long: 400,
  },
  
  // Décalages pour les animations séquentielles (en ms)
  stagger: {
    fast: 100,
    normal: 150,
    slow: 200,
  },
  
  // Courbes d'animation
  easings: {
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    ease: 'ease-out',
  },
  
  // Seuils d'intersection observer
  thresholds: {
    low: 0.1,
    medium: 0.3,
    high: 0.5,
  },
  
  // Marges pour intersection observer
  rootMargins: {
    small: '-30px 0px -50px 0px',
    medium: '-50px 0px -100px 0px',
    large: '-100px 0px -200px 0px',
  },
} as const;

// Fonction utilitaire pour vérifier les préférences de mouvement réduit
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Fonction utilitaire pour obtenir la durée d'animation appropriée
export const getAnimationDuration = (type: keyof typeof ANIMATION_CONFIG.durations) => {
  return prefersReducedMotion() ? 0 : ANIMATION_CONFIG.durations[type];
};

// Fonction utilitaire pour obtenir le délai d'animation approprié
export const getAnimationDelay = (type: keyof typeof ANIMATION_CONFIG.delays) => {
  return prefersReducedMotion() ? 0 : ANIMATION_CONFIG.delays[type];
};
