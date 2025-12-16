import type { Metadata } from "next";
import { PT_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "@/styles/accessibility.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieBanner, CookieStatus } from "@/components/CookieBanner";
import { GoogleAnalyticsConsent } from "@/components/GoogleAnalyticsConsent";
import { ConsentProvider } from "@/contexts/ConsentContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Link from "next/link";

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mattheo-termine.fr"),
  title: {
    default: "Matthéo Termine | Intégrateur Web Freelance spécialisé en Accessibilité RGAA",
    template: "%s | Matthéo Termine – Intégrateur Web Freelance",
  },
  description:
    "Matthéo Termine, intégrateur web freelance expert en création de sites modernes, accessibles (normes RGAA) et optimisés SEO. Services : sites vitrines, applications web, WordPress.",
  keywords: [
    "intégrateur web freelance",
    "développeur web France",
    "création site web accessible",
    "accessibilité RGAA",
    "optimisation SEO",
    "sites web performants",
    "Next.js React développeur",
    "WordPress sur mesure",
    "Matthéo Termine",
    "développement web responsif",
    "audit accessibilité",
    "conformité WCAG",
    "intégration web moderne",
    "freelance développeur",
    "sites web rapides",
  ],
  authors: [{ name: "Matthéo Termine", url: "https://mattheo-termine.fr" }],
  creator: "Matthéo Termine",
  publisher: "Matthéo Termine",
  category: "Développement Web",
  classification: "Portfolio professionnel - Services de développement web",
  applicationName: "Portfolio Matthéo Termine",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/icon",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Matthéo Termine | Intégrateur Web Freelance spécialisé en Accessibilité RGAA",
    description:
      "Expert en création de sites web modernes, accessibles (normes RGAA) et optimisés SEO. Services professionnels : sites vitrines, applications web, WordPress sur mesure.",
    url: "https://mattheo-termine.fr",
    siteName: "Portfolio Matthéo Termine - Intégrateur Web Freelance",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Matthéo Termine - Intégrateur Web Freelance spécialisé en accessibilité RGAA et optimisation SEO",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matthéo Termine | Intégrateur Web Freelance RGAA",
    description:
      "Expert en sites web accessibles et performants. Spécialiste Next.js, React, WordPress. Conformité RGAA et optimisation SEO garanties.",
    images: ["/og-image.svg"],
    creator: "@mattheo_termine",
    site: "@mattheo_termine",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mattheo-termine.fr",
    languages: {
      "fr-FR": "https://mattheo-termine.fr",
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
  other: {
    "msapplication-TileColor": "#a259ff",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
  },
};

export const viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn(ptSans.variable, spaceGrotesk.variable, "scroll-smooth dark")}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        />
        <meta name="theme-color" content="#a259ff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#a259ff" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="dark light" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-TileColor" content="#a259ff" />

        {/* Explicit icon links for better browser compatibility (especially Firefox) */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Production optimizations */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
        />
        <meta
          name="bingbot"
          content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
        />

        {/* Performance hints - Google Analytics uniquement si activé */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          </>
        )}

        {/* Security headers - X-Frame-Options removed as it should only be set via HTTP headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <link rel="canonical" href="https://mattheo-termine.fr" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <LanguageProvider>
          <ConsentProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={true}
              disableTransitionOnChange
            >
              <Link href="#main-content" className="skip-link">
                Aller au contenu principal
              </Link>
              <Link href="#navigation" className="skip-link">
                Aller à la navigation
              </Link>
              <Header />
              <main
                id="main-content"
                className="flex-grow"
                role="main"
                aria-label="Contenu principal"
              >
                <ErrorBoundary>{children}</ErrorBoundary>
              </main>
              <Footer />
              <CookieBanner />
              <CookieStatus />
              <GoogleAnalyticsConsent />
              <Toaster />
            </ThemeProvider>
          </ConsentProvider>
        </LanguageProvider>
        {/* Google Analytics GA4 - Chargé de manière non-bloquante après le chargement de la page */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  // Charger GA de manière asynchrone après le chargement de la page
                  if (document.readyState === 'complete') {
                    loadGA();
                  } else {
                    window.addEventListener('load', loadGA);
                  }
                  
                  function loadGA() {
                    // Charger le script gtag de manière asynchrone
                    const script = document.createElement('script');
                    script.async = true;
                    script.src = 'https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}';
                    document.head.appendChild(script);
                    
                    // Initialiser dataLayer et gtag
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                      page_path: window.location.pathname,
                      send_page_view: true
                    });
                    window.gtag = gtag;
                  }
                })();
              `,
            }}
          />
        )}

        {/* Désactiver les React DevTools en production */}
        {process.env.NODE_ENV === "production" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (typeof window !== 'undefined' && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
                  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.isDisabled = true;
                  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.supportsFiber = false;
                  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
                  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot = function() {};
                  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberUnmount = function() {};
                }
              `,
            }}
          />
        )}

        {/* Service Worker - Unregister old versions and register new minimal version */}
        {process.env.NODE_ENV === "production" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    // First, unregister all existing service workers to clear corrupted cache
                    navigator.serviceWorker.getRegistrations().then(function(registrations) {
                      for(let registration of registrations) {
                        registration.unregister();
                      }
                    });
                    
                    // Clear all caches
                    if ('caches' in window) {
                      caches.keys().then(function(names) {
                        for (let name of names) {
                          caches.delete(name);
                        }
                      });
                    }
                    
                    // Register the new minimal service worker after a short delay
                    setTimeout(function() {
                      navigator.serviceWorker.register('/sw.js', { 
                        updateViaCache: 'none' // Éviter les problèmes de cache
                      }).then(function(registration) {
                        // Vérifier les mises à jour périodiquement
                        setInterval(function() {
                          registration.update().catch(function() {
                            // Ignorer les erreurs silencieusement
                          });
                        }, 60000); // Vérifier toutes les minutes
                      }).catch(function(error) {
                        // Log l'erreur pour le debugging mais ne pas bloquer
                        if (process.env.NODE_ENV === 'development') {
                          console.error('Service Worker registration failed:', error);
                        }
                      });
                    }, 1000);
                  });
                }
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
