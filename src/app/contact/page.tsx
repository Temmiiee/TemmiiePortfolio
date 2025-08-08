import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Alex Durand pour vos projets web. Formulaire de contact, email et WhatsApp disponibles.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Contactez-moi</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Une question, un projet ? N'hésitez pas à me contacter. Je vous répondrai dans les plus brefs délais.
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="font-headline text-2xl font-bold">Autres moyens de contact</h2>
          <p className="text-muted-foreground">
            Si vous préférez, vous pouvez aussi me joindre directement par email ou via WhatsApp.
          </p>
          <div className="space-y-4">
            <Button asChild variant="outline" className="w-full justify-start text-left h-auto py-3">
              <Link href="mailto:contact@alexdurand.fr">
                <Mail className="mr-4 h-6 w-6 text-primary" />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-muted-foreground">contact@alexdurand.fr</div>
                </div>
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start text-left h-auto py-3">
              <Link href="https://wa.me/33612345678" target="_blank">
                <MessageCircle className="mr-4 h-6 w-6 text-accent" />
                 <div>
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-muted-foreground">Discutons en direct</div>
                </div>
              </Link>
            </Button>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
