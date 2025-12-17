import { CodeXml, Cpu, Database, type LucideIcon } from "lucide-react";
import { WordpressIcon } from "@/components/icons";

export type Technology = {
  name: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
};

export type Project = {
  slug: string;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  longDescription: {
    fr: string;
    en: string;
  };
  technologies: Technology[];
  imageUrl: string;
  dataAiHint: string;
  liveLink?: string;
  repoLink?: string;
};

export const projects: Project[] = [
  {
    slug: "theme-wordpress-istex",
    title: {
      fr: "Thème WordPress sur-mesure",
      en: "Custom WordPress Theme"
    },
    description: {
      fr: "Un thème WordPress pour centraliser une charte graphique et des composants UI pour les intégrateurs.",
      en: "A WordPress theme to centralize a design system and UI components for integrators."
    },
    longDescription: {
      fr: "Ce projet a été conçu pour servir de référentiel central pour la charte graphique d'Istex. Il permet aux intégrateurs et aux développeurs d'accéder facilement à une bibliothèque de composants UI, de pictogrammes, et de consulter les règles d'affichage. L'objectif principal était d'assurer la cohérence visuelle sur tous les produits Istex et d'accélérer le processus d'intégration.",
      en: "This project was designed to serve as a central repository for Istex's design system. It allows integrators and developers to easily access a library of UI components, icons, and display rules. The main goal was to ensure visual consistency across all Istex products and accelerate the integration process."
    },
    technologies: [
      { name: "WordPress", icon: WordpressIcon },
      { name: "PHP", icon: CodeXml },
      { name: "JavaScript", icon: CodeXml },
    ],
    imageUrl: "/images/projects/kit-design-istex.webp",
    dataAiHint: "design system",
    liveLink: "https://design.istex.fr/",
  },
  {
    slug: "tdm-factory",
    title: {
      fr: "TDM Factory",
      en: "TDM Factory"
    },
    description: {
      fr: "Une application de fouille de texte (text mining) pour analyser divers types de corpus.",
      en: "A text mining application to analyze various types of corpus."
    },
    longDescription: {
      fr: "TDM Factory est une application web de fouille de texte qui permet aux chercheurs et analystes de lancer des traitements sur de grands volumes de données. Elle supporte divers formats de fichiers, incluant les fichiers texte bruts, les PDF, et les corpus scientifiques tabulaires (CSV, Excel). De plus, elle s'intègre avec l'API IstexSearch pour analyser directement des résultats de recherche. L'interface a été pensée pour être intuitive, même pour un utilisateur non-technique.",
      en: "TDM Factory is a text mining web application that allows researchers and analysts to run processing on large volumes of data. It supports various file formats, including raw text files, PDFs, and tabular scientific corpus (CSV, Excel). Additionally, it integrates with the IstexSearch API to directly analyze search results. The interface was designed to be intuitive, even for non-technical users."
    },
    technologies: [
      { name: "React", icon: CodeXml },
      { name: "Node.js", icon: Cpu },
      { name: "Text Mining APIs", icon: Database },
    ],
    imageUrl: "/images/projects/tdm-factory.webp",
    dataAiHint: "data analysis",
    liveLink: "https://www.istex.fr/tdm-factory-la-fouille-de-textes-a-portee-de-main/",
    repoLink: "https://github.com/Inist-CNRS/tdm-factory",
  },
  {
    slug: "mimoo-portfolio",
    title: {
      fr: "Mimoo Portfolio",
      en: "Mimoo Portfolio"
    },
    description: {
      fr: "Un portfolio artistique avec un thème nature et illustrations.",
      en: "An artistic portfolio with a nature theme and illustrations."
    },
    longDescription: {
      fr: "Mimoo Portfolio est un site vitrine artistique mettant en avant des créations originales dans un univers nature, doux et coloré. Le design est pensé pour valoriser les œuvres et offrir une navigation immersive et poétique.",
      en: "Mimoo Portfolio is an artistic showcase website highlighting original creations in a soft, colorful nature universe. The design is intended to showcase the works and offer an immersive and poetic navigation."
    },
    technologies: [
      { name: "HTML/CSS", icon: CodeXml },
      { name: "JavaScript", icon: CodeXml }
    ],
    imageUrl: "/images/projects/mimoo-portfolio.webp",
    dataAiHint: "nature art portfolio",
    liveLink: "https://temmiiee.github.io/Mimoo-portfolio/",
  },
  {
    slug: "3d-morpion",
    title: {
      fr: "3D Morpion",
      en: "3D Tic-Tac-Toe",
    },
    description: {
      fr: "Un morpion 3D immersif au design néon, avec modes de jeu avancés et accessibilité complète.",
      en: "An immersive neon-styled 3D Tic-Tac-Toe game with advanced game modes and full accessibility.",
    },
    longDescription: {
      fr: "3D Morpion est une réinterprétation moderne du jeu de morpion en trois dimensions. Construit avec React Three Fiber, il propose un plateau 3D interactif entièrement rotatif, des effets visuels néon (bloom, glassmorphism) et plusieurs modes de jeu. Le projet met un fort accent sur l’accessibilité, avec une navigation complète au clavier et un support des lecteurs d’écran via une grille accessible invisible. Il inclut également des variantes de règles comme le mode Misère, qui transforme totalement la stratégie du jeu.",
      en: "3D Morpion is a modern reinterpretation of Tic-Tac-Toe in three dimensions. Built with React Three Fiber, it features a fully rotatable interactive 3D board, neon visual effects (bloom, glassmorphism), and multiple game modes. The project strongly emphasizes accessibility, offering full keyboard navigation and screen reader support through an invisible accessible grid. It also includes rule variants such as Misère mode, which completely changes the game strategy.",
    },
    technologies: [
      { name: "React", icon: CodeXml },
      { name: "Three.js", icon: Cpu },
      { name: "React Three Fiber", icon: Cpu },
      { name: "Vite", icon: CodeXml },
      { name: "CSS", icon: CodeXml },
    ],
    imageUrl: "/images/projects/3d-morpion.webp",
    dataAiHint: "3D game neon cube",
    liveLink: "https://3d-morpion.pages.dev/",
    repoLink: "https://github.com/Temmiiee/3DMorpion",
  },
];
