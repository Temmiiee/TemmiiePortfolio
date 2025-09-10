import type { Metadata } from 'next';
// Commented out Google Fonts for build environment compatibility
// import { PT_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';

// Fallback font configuration for build environment
const ptSans = {
  variable: '--font-body',
  style: { fontFamily: 'system-ui, sans-serif' }
};

const spaceGrotesk = {
  variable: '--font-space-grotesk', 
  style: { fontFamily: 'system-ui, sans-serif' }
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
  metadataBase: new URL('https://mattheo-termine.fr'), // Updated with proper domain
  title: {
    default: 'Intégrateur Web Freelance – Matthéo Termine',
    template: '%s | Matthéo Termine – Intégrateur Web Freelance',
  },
  description: 'Portfolio de Matthéo Termine, intégrateur web freelance. Création de sites web modernes, accessibles (normes RGAA), rapides et optimisés SEO.',
  keywords: [
    'intégrateur web',
    'développeur freelance',
    'création site web',
    'accessibilité RGAA',
    'SEO',
    'Next.js',
    'React',
    'Matthéo Termine',
    'développement web France',
    'site web responsive',
    'optimisation performance web'
  ],
  authors: [{ name: 'Matthéo Termine', url: 'https://mattheo-termine.fr' }],
  creator: 'Matthéo Termine',
  publisher: 'Matthéo Termine',
  category: 'Développement Web',
  classification: 'Portfolio professionnel',
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Intégrateur Web Freelance – Matthéo Termine',
    description: 'Portfolio de Matthéo Termine, intégrateur web freelance. Création de sites web modernes, accessibles (normes RGAA), rapides et optimisés SEO.',
    url: 'https://mattheo-termine.fr',
    siteName: 'Portfolio Matthéo Termine',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Matthéo Termine - Intégrateur Web Freelance spécialisé en accessibilité et SEO',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intégrateur Web Freelance – Matthéo Termine',
    description: 'Portfolio de Matthéo Termine, intégrateur web freelance. Création de sites web modernes, accessibles (normes RGAA), rapides et optimisés SEO.',
    images: ['/og-image.svg'],
    creator: '@mattheo_termine', // Add actual Twitter handle if available
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://mattheo-termine.fr',
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code when available
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn(ptSans.variable, spaceGrotesk.variable, 'scroll-smooth')}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#a259ff" />
        <meta name="color-scheme" content="dark light" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="canonical" href="https://mattheo-termine.fr" />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --font-pt-sans: ${ptSans.style.fontFamily};
            --font-space-grotesk: ${spaceGrotesk.style.fontFamily};
          }
        `}} />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Link href="#main-content" className="skip-link">Aller au contenu principal</Link>
        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
