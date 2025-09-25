import React from "react";
import { Button } from "@/components/ui/button";

interface DevisEstimationSidebarProps {
  siteType: string;
  designType: string;
  features: string[];
  maintenance: "none" | "monthly" | "annually";
  onValidate: () => void;
  canValidate?: boolean;
}

const featureOptions = [
  {
    id: "blog",
    label: "Intégration d'un blog / système d'actualités",
    price: 300,
  },
  { id: "gallery", label: "Galerie d'images / Portfolio avancé", price: 250 },
  {
    id: "newsletter",
    label: "Système d'inscription à la newsletter",
    price: 150,
  },
  {
    id: "multi-langue",
    label: "Configuration pour un site multilingue",
    price: 200,
  },
  {
    id: "analytics",
    label: "Intégration et configuration d'analytics",
    price: 80,
  },
  {
    id: "user-accounts",
    label: "Espace utilisateur / authentification",
    price: 400,
  },
  {
    id: "third-party-integration",
    label: "Intégration de service tiers (API, etc.)",
    price: 400,
  },
  {
    id: "admin-panel",
    label: "Tableau de bord administrateur",
    price: 600,
  },
];
const pricingModel = {
  siteType: {
    vitrine: 350,
    ecommerce: 800,
    webapp: 2000,
  },
  designType: {
    template: 200,
    custom: 500,
  },
  features: featureOptions.reduce((acc, feature) => {
    acc[feature.id] = feature.price;
    return acc;
  }, {} as Record<string, number>),
  maintenance: {
    none: 0,
    monthly: 10,
    annually: 100,
  },
};

export function DevisEstimationSidebar({ siteType, designType, features, maintenance, onValidate, canValidate = true }: DevisEstimationSidebarProps) {

  let base = 0;
  if (siteType === "vitrine" || siteType === "ecommerce" || siteType === "webapp") {
    base += pricingModel.siteType[siteType];
  }
  if (designType === "template" || designType === "custom") {
    base += pricingModel.designType[designType];
  }
  let featurePrice = 0;
  if (features) {
    features.forEach((featureId) => {
      const feature = featureOptions.find((f) => f.id === featureId);
      if (feature) featurePrice += feature.price;
    });
  }
  const totalPrice = base + featurePrice;

  return (
    <div className="sticky top-24 w-full md:w-80">
      <div className="bg-secondary p-6 rounded-lg shadow-lg text-center border border-border">
        <h3 className="text-2xl font-bold font-headline mb-4">Estimation du devis</h3>
        <p className="text-4xl font-bold text-primary">
          {totalPrice} € <span className="text-lg font-normal text-muted-foreground">HT</span>
        </p>
        {maintenance !== "none" && (
          <p className="text-xl font-semibold text-primary mt-2">
            + {pricingModel.maintenance[maintenance]} € / {maintenance === "monthly" ? "mois" : "an"}
          </p>
        )}
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Cette estimation est à titre indicatif. Elle évolue en fonction de vos choix.
        </p>
        <Button type="button" size="lg" className="mt-6 w-full" onClick={onValidate} disabled={!canValidate}>
          Valider le devis
        </Button>
        {!canValidate && (
          <p className="mt-2 text-sm text-muted-foreground">
            Renseignez votre nom et un email valide pour continuer.
          </p>
        )}
      </div>
    </div>
  );
}