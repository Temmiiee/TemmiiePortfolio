import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {currentYear} Matthéo Termine. Tous droits réservés. - <Link href="/declaration-accessibilite" className="underline hover:text-primary">Déclaration d&apos;accessibilité</Link></p>
      </div>
    </footer>
  );
}
