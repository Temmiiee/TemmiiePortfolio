import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CoreWebVitalsTracking } from "@/components/CoreWebVitalsTracking";
import { StructuredData } from "@/components/StructuredData";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
  preload: true,
  adjustFontFallback: true,
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
  preload: true,
  adjustFontFallback: true,
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
          __html: `:root{--background:0 0% 100%;--foreground:222 84% 4.9%;--primary:258 89% 50%;--primary-foreground:0 0% 100%;--secondary:210 40% 96%;--muted:210 40% 94%;--border:214 31% 85%;--card:0 0% 98%;--card-foreground:222 84% 4.9%;--radius:0.5rem}.dark{--background:222 84% 4.9%;--foreground:210 40% 98%;--primary:258 89% 70%;--primary-foreground:222 84% 4.9%;--secondary:217 33% 20%;--muted:217 33% 18%;--border:217 33% 25%;--card:222 84% 6%;--card-foreground:210 40% 98%}*{border-color:hsl(var(--border))}html{background-color:#0a0a1a;color-scheme:dark light;font-family:var(--font-inter),system-ui,-apple-system,sans-serif;text-rendering:optimizeLegibility;font-display:swap}html.dark{background-color:#0a0a1a}body{background-color:hsl(var(--background));color:hsl(var(--foreground));font-family:inherit;min-height:100vh;opacity:0;animation:fadeInBody 0.2s ease-out forwards;line-height:1.6;font-weight:500;contain:layout style paint}.dark body{background:linear-gradient(to bottom,#0a0a1a 0%,#0f0f23 30%,#1a1a2e 60%,#0d1117 100%)}h1,h2,h3,h4,h5,h6{font-family:var(--font-outfit),system-ui,-apple-system,sans-serif;font-weight:700;line-height:1.2;letter-spacing:-0.025em;font-display:swap}h1{font-weight:800}.hero-section{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;contain:layout style}.skip-link{position:absolute;top:-40px;left:6px;background:hsl(var(--primary));color:hsl(var(--primary-foreground));padding:8px 16px;font-size:0.875rem;font-weight:600;text-decoration:none;border-radius:0 0 4px 4px;z-index:1000;transition:top 0.2s}*:focus-visible{outline:2px solid hsl(var(--primary));outline-offset:2px;border-radius:2px}@keyframes fadeInBody{to{opacity:1}}@media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}}`
        }} />
        {/* Critical resource hints for performance optimization */}
        <link rel="preload" href="/theme-init.js" as="script" />
        <link rel="preload" href="/styles/non-critical.css" as="style" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preconnect for critical external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Module preload for better JavaScript loading */}
        <link rel="modulepreload" href="/_next/static/chunks/webpack.js" />
        <link rel="modulepreload" href="/_next/static/chunks/main.js" />

        {/* Optimized icon loading */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Performance hints - Google Analytics uniquement si activé */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          </>
        )}

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

        {/* Security headers - X-Frame-Options removed as it should only be set via HTTP headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Theme initialization must be synchronous */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
        
        {/* Optimized non-critical CSS loading */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function loadNonCriticalCSS() {
                if (document.querySelector('link[href="/styles/non-critical.css"]')) return;
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/styles/non-critical.css';
                link.media = 'print';
                link.onload = function() { 
                  this.media = 'all'; 
                  this.onload = null;
                };
                link.onerror = function() { this.remove(); };
                document.head.appendChild(link);
              }
              
              if ('requestIdleCallback' in window) {
                requestIdleCallback(loadNonCriticalCSS, { timeout: 1500 });
              } else {
                setTimeout(loadNonCriticalCSS, 500);
              }
            })();
          `
        }} />
        
        {/* Structured Data for SEO */}
        <StructuredData />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <LanguageProvider>
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
              <CoreWebVitalsTracking />
              <Toaster />
            </ThemeProvider>
        </LanguageProvider>
        {/* Optimized JavaScript Loading */}
        
        {/* Optimized Google Analytics GA4 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  function loadGA() {
                    if (window.gtag) return;
                    const script = document.createElement('script');
                    script.async = true;
                    script.src = 'https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}';
                    script.onload = function() {
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                        page_path: window.location.pathname,
                        send_page_view: true,
                        transport_type: 'beacon'
                      });
                      window.gtag = gtag;
                    };
                    document.head.appendChild(script);
                  }
                  
                  if ('requestIdleCallback' in window) {
                    requestIdleCallback(loadGA, { timeout: 3000 });
                  } else {
                    setTimeout(loadGA, 2000);
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

        {/* Optimized Service Worker */}
        {process.env.NODE_ENV === "production" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  function registerSW() {
                    navigator.serviceWorker.register('/sw.js', { 
                      updateViaCache: 'none',
                      scope: '/'
                    }).then(function(registration) {
                      if (registration.waiting) {
                        registration.waiting.postMessage({type: 'SKIP_WAITING'});
                      }
                      registration.addEventListener('updatefound', function() {
                        const newWorker = registration.installing;
                        if (newWorker) {
                          newWorker.addEventListener('statechange', function() {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                              newWorker.postMessage({type: 'SKIP_WAITING'});
                            }
                          });
                        }
                      });
                    }).catch(function() {});
                  }
                  
                  if (document.readyState === 'complete') {
                    if ('requestIdleCallback' in window) {
                      requestIdleCallback(registerSW, { timeout: 5000 });
                    } else {
                      setTimeout(registerSW, 3000);
                    }
                  } else {
                    window.addEventListener('load', function() {
                      if ('requestIdleCallback' in window) {
                        requestIdleCallback(registerSW, { timeout: 5000 });
                      } else {
                        setTimeout(registerSW, 3000);
                      }
                    });
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
