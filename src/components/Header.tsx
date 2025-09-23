
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Réalisations" },
  { href: "#processus", label: "Processus" },
  { href: "#pricing", label: "Tarifs" },
  { href: "#a-propos", label: "À propos" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#accueil");

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/') {
        let currentSection = '#accueil';
        
        navLinks.forEach(link => {
          const section = document.querySelector(link.href);
          if (section) {
            const rect = section.getBoundingClientRect();
             // A section is considered active if its top is near the top of the viewport
            if (rect.top <= 150 && rect.bottom >= 150) {
              currentSection = link.href;
            }
          }
        });
        setActiveLink(currentSection);
      } else {
         setActiveLink(pathname);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial state on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);
  
  // Update active link based on hash change (when user clicks a link)
  useEffect(() => {
    const handleHashChange = () => {
        if (window.location.hash) {
            setActiveLink(window.location.hash);
        } else if (pathname === '/') {
            setActiveLink('#accueil');
        } else {
            setActiveLink(pathname);
        }
    };
    window.addEventListener('hashchange', handleHashChange, false);
    handleHashChange();
    return () => {
        window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, [pathname]);


  const NavLink = ({ href, label, className }: { href: string, label: string, className?: string }) => {
    const isAnchor = href.startsWith("#");
    const isActive = activeLink === href;
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      setSheetOpen(false);
      if (isAnchor) {
        e.preventDefault();
        // Si on est sur une autre page que l'accueil, rediriger vers l'accueil avec l'ancre
        if (pathname !== '/') {
          window.location.href = '/' + href;
          return;
        }
        // Si on est sur l'accueil, faire le scroll classique
        const section = document.querySelector(href);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          setActiveLink(href);
          window.history.replaceState(null, "", href);
        }
      }
    };
    return (
      <Link
        href={isAnchor ? href : href}
        className={cn(
          "transition-colors text-lg md:text-sm hover:text-primary",
          isActive ? "text-primary font-semibold" : "text-foreground/60",
          className
        )}
        onClick={handleClick}
        aria-current={isActive ? "page" : undefined}
        prefetch
      >
        {label}
      </Link>
    );
  };

  const handleLogoClick = () => {
    setSheetOpen(false);
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveLink("#accueil");
    } else {
      // If on another page, just navigate to home
      // The Link component will handle this, but we ensure state is updated
      setActiveLink("#accueil");
    }
  };

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2" onClick={handleLogoClick}>
            <Code2 className="h-7 w-7 text-primary" />
            <span className="font-headline font-bold text-xl">
              Matthéo Termine
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav id="navigation" className="hidden md:flex items-center gap-6" role="navigation" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Ouvrir le menu de navigation" aria-expanded={isSheetOpen} aria-controls="mobile-menu">
                  <div className={cn(
                    "transition-transform duration-300",
                    isSheetOpen ? "rotate-90" : "rotate-0"
                  )}>
                    <Menu className="h-6 w-6" />
                  </div>
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menu principal</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  {/* Logo section in mobile menu */}
                  <div className="flex items-center gap-3 py-6 border-b border-border/50">
                    <Code2 className="h-8 w-8 text-primary" />
                    <span className="font-headline font-bold text-xl text-primary">
                      Matthéo Termine
                    </span>
                  </div>

                  {/* Navigation */}
                  <nav id="mobile-menu" className="flex flex-col gap-2 pt-8 flex-1" role="navigation" aria-label="Navigation mobile">
                    {navLinks.map((link, index) => (
                      <div
                        key={link.href}
                        className={cn(
                          "animate-stagger-fade-in",
                          `menu-item-${index + 1}`
                        )}
                      >
                        <NavLink
                          {...link}
                          className="text-xl py-3 px-4 rounded-lg hover:bg-primary/5 transition-all duration-200 block border-l-4 border-transparent hover:border-primary/20"
                        />
                      </div>
                    ))}
                  </nav>

                  {/* Footer section */}
                  <div className="pt-6 border-t border-border/50 text-center">
                    <p className="text-sm text-muted-foreground">
                      Intégrateur Web Freelance
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
