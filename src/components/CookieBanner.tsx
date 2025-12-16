'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Cookie, Settings, X, Shield, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { useConsent, ConsentState } from '@/contexts/ConsentContext';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export function CookieBanner() {
  const { 
    mounted,
    showBanner, 
    consentGiven, 
    acceptAll, 
    rejectAll, 
    saveCustomPreferences 
  } = useConsent();
  
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);
  const [customPreferences, setCustomPreferences] = useState<ConsentState>(consentGiven);

  // Réinitialiser les préférences personnalisées quand la bannière s'ouvre
  React.useEffect(() => {
    if (showBanner) {
      setCustomPreferences(consentGiven);
      setShowDetails(false); // Reset to simple view
    }
  }, [showBanner, consentGiven]);

  if (!mounted || !showBanner) {
    return null;
  }

  const handleCustomChange = (key: keyof ConsentState, checked: boolean) => {
    if (key === 'functional') return; // Toujours obligatoire
    
    setCustomPreferences(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleSaveCustom = () => {
    saveCustomPreferences(customPreferences);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[200]" suppressHydrationWarning>
      <div className="relative">
        <Card className="border-2 border-primary/20 shadow-2xl bg-background">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Cookie className="h-5 w-5 text-primary" />
                {t('cookies.title')}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={rejectAll}
                className="h-8 w-8 p-0"
                title={t('a11y.closeAndReject')}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {!showDetails ? (
              <>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('cookies.description')}
                </p>
                
                <div className="flex flex-col gap-2">
                  <Button onClick={acceptAll} className="w-full">
                    {t('cookies.acceptAll')}
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowDetails(true)}
                      className="flex-1"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {t('cookies.customize')}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      onClick={rejectAll}
                      className="flex-1"
                    >
                      {t('cookies.rejectAll')}
                    </Button>
                  </div>
                </div>
                
                {/* <p className="text-xs text-muted-foreground">
                  {t('cookies.learnMore')} {' '}
                  <Link 
                    href="/politique-confidentialite" 
                    className="text-primary hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = '/politique-confidentialite';
                    }}
                  >
                    {t('footer.privacy')}
                  </Link>
                </p> */}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{t('cookies.preferences')}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetails(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {/* Cookies fonctionnels */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={true}
                      disabled
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-sm">{t('cookies.essential')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t('cookies.essentialDesc')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Cookies analytiques */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={customPreferences.analytics}
                      onCheckedChange={(checked) => 
                        handleCustomChange('analytics', checked as boolean)
                      }
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-sm">{t('cookies.analytics')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t('cookies.analyticsDesc')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Cookies marketing (Inutilisé)
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={customPreferences.marketing}
                      onCheckedChange={(checked) => 
                        handleCustomChange('marketing', checked as boolean)
                      }
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-sm">Cookies marketing</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Personnalisation des publicités (non utilisés actuellement)
                      </p>
                    </div>
                  </div>
                  */}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button onClick={handleSaveCustom} className="flex-1">
                    {t('cookies.save')}
                  </Button>
                </div>
                
                {/* <p className="text-xs text-muted-foreground">
                  <Link 
                    href="/politique-confidentialite" 
                    className="text-primary hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = '/politique-confidentialite';
                    }}
                  >
                    {t('footer.privacy')}
                  </Link>
                  {' • '}
                  {t('cookies.savedFor')}
                </p> */}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Composant pour afficher le statut des cookies (optionnel)
export function CookieStatus() {
  const { mounted, consentStatus, openPreferences } = useConsent();
  const { t } = useTranslation();
  
  const handleOpenPreferences = () => {
    openPreferences();
  };
  
  if (!mounted || consentStatus === 'pending') return null;
  
  const statusText = consentStatus === 'accepted' 
    ? t('cookies.accepted')
    : consentStatus === 'rejected' 
    ? t('cookies.rejected')
    : t('cookies.partial');
  
  return (
    <div className="fixed bottom-4 right-4 z-[101]" suppressHydrationWarning>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleOpenPreferences}
        className={cn(
          "h-8 px-3 text-xs border transition-all duration-200 cursor-pointer",
          "hover:scale-105 hover:shadow-md",
          consentStatus === 'accepted' && "border-green-500/20 text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/20",
          consentStatus === 'rejected' && "border-red-500/20 text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20",
          consentStatus === 'partial' && "border-orange-500/20 text-orange-700 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-950/20"
        )}
        title={t('a11y.modifyCookies')}
      >
        <Cookie className="h-3 w-3 mr-1" />
        {t('cookies.status')} {statusText}
      </Button>
    </div>
  );
}
