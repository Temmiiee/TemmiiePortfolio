"use client";
// Wrapper pour usage dans une Suspense boundary
export function QuoteCalculatorWrapper(props: Omit<QuoteCalculatorProps, "searchParams">) {
  const searchParams = useSearchParams();
  return <QuoteCalculator {...props} searchParams={searchParams} />;
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useMemo } from "react";
import React from "react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useSearchParams } from "next/navigation";
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
  maintenance: z.boolean().default(false),
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

type FormValues = z.infer<typeof formSchema>;

export interface QuoteCalculatorProps {
  onFormChange?: (values: FormValues) => void;
}

const featureOptions = [
  {
    id: "blog",
    label: "Intégration d'un blog / système d'actualités",
    price: 299.99,
  },
  { id: "gallery", label: "Galerie d'images / Portfolio avancé", price: 249.99 },
  {
    id: "newsletter",
    label: "Système d'inscription à la newsletter",
    price: 149.99,
  },
  {
    id: "multi-langue",
    label: "Configuration pour un site multilingue",
    price: 449.99,
  },
  {
    id: "analytics",
    label: "Intégration et configuration d'analytics",
    price: 79.99,
  },
  {
    id: "user-accounts",
    label: "Espace utilisateur / authentification",
    price: 499.99,
  },
  {
    id: "third-party-integration",
    label: "Intégration de service tiers (API, etc.)",
    price: 399.99,
  },
  {
    id: "admin-panel",
    label: "Tableau de bord administrateur",
    price: 599.99,
  },
];
const pricingModel = {
  siteType: {
    vitrine: 349.99,
    ecommerce: 1199.99,
    webapp: 2499.99,
  },
  designType: {
    template: 199.99,
    custom: 799.99,
  },
  features: featureOptions.reduce((acc, feature) => {
    acc[feature.id] = feature.price;
    return acc;
  }, {} as Record<string, number>),
  maintenance: 9.99,
};

export function QuoteCalculator({ onFormChange, searchParams }: QuoteCalculatorProps & { searchParams?: ReturnType<typeof useSearchParams> }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const params = useMemo(
    () => ({
      siteType: searchParams?.get("siteType"),
      designType: searchParams?.get("designType"),
      features: searchParams?.get("features")?.split(",") || [],
      maintenance: searchParams?.get("maintenance"),
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
    maintenance: params.maintenance === "true",
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

  // Abonnement à form.watch pour éviter la boucle infinie
  React.useEffect(() => {
    if (!onFormChange) return;
    const subscription = form.watch((values) => {
      onFormChange(values as FormValues);
    });
    return () => subscription.unsubscribe();
  }, [form, onFormChange]);

  // On expose la fonction de soumission pour le composant d'estimation
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
    localStorage.setItem("devisData", JSON.stringify(devisData));
    window.location.href = "/devis/validation";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ml-12">
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
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormItem className={cn(
                          "flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer",
                          field.value === "vitrine" ? "border-primary bg-primary/5" : "border-border"
                        )}
                        onClick={() => field.onChange("vitrine")}>
                          <FormControl>
                            <RadioGroupItem value="vitrine" className="sr-only" />
                          </FormControl>
                          <FormLabel className="font-normal w-full cursor-pointer" onClick={(e) => e.preventDefault()}>
                            <span className="font-bold block">Site Vitrine</span>
                            <span className="text-sm text-muted-foreground">
                              Présenter votre activité et vos services.
                            </span>
                          </FormLabel>
                          <div className="ml-auto">
                            <div className={cn(
                              "w-4 h-4 rounded-full border-2 relative",
                              field.value === "vitrine" ? "border-primary bg-primary" : "border-muted-foreground"
                            )}>
                              <div className={cn(
                                "absolute inset-1 rounded-full bg-white transition-opacity duration-200",
                                field.value === "vitrine" ? "opacity-100" : "opacity-0"
                              )}></div>
                            </div>
                          </div>
                        </FormItem>
                        <FormItem className={cn(
                          "flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer",
                          field.value === "ecommerce" ? "border-primary bg-primary/5" : "border-border"
                        )}
                        onClick={() => field.onChange("ecommerce")}>
                          <FormControl>
                            <RadioGroupItem value="ecommerce" className="sr-only" />
                          </FormControl>
                          <FormLabel className="font-normal w-full cursor-pointer" onClick={(e) => e.preventDefault()}>
                            <span className="font-bold block">E-commerce</span>
                            <span className="text-sm text-muted-foreground">
                              Vendre des produits en ligne (base).
                            </span>
                          </FormLabel>
                          <div className="ml-auto">
                            <div className={cn(
                              "w-4 h-4 rounded-full border-2 relative",
                              field.value === "ecommerce" ? "border-primary bg-primary" : "border-muted-foreground"
                            )}>
                              <div className={cn(
                                "absolute inset-1 rounded-full bg-white transition-opacity duration-200",
                                field.value === "ecommerce" ? "opacity-100" : "opacity-0"
                              )}></div>
                            </div>
                          </div>
                        </FormItem>
                      </div>
                      <FormItem className={cn(
                        "flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer",
                        field.value === "webapp" ? "border-primary bg-primary/5" : "border-border"
                      )}
                      onClick={() => field.onChange("webapp")}>
                        <FormControl>
                          <RadioGroupItem value="webapp" className="sr-only" />
                        </FormControl>
                        <FormLabel className="font-normal w-full cursor-pointer" onClick={(e) => e.preventDefault()}>
                          <span className="font-bold block">Application Web</span>
                          <span className="text-sm text-muted-foreground">
                            Projet complexe avec des fonctionnalités sur mesure
                            (SaaS, plateforme, etc.).
                          </span>
                        </FormLabel>
                        <div className="ml-auto">
                          <div className={cn(
                            "w-4 h-4 rounded-full border-2 relative",
                            field.value === "webapp" ? "border-primary bg-primary" : "border-muted-foreground"
                          )}>
                            <div className={cn(
                              "absolute inset-1 rounded-full bg-white transition-opacity duration-200",
                              field.value === "webapp" ? "opacity-100" : "opacity-0"
                            )}></div>
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
                <FormLabel className="text-lg font-semibold">
                  2. Quel type de design souhaitez-vous ?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4"
                  >
                    <FormItem className={cn(
                      "flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer",
                      field.value === "template" ? "border-primary bg-primary/5" : "border-border"
                    )}
                    onClick={() => field.onChange("template")}>
                      <FormControl>
                        <RadioGroupItem value="template" className="sr-only" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer" onClick={(e) => e.preventDefault()}>
                        <span className="font-bold block">
                          Design basé sur un template
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Idéal pour les sites multipages classiques, rapide et
                          économique. Adaptation d&apos;un design existant avec
                          personnalisation légère.
                        </span>
                      </FormLabel>
                      <div className="ml-auto">
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 relative",
                          field.value === "template" ? "border-primary bg-primary" : "border-muted-foreground"
                        )}>
                          <div className={cn(
                            "absolute inset-1 rounded-full bg-white transition-opacity duration-200",
                            field.value === "template" ? "opacity-100" : "opacity-0"
                          )}></div>
                        </div>
                      </div>
                    </FormItem>
                    <FormItem className={cn(
                      "flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer",
                      field.value === "custom" ? "border-primary bg-primary/5" : "border-border"
                    )}
                    onClick={() => field.onChange("custom")}>
                      <FormControl>
                        <RadioGroupItem value="custom" className="sr-only" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer" onClick={(e) => e.preventDefault()}>
                        <span className="font-bold block">
                          Design sur mesure
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Recommandé pour les sites one page, landing pages ou
                          projets complexes. Création d&apos;un design unique,
                          adapté à vos besoins spécifiques.
                        </span>
                      </FormLabel>
                      <div className="ml-auto">
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 relative",
                          field.value === "custom" ? "border-primary bg-primary" : "border-muted-foreground"
                        )}>
                          <div className={cn(
                            "absolute inset-1 rounded-full bg-white transition-opacity duration-200",
                            field.value === "custom" ? "opacity-100" : "opacity-0"
                          )}></div>
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
            name="features"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-lg font-semibold">
                    3. Fonctionnalités additionnelles
                  </FormLabel>
                  <FormDescription>
                    Cochez toutes les fonctionnalités que vous souhaitez
                    intégrer.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featureOptions.map((item) => {
                    // Définir les fonctionnalités optionnel gratuite selon le type de site
                    let forcedIncluded = false;
                    let displayPrice = item.price;
                    let info = "";
                    const currentValues = form.getValues();
                    if (currentValues.siteType === "webapp" && item.id === "user-accounts") {
                      forcedIncluded = true;
                      displayPrice = 0;
                      info = "(inclus d'office)";
                    }
                    // Ajoutez ici d'autres règles si besoin
                    return (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="features"
                        render={({ field }) => (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary cursor-pointer hover:shadow-md transition-all duration-200"
                            onClick={() => {
                              if (forcedIncluded) return;
                              const isChecked = field.value?.includes(item.id);
                              if (isChecked) {
                                field.onChange(field.value?.filter(value => value !== item.id));
                              } else {
                                field.onChange([...(field.value || []), item.id]);
                              }
                            }}
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id) || forcedIncluded}
                                onCheckedChange={(checked) => {
                                  if (forcedIncluded) return;
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        item.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                                disabled={forcedIncluded}
                              />
                            </FormControl>
                            <FormLabel className="font-normal w-full cursor-pointer" onClick={(e) => {
                              if (forcedIncluded) {
                                e.preventDefault();
                                return;
                              }
                            }}>
                              {item.label} <span className="text-muted-foreground">- {displayPrice}€ {info}</span>
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maintenance"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 items-center justify-between rounded-lg border p-4 cursor-pointer hover:shadow-md transition-all duration-200"
              onClick={() => field.onChange(!field.value)}>
                <div className="space-y-0.5">
                  <FormLabel className="text-base font-semibold cursor-pointer">
                    4. Maintenance & Hébergement (Optionnel)
                  </FormLabel>
                  <FormDescription>
                    Souscrire à l&apos;offre de maintenance pour la tranquillité d&apos;esprit.<br />
                    <span className="font-semibold text-primary">Prix : {pricingModel.maintenance}€ / mois</span><br />
                    <span className="font-semibold text-primary">Ou : 99.99€ / an (économisez 19.89€)</span>
                  </FormDescription>
                </div>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={() => {
                      // Empêcher la double activation du onClick
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="technology"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg font-semibold">
                  6. Quelle technologie préférez-vous ?
                </FormLabel>
                <FormDescription>
                  Si vous n&apos;avez pas de préférence, je choisirai
                  l&apos;outil le plus adapté à votre projet.
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-2 md:grid md:grid-cols-3 md:gap-4 md:space-y-0"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => field.onChange("react")}>
                      <FormControl>
                        <RadioGroupItem value="react" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer" onClick={(e) => e.preventDefault()}>
                        React
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => field.onChange("vue")}>
                      <FormControl>
                        <RadioGroupItem value="vue" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer" onClick={(e) => e.preventDefault()}>Vue</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => field.onChange("nextjs")}>
                      <FormControl>
                        <RadioGroupItem value="nextjs" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer" onClick={(e) => e.preventDefault()}>
                        Next.js
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => field.onChange("wordpress")}>
                      <FormControl>
                        <RadioGroupItem value="wordpress" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer" onClick={(e) => e.preventDefault()}>
                        WordPress
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => field.onChange("no-preference")}>
                      <FormControl>
                        <RadioGroupItem value="no-preference" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer" onClick={(e) => e.preventDefault()}>
                        Pas de préférences
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          {/* New section for contact information */}
          <div>
            <h3 className="text-lg font-semibold">7. Vos coordonnées</h3>
            <FormDescription>
              Ces informations sont nécessaires pour établir le devis formel.
            </FormDescription>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Votre nom <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Votre email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Votre email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de votre entreprise (Optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de votre entreprise" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de téléphone (Optionnel)</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Numéro de téléphone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />

          <div>
            <h3 className="text-lg font-semibold">
              8. Informations complémentaires
            </h3>
            <FormDescription>
              Ces informations ne modifient pas le tarif mais m&apos;aideront à
              mieux comprendre votre projet.
            </FormDescription>
          </div>

          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Décrivez votre projet</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Quels sont vos objectifs ? Qui est votre cible ? Avez-vous des exemples de sites que vous aimez ?"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="files"
            render={({ field }) => {
              const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                setIsDragActive(false);
                const files = Array.from(e.dataTransfer.files);
                field.onChange(files);
                setFileNames(files.map((f) => f.name));
              };

              const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                setIsDragActive(true);
              };

              const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                setIsDragActive(false);
              };

              const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const files = Array.from(e.target.files ?? []);
                field.onChange(files);
                setFileNames(files.map((f) => f.name));
              };

              const handleClick = () => {
                fileInputRef.current?.click();
              };

              const handleKeyDown = (
                e: React.KeyboardEvent<HTMLDivElement>
              ) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick();
                }
              };

              return (
                <FormItem>
                  <FormLabel>
                    Charte graphique, logo, inspirations ou archive ZIP
                  </FormLabel>
                  <FormDescription>
                    Vous pouvez téléverser jusqu&apos;à 3 fichiers (images, PDF,
                    ZIP...). Formats acceptés : jpg, jpeg, png, gif, pdf, zip.
                  </FormDescription>
                  <FormControl>
                    <div
                      className={`transition-all duration-300 border-2 rounded-lg flex flex-col items-center justify-center py-8 px-4 cursor-pointer relative ${
                        isDragActive
                          ? "border-primary bg-primary/5 shadow-lg"
                          : "border-dashed border-border bg-muted/30 hover:bg-muted/50"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={handleClick}
                      onKeyDown={handleKeyDown}
                      tabIndex={0}
                      role="button"
                      aria-label="Zone de téléversement de fichiers"
                    >
                      <svg
                        width="40"
                        height="40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className={`mb-2 ${
                          isDragActive
                            ? "text-primary animate-bounce"
                            : "text-muted-foreground"
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                        />
                      </svg>
                      <span
                        className={`text-base font-medium ${
                          isDragActive ? "text-primary" : "text-foreground"
                        }`}
                      >
                        Glissez-déposez vos fichiers ici ou cliquez pour
                        sélectionner
                      </span>
                      <span className="text-sm text-muted-foreground mt-1">
                        Formats acceptés : JPG, PNG, PDF, ZIP
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png,.gif,.pdf,.zip"
                        onChange={handleChange}
                        className="sr-only"
                        aria-hidden="true"
                      />
                      {fileNames.length > 0 && (
                        <div className="mt-4 w-full">
                          <ul className="text-sm space-y-1">
                            {fileNames.map((name, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 text-foreground"
                              >
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
            }}
          />
        </form>
      </Form>
  );
}