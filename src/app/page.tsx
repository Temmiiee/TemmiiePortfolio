"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeXml, Gauge, Palette, Accessibility, CheckCircle2, Search, Rocket, PencilRuler, Download, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { StructuredData } from "@/components/StructuredData";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WordpressIcon } from "@/components/icons/WordpressIcon";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { InteractiveGalaxy } from "@/components/InteractiveGalaxy";

const services = [
  {
    icon: Palette,
    title: "Sites web sur-mesure",
    description: "Next.js, React, TypeScript. Design unique et architecture moderne pour une UX exceptionnelle.",
  },
  {
    icon: WordpressIcon,
    title: "Solutions WordPress",
    description: "Thèmes personnalisés, plugins sur-mesure et optimisation complète de l'écosystème.",
  },
  {
    icon: Gauge,
    title: "Performance & SEO",
    description: "Core Web Vitals <2s, balisage structuré et stratégies SEO pour dominer Google.",
  },
  {
    icon: Accessibility,
    title: "Accessibilité RGAA",
    description: "Conformité RGAA 4.1 et WCAG 2.1 AA pour un web inclusif et légalement conforme.",
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
    description: "Je mets votre site en ligne sur l’hébergement choisi (le vôtre ou celui que je gère pour vous), et je veille à ce qu’il soit sécurisé, rapide et accessible dès sa mise en service.",
  },
];

const pricingPlans = [
  {
    title: "Site Vitrine Classique",
    price: "À partir de 550€",
    description: "Site vitrine avec design basé sur un template personnalisé. Idéal pour présenter vos services et informations simplement, quelle que soit la structure du site.",
    features: [
      "Design moderne et responsive (template personnalisé)",
      "Formulaire de contact fonctionnel",
      "Optimisation SEO de base",
      "Mise en ligne sur votre hébergement",
      "Accompagnement pour la prise en main du site",
    ],
    cta: "Choisir cette offre",
    featured: false,
    link: "/devis?siteType=vitrine&designType=template",
    headerClass: "bg-pricing-basic text-pricing-basic-foreground border-b border-border"
  },
  {
    title: "Site Sur-Mesure / Landing Page",
    price: "À partir de 1150€",
    description: "Site sur-mesure ou landing page avec design unique, adapté à la complexité et aux besoins spécifiques de votre projet (structure, fonctionnalités, animations, etc.).",
    features: [
      "Design 100% sur-mesure",
      "Animations et sections personnalisées",
      "Intégration de contenu (textes, images)",
      "Optimisation SEO avancée",
      "Support prioritaire",
    ],
    cta: "Choisir cette offre",
    featured: true,
    link: "/devis?siteType=vitrine&designType=custom",
    headerClass: "bg-pricing-premium text-pricing-premium-foreground",
  },
  {
    title: "Application Web",
    price: "À partir de 2500€",
    description: "Solution complète pour les projets complexes nécessitant des fonctionnalités sur mesure (SaaS, plateforme...).",
    features: [
      "Espace utilisateur (connexion, etc.)",
      "Fonctionnalités sur-mesure",
      "Base de données",
      "Déploiement sur votre hébergement",
      "Maintenance mensuelle en option",
      "Accompagnement dédié",
    ],
    cta: "Choisir cette offre",
    featured: false,
    link: "/devis?siteType=webapp",
    headerClass: "bg-pricing-pro text-pricing-pro-foreground"
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
    link: "/devis",
    headerClass: "bg-pricing-enterprise text-pricing-enterprise-foreground border-b border-border",
  },
];

const AnimatedSection = ({ children, className, id, ...props }: { 
  children: React.ReactNode, 
  className?: string, 
  id: string, 
  "aria-labelledby"?: string 
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({ 
    threshold: 0.2, 
    rootMargin: '-50px 0px -100px 0px' 
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Séparer les classes statiques des classes dynamiques pour éviter l'hydratation
  const staticClasses = cn(className, "transition-all duration-1000 ease-out scroll-mt-20");

  return (
    <section 
      id={id}
      ref={ref} 
      className={staticClasses}
      style={{
        opacity: !isMounted ? 1 : (isIntersecting ? 1 : 0),
        transform: !isMounted ? 'translateY(0)' : (isIntersecting ? 'translateY(0)' : 'translateY(2rem)')
      }}
      suppressHydrationWarning
      {...props}
    >
      {children}
    </section>
  );
};

const AnimatedDiv = ({ 
  children, 
  className, 
  delay = 0, 
  ...props 
}: { 
  children: React.ReactNode, 
  className?: string, 
  delay?: number 
} & React.HTMLAttributes<HTMLDivElement>) => {
  const [isMounted, setIsMounted] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({ 
    threshold: 0.3, 
    rootMargin: '-30px 0px -100px 0px', 
    triggerOnce: true 
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const staticClasses = cn("transition-all duration-800 ease-out", className);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={staticClasses}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: !isMounted ? 1 : (isIntersecting ? 1 : 0),
        transform: !isMounted ? 'translateY(0) scale(1)' : (isIntersecting 
          ? 'translateY(0) scale(1)' 
          : 'translateY(1.5rem) scale(0.95)')
      }}
      suppressHydrationWarning
      {...props}
    >
      {children}
    </div>
  );
};

const AboutSection = () => {
  const [photoVisible, setPhotoVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '-50px 0px -100px 0px',
    triggerOnce: true,
  });

  useEffect(() => {
    if (isIntersecting) {
      // Animation séquentielle plus fluide
      setTimeout(() => setPhotoVisible(true), 400);
      setTimeout(() => setContentVisible(true), 600);
    }
  }, [isIntersecting]);

  return (
    <section id="a-propos" ref={ref} className="about-section py-24" aria-labelledby="about-title" suppressHydrationWarning>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="about-title" className="text-3xl md:text-4xl font-bold mb-4">
            À propos de moi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Développeur passionné par la création d&apos;expériences web exceptionnelles
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo - Animation depuis le centre vers la gauche */}
            <div className="flex justify-center lg:justify-end">
              <div 
                className={cn(
                  "about-photo-container transition-all duration-1000 ease-out",
                  photoVisible 
                    ? "opacity-100 translate-x-0 scale-100" 
                    : "opacity-0 translate-x-8 scale-95"
                )}
              >
                <div className="relative">
                  <Image
                    src="/images/mattheo-termine-photo.png"
                    alt="Mattheo Termine - Intégrateur web freelance"
                    width={300}
                    height={300}
                    className="about-photo rounded-full border-4 border-white shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Contenu - Animation depuis le centre vers la droite */}
            <div 
              className={cn(
                "about-content transition-all duration-1000 ease-out",
                contentVisible 
                  ? "opacity-100 translate-x-0 scale-100" 
                  : "opacity-0 -translate-x-8 scale-98"
              )}
            >
              <div className="about-text space-y-8 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Passionné par la création d&apos;expériences web performantes et inclusives. 
                  Je transforme des idées créatives en sites web fonctionnels, que ce soit en 
                  écrivant du code sur-mesure ou en personnalisant des solutions WordPress.
                </p>
                
                <p>
                  Mon objectif est de construire des plateformes qui répondent aux besoins de 
                  mes clients et qui offrent une expérience utilisateur fluide.
                </p>
                
                <p>
                  Je crois fermement en un web ouvert et accessible. C&apos;est pourquoi j&apos;accorde 
                  une importance capitale au respect des standards, à la performance et aux 
                  normes d&apos;accessibilité (RGAA). Un bon site, selon moi, est un site rapide, 
                  facile à utiliser et qui ne laisse personne de côté.
                </p>
                
                <p>
                  Constamment en veille technologique, j&apos;aime explorer de nouveaux outils et 
                  de nouvelles méthodes pour améliorer la qualité de mon travail et proposer 
                  des solutions toujours plus innovantes.
                </p>
              </div>

              <div className={cn(
                "mt-8 transition-all duration-1000 ease-out",
                contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: "400ms" }}
              >
              <Button asChild size="lg" className="cv-button group">
                <Link
                  href="/cv-mattheo-termine.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Voir mon CV dans une nouvelle fenêtre"
                  className="flex items-center justify-center gap-2"
                >
                  Voir mon CV
                    {/* Icône d'ouverture dans une nouvelle fenêtre */}
                    <svg
                      className="w-5 h-5 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                </Link>
              </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroSection = () => {
  const [nameVisible, setNameVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const fullText = "Intégrateur web freelance";

  useEffect(() => {
    const timers = [
      setTimeout(() => setNameVisible(true), 200),
      setTimeout(() => setTitleVisible(true), 800),
      setTimeout(() => setSubtitleVisible(true), 2000),
      setTimeout(() => setDescriptionVisible(true), 2400),
      setTimeout(() => setButtonsVisible(true), 2800),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Animation de typing pour le sous-titre
  useEffect(() => {
    if (!titleVisible) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypingText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [titleVisible, fullText]);

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden" suppressHydrationWarning>
      {/* Arrière-plan galaxie interactif */}
      <InteractiveGalaxy />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Nom principal avec animation */}
        <h1 className={cn(
          "text-5xl md:text-7xl lg:text-8xl font-bold mb-4 transition-all duration-1000 hero-glow",
          nameVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="hero-title-enhanced">
            {"Mattheo Termine".split("").map((char, index) => (
              <span
                key={`name-${index}`}
                className={cn(
                  "inline-block transition-all duration-700 ease-out",
                  nameVisible 
                    ? "opacity-100 translate-y-0 rotate-0" 
                    : "opacity-0 translate-y-12 rotate-12"
                )}
                style={{
                  transitionDelay: `${index * 80 + 200}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        {/* Sous-titre avec effet de typing */}
        <div className={cn(
          "text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 transition-all duration-800 min-h-[3rem] flex items-center justify-center",
          titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <span className="typing-container text-primary">
            {typingText}
            {showCursor && <span className="typing-cursor">|</span>}
          </span>
        </div>

        {/* Description */}
        <p className={cn(
          "text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto transition-all duration-800",
          subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          Création de sites web modernes, performants et accessibles pour développer votre présence en ligne
        </p>

        {/* Sous-description */}
        <p className={cn(
          "text-lg text-muted-foreground mb-12 max-w-2xl mx-auto transition-all duration-800",
          descriptionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          Spécialisé dans le développement web sur-mesure, j&apos;accompagne les entreprises et particuliers 
          dans la création de leur identité numérique.
        </p>

        <div className={cn(
          "flex flex-col sm:flex-row gap-4 justify-center transition-all duration-800",
          buttonsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <Button asChild size="lg" className="hero-button-enhanced">
            <Link href="/devis">
              Demander un devis gratuit
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#services">
              Découvrir mes services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  // États pour les animations des sections
  const [servicesVisible, setServicesVisible] = useState<boolean[]>(new Array(services.length).fill(false));
  const [processVisible, setProcessVisible] = useState<boolean[]>(new Array(processSteps.length).fill(false));
  const [pricingVisible, setPricingVisible] = useState<boolean[]>(new Array(pricingPlans.length).fill(false));



  // Hooks pour déclencher les animations des sections
  const { ref: servicesObserverRef, isIntersecting: servicesIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px 0px -100px 0px',
    triggerOnce: true,
  });

  const { ref: processObserverRef, isIntersecting: processIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px 0px -100px 0px',
    triggerOnce: true,
  });

  const { ref: pricingObserverRef, isIntersecting: pricingIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px 0px -100px 0px',
    triggerOnce: true,
  });

  // Déclencher les animations séquentielles
  useEffect(() => {
    if (servicesIntersecting) {
      services.forEach((_, index) => {
        setTimeout(() => {
          setServicesVisible(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 150);
      });
    }
  }, [servicesIntersecting]);

  useEffect(() => {
    if (processIntersecting) {
      processSteps.forEach((_, index) => {
        setTimeout(() => {
          setProcessVisible(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 200);
      });
    }
  }, [processIntersecting]);

  useEffect(() => {
    if (pricingIntersecting) {
      pricingPlans.forEach((_, index) => {
        setTimeout(() => {
          setPricingVisible(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 150);
      });
    }
  }, [pricingIntersecting]);

  return (
    <>
      <StructuredData />
      
      <HeroSection />

      <AnimatedSection id="services" className="py-16 bg-secondary/30" aria-labelledby="services-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="services-title" className="text-3xl md:text-4xl font-bold mb-4">
              Mes Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expertise technique et solutions web avancées
            </p>
          </div>
          
          <div ref={servicesObserverRef as React.RefObject<HTMLDivElement>} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index} 
                  className={cn(
                    "service-card transition-all duration-700 ease-out h-full",
                    servicesVisible[index] 
                      ? "opacity-100 translate-y-0 scale-100" 
                      : "opacity-0 translate-y-8 scale-95"
                  )}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <CardHeader className="text-center pb-3">
                    <div className="service-icon-container w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-center text-sm leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Technical Expertise Subsection - More compact */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-card border">
                <h3 className="font-semibold mb-1 text-primary text-sm">Stack moderne</h3>
                <p className="text-xs text-muted-foreground">Next.js, React, TypeScript</p>
              </div>
              <div className="p-4 rounded-lg bg-card border">
                <h3 className="font-semibold mb-1 text-primary text-sm">Performance</h3>
<p className="text-xs text-muted-foreground">Vitesse &lt;2s, Lighthouse &gt;90</p>
              </div>
              <div className="p-4 rounded-lg bg-card border">
                <h3 className="font-semibold mb-1 text-primary text-sm">Standards</h3>
                <p className="text-xs text-muted-foreground">RGAA 4.1, WCAG 2.1 AA</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="projects" className="py-24" aria-labelledby="projects-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="projects-title" className="text-3xl md:text-4xl font-bold mb-4">
              Mes Réalisations
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez quelques-uns de mes projets récents qui illustrent mon expertise technique
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((project, index) => (
              <AnimatedDiv key={`project-${project.slug}-${index}`} delay={index * 100}>
                <ProjectCard project={project} />
              </AnimatedDiv>
            ))}
          </div>
          
          {projects.length > 3 && (
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link href="/projets">
                  Voir tous mes projets
                </Link>
              </Button>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection id="processus" className="process-section py-24 bg-secondary/30" aria-labelledby="process-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="process-title" className="text-3xl md:text-4xl font-bold mb-4">
              Mon Processus de Travail
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une approche structurée pour garantir le succès de votre projet web
            </p>
          </div>
          
          <div ref={processObserverRef as React.RefObject<HTMLDivElement>} className="process-timeline">
            {/* Particules flottantes décoratives */}
            <div className="floating-particle"></div>
            <div className="floating-particle"></div>
            <div className="floating-particle"></div>
            
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className={cn(
                    "process-step transition-all duration-700 ease-out",
                    isLeft ? "left" : "right",
                    processVisible[index] 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-8"
                  )}
                  style={{
                    transitionDelay: `${index * 200}ms`,
                  }}
                >
                  <div className="process-icon">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="process-content">
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection 
        id="pricing" 
        className="py-24 bg-secondary/30" 
        aria-labelledby="pricing-title"
        aria-describedby="pricing-description"
      >
        <div className="container mx-auto px-4">
          <header className="text-center mb-16">
            <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Mes Tarifs de Création de Sites Web
            </h2>
            <p id="pricing-description" className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des solutions adaptées à tous les budgets, de la vitrine simple à l&apos;application complexe. 
              Tarifs transparents pour développeur web freelance spécialisé en accessibilité RGAA.
            </p>
          </header>
          
          <div 
            ref={pricingObserverRef as React.RefObject<HTMLDivElement>} 
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            role="group"
            aria-label="Offres tarifaires de création de sites web"
            style={{ paddingTop: '2rem', overflow: 'visible' }}
          >
            {pricingPlans.map((plan, index) => {
              const planId = `pricing-plan-${index + 1}`;
              const isBasic = index === 0;
              const isPremium = plan.featured;
              const isPro = index === 2;
              const isEnterprise = index === 3;
              
              return (
                <article 
                  key={index}
                  id={planId}
                  className={cn(
                    "relative transition-all duration-700 ease-out bg-card border border-border rounded-lg flex flex-col",
                    "hover:shadow-xl hover:-translate-y-1",
                    plan.featured && "ring-2 ring-primary shadow-lg scale-105",
                    pricingVisible[index] 
                      ? "opacity-100 translate-y-0 scale-100" 
                      : "opacity-0 translate-y-8 scale-95"
                  )}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                    zIndex: plan.featured ? 10 : 1,
                    overflow: 'visible'
                  }}
                  role="region"
                  aria-labelledby={`${planId}-title`}
                  aria-describedby={`${planId}-description ${planId}-features`}
                >
                  {plan.featured && (
                    <div 
                      className="absolute left-1/2 transform -translate-x-1/2" 
                      style={{ 
                        top: '-22px',
                        zIndex: 50
                      }}
                    >
                      <span 
                        className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium shadow-lg border-2 border-white/50"
                        aria-label="Offre la plus populaire"
                        style={{ 
                          position: 'relative',
                          display: 'inline-block',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        🌟 Populaire
                      </span>
                    </div>
                  )}
                  
                  <header className={cn(
                    "pricing-card-header p-6 text-center border-b border-border",
                    isBasic && "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20",
                    isPremium && "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
                    isPro && "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
                    isEnterprise && "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20"
                  )}>
                    <h3 id={`${planId}-title`} className={cn(
                      "pricing-card-title text-xl font-bold mb-3",
                      isBasic && "text-emerald-700 dark:text-emerald-300",
                      isPremium && "text-purple-700 dark:text-purple-300",
                      isPro && "text-blue-700 dark:text-blue-300",
                      isEnterprise && "text-orange-700 dark:text-orange-300"
                    )}>
                      {plan.title}
                    </h3>
                    <div className={cn(
                      "pricing-card-price text-3xl font-bold mb-3",
                      isBasic && "text-emerald-800 dark:text-emerald-200",
                      isPremium && "text-purple-800 dark:text-purple-200",
                      isPro && "text-blue-800 dark:text-blue-200",
                      isEnterprise && "text-orange-800 dark:text-orange-200"
                    )}>
                      <span aria-label={`Prix: ${plan.price}`}>{plan.price}</span>
                    </div>
                    <p id={`${planId}-description`} className="pricing-card-description text-sm text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                  </header>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="sr-only">Fonctionnalités incluses dans l&apos;offre {plan.title}</h4>
                    <ul 
                      id={`${planId}-features`}
                      className="space-y-3 mb-6 flex-1"
                      role="list"
                      aria-label={`Fonctionnalités de l'offre ${plan.title}`}
                    >
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3" role="listitem">
                          <CheckCircle2 
                            className={cn(
                              "w-5 h-5 mt-0.5 flex-shrink-0",
                              isBasic && "text-emerald-600 dark:text-emerald-400",
                              isPremium && "text-purple-600 dark:text-purple-400",
                              isPro && "text-blue-600 dark:text-blue-400",
                              isEnterprise && "text-orange-600 dark:text-orange-400"
                            )}
                            aria-hidden="true"
                          />
                          <span className="text-sm text-card-foreground leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-auto">
                      <Button 
                        asChild 
                        className={cn(
                          "w-full font-semibold transition-all duration-300",
                          isBasic && "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600",
                          isPremium && "bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600",
                          isPro && "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600",
                          isEnterprise && "bg-orange-600 hover:bg-orange-700 text-white dark:bg-orange-500 dark:hover:bg-orange-600"
                        )}
                        variant={plan.featured ? "default" : "secondary"}
                      >
                        <Link 
                          href={plan.link}
                          aria-label={`${plan.cta} - Offre ${plan.title} à ${plan.price}`}
                          className="flex items-center justify-center gap-2 px-4 py-2"
                        >
                          {plan.cta}
                          <span aria-hidden="true">→</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          
          <div className="text-center mt-12 p-6 bg-muted/50 rounded-lg max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold mb-3 text-foreground">💡 Besoin d&apos;un conseil personnalisé ?</h3>
            <p className="text-muted-foreground mb-4">
              Tous mes tarifs incluent l&apos;optimisation SEO, la conformité RGAA (accessibilité), 
              et un suivi personnalisé. Chaque projet est unique, n&apos;hésitez pas à me contacter 
              pour une estimation précise et gratuite.
            </p>
            <Button asChild variant="outline" className="font-medium">
              <Link href="#contact" aria-label="Contacter Matthéo Termine pour un devis personnalisé">
                📞 Discutons de votre projet
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>

      <AboutSection />

      <AnimatedSection id="contact" className="py-24 bg-secondary/30" aria-labelledby="contact-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="contact-title" className="text-3xl md:text-4xl font-bold mb-4">
              Parlons de Votre Projet
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Prêt à donner vie à votre projet web ? Contactez-moi pour un devis personnalisé
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedDiv delay={200}>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground">contact@votre-domaine.fr</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MessageCircle className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Réponse rapide</h3>
                    <p className="text-muted-foreground">
                      Je réponds généralement sous 24h pour discuter de votre projet
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Download className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Devis gratuit</h3>
                    <p className="text-muted-foreground">
                      Obtenez une estimation détaillée sans engagement
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedDiv>
            
            <AnimatedDiv delay={400}>
              <ContactForm />
            </AnimatedDiv>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}