'use client';

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/projects";
import { Badge } from "@/components/ui/primitives";
import { useTranslation } from "@/hooks/useTranslation";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { language, t } = useTranslation();
  return (
    <Card className="h-full overflow-hidden transition-all duration-300 group relative flex flex-col min-h-[450px] justify-end p-6 text-white">
      <div className="absolute inset-0 z-0">
         <Image
          src={project.imageUrl}
          alt={`Image du projet ${project.title[language]}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          data-ai-hint={project.dataAiHint}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          quality={80}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        {/* Enhanced overlay for maximum contrast */}
        <div className="absolute inset-0 bg-overlay-strong"></div>
      </div>
     
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
            <Badge key={tech.name} className="bg-black/60 text-white border border-white/30 backdrop-blur-sm shadow-lg hover:bg-black/80 hover:border-white/50 transition-colors">
                <tech.icon className="h-4 w-4 mr-1.5" />
                <span>{tech.name}</span>
            </Badge>
            ))}
        </div>

        <div className="flex-grow">
            <h3 className="font-headline text-3xl font-bold text-white text-contrast-enhanced">{project.title[language]}</h3>
            <p className="mt-2 text-white/95 text-contrast-enhanced">{project.description[language]}</p>
        </div>

    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col">
      <p className="text-white/95 text-sm mb-4 text-contrast-enhanced">{project.longDescription[language]}</p>
      <div className="flex gap-2 mt-auto">
        {project.liveLink && (
          <Button asChild variant="outline" size="sm" className="bg-black/50 border-white text-white hover:bg-white hover:text-black backdrop-blur-sm shadow-lg">
            <Link href={project.liveLink} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" /> {t('projects.viewProject')}
            </Link>
          </Button>
        )}
        {project.repoLink && (
          <Button asChild variant="outline" size="sm" className="bg-black/50 border-white text-white hover:bg-white hover:text-black backdrop-blur-sm shadow-lg">
            <Link href={project.repoLink} target="_blank">
              <Github className="mr-2 h-4 w-4" /> {t('projects.sourceCode')}
            </Link>
          </Button>
        )}
      </div>
    </div>
      </div>
    </Card>
  );
}
