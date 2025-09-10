'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, Mail, Home, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignatureConfirmationPage() {
  const params = useParams();
  const devisId = params && typeof params.id === 'string' ? params.id : '';
  const [signature, setSignature] = useState<string | null>(null);
  const [signedAt, setSignedAt] = useState<string | null>(null);

  useEffect(() => {
    setSignature(localStorage.getItem('devisSignature'));
    setSignedAt(localStorage.getItem('devisSignedAt'));
  }, []);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Devis Signé avec Succès !
          </h1>
          <p className="text-lg text-foreground/80">
            Votre signature électronique a été enregistrée
          </p>
          {signature && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Votre signature :</h3>
              <div className="border border-green-400 bg-white rounded-lg p-4 inline-block">
                <Image 
                  src={signature} 
                  alt="Signature électronique" 
                  style={{maxWidth:'300px',maxHeight:'120px'}} 
                  width={300}
                  height={120}
                />
              </div>
              {signedAt && (
                <p className="text-sm text-gray-500 mt-2">Signé le : {new Date(signedAt).toLocaleString('fr-FR')}</p>
              )}
            </div>
          )}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              Devis #{devisId}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Signé électroniquement
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {signedAt ? new Date(signedAt).toLocaleString('fr-FR') : new Date().toLocaleString('fr-FR')}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Notifications envoyées</h3>
                  <p className="text-sm text-foreground/70">
                    Vous et Matthéo avez reçu une confirmation par email avec tous les détails.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Validation en cours</h3>
                  <p className="text-sm text-foreground/70">
                    Matthéo va examiner votre devis signé et vous répondra sous 24-48h maximum.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Valeur juridique</h3>
                  <p className="text-sm text-foreground/70">
                    Votre signature électronique a la même valeur qu&apos;une signature manuscrite.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Prochaines étapes :</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                <li>Matthéo examine votre devis signé (24-48h)</li>
                <li>Vous recevez la confirmation d'acceptation</li>
                <li>Facturation de l'acompte (30% du montant total)</li>
                <li>Démarrage du développement de votre projet</li>
                <li>Livraison et mise en ligne</li>
              </ol>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-900 mb-2">⚠️ Important :</h4>
              <p className="text-sm text-amber-800">
                En signant ce devis, vous vous engagez selon les conditions énoncées. 
                Si Matthéo accepte le projet, le contrat devient effectif et les modalités 
                de paiement s'appliquent.
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-foreground/70 text-center">
                <strong>Référence :</strong> Devis #{devisId}
                <br />
                <strong>Signé le :</strong> {new Date().toLocaleString('fr-FR')}
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
              Retour à l'accueil
            </Link>
          </Button>
          
          <Button size="lg" asChild>
            <Link href={`mailto:contact@mattheo-termine.fr?subject=Devis%20%23${devisId}%20-%20Question`}>
              <Mail className="mr-2 h-5 w-5" />
              Contacter Matthéo
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-foreground/60">
            Une question sur votre projet ? N'hésitez pas à contacter Matthéo directement à{' '}
            <a 
              href="mailto:contact@mattheo-termine.fr" 
              className="text-primary hover:underline"
            >
              contact@mattheo-termine.fr
            </a>
          </p>
        </div>

        {/* Timeline visuelle */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-center">Suivi de votre projet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold relative z-10">
                    ✓
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Devis signé</h4>
                    <p className="text-sm text-gray-600">Aujourd'hui - Terminé</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold relative z-10">
                    2
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Validation du projet</h4>
                    <p className="text-sm text-gray-600">24-48h - En cours</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-bold relative z-10">
                    3
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-600">Acompte et démarrage</h4>
                    <p className="text-sm text-gray-600">Après validation</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-bold relative z-10">
                    4
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-600">Développement</h4>
                    <p className="text-sm text-gray-600">2-4 semaines</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-bold relative z-10">
                    5
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-600">Livraison</h4>
                    <p className="text-sm text-gray-600">Mise en ligne et formation</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
