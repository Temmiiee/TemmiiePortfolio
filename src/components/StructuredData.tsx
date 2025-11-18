import Script from "next/script";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Matthéo Termine",
    jobTitle: "Intégrateur Web Freelance",
    description:
      "Spécialiste en création de sites web modernes, accessibles (normes RGAA) et optimisés SEO. Expert en Next.js, React, WordPress et développement web sur mesure.",
    url: "https://mattheo-termine.fr",
    email: "mattheotermine104@gmail.com",
    sameAs: [
      "https://github.com/Temmiiee",
      "https://linkedin.com/in/mattheo-termine", // Replace with actual LinkedIn
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
      addressLocality: "France",
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Intégrateur Web Freelance",
      occupationLocation: {
        "@type": "Country",
        name: "France",
      },
    },
    knowsAbout: [
      "Développement Web",
      "Next.js",
      "React",
      "Accessibilité RGAA",
      "SEO",
      "Intégration Web",
      "WordPress",
      "TypeScript",
      "Tailwind CSS",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Responsive Design",
      "Performance Web",
      "UX/UI Design",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Formation en développement web",
    },
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Matthéo Termine - Intégrateur Web Freelance",
    description:
      "Services de développement web freelance : création de sites vitrines, applications web, e-commerce. Spécialiste en accessibilité RGAA et optimisation SEO.",
    url: "https://mattheo-termine.fr",
    image: "https://mattheo-termine.fr/og-image.svg",
    logo: "https://mattheo-termine.fr/icon",
    email: "mattheotermine104@gmail.com",
    provider: {
      "@type": "Person",
      name: "Matthéo Termine",
    },
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    serviceType: "Développement Web",
    // DEVIS - TEMPORAIREMENT DÉSACTIVÉ
    // priceRange: "550€ - 2500€+",
    paymentAccepted: ["Virement bancaire", "Chèque"],
    /* DEVIS - TEMPORAIREMENT DÉSACTIVÉ
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de Développement Web",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Site Vitrine Classique",
          description:
            "Site vitrine avec design basé sur un template personnalisé. Design moderne et responsive.",
          price: "550",
          priceCurrency: "EUR",
          itemOffered: {
            "@type": "Service",
            name: "Site Vitrine Classique",
            serviceType: "Création de site web",
          },
        },
        {
          "@type": "Offer",
          name: "Site Sur-Mesure / Landing Page",
          description:
            "Site sur-mesure ou landing page avec design unique, adapté à vos besoins spécifiques.",
          price: "1150",
          priceCurrency: "EUR",
          itemOffered: {
            "@type": "Service",
            name: "Site Sur-Mesure",
            serviceType: "Développement web personnalisé",
          },
        },
        {
          "@type": "Offer",
          name: "Application Web",
          description:
            "Solution complète pour les projets complexes nécessitant des fonctionnalités sur mesure.",
          price: "2500",
          priceCurrency: "EUR",
          itemOffered: {
            "@type": "Service",
            name: "Application Web",
            serviceType: "Développement d'application web",
          },
        },
      ],
    },
    */
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "10",
    },
  };

  const webSiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Matthéo Termine - Portfolio",
    description:
      "Portfolio professionnel de Matthéo Termine, intégrateur web freelance spécialisé en sites modernes et accessibles.",
    url: "https://mattheo-termine.fr",
    inLanguage: "fr-FR",
    author: {
      "@type": "Person",
      name: "Matthéo Termine",
    },
    publisher: {
      "@type": "Person",
      name: "Matthéo Termine",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://mattheo-termine.fr/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://mattheo-termine.fr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://mattheo-termine.fr#services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Projets",
        item: "https://mattheo-termine.fr#projets",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: "https://mattheo-termine.fr#contact",
      },
    ],
  };

  return (
    <>
      <Script
        id="structured-data-person"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <Script
        id="structured-data-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteData),
        }}
      />
      {/* Breadcrumb - peut être ajouté sur les pages internes si nécessaire */}
      <Script
        id="structured-data-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
    </>
  );
}
