
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Services" },
  { href: "#processus", label: "Processus" },
  { href: "#projets", label: "Projets" },
  { href: "#tarifs", label: "Tarifs" },
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
    // Always prefix with / to navigate to the homepage sections from other pages
    const finalHref = href.startsWith("#") ? `/${href}` : href;
    const isActive = activeLink === href;

    return (
      <Link
        href={finalHref}
        className={cn(
          "transition-colors text-lg md:text-sm hover:text-primary",
          isActive ? "text-primary font-semibold" : "text-foreground/60",
          className
        )}
        onClick={() => {
            setSheetOpen(false);
            // No need to manually set active link here, hashchange listener will do it
        }}
        aria-current={isActive ? "page" : undefined}
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
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menu principal</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 pt-10">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} {...link} className="text-2xl" />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
