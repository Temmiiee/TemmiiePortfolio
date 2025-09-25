"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { QuoteCalculatorWrapper, FormValues as QuoteFormValues } from "@/components/QuoteCalculator";
import { Suspense } from "react";
import { DevisEstimationSidebar } from "@/components/DevisEstimationSidebar";

// Remarques : on réutilise le type exporté depuis le composant formulaire
type LocalFormValues = {
  siteType: "vitrine" | "ecommerce" | "webapp";
  designType: "template" | "custom";
  maintenance: "none" | "monthly" | "annually";
  name: string;
  email: string;
  company: string;
  technology: "react" | "vue" | "nextjs" | "wordpress" | "no-preference";
  features?: string[];
  projectDescription?: string;
  files?: File[];
  phone?: string;
};

export default function DevisPage() {
  const router = useRouter();

  const [formValues, setFormValues] = React.useState<LocalFormValues>({
    siteType: "vitrine",
    designType: "template",
    maintenance: "none",
    name: "",
    email: "",
    company: "",
    technology: "no-preference",
    features: [],
    projectDescription: "",
    files: undefined,
    phone: "",
  });

  const areLocalValuesEqual = (a: LocalFormValues, b: LocalFormValues) => {
    if (a.siteType !== b.siteType) return false;
    if (a.designType !== b.designType) return false;
    if (a.maintenance !== b.maintenance) return false;
    if (a.name !== b.name) return false;
    if (a.email !== b.email) return false;
    if (a.company !== b.company) return false;
    if (a.phone !== b.phone) return false;
    if (a.technology !== b.technology) return false;
    if ((a.projectDescription || "") !== (b.projectDescription || "")) return false;
    const fa = Array.isArray(a.features) ? [...a.features].sort() : [];
    const fb = Array.isArray(b.features) ? [...b.features].sort() : [];
    if (fa.length !== fb.length) return false;
    for (let i = 0; i < fa.length; i++) if (fa[i] !== fb[i]) return false;
    return true;
  };

  const handleFormChange = useCallback((values: QuoteFormValues) => {
    const next: LocalFormValues = {
      siteType: values.siteType,
      designType: values.designType,
      maintenance: values.maintenance,
      name: values.name,
      email: values.email,
      company: values.company || "",
      technology: values.technology,
      features: values.features ?? [],
      projectDescription: values.projectDescription ?? "",
      files: Array.isArray(values.files) ? values.files as File[] : undefined,
      phone: values.phone ?? "",
    };

    setFormValues((prev) => {
      if (areLocalValuesEqual(prev, next)) {
        // aucune modification significative -> ne pas mettre à jour l'état
        return prev;
      }
      return next;
    });
  }, []);

  // Sauvegarde automatique du devis à chaque changement pertinent
  React.useEffect(() => {
    // Pricing aligné avec le Sidebar
    const pricingModel = {
      siteType: { vitrine: 350, ecommerce: 800, webapp: 2000 },
      designType: { template: 200, custom: 500 },
    } as const;
    const featureOptions = [
      { id: "blog", label: "Intégration d'un blog / système d'actualités", price: 300 },
      { id: "gallery", label: "Galerie d'images / Portfolio avancé", price: 250 },
      { id: "newsletter", label: "Système d'inscription à la newsletter", price: 150 },
      { id: "multi-langue", label: "Configuration pour un site multilingue", price: 400 },
      { id: "analytics", label: "Intégration et configuration d'analytics", price: 80 },
      { id: "user-accounts", label: "Espace utilisateur / authentification", price: 400 },
      { id: "third-party-integration", label: "Intégration de service tiers (API, etc.)", price: 400 },
      { id: "admin-panel", label: "Tableau de bord administrateur", price: 500 },
    ] as const;

    const featuresSelected = formValues.features ?? [];
    let total = 0;
    if (formValues.siteType in pricingModel.siteType) {
      total += pricingModel.siteType[formValues.siteType];
    }
    if (formValues.designType in pricingModel.designType) {
      total += pricingModel.designType[formValues.designType];
    }
    for (const id of featuresSelected) {
      if (formValues.siteType === "webapp" && id === "user-accounts") continue;
      const fo = featureOptions.find((f) => f.id === id);
      if (fo) total += fo.price;
    }

    const featuresLabels = Array.from(new Set(featuresSelected
      .map((id) => featureOptions.find((f) => f.id === id)?.label || id)));

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

    try {
      localStorage.setItem("devisData", JSON.stringify(devisData));
    } catch {}
  }, [formValues]);

  // Fonction de validation: construit les données, les enregistre et redirige
  const handleValidate = () => {
    const emailValid = !!formValues.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email);
    const nameValid = !!formValues.name && formValues.name.trim().length > 0;
    if (!emailValid || !nameValid) return; // sécurité côté bouton

    // Pricing local (identique au sidebar)
    const pricingModel = {
      siteType: { vitrine: 350, ecommerce: 800, webapp: 2000 },
      designType: { template: 200, custom: 500 },
      maintenance: { none: 0, monthly: 10, annually: 100 } as const,
    } as const;
    const featureOptions = [
      { id: "blog", label: "Intégration d'un blog / système d'actualités", price: 300 },
      { id: "gallery", label: "Galerie d'images / Portfolio avancé", price: 250 },
      { id: "newsletter", label: "Système d'inscription à la newsletter", price: 150 },
      { id: "multi-langue", label: "Configuration pour un site multilingue", price: 400 },
      { id: "analytics", label: "Intégration et configuration d'analytics", price: 80 },
      { id: "user-accounts", label: "Espace utilisateur / authentification", price: 400 },
      { id: "third-party-integration", label: "Intégration de service tiers (API, etc.)", price: 400 },
      { id: "admin-panel", label: "Tableau de bord administrateur", price: 500 },
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
    // La maintenance est affichée séparément; ne pas l'inclure au total HT de base

    // Mappe les ids en libellés lisibles
    const featuresLabels = Array.from(new Set(featuresSelected
      .map((id) => featureOptions.find((f) => f.id === id)?.label || id)));

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
    <div className="flex flex-col lg:flex-row gap-4 px-4 md:px-8 py-8 md:py-16">
      <div className="flex-1">
        <Suspense fallback={<div>Chargement du formulaire...</div>}>
          <QuoteCalculatorWrapper onFormChange={handleFormChange} />
        </Suspense>
      </div>
      {/* Sidebar sticky pour l'estimation */}
      <div className="w-full lg:w-72 lg:ml-4">
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