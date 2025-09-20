'use client';

import { useCallback, useEffect, useState } from 'react';
import { config, shouldLog } from '@/lib/config';

export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

export type ConsentStatus = 'pending' | 'accepted' | 'rejected' | 'partial';

const CONSENT_STORAGE_KEY = 'cookie-consent-preferences';
const CONSENT_DATE_KEY = 'cookie-consent-date';

export function useConsent() {
  const [consentGiven, setConsentGiven] = useState<ConsentState>({
    analytics: false,
    marketing: false,
    functional: true, // Toujours autorisé (cookies techniques)
  });
  
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('pending');
  const [showBanner, setShowBanner] = useState(false);

  // Charger Google Analytics
  const loadGoogleAnalytics = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const GA_ID = config.analytics.gaId;
    
    if (!GA_ID) {
      if (shouldLog()) {
        console.warn('NEXT_PUBLIC_GA_ID non défini - Google Analytics non chargé');
      }
      return;
    }
    
    // Éviter de charger plusieurs fois
    if (document.querySelector(`script[src*="${GA_ID}"]`)) {
      return;
    }

    // Charger le script gtag
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    // Initialiser gtag
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      }
      
      window.gtag = gtag;
      
      gtag('js', new Date());
      gtag('config', GA_ID, {
        anonymize_ip: true, // Anonymisation IP pour RGPD
        allow_ad_personalization_signals: false,
        allow_google_signals: false
      });
      
      if (shouldLog()) {
        console.log('Google Analytics chargé avec consentement');
      }
    };
  }, []);

  // Charger les préférences au montage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      const savedDate = localStorage.getItem(CONSENT_DATE_KEY);
      
      if (saved && savedDate) {
        const preferences = JSON.parse(saved) as ConsentState;
        const consentDate = new Date(savedDate);
        const now = new Date();
        const daysDiff = (now.getTime() - consentDate.getTime()) / (1000 * 3600 * 24);
        
        // Redemander le consentement après 365 jours
        if (daysDiff < 365) {
          setConsentGiven(preferences);
          
          if (preferences.analytics || preferences.marketing) {
            setConsentStatus('accepted');
          } else if (preferences.analytics === false && preferences.marketing === false) {
            setConsentStatus('rejected');
          } else {
            setConsentStatus('partial');
          }
          
          // Charger Google Analytics si autorisé
          if (preferences.analytics) {
            loadGoogleAnalytics();
          }
        } else {
          // Consentement expiré, redemander
          setShowBanner(true);
        }
      } else {
        // Première visite, afficher la bannière
        setShowBanner(true);
      }
    } catch (error) {
      if (shouldLog()) {
        console.error('Erreur lors du chargement des préférences de consentement:', error);
      }
      setShowBanner(true);
    }
  }, [loadGoogleAnalytics]);

  // Sauvegarder les préférences
  const savePreferences = useCallback((preferences: ConsentState) => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
      localStorage.setItem(CONSENT_DATE_KEY, new Date().toISOString());
    } catch (error) {
      if (shouldLog()) {
        console.error('Erreur lors de la sauvegarde des préférences:', error);
      }
    }
  }, []);


  // Accepter tous les cookies
  const acceptAll = useCallback(() => {
    const newPreferences: ConsentState = {
      analytics: true,
      marketing: true,
      functional: true,
    };
    
    setConsentGiven(newPreferences);
    setConsentStatus('accepted');
    setShowBanner(false);
    savePreferences(newPreferences);
    loadGoogleAnalytics();
  }, [savePreferences, loadGoogleAnalytics]);

  // Rejeter les cookies non essentiels
  const rejectAll = useCallback(() => {
    const newPreferences: ConsentState = {
      analytics: false,
      marketing: false,
      functional: true,
    };
    
    setConsentGiven(newPreferences);
    setConsentStatus('rejected');
    setShowBanner(false);
    savePreferences(newPreferences);
  }, [savePreferences]);

  // Sauvegarder les préférences personnalisées
  const saveCustomPreferences = useCallback((preferences: ConsentState) => {
    setConsentGiven(preferences);
    
    if (preferences.analytics || preferences.marketing) {
      setConsentStatus('accepted');
      if (preferences.analytics) {
        loadGoogleAnalytics();
      }
    } else {
      setConsentStatus('rejected');
    }
    
    setShowBanner(false);
    savePreferences(preferences);
  }, [savePreferences, loadGoogleAnalytics]);

  // Réouvrir les préférences
  const openPreferences = useCallback(() => {
    setShowBanner(true);
  }, []);

  return {
    consentGiven,
    consentStatus,
    showBanner,
    acceptAll,
    rejectAll,
    saveCustomPreferences,
    openPreferences,
  };
}

// Types pour window.gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
