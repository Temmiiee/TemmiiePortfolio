
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { useState, useMemo, useEffect } from "react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  siteType: z.enum(["vitrine", "ecommerce", "webapp"], {
    required_error: "Veuillez sélectionner un type de site.",
  }),
  designType: z.enum(["template", "custom"], {
      required_error: "Veuillez sélectionner un type de design.",
  }),
  wordpress: z.boolean().default(false).optional(),
  features: z.array(z.string()).optional(),
  maintenance: z.boolean().default(false).optional(),
  projectDescription: z.string().optional(),
  files: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const featureOptions = [
  { id: "blog", label: "Intégration d'un blog / système d'actualités", price: 300 },
  { id: "gallery", label: "Galerie d'images / Portfolio avancé", price: 200 },
  { id: "newsletter", label: "Système d'inscription à la newsletter", price: 150 },
  { id: "multi-langue", label: "Configuration pour un site multilingue", price: 450 },
  { id: "analytics", label: "Intégration et configuration d'analytics", price: 80 },
];

const pricingModel = {
  siteType: {
    vitrine: 350,
    ecommerce: 1200,
    webapp: 2500,
  },
  designType: {
    template: 200,
    custom: 800,
  },
  features: featureOptions.reduce((acc, feature) => {
    acc[feature.id] = feature.price;
    return acc;
  }, {} as Record<string, number>),
  maintenance: 49,
};


export function QuoteCalculator() {
  const searchParams = useSearchParams();
  const siteTypeParam = searchParams.get('siteType');
  const designTypeParam = searchParams.get('designType');
  const maintenanceParam = searchParams.get('maintenance');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteType: siteTypeParam === 'vitrine' || siteTypeParam === 'ecommerce' || siteTypeParam === 'webapp' ? siteTypeParam : undefined,
      designType: designTypeParam === 'template' || designTypeParam === 'custom' ? designTypeParam : undefined,
      wordpress: false,
      features: [],
      maintenance: maintenanceParam === 'true',
      projectDescription: "",
    },
  });

  useEffect(() => {
    form.reset({
        siteType: siteTypeParam === 'vitrine' || siteTypeParam === 'ecommerce' || siteTypeParam === 'webapp' ? siteTypeParam : undefined,
        designType: designTypeParam === 'template' || designTypeParam === 'custom' ? designTypeParam : undefined,
        wordpress: false,
        features: [],
        maintenance: maintenanceParam === 'true',
        projectDescription: "",
    });
  }, [siteTypeParam, designTypeParam, maintenanceParam, form]);


  const watchedValues = form.watch();

  const { total: totalPrice, maintenanceCost, details } = useMemo(() => {
    const parsedData = formSchema.safeParse(watchedValues);
    if (!parsedData.success) {
      return { total: null, maintenanceCost: 0, details: {} };
    }
    const finalData = parsedData.data;

    let base = 0;
    const details: Record<string, number> = {};
    
    if (finalData.siteType) {
      const price = pricingModel.siteType[finalData.siteType];
      base += price;
      details[`Site ${finalData.siteType}`] = price;
    }
    if(finalData.designType) {
        const price = pricingModel.designType[finalData.designType];
        base += price;
        details[`Design ${finalData.designType}`] = price;
    }

    let featurePrice = 0;
    if (finalData.features) {
      finalData.features.forEach((featureId) => {
        const feature = featureOptions.find(f => f.id === featureId);
        if (feature) {
          featurePrice += feature.price;
          details[feature.label] = feature.price;
        }
      });
    }

    const maintenance = finalData.maintenance ? pricingModel.maintenance : 0;
    if (maintenance > 0) {
      details["Maintenance & Hébergement"] = maintenance;
    }
    
    return { total: base + featurePrice, maintenanceCost: maintenance, details };
  }, [watchedValues]);

  const onSubmit = (data: FormValues) => {
    // Préparer les données du devis
    const devisData = {
      siteType: data.siteType,
      designType: data.designType,
      pages: data.pages,
      features: data.features || [],
      timeline: data.timeline,
      budget: `${totalPrice}€ HT`,
      projectDescription: data.projectDescription,
      wordpress: data.wordpress,
      clientInfo: {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
      },
      total: totalPrice,
      maintenanceCost: maintenanceCost,
      details: details
    };

    // Sauvegarder les données dans localStorage pour la page de validation
    localStorage.setItem('devisData', JSON.stringify(devisData));

    // Rediriger vers la page de validation
    window.location.href = '/devis/validation';
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <FormField
            control={form.control}
            name="siteType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg font-semibold">1. Quel type de site souhaitez-vous ?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-2"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormItem className="flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 has-[:checked]:border-primary">
                        <FormControl>
                            <RadioGroupItem value="vitrine" />
                        </FormControl>
                        <FormLabel className="font-normal w-full">
                            <span className="font-bold block">Site Vitrine</span>
                            <span className="text-sm text-muted-foreground">Présenter votre activité et vos services.</span>
                        </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 has-[:checked]:border-primary">
                        <FormControl>
                            <RadioGroupItem value="ecommerce" />
                        </FormControl>
                        <FormLabel className="font-normal w-full">
                            <span className="font-bold block">E-commerce</span>
                            <span className="text-sm text-muted-foreground">Vendre des produits en ligne (base).</span>
                        </FormLabel>
                        </FormItem>
                    </div>
                     <FormItem className="flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="webapp" />
                      </FormControl>
                      <FormLabel className="font-normal w-full">
                        <span className="font-bold block">Application Web</span>
                        <span className="text-sm text-muted-foreground">Projet complexe avec des fonctionnalités sur mesure (SaaS, plateforme, etc.).</span>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

           <FormField
              control={form.control}
              name="wordpress"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="wordpress-checkbox"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="wordpress-checkbox" className="font-normal">
                      Je souhaite que le site soit développé sur WordPress.
                    </FormLabel>
                    <FormDescription>
                      Cette information est à titre indicatif et n'impacte pas le devis.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

           <FormField
            control={form.control}
            name="designType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg font-semibold">2. Quelle est la complexité du design ?</FormLabel>
                 <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="template" />
                      </FormControl>
                      <FormLabel className="font-normal w-full">
                        <span className="font-bold block">Basé sur un modèle</span>
                        <span className="text-sm text-muted-foreground">Adaptation d'un design existant (plus rapide).</span>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="custom" />
                      </FormControl>
                      <FormLabel className="font-normal w-full">
                        <span className="font-bold block">Design Sur Mesure</span>
                        <span className="text-sm text-muted-foreground">Création d'un design unique à partir de zéro.</span>
                      </FormLabel>
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
                    <FormLabel className="text-lg font-semibold">3. Fonctionnalités additionnelles</FormLabel>
                    <FormDescription>
                        Cochez toutes les fonctionnalités que vous souhaitez intégrer.
                    </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featureOptions.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="features"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal w-full">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

           <FormField
              control={form.control}
              name="maintenance"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base font-semibold">
                      4. Maintenance & Hébergement (Optionnel)
                    </FormLabel>
                    <FormDescription>
                      Souscrire à l'offre de maintenance mensuelle pour la tranquillité d'esprit.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Separator />

            <div>
                <h3 className="text-lg font-semibold">5. Informations complémentaires</h3>
                <FormDescription>
                    Ces informations ne modifient pas le tarif mais m'aideront à mieux comprendre votre projet.
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
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Charte graphique, logo, ou inspirations</FormLabel>
                     <FormDescription>
                        Vous pouvez téléverser jusqu'à 3 fichiers (images, PDF...).
                    </FormDescription>
                    <FormControl>
                    <Input type="file" multiple {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className="mt-8 py-6">
                <h3 className="text-2xl font-bold font-headline text-center">Estimation du devis</h3>
                <div className="mt-4 bg-secondary p-6 rounded-lg text-center">
                    {totalPrice !== null && (watchedValues.siteType && watchedValues.designType) ? (
                        <>
                        <p className="text-4xl font-bold text-primary">{totalPrice} € <span className="text-lg font-normal text-muted-foreground">HT</span></p>
                        {maintenanceCost > 0 && (
                            <p className="text-xl font-semibold text-primary mt-2">+ {maintenanceCost} € / mois</p>
                        )}
                        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                            Cette estimation est à titre indicatif. Elle évolue en fonction de vos choix.
                        </p>
                        <Button type="submit" size="lg" className="mt-6">
                            Valider le devis
                        </Button>
                        </>
                    ) : (
                        <p className="text-lg text-muted-foreground px-4">Veuillez remplir les options ci-dessus pour obtenir une estimation.</p>
                    )}
                </div>
              </div>
        </form>
      </Form>
    </div>
  );
}
