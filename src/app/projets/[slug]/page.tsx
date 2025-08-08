import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: "Projet non trouvé",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">{project.title}</h1>
        <p className="text-xl text-muted-foreground">{project.description}</p>
      </header>

      <div className="mb-8 shadow-lg rounded-lg overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={`Image principale du projet ${project.title}`}
          width={1200}
          height={800}
          className="w-full object-cover"
          data-ai-hint={project.dataAiHint}
          priority
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="font-headline text-2xl font-bold border-b pb-2">À propos du projet</h2>
          <div className="prose prose-lg max-w-none text-foreground/90">
            <p>{project.longDescription}</p>
          </div>
        </div>
        <aside className="space-y-6">
          <div>
            <h3 className="font-headline text-xl font-bold mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech.name} variant="secondary" className="flex items-center gap-1.5 py-1 px-2">
                   <tech.icon className="h-4 w-4" />
                  <span>{tech.name}</span>
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-headline text-xl font-bold mb-3">Liens</h3>
            <div className="flex flex-col gap-2">
              {project.liveLink && (
                <Button asChild variant="outline">
                  <Link href={project.liveLink} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" /> Voir le site
                  </Link>
                </Button>
              )}
              {project.repoLink && (
                <Button asChild variant="outline">
                  <Link href={project.repoLink} target="_blank">
                    <Github className="mr-2 h-4 w-4" /> Code source
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
