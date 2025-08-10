
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

const formSchema = z.object({
  siteType: z.enum(["vitrine", "ecommerce"], {
    required_error: "Veuillez sélectionner un type de site.",
  }),
  designType: z.enum(["template", "custom"], {
      required_error: "Veuillez sélectionner un type de design.",
  }),
  pageCount: z.coerce.number().min(1, "Il doit y avoir au moins 1 page.").max(50, "Pour plus de 50 pages, un devis sur mesure est nécessaire."),
  features: z.array(z.string()).optional(),
  maintenance: z.boolean().default(false).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const featureOptions = [
  { id: "blog", label: "Intégration d'un blog / système d'actualités", price: 300 },
  { id: "gallery", label: "Galerie d'images / Portfolio avancé", price: 200 },
  { id: "newsletter", label: "Système d'inscription à la newsletter", price: 150 },
  { id: "multi-langue", label: "Configuration pour un site multilingue", price: 450 },
  { id: "analytics", label: "Intégration et configuration d'analytics", price: 80 },
  { id: "booking", label: "Système de réservation simple", price: 500 },
];

const pricingModel = {
  siteType: {
    vitrine: 350,
    ecommerce: 1200,
  },
  designType: {
    template: 200,
    custom: 800,
  },
  pagePrice: 60,
  features: featureOptions.reduce((acc, feature) => {
    acc[feature.id] = feature.price;
    return acc;
  }, {} as Record<string, number>),
  maintenance: 350,
};


export function QuoteCalculator() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageCount: 5,
      features: [],
      maintenance: false,
    },
  });

  const calculatePrice = (data: Partial<FormValues>) => {
    const parsedData = formSchema.safeParse(data);
    if (!parsedData.success) {
      return { base: null, total: null };
    }
    const finalData = parsedData.data;

    let base = 0;
    if (finalData.siteType) {
      base += pricingModel.siteType[finalData.siteType];
    }
    if(finalData.designType) {
        base += pricingModel.designType[finalData.designType];
    }
    if (finalData.pageCount) {
        base += finalData.pageCount * pricingModel.pagePrice;
    }

    let featurePrice = 0;
    if (finalData.features) {
      finalData.features.forEach((featureId) => {
        featurePrice += pricingModel.features[featureId] || 0;
      });
    }

    if (finalData.maintenance) {
        featurePrice += pricingModel.maintenance;
    }
    
    return { base, total: base + featurePrice };
  };
  
  const watchedValues = form.watch();

  const { base: basePrice, total: totalPrice } = useMemo(() => {
      return calculatePrice(watchedValues);
  }, [watchedValues]);

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form className="space-y-8">
          
          <FormField
            control={form.control}
            name="siteType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg font-semibold">1. Quel type de site souhaitez-vous ?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4"
                  >
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
                <FormLabel className="text-lg font-semibold">2. Quelle est la complexité du design ?</FormLabel>
                 <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
            name="pageCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">3. Combien de pages souhaitez-vous ?</FormLabel>
                <FormDescription>
                    Indiquez le nombre de pages uniques (Accueil, Contact, À propos...).
                </FormDescription>
                <FormControl>
                  <Input type="number" min="1" max="50" {...field} className="w-48"/>
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
                    <FormLabel className="text-lg font-semibold">4. Fonctionnalités additionnelles</FormLabel>
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
                      5. Pack Lancement (Optionnel)
                    </FormLabel>
                    <FormDescription>
                      Inclure l'hébergement pour 1 an et un forfait de maintenance de 3h.
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
        </form>
      </Form>
      
      <Separator />

      <div className="mt-8 sticky bottom-0 bg-background/95 backdrop-blur-sm py-6">
        <h3 className="text-2xl font-bold font-headline text-center">Estimation du devis</h3>
        <div className="mt-4 bg-secondary p-6 rounded-lg text-center">
            {totalPrice !== null ? (
                <>
                <p className="text-4xl font-bold text-primary">{totalPrice} € <span className="text-lg font-normal text-muted-foreground">HT</span></p>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Cette estimation est à titre indicatif. Elle évolue en fonction de vos choix.
                </p>
                 <Button asChild size="lg" className="mt-6">
                    <Link href="/#contact">Discutons de votre projet pour un devis final</Link>
                </Button>
                </>
            ) : (
                <p className="text-lg text-muted-foreground">Veuillez remplir les options ci-dessus pour obtenir une estimation.</p>
            )}
        </div>
      </div>
    </div>
  );
}


  