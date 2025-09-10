import Script from 'next/script'

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Matthéo Termine",
    "jobTitle": "Intégrateur Web Freelance",
    "description": "Spécialiste en création de sites web modernes, accessibles et optimisés SEO",
    "url": "https://mattheo-termine.fr",
    "image": "https://mattheo-termine.fr/og-image.svg",
    "sameAs": [
      "https://github.com/Temmiiee",
      "https://linkedin.com/in/mattheo-termine" // Replace with actual LinkedIn
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR",
      "addressLocality": "France"
    },
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Développement Web",
        "description": "Création de sites web modernes et accessibles"
      }
    },
    "knowsAbout": [
      "Développement Web",
      "Next.js",
      "React",
      "Accessibilité RGAA",
      "SEO",
      "Intégration Web",
      "WordPress",
      "TypeScript",
      "Tailwind CSS"
    ],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Services de développement web",
        "serviceType": "Développement web freelance",
        "provider": {
          "@type": "Person",
          "name": "Matthéo Termine"
        }
      }
    }
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Matthéo Termine - Intégrateur Web",
    "description": "Services de développement web freelance, création de sites modernes et accessibles",
    "url": "https://mattheo-termine.fr",
    "provider": {
      "@type": "Person",
      "name": "Matthéo Termine"
    },
    "areaServed": "France",
    "serviceType": "Développement Web",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services Web",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Site Vitrine",
            "description": "Création de site vitrine responsive"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce",
            "description": "Développement de boutique en ligne"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Application Web",
            "description": "Développement d'applications web sur mesure"
          }
        }
      ]
    }
  }

  return (
    <>
      <Script
        id="structured-data-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
    </>
  )
}