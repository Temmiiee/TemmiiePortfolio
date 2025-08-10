import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CodeXml, Gauge, Palette, Accessibility, CheckCircle2, FileText, Search, Bot, Feather, Rocket, PencilRuler } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import Image from "next/image";
import { Download, Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { ProjectIdeaGenerator } from "@/components/ProjectIdeaGenerator";

const services = [
  {
    icon: Palette,
    title: "Création de site vitrine responsive",
    description: "Des sites web modernes et adaptatifs qui s'affichent parfaitement sur tous les appareils.",
  },
  {
    icon: CodeXml,
    title: "Intégration HTML/CSS",
    description: "Transformation de vos maquettes (Figma, Sketch, etc.) en code HTML/CSS de haute qualité.",
  },
  {
    icon: Gauge,
    title: "Optimisation SEO et performance",
    description: "Amélioration de la vitesse de chargement et du référencement pour une meilleure visibilité.",
  },
  {
    icon: Accessibility,
    title: "Accessibilité numérique (RGAA)",
    description: "Garantir que votre site est utilisable par tous, y compris les personnes en situation de handicap.",
  },
];

const processSteps = [
    {
        icon: Search,
        title: "1. Découverte",
        description: "Nous discutons de vos objectifs, de votre cible et de vos besoins pour définir les contours de votre projet.",
    },
    {
        icon: PencilRuler,
        title: "2. Maquettage & Design",
        description: "Je conçois une maquette visuelle et un design sur-mesure qui reflètent votre identité de marque.",
    },
    {
        icon: CodeXml,
        title: "3. Développement",
        description: "Je transforme le design validé en un site web fonctionnel, performant et accessible.",
    },
    {
        icon: Rocket,
        title: "4. Déploiement",
        description: "Je m'occupe de la mise en ligne de votre site sur votre hébergement et assure son bon fonctionnement.",
    },
];

const pricingPlans = [
  {
    title: "Site Vitrine Essentiel",
    price: "À partir de 490€",
    description: "La solution idéale pour démarrer et marquer votre présence en ligne avec un site professionnel.",
    features: [
      "Jusqu'à 3 pages",
      "Design moderne et responsive",
      "Formulaire de contact fonctionnel",
      "Optimisation pour le référencement",
      "Mise en ligne sur votre hébergement",
    ],
    cta: "Choisir cette offre",
    featured: false,
  },
  {
    title: "Site Multi-pages Professionnel",
    price: "À partir de 890€",
    description: "Une solution complète pour les entreprises souhaitant détailler leurs services et leur activité.",
    features: [
      "Nombre de pages illimité",
      "Design personnalisé (de zéro ou selon votre charte graphique)",
      "Développement de fonctionnalités spécifiques",
      "Optimisation pour le référencement",
      "Formation pour gérer votre contenu",
    ],
    cta: "Choisir cette offre",
    featured: true,
  },
  {
    title: "Solution Sur-Mesure",
    price: "Sur devis",
    description: "Un projet unique ? Discutons-en pour construire la solution parfaitement adaptée à vos ambitions.",
    features: [
      "Analyse approfondie de vos besoins",
      "Développement de fonctionnalités spécifiques",
      "Intégration de services tiers (API, etc.)",
      "Espace d'administration personnalisé",
      "Accompagnement et support dédiés",
    ],
    cta: "Demander un devis",
    featured: false,
  },
];

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section id="accueil" className="text-center py-16 scroll-mt-20" aria-labelledby="hero-title">
        <h1 id="hero-title" className="font-headline text-4xl md:text-6xl font-bold text-primary mb-4 animate-fade-in-down">
          Matthéo Termine
        </h1>
        <p className="font-headline text-xl md:text-2xl text-foreground/80 mb-6 max-w-3xl mx-auto" role="doc-subtitle">
          Intégrateur Web Freelance
        </p>
        <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto mb-8">
          Je réalise des sites web modernes, accessibles (normes RGAA), rapides et optimisés SEO.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="#projets" aria-label="Voir mes projets">Mes projets</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#contact" aria-label="Me contacter">Me contacter</Link>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="scroll-mt-20" aria-labelledby="services-title">
        <header className="text-center mb-12">
          <h2 id="services-title" className="font-headline text-3xl md:text-4xl font-bold">Mes services</h2>
          <p className="text-lg text-muted-foreground mt-2">Ce que je peux faire pour vous.</p>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4" aria-hidden="true">
                  <service.icon className="w-8 h-8" />
                </div>
                <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section id="processus" className="scroll-mt-20" aria-labelledby="process-title">
          <header className="text-center mb-12">
              <h2 id="process-title" className="font-headline text-3xl md:text-4xl font-bold">Mon Processus de Travail</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Une approche structurée pour garantir la réussite de votre projet.</p>
          </header>
          <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>
              <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-16">
                  {processSteps.map((step, index) => (
                      <div key={step.title} className={`md:flex md:gap-6 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                          <div className={`relative flex-shrink-0 w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto md:mx-0`}>
                              <step.icon className="w-10 h-10" />
                          </div>
                          <div className={`text-center md:text-left mt-4 md:mt-0 ${index % 2 === 0 ? '' : 'md:text-right'}`}>
                              <h3 className="font-headline text-2xl font-bold">{step.title}</h3>
                              <p className="text-muted-foreground mt-2">{step.description}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>
      
      {/* Projects Section */}
      <section id="projets" className="scroll-mt-20" aria-labelledby="projects-title">
        <header className="text-center mb-12">
          <h2 id="projects-title" className="font-headline text-3xl md:text-4xl font-bold">Mes projets</h2>
          <p className="text-lg text-muted-foreground mt-2">Quelques exemples de mon travail.</p>
        </header>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

        {/* AI Project Idea Generator Section */}
        <section id="ai-generator" className="scroll-mt-20" aria-labelledby="ai-generator-title">
            <header className="text-center mb-12">
                <h2 id="ai-generator-title" className="font-headline text-3xl md:text-4xl font-bold">
                    <Bot className="inline-block h-10 w-10 mr-2 text-primary" />
                    En Manque d'Inspiration ?
                </h2>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Décrivez votre activité ou votre idée, et laissez l'IA vous suggérer un concept de site web !</p>
            </header>
            <div className="max-w-2xl mx-auto">
                <ProjectIdeaGenerator />
            </div>
        </section>

      {/* Pricing Section */}
      <section id="tarifs" className="scroll-mt-20" aria-labelledby="tarifs-title">
        <header className="text-center mb-12">
          <h2 id="tarifs-title" className="font-headline text-3xl md:text-4xl font-bold">Mes Tarifs</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Des offres claires et adaptées à vos besoins. Pour une estimation plus précise, utilisez le calculateur de devis.</p>
        </header>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan) => (
                <Card key={plan.title} className={`flex flex-col ${plan.featured ? 'border-primary border-2 shadow-lg' : ''}`}>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{plan.title}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <p className="text-3xl font-bold text-primary pt-4">{plan.price}</p>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                        <ul className="space-y-3 mb-6 flex-grow" aria-label={`Fonctionnalités incluses dans l'offre ${plan.title}`}>
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start">
                                    <CheckCircle2 className="h-5 w-5 text-accent mr-2 mt-0.5 shrink-0" aria-hidden="true" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button asChild size="lg" className="w-full mt-auto" variant={plan.featured ? 'default' : 'outline'}>
                            <Link href="#contact" aria-label={`${plan.cta} pour l'offre ${plan.title}`}>{plan.cta}</Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild size="lg">
                <Link href="/devis" aria-label="Accéder au calculateur de devis">
                    <FileText className="mr-2 h-5 w-5" />
                    Calculer mon devis
                </Link>
            </Button>
        </div>
      </section>

       {/* About Section */}
      <section id="a-propos" className="max-w-4xl mx-auto scroll-mt-20" aria-labelledby="about-title">
        <header className="text-center mb-12">
          <h2 id="about-title" className="font-headline text-3xl md:text-4xl font-bold text-primary">À propos de moi</h2>
          <p className="mt-4 text-lg text-muted-foreground">Mon parcours, ma vision et ma passion pour le web.</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
          <div className="md:col-span-1">
            <div className="aspect-square rounded-full overflow-hidden shadow-lg mx-auto w-48 h-48 md:w-full md:h-auto">
              <Image
                src="https://placehold.co/400x400.png"
                alt="Photo de Matthéo Termine"
                width={400}
                height={400}
                data-ai-hint="professional portrait"
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-6 text-foreground/90">
            <h3 className="font-headline text-3xl font-bold text-foreground">
              Passionné par la création d'expériences web performantes et inclusives.
            </h3>
            <div className="space-y-4 text-lg">
              <p>
                Depuis le début de ma carrière, je me suis consacré à transformer des idées créatives en sites web fonctionnels et esthétiques. Mon objectif est de construire des solutions qui non seulement répondent aux besoins de mes clients, mais qui offrent aussi une expérience utilisateur fluide et agréable pour tous.
              </p>
              <p>
                Je crois fermement en un web ouvert et accessible. C'est pourquoi j'accorde une importance capitale au respect des standards, à la performance et aux normes d'accessibilité (RGAA). Un bon site, selon moi, est un site rapide, facile à utiliser et qui ne laisse personne de côté.
              </p>
              <p>
                Constamment en veille technologique, j'aime explorer de nouveaux outils et de nouvelles méthodes pour améliorer la qualité de mon travail et proposer des solutions toujours plus innovantes.
              </p>
            </div>
            <div className="pt-4">
              <Button asChild size="lg">
                  <Link href="/CV_Matthéo.pdf" target="_blank" rel="noopener noreferrer" aria-label="Télécharger mon CV au format PDF">
                      <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                      Télécharger mon CV
                  </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto scroll-mt-20" aria-labelledby="contact-title">
        <header className="text-center mb-12">
          <h2 id="contact-title" className="font-headline text-3xl md:text-4xl font-bold text-primary">Contactez-moi</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Une question, un projet ? N'hésitez pas à me contacter. Je vous répondrai dans les plus brefs délais.
          </p>
        </header>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div role="region" aria-labelledby="form-title">
            <ContactForm />
          </div>
          <div className="space-y-6" role="region" aria-labelledby="other-contact-title">
            <h3 id="other-contact-title" className="font-headline text-2xl font-bold">Autres moyens de contact</h3>
            <p className="text-muted-foreground">
              Si vous préférez, vous pouvez aussi me joindre directement par email ou via WhatsApp.
            </p>
            <div className="space-y-4">
              <Button asChild variant="outline" className="w-full justify-start text-left h-auto py-3">
                <Link href="mailto:contact@mattheo-termine.fr" aria-label="Envoyer un email à contact@mattheo-termine.fr">
                  <Mail className="mr-4 h-6 w-6 text-primary" aria-hidden="true" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">contact@mattheo-termine.fr</div>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start text-left h-auto py-3">
                <Link href="https://wa.me/33612345678" target="_blank" rel="noopener noreferrer" aria-label="Discuter sur WhatsApp">
                  <MessageCircle className="mr-4 h-6 w-6 text-accent" aria-hidden="true" />
                  <div>
                    <div className="font-semibold">WhatsApp</div>
                    <div className="text-muted-foreground">Discutons en direct</div>
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
