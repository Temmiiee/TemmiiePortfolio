
"use client";

import { useForm } from "react-hook-form";
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
import { useState, useMemo } from "react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  siteType: z.enum(["vitrine", "ecommerce", "webapp"], {
    required_error: "Veuillez sélectionner un type de site.",
  }),
  designType: z.enum(["template", "custom"], {
      required_error: "Veuillez sélectionner un type de design.",
  }),
  // Suppression du champ wordpress
  features: z.array(z.string()).optional(),
  maintenance: z.boolean().default(false).optional(),
  projectDescription: z.string().optional(),
  files: z.any().optional(),
  name: z.string().min(1, 'Veuillez indiquer votre nom.'),
  email: z.string().email('Veuillez indiquer un email valide.').min(1, 'Veuillez indiquer votre email.'),
  phone: z.string().optional(),
  company: z.string().optional().default(''),
  technology: z.enum(["react", "vue", "nextjs", "twig", "wordpress", "no-preference"], {
    required_error: "Veuillez sélectionner une technologie.",
  }),
  // Champ pages supprimé
});

type FormValues = z.infer<typeof formSchema>;

const featureOptions = [
  { id: "blog", label: "Intégration d&apos;un blog / système d'actualités", price: 300 },
  { id: "gallery", label: "Galerie d'images / Portfolio avancé", price: 250 },
  { id: "newsletter", label: "Système d'inscription à la newsletter", price: 150 },
  { id: "multi-langue", label: "Configuration pour un site multilingue", price: 450 },
  { id: "ecommerce-variations", label: "Variations de produits (pour E-commerce)", price: 300 },
  { id: "analytics", label: "Intégration et configuration d'analytics", price: 80 },
  { id: "user-accounts", label: "Espace utilisateur / authentification", price: 500 },
  { id: "third-party-integration", label: "Intégration de service tiers (API, etc.)", price: 400 },
  { id: "admin-panel", label: "Tableau de bord administrateur simple", price: 600 },
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
  // Hooks pour la zone de dépôt de fichiers
  const [isDragActive, setIsDragActive] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const params = useMemo(() => ({
    siteType: searchParams?.get('siteType'),
    designType: searchParams?.get('designType'),
    features: searchParams?.get('features')?.split(',') || [],
    maintenance: searchParams?.get('maintenance'),
    technology: searchParams?.get('technology'),
  }), [searchParams]);

  const defaultValues: FormValues = {
    siteType:
      params.siteType === 'vitrine' ||
      params.siteType === 'ecommerce' ||
      params.siteType === 'webapp'
        ? params.siteType as FormValues['siteType']
        : 'vitrine',
    designType:
      params.designType === 'template' ||
      params.designType === 'custom'
        ? params.designType as FormValues['designType']
        : 'template',
    features: Array.isArray(params.features) ? params.features : [],
    maintenance: params.maintenance === 'true',
    name: "",
    email: "",
    company: "",
    phone: "",
    technology:
      params.technology === 'react' ||
      params.technology === 'vue' ||
      params.technology === 'nextjs' ||
      params.technology === 'twig' ||
      params.technology === 'wordpress' ||
      params.technology === 'no-preference'
        ? params.technology as FormValues['technology']
        : 'no-preference',
    projectDescription: "",
    files: undefined,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const watchedValues = form.watch();

  const { total: totalPrice, maintenanceCost, details } = useMemo(() => {
    // Calcul du prix même si les coordonnées ne sont pas renseignées
    let base = 0;
    const details: Record<string, number> = {};
    const siteType = watchedValues.siteType || 'vitrine';
    const designType = watchedValues.designType || 'template';
    if (siteType) {
      const price = pricingModel.siteType[siteType];
      base += price;
      details[`Site ${siteType}`] = price;
    }
    if (designType) {
      const price = pricingModel.designType[designType];
      base += price;
      details[`Design ${designType}`] = price;
    }
    let featurePrice = 0;
    if (watchedValues.features) {
      watchedValues.features.forEach((featureId) => {
        if (featureId === 'ecommerce-variations' && siteType !== 'ecommerce') return;
        const feature = featureOptions.find(f => f.id === featureId);
        if (feature) {
          featurePrice += feature.price;
          details[feature.label] = feature.price;
        }
      });
    }
    const maintenance = watchedValues.maintenance ? pricingModel.maintenance : 0;
    if (maintenance > 0) {
      details["Maintenance & Hébergement"] = maintenance;
    }
    return { total: base + featurePrice, maintenanceCost: maintenance, details };
  }, [watchedValues]);

  const onSubmit = (data: FormValues) => {
    // Génération des données du devis parfaitement personnalisées
    const devisData = {
      siteType: data.siteType,
      designType: data.designType,
      features: (data.features || []).map(f => {
        const found = featureOptions.find(opt => opt.id === f);
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
      total: totalPrice,
      details: details
    };
    localStorage.setItem('devisData', JSON.stringify(devisData));
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

           {/* Suppression du champ WordPress */}

           <FormField
            control={form.control}
            name="designType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg font-semibold">2. Quel type de design souhaitez-vous ?</FormLabel>
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
                        <span className="font-bold block">Design basé sur un template</span>
                        <span className="text-sm text-muted-foreground">Idéal pour les sites multipages classiques, rapide et économique. Adaptation d&apos;un design existant avec personnalisation légère.</span>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="custom" />
                      </FormControl>
                      <FormLabel className="font-normal w-full">
                        <span className="font-bold block">Design sur mesure</span>
                        <span className="text-sm text-muted-foreground">Recommandé pour les sites one page, landing pages ou projets complexes. Création d&apos;un design unique, adapté à vos besoins spécifiques.</span>
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
                    // Only show ecommerce-variations if siteType is ecommerce
                    // style={{ display: item.id === 'ecommerce-variations' && watchedValues.siteType !== 'ecommerce' ? 'none' : 'flex' }}
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
                ))
                .filter(item => !(item.key === 'ecommerce-variations' && watchedValues.siteType !== 'ecommerce'))}
                </div>
                 {watchedValues.siteType !== 'ecommerce' && watchedValues.features?.includes('ecommerce-variations') && (
                    <p className="text-sm text-red-500 mt-2">La fonctionnalité &quot;Variations de produits&quot; n&apos;est pertinente que pour un site E-commerce et a été retirée de l&apos;estimation.</p>)}
                <FormMessage />
              </FormItem>
            )}
          />

           <FormField
              control={form.control}
              name="maintenance"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base font-semibold">
                      4. Maintenance & Hébergement (Optionnel)
                    </FormLabel>
                    <FormDescription>
                      Souscrire à l&apos;offre de maintenance mensuelle pour la tranquillité d&apos;esprit.
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


          {/* Champ Nombre de pages estimé supprimé */}

          <FormField
            control={form.control}
            name="technology"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg font-semibold">6. Quelle technologie préférez-vous ?</FormLabel>
                <FormDescription>
                    Si vous n&apos;avez pas de préférence, je choisirai l&apos;outil le plus adapté à votre projet.
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-2 md:grid md:grid-cols-3 md:gap-4 md:space-y-0"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl><RadioGroupItem value="react" /></FormControl>
                      <FormLabel className="font-normal w-full">React</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl><RadioGroupItem value="vue" /></FormControl>
                      <FormLabel className="font-normal w-full">Vue</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl><RadioGroupItem value="nextjs" /></FormControl>
                      <FormLabel className="font-normal w-full">Next.js</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl><RadioGroupItem value="twig" /></FormControl>
                      <FormLabel className="font-normal w-full">Twig</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl><RadioGroupItem value="wordpress" /></FormControl>
                      <FormLabel className="font-normal w-full">WordPress</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl><RadioGroupItem value="no-preference" /></FormControl>
                      <FormLabel className="font-normal w-full">Pas de préférences</FormLabel>
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
            <div className="flex flex-col md:flex-row gap-4">
             <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Votre nom <span className="text-red-500">*</span></FormLabel>
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
                    <FormLabel>Votre email <span className="text-red-500">*</span></FormLabel>
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
                    <Input type="tel" placeholder="Numéro de téléphone" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <Separator />

            <div>
                <h3 className="text-lg font-semibold">8. Informations complémentaires</h3>
                <FormDescription>
                    Ces informations ne modifient pas le tarif mais m&apos;aideront à mieux comprendre votre projet.
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
                  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setIsDragActive(false);
                    const files = Array.from(e.dataTransfer.files);
                    field.onChange(files);
                    setFileNames(files.map(f => f.name));
                  };
                  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setIsDragActive(true);
                  };
                  const handleDragLeave = () => setIsDragActive(false);
                  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = Array.from(e.target.files ?? []);
                    field.onChange(files);
                    setFileNames(files.map(f => f.name));
                  };

                  return (
                    <FormItem>
                      <FormLabel>Charte graphique, logo, inspirations ou archive ZIP</FormLabel>
                      <FormDescription>
                        Vous pouvez téléverser jusqu&apos;à 3 fichiers (images, PDF, ZIP...). Formats acceptés : jpg, jpeg, png, gif, pdf, zip.
                      </FormDescription>
                      <FormControl>
                        <div
                          className={`transition-all duration-300 border-2 rounded-lg flex flex-col items-center justify-center py-8 px-4 cursor-pointer bg-gray-50 relative ${isDragActive ? 'border-primary bg-blue-50 shadow-lg' : 'border-dashed border-gray-300'}`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          tabIndex={0}
                        >
                          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`mb-2 ${isDragActive ? 'text-primary animate-bounce' : 'text-gray-400'}`}> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" /> </svg>
                          <span className={`text-base ${isDragActive ? 'text-primary' : 'text-gray-600'}`}>Glissez-déposez vos fichiers ici ou cliquez pour sélectionner</span>
                          <Input
                            type="file"
                            multiple
                            accept=".jpg,.jpeg,.png,.gif,.pdf,.zip"
                            onChange={handleChange}
                            value={undefined}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            style={{zIndex:2}}
                          />
                          {fileNames.length > 0 && (
                            <div className="mt-4 w-full">
                              <ul className="text-sm text-gray-700">
                                {fileNames.map((name, idx) => (
                                  <li key={idx} className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    {name}
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

            <div className="mt-8 py-6">
                <h3 className="text-2xl font-bold font-headline text-center">Estimation du devis</h3>
        <div className="mt-4 bg-secondary p-6 rounded-lg text-center">
          <>
            <p className="text-4xl font-bold text-primary">{totalPrice !== null ? totalPrice : 0} € <span className="text-lg font-normal text-muted-foreground">HT</span></p>
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
        </div>
              </div>
        </form>
      </Form>
    </div>
  );
}
