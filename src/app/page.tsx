"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CodeXml,
  Gauge,
  Palette,
  Accessibility,
  CheckCircle2,
  Search,
  Rocket,
  PencilRuler,
  Mail,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { StructuredData } from "@/components/StructuredData";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WordpressIcon } from "@/components/icons";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { InteractiveGalaxy } from "@/components/InteractiveGalaxy";
import { useTranslation } from "@/hooks/useTranslation";

const services = [
  {
    icon: Palette,
    title: "Sites web sur-mesure",
    description:
      "Next.js, React, TypeScript. Design unique et architecture moderne pour une UX exceptionnelle.",
  },
  {
    icon: WordpressIcon,
    title: "Solutions WordPress",
    description:
      "Thèmes personnalisés, plugins sur-mesure et optimisation complète de l'écosystème.",
  },
  {
    icon: Gauge,
    title: "Performance & SEO",
    description:
      "Core Web Vitals <2s, balisage structuré et stratégies SEO pour dominer Google.",
  },
  {
    icon: Accessibility,
    title: "Accessibilité RGAA",
    description:
      "Conformité RGAA 4.1 et WCAG 2.1 AA pour un web inclusif et légalement conforme.",
  },
];

const processSteps = [
  {
    icon: Search,
    title: "1. Découverte",
    description:
      "Nous discutons de vos objectifs, de votre cible et de vos besoins pour définir les contours de votre projet.",
  },
  {
    icon: PencilRuler,
    title: "2. Maquettage & Design",
    description:
      "Je conçois une maquette visuelle et un design sur-mesure qui reflètent votre identité de marque.",
  },
  {
    icon: CodeXml,
    title: "3. Développement",
    description:
      "Je transforme le design validé en un site web fonctionnel, performant et accessible.",
  },
  {
    icon: Rocket,
    title: "4. Déploiement",
    description:
      "Je mets votre site en ligne sur l’hébergement choisi (le vôtre ou celui que je gère pour vous), et je veille à ce qu’il soit sécurisé, rapide et accessible dès sa mise en service.",
  },
];

const AnimatedSection = ({
  children,
  className,
  id,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  id: string;
  "aria-labelledby"?: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "-50px 0px -100px 0px",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={cn(className, "scroll-mt-20")}
      suppressHydrationWarning
      style={{
        opacity: !isMounted ? 1 : isIntersecting ? 1 : 0.3,
        transform: !isMounted
          ? "translateY(0)"
          : isIntersecting
          ? "translateY(0)"
          : "translateY(2rem)",
        transitionProperty: "all",
        transitionDuration: "1000ms",
        transitionTimingFunction: "ease-out",
      }}
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
  children: React.ReactNode;
  className?: string;
  delay?: number;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const [isMounted, setIsMounted] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: "-30px 0px -100px 0px",
    triggerOnce: true,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(className)}
      suppressHydrationWarning
      style={{
        transitionDelay: `${delay}ms`,
        transitionProperty: "all",
        transitionDuration: "800ms",
        transitionTimingFunction: "ease-out",
        opacity: !isMounted ? 1 : isIntersecting ? 1 : 0,
        transform: !isMounted
          ? "translateY(0) scale(1)"
          : isIntersecting
          ? "translateY(0) scale(1)"
          : "translateY(1.5rem) scale(0.95)",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const AboutSection = () => {
  const { t } = useTranslation();
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "-20px 0px -50px 0px",
    triggerOnce: true,
  });

  return (
    <section
      id="a-propos"
      ref={ref}
      className="py-20 md:py-24 bg-secondary/20"
      aria-labelledby="about-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section avec animation d'apparition */}
        <div
          className={cn(
            "text-center mb-12 md:mb-16",
            isIntersecting ? "animate-fade-in-up" : "opacity-0"
          )}
        >
          <h2
            id="about-title"
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground whitespace-nowrap sm:whitespace-normal"
          >
            {t('about.title')}
          </h2>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4"
            style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
          >
            {t('about.subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Photo - Animation fluide depuis la gauche */}
            <div className="flex justify-center lg:justify-end order-2 lg:order-1">
              <div
                className={cn(
                  "about-photo-container",
                  isIntersecting
                    ? "animate-slide-in-left animate-delay-200"
                    : "opacity-0"
                )}
              >
                <div className="relative group cursor-pointer interactive-element focus-enhanced" aria-label="Mattheo Termine - Intégrateur web freelance" role="img" aria-roledescription="Photo de Matthéo Termine" style={{ left: -15 }}>
                  <Image
                    src="/images/mattheo-termine-photo.png"
                    alt="Mattheo Termine - Intégrateur web freelance"
                    width={280}
                    height={280}
                    className="rounded-full border-4 border-white shadow-enhanced transition-all duration-500 ease-out group-hover:scale-105 group-hover:border-primary/50 crisp-edges image-load-animation"
                    priority
                    sizes="(max-width: 768px) 200px, 280px"
                    quality={85}
                    loading="eager"
                    fetchPriority="high"
                  />
                  {/* Effet de halo amélioré */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full blur-xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out will-change-transform"></div>
                  {/* Effet de brillance au hover */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-opacity"></div>
                  {/* Indicateur d'interactivité pour l'accessibilité */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>

            {/* Contenu - Animation depuis la droite */}
            <div
              className={cn(
                "order-1 lg:order-2",
                isIntersecting
                  ? "animate-slide-in-right animate-delay-400"
                  : "opacity-0"
              )}
            >
              <div className="space-y-6 md:space-y-8 text-base md:text-lg leading-relaxed text-muted-foreground">
                <p
                  className="first-letter:text-2xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 px-4"
                  style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
                >
                  {t('about.p1')}
                </p>

                <p
                  className="px-4"
                  style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
                >
                  {t('about.p2')}
                </p>

                <p
                  className="px-4"
                  style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
                >
                  {t('about.p3')}
                </p>

                <p
                  className="px-4"
                  style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
                >
                  {t('about.p4')}
                </p>
              </div>

              {/* Bouton CV avec animation */}
              <div
                className={cn(
                  "mt-8 md:mt-10",
                  isIntersecting
                    ? "animate-scale-in animate-delay-800"
                    : "opacity-0"
                )}
              >
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground shadow-enhanced transition-all duration-300 hover:scale-105 px-4 whitespace-nowrap focus-enhanced interactive-element w-full sm:w-auto"
                >
                  <Link
                    href="/cv-mattheo-termine.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('a11y.downloadCV')}
                    className="flex items-center justify-center gap-3 px-6 py-3 relative z-10 min-h-[44px]"
                  >
                    <span className="transition-transform duration-300 group-hover:-translate-y-0.5 text-sm sm:text-base">
                      <span className="hidden sm:inline">
                        {t('about.downloadCV')}
                      </span>
                      <span className="sm:hidden">{t('about.downloadCVShort')}</span>
                    </span>
                    {/* Icône de téléchargement améliorée */}
                    <svg
                      className="w-5 h-5 transition-all duration-300 group-hover:translate-y-0.5 group-hover:scale-110 will-change-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                      role="img"
                    >
                      <title>Icône de téléchargement</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {/* Effet de brillance au hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out will-change-transform"></div>
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
  const { t } = useTranslation();
  const [animationStep, setAnimationStep] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  const fullText = t('hero.subtitle');

  useEffect(() => {
    // Smooth startup animation sequence
    const animationSequence = [
      () => setAnimationStep(1), // Name appears
      () => setAnimationStep(2), // Subtitle starts
      () => setAnimationStep(3), // Description appears
      () => setAnimationStep(4), // Button appears
    ];

    const timers = animationSequence.map(
      (fn, index) => setTimeout(fn, (index + 1) * 500) // Smoother timing
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  // Smooth typing animation
  useEffect(() => {
    if (animationStep < 2) return;

    setShowCursor(true);
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypingText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowCursor(false), 1500);
      }
    }, 60); // Faster typing

    return () => clearInterval(typingInterval);
  }, [animationStep, fullText]);

  return (
    <section
      id="accueil"
      className="hero-section relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
      role="banner"
      aria-labelledby="hero-title"
    >
      {/* Arrière-plan galaxie interactif */}
      <InteractiveGalaxy />

      <div
        className="container mx-auto px-4 text-center relative z-10"
        suppressHydrationWarning
      >
        {/* Nom principal avec animation fluide */}
        <h1
          id="hero-title"
          className={cn(
            "text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-foreground drop-shadow-2xl whitespace-nowrap transition-all duration-1000 ease-out",
            animationStep >= 1
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          <span className="hero-title-enhanced inline-block">
            {"Matthéo\u00A0Termine".split("").map((char, index) => (
              <span
                key={`name-${index}`}
                className={cn(
                  "inline-block transition-all duration-700 ease-out",
                  animationStep >= 1
                    ? "opacity-100 translate-y-0 rotate-0"
                    : "opacity-0 translate-y-12 rotate-12"
                )}
                style={{
                  transitionDelay: `${index * 50 + 100}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        {/* Sous-titre avec effet de typing amélioré */}
        <div
          className={cn(
            "text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 flex items-center justify-center transition-all duration-800 ease-out",
            animationStep >= 2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          )}
        >
          <span className="text-primary whitespace-nowrap">
            {typingText.replace(/\s/g, "\u00A0")}
            {showCursor && (
              <span className="animate-pulse text-primary">|</span>
            )}
          </span>
        </div>

        {/* Description principale */}
        <p
          className={cn(
            "text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed px-4 transition-all duration-800 ease-out",
            animationStep >= 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          )}
          style={{
            wordBreak: "keep-all",
            overflowWrap: "break-word",
            transitionDelay: "200ms",
          }}
        >
          {t('hero.description')}
        </p>

        {/* Sous-description */}
        <p
          className={cn(
            "text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed px-4 transition-all duration-800 ease-out",
            animationStep >= 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          )}
          style={{
            wordBreak: "keep-all",
            overflowWrap: "break-word",
            transitionDelay: "400ms",
          }}
        >
          {t('hero.subdescription')}
        </p>

        <div
          className={cn(
            "flex justify-center px-4 transition-all duration-800 ease-out",
            animationStep >= 4
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: "600ms" }}
        >

          {/* Indicateur de scroll principal - version discrète */}
          <div className="flex flex-col items-center gap-4 mt-12">
            <button
              className="flex flex-col items-center gap-3 cursor-pointer group focus-enhanced bg-transparent border-none p-6 rounded-lg hover:bg-white/3 transition-all duration-500 animate-slow-bounce animate-subtle-pulse"
              onClick={() => {
                const projectsSection = document.querySelector("#projects");
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              aria-label={t('a11y.scrollToProjects')}
              aria-describedby="scroll-indicator-description"
              type="button"
            >
              <span className="text-white/50 text-sm font-light group-hover:text-white/70 transition-colors duration-500">
                {t('hero.discover')}
              </span>
              <svg
                className="w-6 h-6 text-white/40 group-hover:text-white/60 group-hover:scale-105 transition-all duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Description accessible pour l'indicateur de scroll */}
        <div className="sr-only">
          <p id="scroll-indicator-description">
            {t('a11y.scrollDescription')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const { t } = useTranslation();
  
  // États pour les animations des sections - initialisés comme visibles pour éviter l'hydratation
  const [isMounted, setIsMounted] = useState(false);
  const [servicesVisible, setServicesVisible] = useState<boolean[]>(
    new Array(services.length).fill(true)
  );
  const [processVisible, setProcessVisible] = useState<boolean[]>(
    new Array(processSteps.length).fill(true)
  );

  // Hooks pour déclencher les animations des sections
  const { ref: servicesObserverRef, isIntersecting: servicesIntersecting } =
    useIntersectionObserver({
      threshold: 0.2,
      rootMargin: "-50px 0px -100px 0px",
      triggerOnce: true,
    });

  const { ref: processObserverRef, isIntersecting: processIntersecting } =
    useIntersectionObserver({
      threshold: 0.2,
      rootMargin: "-50px 0px -100px 0px",
      triggerOnce: true,
    });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Déclencher les animations séquentielles
  useEffect(() => {
    if (isMounted && servicesIntersecting) {
      // Reset pour l'animation
      setServicesVisible(new Array(services.length).fill(false));

      services.forEach((_, index) => {
        setTimeout(() => {
          setServicesVisible((prev: boolean[]) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 150);
      });
    }
  }, [servicesIntersecting, isMounted]);

  useEffect(() => {
    if (isMounted && processIntersecting) {
      // Reset pour l'animation
      setProcessVisible(new Array(processSteps.length).fill(false));

      processSteps.forEach((_, index) => {
        setTimeout(() => {
          setProcessVisible((prev: boolean[]) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 200);
      });
    }
  }, [processIntersecting, isMounted]);

  // Stubs pour la section tarifs (préservés pour compatibilité après suppression)
  type PricingPlan = {
    featured?: boolean;
    title?: string;
    headerClass?: string;
    price?: string;
    description?: string;
    features?: string[];
    link?: string;
    cta?: string;
  };

  const pricingObserverRef = React.createRef<HTMLDivElement>();
  const pricingPlans: PricingPlan[] = [];
  const pricingVisible: boolean[] = [];

  return (
    <>
      <StructuredData />

      <HeroSection />

      {/* SECTION MES SERVICES - TEMPORAIREMENT MASQUÉE */}
      {false && (
        <AnimatedSection
          id="services"
          className="py-16 bg-secondary/30"
          aria-labelledby="services-title"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                id="services-title"
                className="text-3xl md:text-4xl font-bold mb-4 whitespace-nowrap sm:whitespace-normal"
              >
                Mes&nbsp;Services
              </h2>
              <p
                className="text-lg text-muted-foreground max-w-2xl mx-auto px-4"
                style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
              >
                Expertise technique et&nbsp;solutions web&nbsp;avancées
              </p>
            </div>

            <div
              ref={servicesObserverRef as React.RefObject<HTMLDivElement>}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    className="h-full"
                    suppressHydrationWarning
                    style={{
                      opacity: !isMounted ? 1 : servicesVisible[index] ? 1 : 0,
                      transform: !isMounted
                        ? "translateY(0px) scale(1)"
                        : servicesVisible[index]
                        ? "translateY(0px) scale(1)"
                        : "translateY(32px) scale(0.95)",
                      transitionProperty: "all",
                      transitionDuration: "700ms",
                      transitionTimingFunction: "ease-out",
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    <CardHeader className="text-center pb-3">
                      <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-center text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Technical Expertise Subsection - More compact */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-card border">
                  <h3 className="font-semibold mb-1 text-primary text-sm">
                    Stack moderne
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Next.js, React, TypeScript
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border">
                  <h3 className="font-semibold mb-1 text-primary text-sm">
                    Performance
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Vitesse &lt;2s, Lighthouse &gt;90
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border">
                  <h3 className="font-semibold mb-1 text-primary text-sm">
                    Standards
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    RGAA 4.1, WCAG 2.1 AA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection
        id="projects"
        className="py-24"
        aria-labelledby="projects-title"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              id="projects-title"
              className="text-3xl md:text-4xl font-bold mb-4 whitespace-nowrap sm:whitespace-normal"
            >
              {t('projects.title')}
            </h2>
            <p
              className="text-xl text-muted-foreground max-w-2xl mx-auto px-4"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              {t('projects.subtitle')}
            </p>
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="list"
            aria-label={t('projects.listLabel')}
          >
            {projects.slice(0, 6).map((project, index) => (
              <AnimatedDiv
                key={`project-${project.slug}-${index}`}
                delay={index * 100}
                className="will-change-transform"
                role="listitem"
              >
                <ProjectCard project={project} />
              </AnimatedDiv>
            ))}
          </div>

          {projects.length > 3 && (
            <div className="text-center mt-12">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group px-4 whitespace-nowrap shadow-enhanced interactive-element focus-visible min-h-[44px]"
              >
                <Link
                  href="/projets"
                  aria-label={t('a11y.viewAllProjects')}
                  className="inline-flex items-center gap-2"
                >
                  <span className="transition-transform duration-300 group-hover:scale-105">
                    Voir tous mes&nbsp;projets
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* SECTION MON PROCESSUS DE TRAVAIL - TEMPORAIREMENT MASQUÉE */}
      {false && (
        <AnimatedSection
          id="processus"
          className="py-24 bg-secondary/30"
          aria-labelledby="process-title"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2
                id="process-title"
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Mon Processus de Travail
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Une approche structurée pour garantir le succès de votre projet
                web
              </p>
            </div>

            <div
              ref={processObserverRef as React.RefObject<HTMLDivElement>}
              className="max-w-4xl mx-auto"
            >
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-6 mb-12 last:mb-0"
                    suppressHydrationWarning
                    style={{
                      opacity: !isMounted ? 1 : processVisible[index] ? 1 : 0,
                      transform: !isMounted
                        ? "translateY(0px)"
                        : processVisible[index]
                        ? "translateY(0px)"
                        : "translateY(32px)",
                      transitionProperty: "all",
                      transitionDuration: "700ms",
                      transitionTimingFunction: "ease-out",
                      transitionDelay: `${index * 200}ms`,
                    }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* SECTION MES TARIFS - TEMPORAIREMENT MASQUÉE */}
      {false && (
        <AnimatedSection
          id="pricing"
          className="py-24 bg-secondary/30"
          aria-labelledby="pricing-title"
          aria-describedby="pricing-description"
        >
          <div className="container mx-auto px-4">
            <header className="text-center mb-16">
              <h2
                id="pricing-title"
                className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
              >
                Mes Tarifs de Création de Sites Web
              </h2>
              <p
                id="pricing-description"
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Des solutions adaptées à tous les budgets, de la vitrine simple
                à l&apos;application complexe. Tarifs transparents pour
                développeur web freelance spécialisé en accessibilité RGAA.
              </p>
            </header>

            <div
              ref={pricingObserverRef as React.RefObject<HTMLDivElement>}
              className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              role="group"
              aria-label="Offres tarifaires de création de sites web"
              style={{ paddingTop: "2rem", overflow: "visible" }}
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
                      "relative bg-card border border-border rounded-lg flex flex-col",
                      "hover:shadow-xl hover:-translate-y-1",
                      plan.featured && "ring-2 ring-primary shadow-lg scale-105"
                    )}
                    suppressHydrationWarning
                    style={{
                      opacity: !isMounted ? 1 : pricingVisible[index] ? 1 : 0,
                      transform: !isMounted
                        ? "translateY(0px) scale(1)"
                        : pricingVisible[index]
                        ? "translateY(0px) scale(1)"
                        : "translateY(32px) scale(0.95)",
                      transitionProperty: "all",
                      transitionDuration: "700ms",
                      transitionTimingFunction: "ease-out",
                      transitionDelay: `${index * 150}ms`,
                      zIndex: plan.featured ? 10 : 1,
                      overflow: "visible",
                    }}
                    role="region"
                    aria-labelledby={`${planId}-title`}
                    aria-describedby={`${planId}-description ${planId}-features`}
                  >
                    {plan.featured && (
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2"
                        style={{
                          top: "-22px",
                          zIndex: 50,
                        }}
                      >
                        <span
                          className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium shadow-lg border-2 border-white/50"
                          aria-label="Offre la plus populaire"
                          style={{
                            position: "relative",
                            display: "inline-block",
                            whiteSpace: "nowrap",
                          }}
                        >
                          🌟 Populaire
                        </span>
                      </div>
                    )}

                    <header
                      className={cn(
                        "pricing-card-header p-6 text-center border-b border-border",
                        isBasic &&
                          "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20",
                        isPremium &&
                          "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
                        isPro &&
                          "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
                        isEnterprise &&
                          "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20"
                      )}
                    >
                      <h3
                        id={`${planId}-title`}
                        className={cn(
                          "pricing-card-title text-xl font-bold mb-3",
                          isBasic && "text-emerald-700 dark:text-emerald-300",
                          isPremium && "text-purple-700 dark:text-purple-300",
                          isPro && "text-blue-700 dark:text-blue-300",
                          isEnterprise && "text-orange-700 dark:text-orange-300"
                        )}
                      >
                        {plan.title}
                      </h3>
                      <div
                        className={cn(
                          "pricing-card-price text-3xl font-bold mb-3",
                          isBasic && "text-emerald-800 dark:text-emerald-200",
                          isPremium && "text-purple-800 dark:text-purple-200",
                          isPro && "text-blue-800 dark:text-blue-200",
                          isEnterprise && "text-orange-800 dark:text-orange-200"
                        )}
                      >
                        <span aria-label={`Prix: ${plan.price}`}>
                          {plan.price}
                        </span>
                      </div>
                      <p
                        id={`${planId}-description`}
                        className="pricing-card-description text-sm text-muted-foreground leading-relaxed"
                      >
                        {plan.description}
                      </p>
                    </header>

                    <div className="p-6 flex flex-col flex-1">
                      <h4 className="sr-only">
                        Fonctionnalités incluses dans l&apos;offre {plan.title}
                      </h4>
                      <ul
                        id={`${planId}-features`}
                        className="space-y-3 mb-6 flex-1"
                        role="list"
                        aria-label={`Fonctionnalités de l'offre ${plan.title}`}
                      >
                        {plan.features?.map((feature: string, featureIndex: number) => (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-3"
                            role="listitem"
                          >
                            <CheckCircle2
                              className={cn(
                                "w-5 h-5 mt-0.5 flex-shrink-0",
                                isBasic &&
                                  "text-emerald-600 dark:text-emerald-400",
                                isPremium &&
                                  "text-purple-600 dark:text-purple-400",
                                isPro && "text-blue-600 dark:text-blue-400",
                                isEnterprise &&
                                  "text-orange-600 dark:text-orange-400"
                              )}
                              aria-hidden="true"
                            />
                            <span className="text-sm text-card-foreground leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto">
                        <Button
                          asChild
                          className={cn(
                            "w-full font-semibold transition-all duration-300",
                            isBasic &&
                              "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600",
                            isPremium &&
                              "bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600",
                            isPro &&
                              "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600",
                            isEnterprise &&
                              "bg-orange-600 hover:bg-orange-700 text-white dark:bg-orange-500 dark:hover:bg-orange-600"
                          )}
                          variant={plan.featured ? "default" : "secondary"}
                        >
                          <Link
                            href={plan.link ?? '#'}
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
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                💡 Besoin d&apos;un conseil personnalisé ?
              </h3>
              <p className="text-muted-foreground mb-4">
                Tous mes tarifs incluent l&apos;optimisation SEO, la conformité
                RGAA (accessibilité), et un suivi personnalisé. Chaque projet
                est unique, n&apos;hésitez pas à me contacter pour une
                estimation précise et gratuite.
              </p>
              <Button asChild variant="outline" className="font-medium">
                <Link
                  href="#contact"
                  aria-label={t('a11y.contactForQuote')}
                >
                  📞 {t('contact.discussProject')}
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      )}

      <AboutSection />

      <AnimatedSection
        id="contact"
        className="py-24 bg-secondary/30"
        aria-labelledby="contact-title"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              id="contact-title"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {t('contact.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedDiv delay={200} className="will-change-transform">
              <div
                className="space-y-8"
                role="list"
                aria-label={t('contact.infoLabel')}
              >
                <div
                  className="flex items-start gap-4 interactive-element p-4 rounded-lg hover:bg-primary/5 transition-colors duration-300"
                  role="listitem"
                >
                  <Mail
                    className="w-6 h-6 text-primary mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <a
                      href="mailto:mattheotermine104@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 focus-visible"
                      aria-label={t('a11y.emailMe')}
                    >
                      mattheotermine104@gmail.com
                    </a>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 interactive-element p-4 rounded-lg hover:bg-primary/5 transition-colors duration-300"
                  role="listitem"
                >
                  <MessageCircle
                    className="w-6 h-6 text-primary mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-semibold mb-2">{t('contact.quickResponse')}</h3>
                    <p className="text-muted-foreground">
                      {t('contact.quickResponseDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedDiv>

            <AnimatedDiv delay={400} className="will-change-transform">
              <ContactForm />
            </AnimatedDiv>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}

