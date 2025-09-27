"use client";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  siteType: z.enum(
    ["vitrine", "ecommerce", "webapp"],
    "Veuillez sélectionner un type de site."
  ),
  designType: z.enum(
    ["template", "custom"],
    "Veuillez sélectionner un type de design."
  ),
  features: z.array(z.string()).optional(),
  maintenance: z.enum(["none", "monthly", "annually"]).default("none"),
  projectDescription: z.string().optional(),
  files: z.any().optional(),
  name: z.string().min(1, "Veuillez indiquer votre nom."),
  email: z
    .string()
    .email("Veuillez indiquer un email valide.")
    .min(1, "Veuillez indiquer votre email."),
  phone: z.string().optional(),
  company: z.string().default(""),
  technology: z.enum(
    ["react", "vue", "nextjs", "wordpress", "no-preference"],
    "Veuillez sélectionner une technologie."
  ),
});

export type FormValues = z.infer<typeof formSchema>;

export interface QuoteCalculatorProps {
  onFormChange?: (values: FormValues) => void;
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
    price: 400,
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
    price: 500,
  },
];

// Sorted copy for UI: show features from highest to lowest price
const sortedFeatureOptions = [...featureOptions].sort((a, b) => b.price - a.price);

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

function serializeRelevant(v: FormValues) {
  const features = Array.isArray(v.features) ? [...v.features].sort() : [];
  return JSON.stringify({
    siteType: v.siteType,
    designType: v.designType,
    maintenance: v.maintenance,
    name: v.name,
    email: v.email,
    phone: v.phone ?? "",
    company: v.company ?? "",
    technology: v.technology,
    projectDescription: v.projectDescription ?? "",
    features,
  });
}

export function QuoteCalculatorWrapper(
  props: Omit<QuoteCalculatorProps, "searchParams">
) {
  const searchParams = useSearchParams();
  return <QuoteCalculator {...props} searchParams={searchParams} />;
}

export const QuoteCalculator = React.memo(function QuoteCalculator({
  onFormChange,
  searchParams,
}: QuoteCalculatorProps & { searchParams?: ReturnType<typeof useSearchParams> }) {

  const [isDragActive, setIsDragActive] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const params = useMemo(
    () => ({
      siteType: searchParams?.get("siteType"),
      designType: searchParams?.get("designType"),
      features: searchParams?.get("features")?.split(",") || [],
      maintenance: searchParams?.get("maintenance"), // Peut être "monthly", "annually"
      technology: searchParams?.get("technology"),
    }),
    [searchParams]
  );

  const defaultValues: FormValues = {
    siteType:
      params.siteType === "vitrine" ||
      params.siteType === "ecommerce" ||
      params.siteType === "webapp"
        ? (params.siteType as FormValues["siteType"])
        : "vitrine",
    designType:
      params.designType === "template" || params.designType === "custom"
        ? (params.designType as FormValues["designType"])
        : "template",
    features: Array.isArray(params.features) ? params.features : [],
    maintenance:
      params.maintenance === "monthly" || params.maintenance === "annually"
        ? (params.maintenance as FormValues["maintenance"])
        : "none",
    name: "",
    email: "",
    company: "",
    phone: "",
    technology:
      params.technology === "react" ||
      params.technology === "vue" ||
      params.technology === "nextjs" ||
      params.technology === "wordpress" ||
      params.technology === "no-preference"
        ? (params.technology as FormValues["technology"])
        : "no-preference",
    projectDescription: "",
    files: undefined,
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  }) as ReturnType<typeof useForm<FormValues>>;

  const formValues = useWatch({ control: form.control }) as FormValues;
  const lastNotifiedSerializedRef = React.useRef<string | null>(null);

  const onFormChangeRef = React.useRef<typeof onFormChange | undefined>(onFormChange);
  React.useEffect(() => {
    onFormChangeRef.current = onFormChange;
  }, [onFormChange]);

  // Initialise la notif à l'état courant sans appeler le parent
  React.useEffect(() => {
    lastNotifiedSerializedRef.current = serializeRelevant(form.getValues() as FormValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Notification parent coalescée pour éviter les re-montages rapides (Radix refs)
  const notifyTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingPartialRef = React.useRef<Partial<FormValues> | null>(null);

  function notifyParent(partial?: Partial<FormValues>) {
    pendingPartialRef.current = { ...(pendingPartialRef.current || {}), ...(partial || {}) };
    if (notifyTimerRef.current) return;
    notifyTimerRef.current = setTimeout(() => {
      const partialToApply = pendingPartialRef.current || {};
      pendingPartialRef.current = null;
      notifyTimerRef.current = null;

      if (!onFormChangeRef.current) return;
      const current = form.getValues() as FormValues;
      const next = { ...current, ...partialToApply } as FormValues;
      const serialized = serializeRelevant(next);
      if (lastNotifiedSerializedRef.current === serialized) return;
      lastNotifiedSerializedRef.current = serialized;
      try {
        onFormChangeRef.current(next);
      } catch (err) {
        console.error("[QuoteCalculator] Erreur lors de l'appel onFormChange", err);
      }
    }, 0);
  }

  const onSubmit = (data: FormValues) => {
    const devisData = {
      siteType: data.siteType,
      designType: data.designType,
      features: (data.features || []).map((f) => {
        const found = featureOptions.find((opt) => opt.id === f);
        return found ? found.label : f;
      }),
      maintenance: data.maintenance,
      technology: data.technology,
      clientInfo: {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
      },
      projectDescription: data.projectDescription,
    };
    try {
      localStorage.setItem("devisData", JSON.stringify(devisData));
    } catch {}
    window.location.href = "/devis/validation";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="siteType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold">
                1. Quel type de site souhaitez-vous ?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    notifyParent({ siteType: value as FormValues["siteType"] });
                  }}
                  value={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Site Vitrine */}
                    <FormItem
                      className={cn(
                        "flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-primary/40",
                        field.value === "vitrine" ? "border-primary bg-primary/5" : "border-border"
                      )}
                    >
                      <FormControl>
                        <RadioGroupItem value="vitrine" className="sr-only" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer">
                        <span className="font-bold block">Site Vitrine</span>
                        <span className="text-sm text-muted-foreground flex justify-between items-center">
                          Présenter votre activité et vos services.
                          <span className="font-semibold text-primary ml-4">({pricingModel.siteType.vitrine}€)</span>
                        </span>
                      </FormLabel>
                      <div className="ml-auto">
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full border-2 relative",
                            field.value === "vitrine" ? "border-primary bg-primary" : "border-muted-foreground"
                          )}
                          role="button"
                          tabIndex={0}
                          onClick={() => { field.onChange("vitrine"); notifyParent({ siteType: "vitrine" }); }}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); field.onChange("vitrine"); notifyParent({ siteType: "vitrine" }); } }}
                          aria-label="Sélectionner Site Vitrine"
                        >
                          <div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "vitrine" ? "opacity-100" : "opacity-0")}></div>
                        </div>
                      </div>
                    </FormItem>

                    {/* E-commerce */}
                    <FormItem
                      className={cn(
                        "flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-primary/40",
                        field.value === "ecommerce" ? "border-primary bg-primary/5" : "border-border"
                      )}
                    >
                      <FormControl>
                        <RadioGroupItem value="ecommerce" className="sr-only" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer">
                        <span className="font-bold block">E-commerce</span>
                        <span className="text-sm text-muted-foreground flex justify-between items-center">
                          Vendre des produits en ligne (base).
                          <span className="font-semibold text-primary ml-4">({pricingModel.siteType.ecommerce}€)</span>
                        </span>
                      </FormLabel>
                      <div className="ml-auto">
                        <div
                          className={cn("w-4 h-4 rounded-full border-2 relative", field.value === "ecommerce" ? "border-primary bg-primary" : "border-muted-foreground")}
                          role="button"
                          tabIndex={0}
                          onClick={() => { field.onChange("ecommerce"); notifyParent({ siteType: "ecommerce" }); }}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); field.onChange("ecommerce"); notifyParent({ siteType: "ecommerce" }); } }}
                          aria-label="Sélectionner E-commerce"
                        >
                          <div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "ecommerce" ? "opacity-100" : "opacity-0")}></div>
                        </div>
                      </div>
                    </FormItem>
                  </div>
                  {/* Application Web */}
                  <FormItem
                    className={cn(
                      "flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-primary/40",
                      field.value === "webapp" ? "border-primary bg-primary/5" : "border-border"
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value="webapp" className="sr-only" />
                    </FormControl>
                    <FormLabel className="font-normal w-full cursor-pointer">
                      <span className="font-bold block">Application Web</span>
                      <span className="text-sm text-muted-foreground flex justify-between items-center">
                        Projet complexe avec des fonctionnalités sur mesure (SaaS, plateforme, etc.).
                        <span className="font-semibold text-primary ml-4">({pricingModel.siteType.webapp}€)</span>
                      </span>
                    </FormLabel>
                    <div className="ml-auto">
                      <div
                        className={cn("w-4 h-4 rounded-full border-2 relative", field.value === "webapp" ? "border-primary bg-primary" : "border-muted-foreground")}
                        role="button"
                        tabIndex={0}
                        onClick={() => { field.onChange("webapp"); notifyParent({ siteType: "webapp" }); }}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); field.onChange("webapp"); notifyParent({ siteType: "webapp" }); } }}
                        aria-label="Sélectionner Application Web"
                      >
                        <div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "webapp" ? "opacity-100" : "opacity-0")}></div>
                      </div>
                    </div>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="designType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold">2. Quel type de design souhaitez-vous ?</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={(value) => { field.onChange(value); notifyParent({ designType: value as FormValues["designType"] }); }} value={field.value} className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
                  <FormItem className={cn("flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-primary/40", field.value === "template" ? "border-primary bg-primary/5" : "border-border")}>
                    <FormControl><RadioGroupItem value="template" className="sr-only" /></FormControl>
                    <FormLabel className="font-normal w-full cursor-pointer">
                      <span className="font-bold block">Design basé sur un template</span>
                      <span className="text-sm text-muted-foreground flex justify-between items-center">
                        Adaptation d&apos;un design existant avec personnalisation légère.
                        <span className="font-semibold text-primary ml-4">({pricingModel.designType.template}€)</span>
                      </span>
                    </FormLabel>
                    <div className="ml-auto">
                      <div
                        className={cn("w-4 h-4 rounded-full border-2 relative", field.value === "template" ? "border-primary bg-primary" : "border-muted-foreground")}
                        role="button"
                        tabIndex={0}
                        onClick={() => { field.onChange("template"); notifyParent({ designType: "template" }); }}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); field.onChange("template"); notifyParent({ designType: "template" }); } }}
                        aria-label="Sélectionner Design template"
                      >
                        <div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "template" ? "opacity-100" : "opacity-0")}></div>
                      </div>
                    </div>
                  </FormItem>

                  <FormItem className={cn("flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-primary/40", field.value === "custom" ? "border-primary bg-primary/5" : "border-border")}>
                    <FormControl><RadioGroupItem value="custom" className="sr-only" /></FormControl>
                    <FormLabel className="font-normal w-full cursor-pointer">
                      <span className="font-bold block">Design sur mesure</span>
                      <span className="text-sm text-muted-foreground flex justify-between items-center">
                        Création d&apos;un design unique, adapté à vos besoins spécifiques.
                        <span className="font-semibold text-primary ml-4">({pricingModel.designType.custom}€)</span>
                      </span>
                    </FormLabel>
                    <div className="ml-auto">
                      <div
                        className={cn("w-4 h-4 rounded-full border-2 relative", field.value === "custom" ? "border-primary bg-primary" : "border-muted-foreground")}
                        role="button"
                        tabIndex={0}
                        onClick={() => { field.onChange("custom"); notifyParent({ designType: "custom" }); }}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); field.onChange("custom"); notifyParent({ designType: "custom" }); } }}
                        aria-label="Sélectionner Design custom"
                      >
                        <div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "custom" ? "opacity-100" : "opacity-0")}></div>
                      </div>
                    </div>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField control={form.control} name="features" render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-lg font-semibold">3. Fonctionnalités additionnelles</FormLabel>
              <FormDescription>Cochez toutes les fonctionnalités que vous souhaitez intégrer.</FormDescription>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedFeatureOptions.map((item) => {
                // Fixed: Use formValues from useWatch instead of form.getValues() to prevent infinite re-renders
                const forcedIncluded = formValues.siteType === "webapp" && item.id === "user-accounts";
                const displayPrice = forcedIncluded ? 0 : item.price;
                const info = forcedIncluded ? "(inclus d'office)" : "";
                
                return (
                  <FormField key={item.id} control={form.control} name="features" render={({ field }) => (
                    <FormItem key={item.id} className={cn("flex flex-row items-center space-x-3 border rounded-md p-4 hover:shadow-md transition-all duration-200 space-y-0", (field.value?.includes(item.id) || forcedIncluded) ? "border-primary bg-primary/5" : "border-border")}>
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id) || forcedIncluded}
                          onCheckedChange={(checked) => {
                            if (forcedIncluded) return;
                            const isChecked = !!checked;
                            const current = field.value || [];
                            const nextFeatures = isChecked
                              ? Array.from(new Set([...(current as string[]), item.id]))
                              : (current as string[]).filter((v) => v !== item.id);
                            field.onChange(nextFeatures);
                            notifyParent({ features: nextFeatures });
                          }}
                          disabled={forcedIncluded}
                        />
                      </FormControl>
                      <div className="font-normal w-full mt-0">
                        <div className="flex justify-between items-start">
                          <span>{item.label}</span>
                          <span className="text-muted-foreground text-right ml-4">
                            {displayPrice}€
                            {info && (<span className="text-primary block text-xs font-semibold">{info}</span>)}
                          </span>
                        </div>
                      </div>
                    </FormItem>
                  )} /> );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="maintenance" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-lg font-semibold">4. Maintenance & Hébergement (Optionnel)</FormLabel>
            <FormDescription>Souscrivez à l&apos;offre de maintenance pour la tranquillité d&apos;esprit.</FormDescription>
            <FormControl>
              <RadioGroup onValueChange={(value) => { field.onChange(value); notifyParent({ maintenance: value as FormValues["maintenance"] }); }} value={field.value} className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <FormItem className={cn("flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer", field.value === "none" ? "border-primary bg-primary/5" : "border-border")}>
                  <FormControl><RadioGroupItem value="none" className="sr-only" /></FormControl>
                  <FormLabel className="font-normal w-full cursor-pointer flex items-center justify-between gap-3">
                    <span className="font-bold min-w-0 pr-2">J&apos;installe sur votre hébergement</span>
                    <span className="text-sm text-muted-foreground ml-auto shrink-0 whitespace-nowrap">Offert</span>
                  </FormLabel>
                  <div className="ml-auto">
                    <div
                      className={cn("w-4 h-4 rounded-full border-2 relative", field.value === "none" ? "border-primary bg-primary" : "border-muted-foreground")}
                      role="button"
                      tabIndex={0}
                      onClick={() => { field.onChange("none"); notifyParent({ maintenance: "none" }); }}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); field.onChange("none"); notifyParent({ maintenance: "none" }); } }}
                      aria-label="Sélectionner maintenance aucune"
                    >
                      <div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "none" ? "opacity-100" : "opacity-0")}></div>
                    </div>
                  </div>
                </FormItem>

                <FormItem className={cn("flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer", field.value === "monthly" ? "border-primary bg-primary/5" : "border-border")}>
                  <FormControl><RadioGroupItem value="monthly" className="sr-only" /></FormControl>
                  <FormLabel className="font-normal w-full cursor-pointer flex items-center justify-between gap-3">
                    <span className="font-bold min-w-0 pr-2">Mensuelle</span>
                    <span className="ml-auto shrink-0 whitespace-nowrap text-xs sm:text-sm font-semibold text-primary">{pricingModel.maintenance.monthly}€ / mois</span>
                  </FormLabel>
                  <div className="ml-auto">
                    <div
                      className={cn("w-4 h-4 rounded-full border-2 relative", field.value === "monthly" ? "border-primary bg-primary" : "border-muted-foreground")}
                      role="button"
                      tabIndex={0}
                      onClick={() => { field.onChange("monthly"); notifyParent({ maintenance: "monthly" }); }}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); field.onChange("monthly"); notifyParent({ maintenance: "monthly" }); } }}
                      aria-label="Sélectionner maintenance mensuelle"
                    >
                      <div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "monthly" ? "opacity-100" : "opacity-0")}></div>
                    </div>
                  </div>
                </FormItem>

                <FormItem className={cn("flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer", field.value === "annually" ? "border-primary bg-primary/5" : "border-border")}>
                  <FormControl><RadioGroupItem value="annually" className="sr-only" /></FormControl>
                  <FormLabel className="font-normal w-full cursor-pointer flex items-center justify-between gap-3">
                    <span className="font-bold min-w-0 pr-2">Annuelle</span>
                    <span className="ml-auto shrink-0 whitespace-nowrap flex items-center gap-2 text-xs sm:text-sm">
                      <span className="line-through text-muted-foreground">120€ / an</span>
                      <span className="font-semibold text-primary">{pricingModel.maintenance.annually}€ / an</span>
                    </span>
                  </FormLabel>
                  <div className="ml-auto">
                    <div
                      className={cn("w-4 h-4 rounded-full border-2 relative", field.value === "annually" ? "border-primary bg-primary" : "border-muted-foreground")}
                      role="button"
                      tabIndex={0}
                      onClick={() => { field.onChange("annually"); notifyParent({ maintenance: "annually" }); }}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); field.onChange("annually"); notifyParent({ maintenance: "annually" }); } }}
                      aria-label="Sélectionner maintenance annuelle"
                    >
                      <div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "annually" ? "opacity-100" : "opacity-0")}></div>
                    </div>
                  </div>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="technology" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-lg font-semibold">6. Quelle technologie préférez-vous ?</FormLabel>
            <FormDescription>Si vous n&apos;avez pas de préférence, je choisirai l&apos;outil le plus adapté à votre projet.</FormDescription>
            <FormControl>
              <RadioGroup onValueChange={(value) => { field.onChange(value); notifyParent({ technology: value as FormValues["technology"] }); }} value={field.value} className="flex flex-col space-y-2 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
                {[
                  "react",
                  "vue",
                  "nextjs",
                  "wordpress",
                  "no-preference",
                ].map((tech) => (
                  <FormItem
                    key={tech}
                    className={cn(
                      "flex items-center space-x-3 space-y-0 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-primary/40",
                      field.value === tech ? "border-primary bg-primary/5" : "border-border"
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value={tech} className="sr-only" />
                    </FormControl>
                    <FormLabel className="font-normal w-full cursor-pointer">
                      {tech === "no-preference"
                        ? "Pas de préférences"
                        : tech.charAt(0).toUpperCase() + tech.slice(1)}
                    </FormLabel>
                    <div className="ml-auto">
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border-2 relative",
                          field.value === tech
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        )}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          field.onChange(tech);
                          notifyParent({ technology: tech as FormValues["technology"] });
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            field.onChange(tech);
                            notifyParent({ technology: tech as FormValues["technology"] });
                          }
                        }}
                        aria-label={`Sélectionner ${tech}`}
                      >
                        <div
                          className={cn(
                            "absolute inset-1 rounded-full bg-white transition-opacity duration-200",
                            field.value === tech ? "opacity-100" : "opacity-0"
                          )}
                        ></div>
                      </div>
                    </div>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Separator />

        <div>
          <h3 className="text-lg font-semibold">7. Vos coordonnées</h3>
          <FormDescription>Ces informations sont nécessaires pour établir le devis formel.</FormDescription>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Votre nom <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" required aria-required="true" autoComplete="name" {...field} onChange={(e) => { field.onChange(e); notifyParent({ name: e.target.value }); }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Votre email <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="email" placeholder="Votre email" required aria-required="true" autoComplete="email" inputMode="email" {...field} onChange={(e) => { field.onChange(e); notifyParent({ email: e.target.value }); }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="company" render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de votre entreprise (Optionnel)</FormLabel>
            <FormControl><Input placeholder="Nom de votre entreprise" autoComplete="organization" {...field} onChange={(e) => { field.onChange(e); notifyParent({ company: e.target.value }); }} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro de téléphone (Optionnel)</FormLabel>
            <FormControl><Input type="tel" placeholder="Numéro de téléphone" autoComplete="tel" inputMode="tel" {...field} onChange={(e) => { field.onChange(e); notifyParent({ phone: e.target.value }); }} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Separator />

        <div>
          <h3 className="text-lg font-semibold">8. Informations complémentaires</h3>
          <FormDescription>Ces informations ne modifient pas le tarif mais m&apos;aideront à mieux comprendre votre projet.</FormDescription>
        </div>

        <FormField control={form.control} name="projectDescription" render={({ field }) => (
          <FormItem>
            <FormLabel>Décrivez votre projet</FormLabel>
            <FormControl><Textarea placeholder="Quels sont vos objectifs ? Qui est votre cible ? Avez-vous des exemples de sites que vous aimez ?" className="min-h-[150px]" maxLength={2000} {...field} onChange={(e) => { field.onChange(e); notifyParent({ projectDescription: e.target.value }); }} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="files" render={({ field }) => {
            const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragActive(false);
            const files = Array.from(e.dataTransfer.files);
              field.onChange(files);
            setFileNames(files.map((f) => f.name));
              notifyParent({ files: files as unknown as FormValues["files"] });
          };

          const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragActive(true); };
          const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragActive(false); };
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(e.target.files ?? []);
            field.onChange(files);
            setFileNames(files.map((f) => f.name));
            notifyParent({ files: files as unknown as FormValues["files"] });
          };
          const handleClick = () => fileInputRef.current?.click();
          const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } };

          return (
            <FormItem>
              <FormLabel>Charte graphique, logo, inspirations ou archive ZIP</FormLabel>
              <FormDescription>Vous pouvez téléverser jusqu&apos;à 3 fichiers (images, PDF, ZIP...). Formats acceptés : jpg, jpeg, png, gif, pdf, zip.</FormDescription>
              <FormControl>
                <div className={`transition-all duration-300 border-2 rounded-lg flex flex-col items-center justify-center py-8 px-4 cursor-pointer relative ${isDragActive ? "border-primary bg-primary/5 shadow-lg" : "border-dashed border-border bg-muted/30 hover:bg-muted/50"}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={0} role="button" aria-label="Zone de téléversement de fichiers">
                  <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`mb-2 ${isDragActive ? "text-primary animate-bounce" : "text-muted-foreground"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                  <span className={`text-base font-medium ${isDragActive ? "text-primary" : "text-foreground"}`}>Glissez-déposez vos fichiers ici ou cliquez pour sélectionner</span>
                  <span className="text-sm text-muted-foreground mt-1">Formats acceptés : JPG, PNG, PDF, ZIP</span>
                  <input ref={fileInputRef} type="file" multiple accept=".jpg,.jpeg,.png,.gif,.pdf,.zip" onChange={handleChange} className="sr-only" aria-hidden="true" />
                  {fileNames.length > 0 && (
                    <div className="mt-4 w-full">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">{fileNames.length} fichier{fileNames.length > 1 ? "s" : ""} sélectionné{fileNames.length > 1 ? "s" : ""} (max 3)</span>
                        <button type="button" className="text-sm text-primary hover:underline" onClick={(e) => { e.stopPropagation(); field.onChange(undefined); setFileNames([]); notifyParent({ files: undefined }); }}>Effacer</button>
                      </div>
                      <ul className="text-sm space-y-1">
                        {fileNames.map((name, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            <span className="truncate">{name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }} />

        <button type="submit" className="w-full p-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-semibold">Obtenir mon devis</button>
      </form>
    </Form>
  );
});
