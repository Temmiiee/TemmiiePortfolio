import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Matthéo Termine - Intégrateur Web Freelance',
    short_name: 'Matthéo Termine',
    description: 'Portfolio de Matthéo Termine, intégrateur web freelance spécialisé en accessibilité RGAA, SEO et développement web moderne.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a1a',
    theme_color: '#a259ff',
    orientation: 'portrait-primary',
    lang: 'fr',
    scope: '/',
    categories: ['business', 'portfolio', 'professional'],
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
