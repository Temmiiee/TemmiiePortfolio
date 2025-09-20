"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { QuoteCalculatorWrapper } from "@/components/QuoteCalculator";
import { Suspense } from "react";
import { DevisEstimationSidebar } from "@/components/DevisEstimationSidebar";

export default function DevisPage() {
  const router = useRouter();
  // On gère les valeurs du formulaire pour l'estimation
  type FormValues = {
    siteType: "vitrine" | "ecommerce" | "webapp";
    designType: "template" | "custom";
    maintenance: boolean;
    name: string;
    email: string;
    company: string;
    technology: "react" | "vue" | "nextjs" | "wordpress" | "no-preference";
    features?: string[];
    projectDescription?: string;
    files?: File[];
    phone?: string;
  };

  const [formValues, setFormValues] = React.useState<FormValues>({
    siteType: "vitrine",
    designType: "template",
    maintenance: false,
    name: "",
    email: "",
    company: "",
    technology: "no-preference",
    features: [],
    projectDescription: "",
    files: undefined,
    phone: "",
  });

  // Fonction pour mettre à jour les valeurs du formulaire
  const handleFormChange = (values: FormValues) => {
    setFormValues(values);
  };

  // Fonction de validation: construit les données, les enregistre et redirige
  const handleValidate = () => {
    const emailValid = !!formValues.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email);
    const nameValid = !!formValues.name && formValues.name.trim().length > 0;
    if (!emailValid || !nameValid) return; // sécurité côté bouton
    // Pricing local (identique au sidebar)
    const pricingModel = {
      siteType: { vitrine: 350, ecommerce: 1200, webapp: 2500 },
      designType: { template: 200, custom: 800 },
      maintenance: 49,
    } as const;
    const featureOptions = [
      { id: "blog", label: "Intégration d'un blog / système d'actualités", price: 300 },
      { id: "gallery", label: "Galerie d'images / Portfolio avancé", price: 250 },
      { id: "newsletter", label: "Système d'inscription à la newsletter", price: 150 },
      { id: "multi-langue", label: "Configuration pour un site multilingue", price: 450 },
      { id: "analytics", label: "Intégration et configuration d'analytics", price: 80 },
      { id: "user-accounts", label: "Espace utilisateur / authentification", price: 500 },
      { id: "third-party-integration", label: "Intégration de service tiers (API, etc.)", price: 400 },
      { id: "admin-panel", label: "Tableau de bord administrateur", price: 600 },
    ] as const;

    const featuresSelected = formValues.features ?? [];
    // Calcule le total (sans maintenance mensuelle)
    let total = 0;
    if (formValues.siteType in pricingModel.siteType) {
      total += pricingModel.siteType[formValues.siteType];
    }
    if (formValues.designType in pricingModel.designType) {
      total += pricingModel.designType[formValues.designType];
    }
    for (const id of featuresSelected) {
      // Si webapp, 'user-accounts' est inclus gratuitement dans l'UI
      if (formValues.siteType === "webapp" && id === "user-accounts") continue;
      const fo = featureOptions.find((f) => f.id === id);
      if (fo) total += fo.price;
    }

    // Mappe les ids en libellés lisibles
    const featuresLabels = featuresSelected
      .map((id) => featureOptions.find((f) => f.id === id)?.label || id);

    const devisData = {
      siteType: formValues.siteType,
      designType: formValues.designType,
      technology: formValues.technology,
      features: featuresLabels,
      maintenance: formValues.maintenance,
      projectDescription: formValues.projectDescription,
      clientInfo: {
        name: formValues.name,
        email: formValues.email,
        company: formValues.company,
        phone: formValues.phone,
      },
      total,
    };

    // Sauvegarde et redirection
    try {
      localStorage.setItem("devisData", JSON.stringify(devisData));
    } catch {}
    router.push("/devis/validation");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-8 py-8 md:py-16">
      <div className="flex-1">
        <Suspense fallback={<div>Chargement du formulaire...</div>}>
          <QuoteCalculatorWrapper onFormChange={handleFormChange} />
        </Suspense>
      </div>
      {/* Sidebar sticky pour l'estimation */}
      <div className="w-full lg:w-80 lg:ml-8">
        {(() => {
          const emailValid = !!formValues.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email);
          const nameValid = !!formValues.name && formValues.name.trim().length > 0;
          const canValidate = emailValid && nameValid;
          return (
            <DevisEstimationSidebar
              siteType={formValues.siteType}
              designType={formValues.designType}
              features={formValues.features ?? []}
              maintenance={formValues.maintenance}
              onValidate={handleValidate}
              canValidate={canValidate}
            />
          );
        })()}
      </div>
    </div>
  );
}
