import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieBanner, CookieStatus } from "@/components/CookieBanner";
import { GoogleAnalyticsConsent } from "@/components/GoogleAnalyticsConsent";
import { CoreWebVitalsTracking } from "@/components/CoreWebVitalsTracking";
import { StructuredData } from "@/components/StructuredData";
import { ConsentProvider } from "@/contexts/ConsentContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
  preload: false,
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mattheo-termine.fr"),
  title: {
    default: "Matthéo Termine | Intégrateur Web Freelance Expert RGAA & Performance - Sites Accessibles & Optimisés SEO",
    template: "%s | Matthéo Termine – Intégrateur Web Freelance Expert RGAA & Performance",
  },
  description:
    "Intégrateur web freelance expert en sites accessibles RGAA et optimisés SEO. Création de sites modernes, applications web et WordPress. Contactez-moi !",
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
    title: "Matthéo Termine | Intégrateur Web Freelance RGAA",
    description:
      "Intégrateur web freelance expert en sites accessibles RGAA et optimisés SEO. Création de sites modernes et WordPress sur mesure. Contactez-moi !",
    url: "https://mattheo-termine.fr",
    siteName: "Portfolio Matthéo Termine - Intégrateur Web Freelance",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
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
      "Expert en sites web accessibles et performants. Spécialiste Next.js, React, WordPress. Conformité RGAA et optimisation SEO garanties. Contactez-moi !",
    images: ["/og-image.webp"],
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
      className={cn(inter.variable, outfit.variable, "scroll-smooth dark")}
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
        <style id="critical-css" dangerouslySetInnerHTML={{
          __html: `:root{--background:0 0% 100%;--foreground:222 84% 4.9%;--primary:258 89% 50%;--primary-foreground:0 0% 100%;--secondary:210 40% 96%;--muted:210 40% 94%;--border:214 31% 85%;--card:0 0% 98%;--card-foreground:222 84% 4.9%;--radius:0.5rem}.dark{--background:222 84% 4.9%;--foreground:210 40% 98%;--primary:258 89% 70%;--primary-foreground:222 84% 4.9%;--secondary:217 33% 20%;--muted:217 33% 18%;--border:217 33% 25%;--card:222 84% 6%;--card-foreground:210 40% 98%}*{border-color:hsl(var(--border))}html{background-color:#ffffff;color-scheme:light dark;font-family:var(--font-inter),system-ui,-apple-system,sans-serif;text-rendering:optimizeLegibility}html.dark{background-color:#0a0a1a}body{background-color:hsl(var(--background));color:hsl(var(--foreground));font-family:inherit;min-height:100vh;opacity:0;animation:fadeInBody 0.3s ease-out forwards;line-height:1.6;font-weight:500}.dark body{background:linear-gradient(to bottom,#0a0a1a 0%,#0f0f23 30%,#1a1a2e 60%,#0d1117 100%)}h1,h2,h3,h4,h5,h6{font-family:var(--font-outfit),system-ui,-apple-system,sans-serif;font-weight:700;line-height:1.2;letter-spacing:-0.025em}h1{font-weight:800}.hero-section{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center}.skip-link{position:absolute;top:-40px;left:6px;background:hsl(var(--primary));color:hsl(var(--primary-foreground));padding:8px 16px;font-size:0.875rem;font-weight:600;text-decoration:none;border-radius:0 0 4px 4px;z-index:1000;transition:top 0.3s}.skip-link:focus{top:0}*:focus-visible{outline:2px solid transparent;outline-offset:2px;box-shadow:0 0 0 2px hsl(var(--background)),0 0 0 4px hsl(var(--primary));border-radius:2px}@keyframes fadeInBody{to{opacity:1}}@media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}}`
        }} />
        {/* Critical resource hints for performance - Next.js gère automatiquement les fonts */}

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

        {/* Performance hints for critical resources */}
        <link rel="preload" href="/favicon.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/theme-init.js" as="script" />
        
        {/* Optimisation fonts - chargement manuel pour éviter les warnings */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
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
        
        {/* Theme initialization must be synchronous */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
        
        {/* Load non-critical CSS asynchronously after page load */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function loadNonCriticalCSS() {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/styles/non-critical.css';
                link.media = 'print';
                link.onload = function() { this.media = 'all'; };
                document.head.appendChild(link);
              }
              
              if ('requestIdleCallback' in window) {
                requestIdleCallback(loadNonCriticalCSS, { timeout: 2000 });
              } else {
                setTimeout(loadNonCriticalCSS, 1000);
              }
            })();
          `
        }} />
        
        {/* Structured Data for SEO */}
        <StructuredData />
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
              <CoreWebVitalsTracking />
              <Toaster />
            </ThemeProvider>
          </ConsentProvider>
        </LanguageProvider>
        {/* Optimized JavaScript Loading */}
        
        {/* Google Analytics GA4 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  // Load GA asynchronously with requestIdleCallback for better performance
                  function loadGA() {
                    const script = document.createElement('script');
                    script.async = true;
                    script.src = 'https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}';
                    document.head.appendChild(script);
                    
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                      page_path: window.location.pathname,
                      send_page_view: true
                    });
                    window.gtag = gtag;
                  }
                  
                  // Use requestIdleCallback for better performance
                  if ('requestIdleCallback' in window) {
                    requestIdleCallback(loadGA, { timeout: 2000 });
                  } else {
                    setTimeout(loadGA, 1000);
                  }
                })();
              `,
            }}
          />
        )}

        {/* React DevTools disabler */}
        {process.env.NODE_ENV === "production" && (
          <script
            defer
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

        {/* Service Worker */}
        {process.env.NODE_ENV === "production" && (
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  // Use requestIdleCallback to avoid blocking main thread
                  function registerSW() {
                    navigator.serviceWorker.getRegistrations().then(function(registrations) {
                      for(let registration of registrations) {
                        registration.unregister();
                      }
                    });
                    
                    if ('caches' in window) {
                      caches.keys().then(function(names) {
                        for (let name of names) {
                          caches.delete(name);
                        }
                      });
                    }
                    
                    setTimeout(function() {
                      navigator.serviceWorker.register('/sw.js', { 
                        updateViaCache: 'none'
                      }).then(function(registration) {
                        setInterval(function() {
                          registration.update().catch(function() {});
                        }, 60000);
                      }).catch(function() {});
                    }, 2000);
                  }
                  
                  if ('requestIdleCallback' in window) {
                    requestIdleCallback(registerSW, { timeout: 5000 });
                  } else {
                    setTimeout(registerSW, 3000);
                  }
                }
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
