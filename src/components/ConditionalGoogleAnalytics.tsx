'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { useConsent } from '@/hooks/use-consent';
import { config } from '@/lib/config';

export function ConditionalGoogleAnalytics() {
  const { consentGiven } = useConsent();
  
  // Ne charge GA que si l'utilisateur a consenti aux cookies analytics
  // et si l'ID GA est configuré
  const shouldLoadGA = consentGiven.analytics && config.analytics.gaId;
  
  if (!shouldLoadGA) {
    return null;
  }
  
  return <GoogleAnalytics gaId={config.analytics.gaId!} />;
}