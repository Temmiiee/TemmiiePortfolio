'use client';

import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { shouldLog } from '@/lib/config';

export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

export type ConsentStatus = 'pending' | 'accepted' | 'rejected' | 'partial';

const CONSENT_STORAGE_KEY = 'cookie-consent-preferences';
const CONSENT_DATE_KEY = 'cookie-consent-date';

interface ConsentContextType {
  mounted: boolean;
  consentGiven: ConsentState;
  consentStatus: ConsentStatus;
  showBanner: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  saveCustomPreferences: (preferences: ConsentState) => void;
  openPreferences: () => void;
}

const ConsentContext = createContext<ConsentContextType | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [consentGiven, setConsentGiven] = useState<ConsentState>({
    analytics: false,
    marketing: false,
    functional: true,
  });
  
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('pending');
  const [showBanner, setShowBanner] = useState(false);

  // Montage côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Charger les préférences au montage
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    try {
      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      const savedDate = localStorage.getItem(CONSENT_DATE_KEY);
      
      if (saved && savedDate) {
        const preferences = JSON.parse(saved) as ConsentState;
        const consentDate = new Date(savedDate);
        const now = new Date();
        const daysDiff = (now.getTime() - consentDate.getTime()) / (1000 * 3600 * 24);
        
        if (daysDiff < 365) {
          setConsentGiven(preferences);
          
          if (preferences.analytics || preferences.marketing) {
            setConsentStatus('accepted');
          } else if (preferences.analytics === false && preferences.marketing === false) {
            setConsentStatus('rejected');
          } else {
            setConsentStatus('partial');
          }
        } else {
          setShowBanner(true);
        }
      } else {
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
    setShowBanner(true);
  }, []);

  const value: ConsentContextType = {
    mounted,
    consentGiven,
    consentStatus,
    showBanner,
    acceptAll,
    rejectAll,
    saveCustomPreferences,
    openPreferences,
  };

  return (
    <ConsentContext.Provider value={value}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
}
