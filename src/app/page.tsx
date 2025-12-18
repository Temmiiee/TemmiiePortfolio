"use client";

import {
  CodeXml,
  Gauge,
  Accessibility,
  Search,
  Rocket,
  PencilRuler,
  Mail,
  MessageCircle,
  ArrowUp,
  ChevronDown,
} from "lucide-react";
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

// Composant ScrollToTop
const ScrollToTopButton = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 mb-[25px]"
      aria-label={t("a11y.scrollToTop")}
      type="button"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

// Section Hero refactorisée
// Section Hero avec animation typewriter originale
const HeroSection = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [lastTypedLength, setLastTypedLength] = useState(0);

  // Animation d'entrée et typewriter
  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 100);

    // Démarrer l'animation typewriter après que le titre soit visible
    const timer2 = setTimeout(() => {
      setTextVisible(true);
      setShowCursor(true);

      // Animation typewriter
      const fullText = t("hero.subtitle");
      let currentIndex = 0;

      const typeNextChar = () => {
        if (currentIndex <= fullText.length) {
          const newText = fullText.slice(0, currentIndex);
          setTypedText(newText);
          setLastTypedLength(newText.length);
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 120);
          currentIndex++;

          // Délai variable pour un effet plus naturel
          const nextDelay =
            currentIndex === fullText.length
              ? 0
              : fullText[currentIndex - 1] === " "
                ? 120 // Pause après espace
                : Math.random() * 40 + 60; // 60-100ms aléatoire

          if (currentIndex <= fullText.length) {
            setTimeout(typeNextChar, nextDelay);
          } else {
            setIsTypingComplete(true);
            // Masquer le curseur après un délai
            setTimeout(() => setShowCursor(false), 1500);
          }
        }
      };

      typeNextChar();
    }, 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [t]);

  const scrollToServices = () => {
    const servicesSection = document.querySelector("#services");
    servicesSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="accueil"
      className="hero-section relative min-h-[85vh] md:min-h-[95vh] flex items-center justify-center py-8 md:py-12 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Arrière-plan galaxie interactif */}
      <InteractiveGalaxy />

      <div className="container mx-auto px-4 text-center relative z-50">
        {/* Nom principal */}
        <h1
          id="hero-title"
          className={cn(
            "text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white transition-all duration-1000 ease-out text-shadow-hero-title",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Matthéo Termine
        </h1>

        {/* Sous-titre avec animation typewriter */}
        <div
          className={cn(
            "text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 leading-[1.4] transition-all duration-1000 ease-out transition-delay-200",
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <span
            className={cn(
              "text-primary inline-block relative typewriter-container text-shadow-hero-subtitle",
              isTypingComplete && "typing-complete"
            )}
          >
            <span className={cn("typewriter-text", isTyping && "typing-vibration")}>
              {typedText.split("").map((char, index) => (
                <span
                  key={index}
                  className={cn(
                    "typewriter-char",
                    index === lastTypedLength - 1 && isTyping && "new-char-flash"
                  )}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            {showCursor && <span className="typewriter-cursor">|</span>}
            {/* Effet de glow qui suit le texte */}
            <span
              className="typewriter-glow"
              style={
                {
                  "--glow-width": `${(typedText.length / t("hero.subtitle").length) * 100}%`,
                  width: `var(--glow-width)`,
                } as React.CSSProperties
              }
            />
          </span>
        </div>

        {/* Description principale */}
        <p
          className={cn(
            "text-xl md:text-2xl text-white mb-6 max-w-3xl mx-auto leading-relaxed px-4 transition-all duration-1000 ease-out text-shadow-hero-description transition-delay-400",
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {t("hero.description")}
        </p>

        {/* Sous-description */}
        <p
          className={cn(
            "text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed px-4 transition-all duration-1000 ease-out text-shadow-hero-description transition-delay-600",
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {t("hero.subdescription")}
        </p>

        {/* Bouton découvrir */}
        <div
          className={cn(
            "flex justify-center px-4 transition-all duration-1000 ease-out transition-delay-800",
            textVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"
          )}
        >
          <button
            onClick={scrollToServices}
            className="group flex flex-col items-center gap-3 bg-transparent border-none p-6 rounded-xl transition-all duration-500 hover:bg-white/10 hover:backdrop-blur-sm hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={t("a11y.discoverServices")}
            type="button"
          >
            <span className="text-white/80 text-base font-medium group-hover:text-white transition-all duration-500 group-hover:scale-105">
              {t("hero.discover")}
            </span>
            <ChevronDown className="w-7 h-7 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-500 drop-shadow-lg animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const { t } = useTranslation();
  const [servicesVisible, setServicesVisible] = useState<boolean[]>(new Array(6).fill(false));

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "-50px 0px -100px 0px",
    triggerOnce: true,
  });

  useEffect(() => {
    if (isIntersecting) {
      // Animation
      Array.from({ length: 6 }).forEach((_, index) => {
        setTimeout(() => {
          setServicesVisible((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 200);
      });
    }
  }, [isIntersecting]);

  return (
    <section
      id="services"
      ref={ref}
      className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      aria-labelledby="services-title"
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="container mx-auto px-4">
        {/* En-tête moderne */}
        <div
          className={cn(
            "text-center mb-20 transition-all duration-800 ease-out",
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
            <span className="text-gray-400 font-mono text-sm ml-4">services.portfolio</span>
          </div>

          <h2
            id="services-title"
            className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow-section-title"
          >
            {t("services.title")}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-min">
            <div
              className={cn(
                "lg:col-span-8 tech-card group relative overflow-hidden rounded-2xl border border-blue-500/20 p-8 hover:border-blue-500/40 transition-all duration-700 ease-out transition-delay-0",
                servicesVisible[0]
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <span className="ml-auto text-sm text-gray-400 font-mono">development.tsx</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <CodeXml className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t("services.custom.title")}</h3>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  {t("services.custom.desc")}
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="tech-badge px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                    Next.js 15
                  </span>
                  <span className="tech-badge px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30">
                    React 18
                  </span>
                  <span className="tech-badge px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium border border-blue-600/30">
                    TypeScript
                  </span>
                  <span className="tech-badge px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30">
                    Tailwind CSS
                  </span>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "lg:col-span-4 performance-card group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900 border border-green-500/20 p-6 hover:border-green-500/40 transition-all duration-700 ease-out transition-delay-200",
                servicesVisible[1]
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 via-transparent to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <span className="ml-auto text-xs text-gray-400 font-mono">performance.js</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Gauge className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {t("services.performance.title")}
                  </h3>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                  {t("services.performance.desc")}
                </p>

                <div className="space-y-2">
                  <div className="metric-item flex justify-between items-center">
                    <span className="text-gray-300 text-xs">{t("services.coreWebVitals")}</span>
                    <span className="text-green-400 font-mono text-xs">&lt; 2s</span>
                  </div>
                  <div className="metric-item flex justify-between items-center">
                    <span className="text-gray-300 text-xs">{t("services.lighthouseScore")}</span>
                    <span className="text-green-400 font-mono text-xs">&gt; 95</span>
                  </div>
                  <div className="metric-item flex justify-between items-center">
                    <span className="text-gray-300 text-xs">{t("services.seoOptimization")}</span>
                    <span className="text-green-400 font-mono text-xs">100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ligne 2: WordPress (7) + Accessibilité (5) = 12 colonnes */}
            {/* Solutions WordPress - Carte élargie (span 7) */}
            <div
              className={cn(
                "lg:col-span-7 tech-card group relative overflow-hidden rounded-2xl border border-purple-500/20 p-6 hover:border-purple-500/40 transition-all duration-700 ease-out transition-delay-400",
                servicesVisible[2]
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <span className="ml-auto text-sm text-gray-400 font-mono">wordpress.php</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <WordpressIcon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{t("services.wordpress.title")}</h3>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">{t("services.wordpress.desc")}</p>

                <div className="flex flex-wrap gap-2">
                  <span className="tech-badge px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30">
                    Custom Themes
                  </span>
                  <span className="tech-badge px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs font-medium border border-pink-500/30">
                    Plugins
                  </span>
                  <span className="tech-badge px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-medium border border-indigo-500/30">
                    Optimization
                  </span>
                  <span className="tech-badge px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs font-medium border border-violet-500/30">
                    Security
                  </span>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "lg:col-span-5 tech-card group relative overflow-hidden rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/40 transition-all duration-700 ease-out transition-delay-600",
                servicesVisible[3]
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 via-transparent to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <span className="ml-auto text-xs text-gray-400 font-mono">
                    accessibility.a11y
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Accessibility className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {t("services.accessibility.title")}
                  </h3>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                  {t("services.accessibility.desc")}
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="tech-badge px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs font-medium border border-orange-500/30">
                    RGAA 4.1
                  </span>
                  <span className="tech-badge px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-medium border border-red-500/30">
                    WCAG 2.1 AA
                  </span>
                  <span className="tech-badge px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-medium border border-amber-500/30">
                    Audit A11Y
                  </span>
                </div>
              </div>
            </div>

            {/* Ligne 3: Stack Tech (5) + Collaboration (7) = 12 colonnes */}
            {/* Stack Technologique - Carte élargie (span 5) */}
            <div
              className={cn(
                "lg:col-span-5 tech-card group relative overflow-hidden rounded-2xl border border-cyan-500/20 p-6 hover:border-cyan-500/40 transition-all duration-700 ease-out transition-delay-800",
                servicesVisible[4]
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <span className="ml-auto text-xs text-gray-400 font-mono">tech.stack</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{t("services.stack.title")}</h3>

                <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                  {t("services.stack.desc")}
                </p>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    <span className="tech-badge px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-medium border border-blue-500/30">
                      TypeScript
                    </span>
                    <span className="tech-badge px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs font-medium border border-green-500/30">
                      Node.js
                    </span>
                    <span className="tech-badge px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs font-medium border border-cyan-500/30">
                      React
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="tech-badge px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs font-medium border border-orange-500/30">
                      Docker
                    </span>
                    <span className="tech-badge px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded text-xs font-medium border border-yellow-500/30">
                      AWS
                    </span>
                    <span className="tech-badge px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs font-medium border border-purple-500/30">
                      Vercel
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Collaboration & Support - Carte élargie (span 7) - SANS BOUTONS */}
            <div
              className={cn(
                "lg:col-span-7 performance-card group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900 border border-indigo-500/20 p-6 hover:border-indigo-500/40 transition-all duration-700 ease-out transition-delay-1000",
                servicesVisible[5]
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <span className="ml-auto text-sm text-gray-400 font-mono">collaboration.md</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-4">
                  {t("services.collaboration.title")}
                </h3>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {t("services.collaboration.desc")}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="text-green-400">●</span>
                    <span>{t("services.available")}</span>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    {t("services.responseTime")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section Projets (sans bouton "voir tous")
const ProjectsSection = () => {
  const { t } = useTranslation();
  const [projectsVisible, setProjectsVisible] = useState<boolean[]>(new Array(6).fill(false));

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "-50px 0px -100px 0px",
    triggerOnce: true,
  });

  useEffect(() => {
    if (isIntersecting) {
      projects.slice(0, 6).forEach((_, index) => {
        setTimeout(() => {
          setProjectsVisible((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 100);
      });
    }
  }, [isIntersecting]);

  return (
    <section 
      id="projects" 
      ref={ref} 
      className="py-20" 
      aria-labelledby="projects-title"
      itemScope
      itemType="https://schema.org/CollectionPage"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="projects-title" className="text-3xl md:text-4xl font-bold mb-4">
            {t("projects.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project, index) => (
            <div
              key={`project-${project.slug}-${index}`}
              className={cn(
                "transition-all duration-700 ease-out",
                `stagger-delay-${index}`,
                projectsVisible[index]
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              )}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section Processus
const ProcessSection = () => {
  const { t } = useTranslation();
  const [processVisible, setProcessVisible] = useState<boolean[]>(new Array(4).fill(false));

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "-50px 0px -100px 0px",
    triggerOnce: true,
  });

  const processSteps = React.useMemo(
    () => [
      {
        icon: Search,
        title: t("process.discovery.title"),
        description: t("process.discovery.desc"),
      },
      {
        icon: PencilRuler,
        title: t("process.design.title"),
        description: t("process.design.desc"),
      },
      {
        icon: CodeXml,
        title: t("process.development.title"),
        description: t("process.development.desc"),
      },
      {
        icon: Rocket,
        title: t("process.deployment.title"),
        description: t("process.deployment.desc"),
      },
    ],
    [t]
  );

  useEffect(() => {
    if (isIntersecting) {
      processSteps.forEach((_, index) => {
        setTimeout(() => {
          setProcessVisible((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 200);
      });
    }
  }, [isIntersecting, processSteps]);

  return (
    <section
      id="processus"
      ref={ref}
      className="py-20 bg-secondary/30"
      aria-labelledby="process-title"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="process-title" className="text-3xl md:text-4xl font-bold mb-4">
            {t("process.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("process.subtitle")}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={cn(
                  "flex gap-6 mb-12 last:mb-0 transition-all duration-700 ease-out",
                  `process-delay-${index}`,
                  processVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Section À propos
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
      className="py-20 bg-secondary/20"
      aria-labelledby="about-title"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-800 ease-out",
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 id="about-title" className="text-3xl md:text-4xl font-bold mb-4">
            {t("about.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("about.subtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center lg:justify-end order-2 lg:order-1">
              <div
                className={cn(
                  "transition-all duration-800 ease-out transition-delay-200",
                  isIntersecting ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                )}
              >
                <div className="relative group">
                  <Image
                    src="/images/mattheo-termine-photo.webp"
                    alt="Mattheo Termine - Intégrateur web freelance"
                    width={272}
                    height={272}
                    className="rounded-full border-4 border-white shadow-lg transition-all duration-500 ease-out group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 200px, 272px"
                    quality={85}
                  />
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "order-1 lg:order-2 transition-all duration-800 ease-out transition-delay-400",
                isIntersecting ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              )}
            >
              <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
                <p className="first-letter:text-2xl first-letter:font-bold first-letter:text-primary first-letter:mr-1">
                  {t("about.p1")}
                </p>
                <p>{t("about.p2")}</p>
                <p>{t("about.p3")}</p>
                <p>{t("about.p4")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section Contact
const ContactSection = () => {
  const { t } = useTranslation();
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "-20px 0px -50px 0px",
    triggerOnce: true,
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 bg-secondary/30"
      aria-labelledby="contact-title"
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-800 ease-out",
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 id="contact-title" className="text-3xl md:text-4xl font-bold mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div
            className={cn(
              "transition-all duration-800 ease-out transition-delay-200",
              isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors duration-300">
                <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a
                    href="mailto:mattheotermine104@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    mattheotermine104@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors duration-300">
                <MessageCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">{t("contact.quickResponse")}</h3>
                  <p className="text-muted-foreground">{t("contact.quickResponseDesc")}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "transition-all duration-800 ease-out transition-delay-400",
              isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant principal
export default function Home() {
  return (
    <>
      <StructuredData />
      {/* Main content wrapper with semantic structure for AI interpretation */}
      <article itemScope itemType="https://schema.org/ProfilePage">
        {/* Hidden metadata for AI agents and search engines */}
        <meta itemProp="name" content="Matthéo Termine - Intégrateur Web Freelance" />
        <meta itemProp="description" content="Expert en développement web accessible (RGAA/WCAG), optimisation performance (Core Web Vitals), Next.js, React, TypeScript, WordPress" />
        <meta itemProp="keywords" content="intégrateur web freelance, développeur web France, accessibilité RGAA, WCAG, Next.js, React, TypeScript, WordPress, SEO, Core Web Vitals, performance web" />
        
        {/* Key competencies prominently structured for AI */}
        <div className="sr-only" aria-hidden="true">
          <section itemScope itemType="https://schema.org/ItemList">
            <h2 itemProp="name">Compétences Principales</h2>
            <ul>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <meta itemProp="position" content="1" />
                <span itemProp="name">Développement Web Sur-Mesure: Next.js 15, React 18, TypeScript, Tailwind CSS</span>
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <meta itemProp="position" content="2" />
                <span itemProp="name">Accessibilité Web: RGAA 4.1, WCAG 2.1 AA, audits et conformité</span>
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <meta itemProp="position" content="3" />
                <span itemProp="name">Optimisation Performance: Core Web Vitals, LCP &lt; 2.5s, Lighthouse 95+</span>
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <meta itemProp="position" content="4" />
                <span itemProp="name">Solutions WordPress: thèmes personnalisés, plugins sur-mesure, optimisation</span>
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <meta itemProp="position" content="5" />
                <span itemProp="name">SEO Technique: meta tags, structured data, sitemap, robots.txt</span>
              </li>
            </ul>
          </section>
          <section>
            <h2>Technologies Maîtrisées</h2>
            <p>Frontend: Next.js, React, TypeScript, JavaScript ES6+, Tailwind CSS, HTML5, CSS3</p>
            <p>Backend: Node.js, PHP, WordPress</p>
            <p>Outils: Git, Docker, Webpack, Jest, ESLint, Prettier</p>
            <p>Déploiement: Vercel, AWS, Cloudflare Pages</p>
            <p>Standards: RGAA 4.1, WCAG 2.1 AA, Schema.org, Open Graph</p>
          </section>
        </div>
        
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
      </article>
      <ScrollToTopButton />
    </>
  );
}
