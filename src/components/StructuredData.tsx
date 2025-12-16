import React from "react";

export function StructuredData() {
  // Minimal structured data to satisfy imports; expand as needed.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Matthéo Termine",
    url: "https://mattheo-termine.fr",
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

export default StructuredData;
