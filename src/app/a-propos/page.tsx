import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez le parcours, les compétences et la vision de Alex Durand, intégrateur web freelance.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">À propos de moi</h1>
        <p className="mt-4 text-lg text-muted-foreground">Mon parcours, ma vision et ma passion pour le web.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
        <div className="md:col-span-1">
          <div className="aspect-square rounded-full overflow-hidden shadow-lg mx-auto w-48 h-48 md:w-full md:h-auto">
            <Image
              src="https://placehold.co/400x400.png"
              alt="Photo de Alex Durand"
              width={400}
              height={400}
              data-ai-hint="professional portrait"
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-6 text-foreground/90">
          <h2 className="font-headline text-3xl font-bold text-foreground">
            Passionné par la création d'expériences web performantes et inclusives.
          </h2>
          <div className="space-y-4 text-lg">
            <p>
              Depuis le début de ma carrière, je me suis consacré à transformer des idées créatives en sites web fonctionnels et esthétiques. Mon objectif est de construire des solutions qui non seulement répondent aux besoins de mes clients, mais qui offrent aussi une expérience utilisateur fluide et agréable pour tous.
            </p>
            <p>
              Je crois fermement en un web ouvert et accessible. C'est pourquoi j'accorde une importance capitale au respect des standards, à la performance et aux normes d'accessibilité (RGAA). Un bon site, selon moi, est un site rapide, facile à utiliser et qui ne laisse personne de côté.
            </p>
            <p>
              Constamment en veille technologique, j'aime explorer de nouveaux outils et de nouvelles méthodes pour améliorer la qualité de mon travail et proposer des solutions toujours plus innovantes.
            </p>
          </div>
          <div className="pt-4">
             <Button asChild size="lg">
                <Link href="/CV_Alex_Durand.pdf" target="_blank">
                    <Download className="mr-2 h-5 w-5" />
                    Télécharger mon CV
                </Link>
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
