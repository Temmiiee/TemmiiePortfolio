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
  title: {
    default: 'Intégrateur Web Freelance – Matthéo Termine',
    template: '%s | Matthéo Termine – Intégrateur Web Freelance',
  },
  description: 'Portfolio de Matthéo Termine, intégrateur web freelance. Création de sites web modernes, accessibles (normes RGAA), rapides et optimisés SEO.',
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
  openGraph: {
    title: 'Intégrateur Web Freelance – Matthéo Termine',
    description: 'Portfolio de Matthéo Termine, intégrateur web freelance. Création de sites web modernes, accessibles (normes RGAA), rapides et optimisés SEO.',
    url: 'https://your-domain.com', // Replace with your actual domain
    siteName: 'Portfolio Matthéo Termine',
    locale: 'fr_FR',
    type: 'website',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn(ptSans.variable, spaceGrotesk.variable, 'scroll-smooth')}>
      <head>
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
        <main id="main-content" className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
