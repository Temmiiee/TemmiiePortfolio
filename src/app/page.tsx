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
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WordpressIcon } from "@/components/icons/WordpressIcon";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

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
    headerClass: "bg-secondary text-secondary-foreground"
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
    headerClass: "bg-primary text-primary-foreground",
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
    headerClass: "bg-accent text-accent-foreground"
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
    headerClass: "bg-foreground text-background",
  },
];

const AnimatedSection = ({ children, className, id, ...props }: { children: React.ReactNode, className?: string, id: string, "aria-labelledby": string }) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2, rootMargin: '-80px 0px -80px 0px' });

  return (
    <section 
      id={id}
      ref={ref} 
      className={cn(
        className, 
        "transition-opacity duration-700 ease-out scroll-mt-20", 
        isIntersecting ? "opacity-100" : "opacity-0"
      )}
      {...props}
    >
      {children}
    </section>
  );
};

const AnimatedDiv = ({ children, className, animation = "animate-fade-in-up", delay = 0, ...props }: { children: React.ReactNode, className?: string, animation?: string, delay?: number } & React.HTMLAttributes<HTMLDivElement>) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2, rootMargin: '-50px 0px -50px 0px', triggerOnce: true });

  const getInitialTransform = (animationType: string) => {
    if (animationType.includes('fade-in-up')) return 'translateY(50px)';
    if (animationType.includes('fade-in-down')) return 'translateY(-50px)';
    if (animationType.includes('fade-in-left')) return 'translateX(-50px)';
    if (animationType.includes('fade-in-right')) return 'translateX(50px)';
    return 'translateY(50px)';
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isIntersecting ? 1 : 0,
        transform: isIntersecting ? 'translate(0, 0)' : getInitialTransform(animation),
        transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
};

const ProcessSection = () => {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2, rootMargin: '-80px 0px -80px 0px', triggerOnce: true });
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [hoveredCardRects, setHoveredCardRects] = useState<DOMRect[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hoveredCardIndex !== null && cardRefs.current[hoveredCardIndex]) {
      setHoveredCardRects([cardRefs.current[hoveredCardIndex]!.getBoundingClientRect()]);
    } else {
      setHoveredCardRects([]);
    }
  }, [hoveredCardIndex]);

  const GalaxyBackground = ({ hoveredCardRects = [] }: { hoveredCardRects?: DOMRect[] }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    
    interface Star {
      x: number;
      y: number;
      r: number;
      color: string;
      glow: boolean;
      glowIntensity: number;
      pulseSpeed: number;
      pulseOffset: number;
      vx: number;
      vy: number;
    }
    
    interface Particle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      color: string;
    }
    
    const stars = useRef<Star[]>([]);
    const particles = useRef<Particle[]>([]);
    const [isHover, setIsHover] = useState(false);
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
    const animationFrameId = useRef<number>(0);
    const containerRectRef = useRef<DOMRect | null>(null);

    // Initialisation et resize
    useEffect(() => {
      const updateContainerRect = () => {
        if (containerRef.current) {
          containerRectRef.current = containerRef.current.getBoundingClientRect();
        }
      };
      updateContainerRect();
      window.addEventListener('resize', updateContainerRect);
      return () => window.removeEventListener('resize', updateContainerRect);
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      setDimensions({ width, height });
      canvas.width = width;
      canvas.height = height;
      // Initialisation des étoiles une seule fois
      if (stars.current.length === 0) {
        stars.current = Array.from({ length: 100 }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.2 + 0.5,
          color: `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3})`,
          glow: Math.random() > 0.7,
          glowIntensity: Math.random() * 0.5 + 0.5,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
        }));
      }
    }, []);

    // Animation
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const draw = () => {
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);
        // Fond galaxie
        ctx.save();
        ctx.globalAlpha = 1;
        const grad = ctx.createRadialGradient(
          dimensions.width / 2,
          dimensions.height / 2,
          dimensions.width / 8,
          dimensions.width / 2,
          dimensions.height / 2,
          dimensions.width / 1.2
        );
        grad.addColorStop(0, '#0a0a1a');
        grad.addColorStop(0.5, '#0f0f23');
        grad.addColorStop(1, '#1a1a2e');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);
        ctx.restore();

        const time = Date.now() * 0.001;
        stars.current.forEach(star => {
          star.x += star.vx;
          star.y += star.vy;
          if (star.x < 0 || star.x > dimensions.width) star.vx *= -1;
          if (star.y < 0 || star.y > dimensions.height) star.vy *= -1;
          let radius = star.r;
          if (star.glow) {
            radius = star.r * (1 + Math.sin(time * star.pulseSpeed + star.pulseOffset) * 0.2);
          }
          let color = star.color;
          let shadowBlur = 5;
          if (isHover && mousePos) {
            const dx = star.x - mousePos.x;
            const dy = star.y - mousePos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              radius = star.r * 2.2;
              color = 'rgba(120, 180, 255, 0.95)';
              shadowBlur = 15;
              const force = 0.05;
              star.vx += (dx / dist) * force;
              star.vy += (dy / dist) * force;
            }
          }
          if (hoveredCardRects.length && containerRectRef.current) {
            hoveredCardRects.forEach(rect => {
              const cardX = rect.left - containerRectRef.current!.left + rect.width / 2;
              const cardY = rect.top - containerRectRef.current!.top + rect.height / 2;
              const dx = star.x - cardX;
              const dy = star.y - cardY;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 100) {
                radius = star.r * 2.5;
                color = 'rgba(255, 100, 200, 0.95)';
                shadowBlur = 20;
                const force = 0.03;
                star.vx += (dx / dist) * force;
                star.vy += (dy / dist) * force;
              }
            });
          }
          ctx.beginPath();
          ctx.arc(star.x, star.y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.shadowColor = '#fff';
          ctx.shadowBlur = shadowBlur;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
        particles.current.forEach((particle, index) => {
          particle.opacity -= 0.02;
          particle.size += 0.05;
          if (particle.opacity <= 0) {
            particles.current.splice(index, 1);
            return;
          }
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
          ctx.shadowColor = `rgba(${particle.color}, 0.8)`;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      };
      const animate = () => {
        draw();
        animationFrameId.current = requestAnimationFrame(animate);
      };
      animate();
      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
    }, [dimensions.width, dimensions.height, isHover, mousePos, hoveredCardRects]);

    // Mouse events
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !containerRectRef.current) return;
      let lastTime = 0;
      const particleRate = 50;
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRectRef.current) return;
        const x = e.clientX - containerRectRef.current.left;
        const y = e.clientY - containerRectRef.current.top;
        setMousePos({ x, y });
        const currentTime = Date.now();
        if (currentTime - lastTime > particleRate) {
          particles.current.push({
            x,
            y,
            size: Math.random() * 1.5 + 0.5,
            opacity: 0.7,
            color: isHover ? '180, 120, 255' : '200, 200, 255'
          });
          lastTime = currentTime;
        }
      };
      const handleMouseEnter = () => setIsHover(true);
      const handleMouseLeave = () => {
        setIsHover(false);
        setMousePos(null);
      };
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseenter', handleMouseEnter);
      canvas.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseenter', handleMouseEnter);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [isHover]);

    return (
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          borderRadius: '1rem',
          pointerEvents: 'auto',
          background: 'transparent',
          transition: 'background 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
        aria-hidden="true"
      />
    );
  };

  return (
    <section
      id="processus"
      ref={sectionRef}
      className={cn(
        "scroll-mt-20 transition-opacity duration-1000 ease-out",
        isIntersecting ? "opacity-100" : "opacity-0"
      )}
      aria-labelledby="process-title"
    >
      <div 
        ref={containerRef}
        className="py-12 md:py-16 lg:py-20 rounded-2xl interactive-bg relative overflow-hidden"
      >
        <GalaxyBackground hoveredCardRects={hoveredCardRects} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <header className="text-center mb-12 md:mb-16">
            <h2 id="process-title" className="font-headline text-3xl md:text-4xl font-bold text-primary">Mon Processus de Travail</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Une approche structurée pour garantir la réussite de votre projet.</p>
          </header>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-6 md:left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30 md:-translate-x-1/2" aria-hidden="true"></div>

            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative group">
                  <div className="flex items-center md:hidden">
                    <div className="absolute left-0 flex items-center justify-center w-12 h-12 z-10">
                      <div className="flex items-center justify-center bg-primary shadow-lg w-12 h-12 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                        <step.icon className="text-primary-foreground h-6 w-6"/>
                      </div>
                    </div>
                    <div
                      className="ml-16 flex-1"
                      onMouseEnter={() => setHoveredCardIndex(index)}
                      onMouseLeave={() => setHoveredCardIndex(null)}
                      ref={(el) => { cardRefs.current[index] = el; }}
                    >
                      <div className={cn(
                        "bg-card/80 backdrop-blur-sm p-6 rounded-lg border w-full transition-all duration-500",
                        "shadow-lg hover:shadow-xl",
                        "transform hover:-translate-y-1",
                        "border-border hover:border-primary/30"
                      )}>
                        <h3 className={cn("font-bold font-headline text-xl mb-3 text-primary")}>{step.title}</h3>
                        <p className={cn("leading-relaxed text-foreground/85")}>{step.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:grid md:grid-cols-2 md:gap-x-16 md:items-center">
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 z-10">
                      <div className="flex items-center justify-center bg-primary shadow-lg w-12 h-12 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                        <step.icon className="text-primary-foreground h-6 w-6"/>
                      </div>
                    </div>

                    {index % 2 === 0 ? (
                      <>
                        <div
                          className="pr-8"
                          onMouseEnter={() => setHoveredCardIndex(index)}
                          onMouseLeave={() => setHoveredCardIndex(null)}
                          ref={(el) => { cardRefs.current[index] = el; }}
                        >
                          <div className={cn(
                            "bg-card/80 backdrop-blur-sm p-6 rounded-lg border w-full text-right transition-all duration-500",
                            "shadow-lg hover:shadow-xl",
                            "transform hover:-translate-y-1",
                            "border-border hover:border-primary/30"
                          )}>
                            <h3 className={cn("font-bold font-headline text-xl mb-3 text-primary")}>{step.title}</h3>
                            <p className={cn("leading-relaxed text-foreground/85")}>{step.description}</p>
                          </div>
                        </div>
                        <div></div>
                      </>
                    ) : (
                      <>
                        <div></div>
                        <div
                          className="pl-8"
                          onMouseEnter={() => setHoveredCardIndex(index)}
                          onMouseLeave={() => setHoveredCardIndex(null)}
                          ref={(el) => { cardRefs.current[index] = el; }}
                        >
                          <div className={cn(
                            "bg-card/80 backdrop-blur-sm p-6 rounded-lg border w-full transition-all duration-500",
                            "shadow-lg hover:shadow-xl",
                            "transform hover:-translate-y-1",
                            "border-border hover:border-primary/30"
                          )}>
                            <h3 className={cn("font-bold font-headline text-xl mb-3 text-primary")}>{step.title}</h3>
                            <p className={cn("leading-relaxed text-foreground/85")}>{step.description}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="space-y-4 md:space-y-6">
      <StructuredData />
      <section id="accueil" className="text-center py-12 md:py-16 lg:py-20 min-h-[80vh] flex flex-col justify-center scroll-mt-20" aria-labelledby="hero-title">
        <AnimatedDiv animation="animate-fade-in-up" delay={0}>
          <h1 id="hero-title" className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4">
            Matthéo Termine
          </h1>
        </AnimatedDiv>
        <AnimatedDiv animation="animate-fade-in-up" delay={200}>
          <p className="font-headline text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto" role="doc-subtitle">
            Intégrateur Web Freelance
          </p>
        </AnimatedDiv>
        <AnimatedDiv animation="animate-fade-in-up" delay={400}>
          <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto mb-8">
            Je réalise des sites web modernes, accessibles (normes RGAA), rapides et optimisés SEO.
          </p>
        </AnimatedDiv>
        <AnimatedDiv animation="animate-fade-in-up" delay={600}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="#projets" aria-label="Voir mes projets">Mes projets</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact" aria-label="Me contacter">Me contacter</Link>
            </Button>
          </div>
        </AnimatedDiv>
      </section>

      <AnimatedSection id="services" className="py-12 md:py-16 lg:py-20 min-h-[85vh] flex flex-col justify-center" aria-labelledby="services-title">
        <AnimatedDiv animation="animate-fade-in-up" delay={0}>
          <header className="text-center mb-16">
            <h2 id="services-title" className="font-headline text-3xl md:text-4xl font-bold">Mes services</h2>
            <p className="text-lg text-muted-foreground mt-2">Ce que je peux faire pour vous.</p>
          </header>
        </AnimatedDiv>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
             <AnimatedDiv key={service.title} delay={300 + (index * 300)} animation="animate-fade-in-up">
                <Card className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 h-full">
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
            </AnimatedDiv>
          ))}
        </div>
      </AnimatedSection>
      
      <ProcessSection />
      
      <AnimatedSection id="projets" aria-labelledby="projects-title">
        <header className="text-center mb-12">
          <h2 id="projects-title" className="font-headline text-3xl md:text-4xl font-bold">Mes projets</h2>
          <p className="text-lg text-muted-foreground mt-2">Quelques exemples de mon travail.</p>
        </header>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <AnimatedDiv key={project.slug} delay={index * 150} animation="animate-fade-in-up">
              <ProjectCard project={project} />
            </AnimatedDiv>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection id="tarifs" aria-labelledby="tarifs-title">
          <header className="text-center mb-12">
          <h2 id="tarifs-title" className="font-headline text-3xl md:text-4xl font-bold">Mes Tarifs</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Des offres claires et adaptées à vos besoins. Pour une estimation plus précise, utilisez le calculateur de devis.</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {pricingPlans.map((plan, index) => (
                  <AnimatedDiv key={plan.title} delay={index * 150} animation="animate-fade-in-up">
                    <Card className={cn("flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 h-full", plan.featured ? 'border-primary shadow-lg' : 'border-border')}>
                        <CardHeader className={cn("p-6", plan.headerClass)}>
                            <CardTitle className={cn(
                              "font-headline text-2xl",
                              plan.headerClass.includes('bg-primary') ||
                              plan.headerClass.includes('bg-accent') ||
                              plan.headerClass.includes('bg-foreground')
                                ? "text-white drop-shadow-sm"
                                : "text-foreground"
                            )}>{plan.title}</CardTitle>
                            <p className={cn(
                              "text-3xl font-bold pt-4",
                              plan.headerClass.includes('bg-primary') ||
                              plan.headerClass.includes('bg-accent') ||
                              plan.headerClass.includes('bg-foreground')
                                ? "text-white drop-shadow-sm"
                                : "text-foreground"
                            )}>{plan.price}</p>
                            <CardDescription className={cn(
                              plan.headerClass.includes('bg-primary') ||
                              plan.headerClass.includes('bg-accent') ||
                              plan.headerClass.includes('bg-foreground')
                                ? "text-white/90"
                                : "text-muted-foreground"
                            )}>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow p-6">
                            <ul className="space-y-3 mb-6" aria-label={`Fonctionnalités incluses dans l'offre ${plan.title}`}>
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <CheckCircle2 className="h-5 w-5 text-accent mr-2.5 mt-0.5 shrink-0" aria-hidden="true" />
                                        <span className="text-foreground/90">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button asChild size="lg" className="w-full mt-auto" variant="default">
                                <Link href={plan.link} aria-label={`${plan.cta} pour l'offre ${plan.title}`}>{plan.cta}</Link>
                            </Button>
                        </CardContent>
                    </Card>
                  </AnimatedDiv>
              ))}
          </div>
      </AnimatedSection>

      <section id="a-propos" className="py-12 md:py-16 lg:py-20 scroll-mt-20" aria-labelledby="about-title">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12 md:mb-16">
            <h2 id="about-title" className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">À propos de moi</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
          </header>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <AnimatedDiv animation="animate-fade-in-right" className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-72 h-72 lg:w-80 lg:h-80 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl"></div>
                  <Image
                      src="/images/mattheo-termine-photo.png"
                      alt="Photo de Matthéo Termine"
                      width={400}
                      height={400}
                      data-ai-hint="professional portrait"
                      className="relative rounded-full object-cover w-full h-full border-4 border-white shadow-2xl"
                      priority
                  />
                </div>
              </div>
            </AnimatedDiv>

            <AnimatedDiv animation="animate-fade-in-left" className="space-y-8 lg:space-y-10">
              <div className="text-center lg:text-left">
                <h3 className="font-headline text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground leading-tight max-w-2xl mx-auto lg:mx-0">
                  Passionné par la création d&apos;expériences web performantes et inclusives.
                </h3>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-foreground max-w-2xl mx-auto lg:mx-0">
                <p className="text-center lg:text-left">
                  Je transforme des idées créatives en sites web fonctionnels, que ce soit en écrivant du code sur-mesure ou en personnalisant des solutions WordPress. Mon objectif est de construire des plateformes qui répondent aux besoins de mes clients et qui offrent une expérience utilisateur fluide.
                </p>
                <p className="text-center lg:text-left">
                  Je crois fermement en un web ouvert et accessible. C&apos;est pourquoi j&apos;accorde une importance capitale au respect des standards, à la performance et aux normes d&apos;accessibilité (RGAA). Un bon site, selon moi, est un site rapide, facile à utiliser et qui ne laisse personne de côté.
                </p>
                <p className="text-center lg:text-left">
                  Constamment en veille technologique, j&apos;aime explorer de nouveaux outils et de nouvelles méthodes pour améliorer la qualité de mon travail et proposer des solutions toujours plus innovantes.
                </p>
              </div>

              <div className="pt-8 flex justify-center lg:justify-start">
                <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Link href="/CV_Mattheo_Termine.pdf" target="_blank" rel="noopener noreferrer" aria-label="Télécharger mon CV au format PDF">
                        <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                        Télécharger mon CV
                    </Link>
                </Button>
              </div>
            </AnimatedDiv>
          </div>
        </div>
      </section>

      <section id="contact" className="py-12 md:py-16 lg:py-20 scroll-mt-20" aria-labelledby="contact-title">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12 md:mb-16">
            <h2 id="contact-title" className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">Contactez-moi</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Une question, un projet ? N&apos;hésitez pas à me contacter. Je vous répondrai dans les plus brefs délais.
            </p>
          </header>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <AnimatedDiv animation="animate-fade-in-up" className="lg:col-span-2" role="region" aria-labelledby="form-title">
              <div className="max-w-2xl mx-auto lg:mx-0">
                <ContactForm />
              </div>
            </AnimatedDiv>

            <AnimatedDiv animation="animate-fade-in-up" delay={150} className="lg:col-span-1" role="region" aria-labelledby="other-contact-title">
              <div className="space-y-8">
                <div className="text-center lg:text-left">
                  <h3 id="other-contact-title" className="font-headline text-2xl font-bold mb-4">Autres moyens de contact</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Si vous préférez, vous pouvez aussi me joindre directement par email ou via WhatsApp.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button asChild variant="outline" className="w-full justify-start text-left h-auto py-4 hover:bg-primary/5 hover:border-primary/30 hover:shadow-md transition-all duration-200 border-border/50">
                    <Link href="mailto:contact@mattheo-termine.fr" aria-label="Envoyer un email à contact@mattheo-termine.fr">
                      <Mail className="mr-4 h-6 w-6 text-primary flex-shrink-0" aria-hidden="true" />
                      <div>
                        <div className="font-semibold text-base text-foreground">Email</div>
                        <div className="text-muted-foreground text-sm">contact@mattheo-termine.fr</div>
                      </div>
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full justify-start text-left h-auto py-4 hover:bg-accent/5 hover:border-accent/30 hover:shadow-md transition-all duration-200 border-border/50">
                    <Link href="https://wa.me/33XXXXXXXXX" target="_blank" rel="noopener noreferrer" aria-label="Discuter sur WhatsApp">
                      <MessageCircle className="mr-4 h-6 w-6 text-accent flex-shrink-0" aria-hidden="true" />
                      <div>
                        <div className="font-semibold text-base text-foreground">WhatsApp</div>
                        <div className="text-muted-foreground text-sm">Discutons en direct</div>
                      </div>
                    </Link>
                  </Button>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <div className="text-center lg:text-left">
                    <p className="text-sm text-muted-foreground mb-2">Temps de réponse moyen</p>
                    <p className="font-semibold text-primary">Moins de 24h</p>
                  </div>
                </div>
              </div>
            </AnimatedDiv>
          </div>
        </div>
      </section>
    </div>
  );
}