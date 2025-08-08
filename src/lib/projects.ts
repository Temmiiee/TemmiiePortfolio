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
    slug: "kit-design-ui-istex",
    title: "Kit de design UI Istex",
    description: "Un site WordPress centralisant la charte graphique et les composants UI pour les intégrateurs.",
    longDescription: "Ce projet a été conçu pour servir de référentiel central pour la charte graphique d'Istex. Il permet aux intégrateurs et aux développeurs d'accéder facilement à une bibliothèque de composants UI, de pictogrammes, et de consulter les règles d'affichage. L'objectif principal était d'assurer la cohérence visuelle sur tous les produits Istex et d'accélérer le processus d'intégration.",
    technologies: [
      { name: "WordPress", icon: WordpressIcon },
      { name: "HTML5", icon: CodeXml },
      { name: "CSS3", icon: CodeXml },
    ],
    imageUrl: "https://placehold.co/1200x800.png",
    dataAiHint: "design system",
    liveLink: "#",
  },
  {
    slug: "tdm-factory",
    title: "TDM Factory",
    description: "Une application de fouille de texte (text mining) pour analyser divers types de corpus.",
    longDescription: "TDM Factory est une application web puissante de fouille de texte qui permet aux chercheurs et analystes de lancer des traitements sur de grands volumes de données. Elle supporte divers formats de fichiers, incluant les fichiers texte bruts, les PDF, et les corpus scientifiques tabulaires (CSV, Excel). De plus, elle s'intègre avec l'API IstexSearch pour analyser directement des résultats de recherche. L'interface a été pensée pour être intuitive, même pour un utilisateur non-technique.",
    technologies: [
      { name: "React", icon: CodeXml },
      { name: "Node.js", icon: Cpu },
      { name: "Text Mining APIs", icon: Database },
    ],
    imageUrl: "https://placehold.co/1200x800.png",
    dataAiHint: "data analysis",
    repoLink: "#",
  },
];
