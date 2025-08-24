import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Matthéo Termine - Intégrateur Web Freelance',
    short_name: 'Matthéo Termine',
    description: 'Portfolio de Matthéo Termine, intégrateur web freelance spécialisé dans la création de sites web modernes, accessibles et performants.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ECEFF1',
    theme_color: '#3F51B5',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
