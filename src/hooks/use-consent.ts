'use client';

import { useCallback, useEffect, useState } from 'react';
import { shouldLog } from '@/lib/config';

export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

export type ConsentStatus = 'pending' | 'accepted' | 'rejected' | 'partial';

const CONSENT_STORAGE_KEY = 'cookie-consent-preferences';
const CONSENT_DATE_KEY = 'cookie-consent-date';

export function useConsent() {
  const [mounted, setMounted] = useState(false);
  const [consentGiven, setConsentGiven] = useState<ConsentState>({
    analytics: false,
    marketing: false,
    functional: true, // Toujours autorisé (cookies techniques)
  });
  
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('pending');
  const [showBanner, setShowBanner] = useState(false);

  // Montage côté client
  useEffect(() => {
    if (shouldLog()) {
      console.log('useConsent: mounting, setting mounted to true');
    }
    setMounted(true);
  }, []);

  // Charger les préférences au montage
  useEffect(() => {
    if (shouldLog()) {
      console.log('useConsent: load preferences effect, mounted =', mounted);
    }
    if (!mounted || typeof window === 'undefined') return;

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
          
          // Google Analytics est maintenant géré par ConditionalGoogleAnalytics
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
  }, [mounted]);

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
  }, [savePreferences]);

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
    } else {
      setConsentStatus('rejected');
    }
    
    setShowBanner(false);
    savePreferences(preferences);
  }, [savePreferences]);

  // Réouvrir les préférences
  const openPreferences = useCallback(() => {
    if (shouldLog()) {
      console.log('useConsent: openPreferences called, setting showBanner to true');
    }
    setShowBanner(true);
    // Force update en modifiant aussi le consentStatus temporairement
    setConsentStatus(prev => prev === 'pending' ? 'pending' : prev);
  }, []);

  return {
    mounted,
    consentGiven,
    consentStatus,
    showBanner,
    acceptAll,
    rejectAll,
    saveCustomPreferences,
    openPreferences,
  };
}

