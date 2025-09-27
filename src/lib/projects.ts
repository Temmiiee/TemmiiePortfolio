import { CodeXml, Cpu, Database, type LucideIcon } from "lucide-react";
import { WordpressIcon } from "@/components/icons/WordpressIcon";

export type Technology = {
  name: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: Technology[];
  imageUrl: string;
  dataAiHint: string;
  liveLink?: string;
  repoLink?: string;
};

export const projects: Project[] = [
  {
    slug: "theme-wordpress-istex",
    title: "Thème WordPress sur-mesure",
    description: "Un thème WordPress pour centraliser une charte graphique et des composants UI pour les intégrateurs.",
    longDescription: "Ce projet a été conçu pour servir de référentiel central pour la charte graphique d'Istex. Il permet aux intégrateurs et aux développeurs d'accéder facilement à une bibliothèque de composants UI, de pictogrammes, et de consulter les règles d'affichage. L'objectif principal était d'assurer la cohérence visuelle sur tous les produits Istex et d'accélérer le processus d'intégration.",
    technologies: [
      { name: "WordPress", icon: WordpressIcon },
      { name: "PHP", icon: CodeXml },
      { name: "JavaScript", icon: CodeXml },
    ],
    imageUrl: "/images/projects/kit-design-istex.jpg",
    dataAiHint: "design system",
    liveLink: "https://design.istex.fr/",
  },
  {
    slug: "tdm-factory",
    title: "TDM Factory",
    description: "Une application de fouille de texte (text mining) pour analyser divers types de corpus.",
    longDescription: "TDM Factory est une application web de fouille de texte qui permet aux chercheurs et analystes de lancer des traitements sur de grands volumes de données. Elle supporte divers formats de fichiers, incluant les fichiers texte bruts, les PDF, et les corpus scientifiques tabulaires (CSV, Excel). De plus, elle s'intègre avec l'API IstexSearch pour analyser directement des résultats de recherche. L'interface a été pensée pour être intuitive, même pour un utilisateur non-technique.",
    technologies: [
      { name: "React", icon: CodeXml },
      { name: "Node.js", icon: Cpu },
      { name: "Text Mining APIs", icon: Database },
    ],
    imageUrl: "/images/projects/tdm-factory.png",
    dataAiHint: "data analysis",
    liveLink: "https://tdm-factory.services.istex.fr/",
    repoLink: "https://github.com/Inist-CNRS/tdm-factory",
  },
  {
    slug: "mimoo-portfolio",
    title: "Mimoo Portfolio",
    description: "Un portfolio artistique avec un thème nature et illustrations.",
    longDescription: "Mimoo Portfolio est un site vitrine artistique mettant en avant des créations originales dans un univers nature, doux et coloré. Le design est pensé pour valoriser les œuvres et offrir une navigation immersive et poétique.",
    technologies: [
      { name: "HTML/CSS", icon: CodeXml },
      { name: "JavaScript", icon: CodeXml }
    ],
    imageUrl: "/images/projects/mimoo-portfolio.jpg",
    dataAiHint: "nature art portfolio",
    liveLink: "https://temmiiee.github.io/Mimoo-portfolio/",
  },
];
