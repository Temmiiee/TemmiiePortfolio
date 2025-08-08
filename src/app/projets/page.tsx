import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets",
  description: "Découvrez les projets réalisés par Alex Durand, intégrateur web freelance.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Mes Projets</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Voici une sélection de projets sur lesquels j'ai travaillé, démontrant mes compétences en intégration web, développement et optimisation.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
