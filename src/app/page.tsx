import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeXml, Gauge, Palette, ArrowRight, Accessibility } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

const services = [
  {
    icon: Palette,
    title: "Création de site vitrine responsive",
    description: "Des sites web modernes et adaptatifs qui s'affichent parfaitement sur tous les appareils.",
  },
  {
    icon: CodeXml,
    title: "Intégration HTML/CSS",
    description: "Transformation de vos maquettes (Figma, Sketch, etc.) en code HTML/CSS de haute qualité.",
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

export default function Home() {
  const featuredProjects = projects.slice(0, 2);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary mb-4 animate-fade-in-down">
          Alex Durand
        </h1>
        <p className="font-headline text-xl md:text-2xl text-foreground/80 mb-6 max-w-3xl mx-auto">
          Intégrateur Web Freelance
        </p>
        <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto mb-8">
          Je réalise des sites web modernes, accessibles (normes RGAA), rapides et optimisés SEO.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/projets">Mes projets</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Me contacter</Link>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Mes services</h2>
          <p className="text-lg text-muted-foreground mt-2">Ce que je peux faire pour vous.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                  <service.icon className="w-8 h-8" />
                </div>
                <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Mes projets</h2>
          <p className="text-lg text-muted-foreground mt-2">Quelques exemples de mon travail.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="link" className="text-lg text-primary">
            <Link href="/projets">
              Voir tous les projets <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
