"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    title: "Création de site vitrine responsive",
    description: "Des sites web modernes et adaptatifs qui s'affichent parfaitement sur tous les appareils.",
  },
  {
    icon: WordpressIcon,
    title: "Création de sites WordPress",
    description: "Développement de thèmes et de sites sur mesure avec le CMS le plus populaire au monde.",
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

  return (
    <section 
      id={id}
      ref={ref} 
      className={cn(
        className, 
        "transition-all duration-1000 ease-out scroll-mt-20", 
        !isMounted ? "opacity-100 translate-y-0" : (isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")
      )}
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

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={cn(
        "transition-all duration-800 ease-out",
        !isMounted ? "opacity-100 translate-y-0 scale-100" : (isIntersecting 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-6 scale-95"),
        className
      )}
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
    <section ref={ref} className="about-section py-24" aria-labelledby="about-title">
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
                  <Link href="/cv-mattheo-termine.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Télécharger mon CV
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      <AnimatedSection id="services" className="py-24 bg-secondary/30" aria-labelledby="services-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="services-title" className="text-3xl md:text-4xl font-bold mb-4">
              Mes Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des solutions web complètes adaptées à vos besoins et à votre budget
            </p>
          </div>
          
          <div ref={servicesObserverRef as React.RefObject<HTMLDivElement>} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index} 
                  className={cn(
                    "service-card transition-all duration-700 ease-out",
                    servicesVisible[index] 
                      ? "opacity-100 translate-y-0 scale-100" 
                      : "opacity-0 translate-y-8 scale-95"
                  )}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <CardHeader className="text-center">
                    <div className="service-icon-container w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection id="process" className="process-section py-24" aria-labelledby="process-title">
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

      <AnimatedSection id="pricing" className="py-24 bg-secondary/30" aria-labelledby="pricing-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold mb-4">
              Mes Tarifs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des solutions adaptées à tous les budgets, de la vitrine simple à l&apos;application complexe
            </p>
          </div>
          
          <div ref={pricingObserverRef as React.RefObject<HTMLDivElement>} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={cn(
                  "relative transition-all duration-700 ease-out",
                  plan.featured && "ring-2 ring-primary shadow-lg scale-105",
                  pricingVisible[index] 
                    ? "opacity-100 translate-y-0 scale-100" 
                    : "opacity-0 translate-y-8 scale-95"
                )}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Populaire
                    </span>
                  </div>
                )}
                
                <CardHeader className={plan.headerClass}>
                  <CardTitle className="text-xl">{plan.title}</CardTitle>
                  <div className="text-2xl font-bold">{plan.price}</div>
                  <CardDescription className="text-sm opacity-90">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button asChild className="w-full" variant={plan.featured ? "default" : "outline"}>
                    <Link href={plan.link}>{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
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
              Découvrez quelques-uns de mes projets récents
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((project, index) => (
              <AnimatedDiv key={`project-${project.slug}-${index}`} delay={index * 100}>
                <ProjectCard project={project} />
              </AnimatedDiv>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/projets">
                Voir tous mes projets
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