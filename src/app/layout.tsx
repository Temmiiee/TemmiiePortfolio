import type { Metadata } from "next";
// Commented out Google Fonts for build environment compatibility
// import { PT_Sans, Space_Grotesk } from 'next/font/google';
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieBanner, CookieStatus } from "@/components/CookieBanner";
import { GoogleAnalyticsConsent } from "@/components/GoogleAnalyticsConsent";
import { ConsentProvider } from "@/contexts/ConsentContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Link from "next/link";

// Fallback font configuration for build environment
const ptSans = {
  variable: "--font-body",
  style: { fontFamily: "system-ui, sans-serif" },
};

const spaceGrotesk = {
  variable: "--font-space-grotesk",
  style: { fontFamily: "system-ui, sans-serif" },
};

// Uncomment below and comment out the fallback fonts above when Google Fonts connectivity is available:
/*
const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});
*/

export const metadata: Metadata = {
  metadataBase: new URL("https://mattheo-termine.fr"),
  title: {
    default:
      "Matthéo Termine | Intégrateur Web Freelance spécialisé en Accessibilité RGAA",
    template: "%s | Matthéo Termine – Intégrateur Web Freelance",
  },
  description:
    "Matthéo Termine, intégrateur web freelance expert en création de sites modernes, accessibles (normes RGAA) et optimisés SEO. Services : sites vitrines, applications web, WordPress. Devis gratuit.",
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
    apple: "/apple-icon",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title:
      "Matthéo Termine | Intégrateur Web Freelance spécialisé en Accessibilité RGAA",
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
    "apple-mobile-web-app-capable": "yes",
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
      className={cn(ptSans.variable, spaceGrotesk.variable, "scroll-smooth")}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        />
        <meta
          name="theme-color"
          content="#a259ff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#a259ff"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="color-scheme" content="dark light" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-TileColor" content="#a259ff" />
        <link rel="canonical" href="https://mattheo-termine.fr" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme');
                var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                if (theme === 'dark' || (theme === 'system' && systemDark) || (!theme && systemDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {
                // Fallback en cas d'erreur - utiliser la préférence système si possible
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              }
            })();
          `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          :root {
            --font-pt-sans: ${ptSans.style.fontFamily};
            --font-space-grotesk: ${spaceGrotesk.style.fontFamily};
          }
          /* Éviter le flash de couleur incorrecte */
          html {
            background-color: #ffffff;
            color-scheme: light dark;
          }
          html.dark {
            background-color: #0a0a1a;
            color-scheme: dark;
          }
          html:not(.dark) {
            background-color: #ffffff;
            color-scheme: light;
          }
        `,
          }}
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <ConsentProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
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
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>
          <Footer />
          <CookieBanner />
          <CookieStatus />
          <GoogleAnalyticsConsent />
          <Toaster />
        </ThemeProvider>
        </ConsentProvider>
        {/* Google Analytics GA4 - Direct Implementation */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                    send_page_view: true
                  });
                `,
              }}
            />
          </>
        )}
        
        {/* Désactiver les React DevTools en production */}
        {process.env.NODE_ENV === 'production' && (
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
              `
            }}
          />
        )}
      </body>
    </html>
  );
}
