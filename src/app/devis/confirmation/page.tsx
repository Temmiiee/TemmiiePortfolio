'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Home, Mail, Clock } from 'lucide-react';
import Link from 'next/link';

export default function DevisConfirmationPage() {
  const [devisNumber, setDevisNumber] = useState('');

  useEffect(() => {
    // Récupérer le numéro de devis depuis localStorage ou générer un nouveau
    const savedDevisNumber = localStorage.getItem('lastDevisNumber');
    if (savedDevisNumber) {
      setDevisNumber(savedDevisNumber);
    } else {
      // Générer un numéro si pas trouvé
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const newNumber = `${year}-${month}${day}-${random}`;
      setDevisNumber(newNumber);
      localStorage.setItem('lastDevisNumber', newNumber);
    }

    // Nettoyer les données temporaires
    localStorage.removeItem('devisData');
  }, []);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Devis envoyé avec succès !
          </h1>
          <p className="text-lg text-foreground/80">
            Votre demande de devis a été transmise à Matthéo Termine
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              Devis #{devisNumber}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Envoyé avec succès
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Email envoyé</h3>
                  <p className="text-sm text-foreground/70">
                    Votre devis a été envoyé à Matthéo Termine qui l&apos;examinera et vous recontactera rapidement.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Temps de réponse</h3>
                  <p className="text-sm text-foreground/70">
                    Vous recevrez une réponse sous 24h maximum (généralement sous quelques heures).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Prochaines étapes :</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                <li>Matthéo examine votre demande et affine le devis si nécessaire</li>
                <li>Vous recevez le devis finalisé par email</li>
                <li>Échange pour ajustements si besoin</li>
                <li>Signature du devis et lancement du projet</li>
              </ol>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-foreground/70 text-center">
                <strong>Référence :</strong> Devis #{devisNumber}
                <br />
                Conservez cette référence pour vos échanges futurs.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Retour à l&apos;accueil
            </Link>
          </Button>
          
          <Button size="lg" asChild>
            <Link href="mailto:contact@mattheo-termine.fr?subject=Devis%20%23{devisNumber}">
              <Mail className="mr-2 h-5 w-5" />
              Contacter directement
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-foreground/60">
            Une question ? N&apos;hésitez pas à contacter Matthéo directement à{' '}
            <a 
              href="mailto:contact@mattheo-termine.fr" 
              className="text-primary hover:underline"
            >
              contact@mattheo-termine.fr
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
