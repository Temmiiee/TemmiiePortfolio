'use client';

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>
          &copy; {currentYear} Matthéo Termine. {t('footer.rights')}
          {/* {' • '}
          <Link href="/politique-confidentialite" className="underline hover:text-primary">
            {t('footer.privacy')}
          </Link> */}
        </p>
      </div>
    </footer>
  );
}
