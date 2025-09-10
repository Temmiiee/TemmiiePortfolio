'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { SignaturePad } from '@/components/SignaturePad';
import { CheckCircle2, FileText, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface DevisData {
  id: string;
  devisNumber: string;
  clientInfo: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
  };
  siteType: string;
  designType: string;
  budget: string;
  features: string[];
  total: number;
  maintenanceCost: number;
  createdAt: string;
  status: 'pending' | 'signed' | 'accepted' | 'rejected';
}

export default function DevisSignaturePage() {
  const params = useParams();
  const router = useRouter();
  const [devisData, setDevisData] = useState<DevisData | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params || typeof params.id !== 'string') return;
    // Charger les données du devis depuis localStorage si disponible
    const localDevis = localStorage.getItem('devisData');
    if (localDevis) {
      const parsed = JSON.parse(localDevis);
      setDevisData({
        id: params.id,
        devisNumber: localStorage.getItem('lastDevisNumber') || String(params.id),
        clientInfo: parsed.clientInfo,
        siteType: parsed.siteType,
        designType: parsed.designType,
        budget: `${parsed.total}€ HT`,
        features: parsed.features || [],
        total: parsed.total,
        maintenanceCost: parsed.maintenance ? 49 : 0,
        createdAt: new Date().toISOString(),
        status: 'pending',
      });
    } else {
      // Fallback mock
      setDevisData({
        id: String(params.id),
        devisNumber: '2025-0124-001',
        clientInfo: {
          name: 'Jean Dupont',
          email: 'jean.dupont@email.com',
          company: 'Entreprise ABC',
          phone: '06 12 34 56 78'
        },
        siteType: 'Site Multi-pages Professionnel',
        designType: 'Design sur-mesure',
        budget: '1150€ HT',
        features: [
          'Jusqu\'à 5 pages',
          'Design 100% sur-mesure',
          'Intégration de contenu',
          'Formation à la gestion',
          'Support prioritaire'
        ],
        total: 1150,
        maintenanceCost: 45,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
    }
  }, [params]);

  const handleSignDevis = async () => {
    if (!signature || !acceptedTerms || !devisData) {
      setError('Veuillez signer le devis et accepter les conditions');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Stocker la signature dans localStorage pour la page de confirmation
      localStorage.setItem('devisSignature', signature);
      localStorage.setItem('devisSignedAt', new Date().toISOString());

      // Envoyer la signature
      const response = await fetch('/api/sign-devis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          devisId: devisData.id,
          signature,
          clientInfo: devisData.clientInfo,
          signedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Rediriger vers la page de confirmation
        router.push(`/devis/signature/${devisData.id}/confirmation`);
      } else {
        throw new Error('Erreur lors de la signature');
      }
    } catch (error) {
      setError('Erreur lors de la signature du devis. Veuillez réessayer.');
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error && !devisData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Erreur</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button asChild>
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!devisData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-bold mb-2">Chargement du devis...</h2>
          <p className="text-gray-600">Veuillez patienter</p>
        </div>
      </div>
    );
  }

  if (devisData.status === 'signed') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Devis déjà signé</h2>
            <p className="text-gray-600 mb-4">
              Ce devis a déjà été signé. Vous recevrez une réponse sous 24h.
            </p>
            <Button asChild>
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const today = new Date().toLocaleDateString('fr-FR');

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Signature du Devis</h1>
          <p className="text-gray-600">
            Veuillez vérifier les détails et signer pour accepter ce devis
          </p>
        </div>

        {/* Devis Summary */}
        <Card className="mb-8">
          <CardHeader className="bg-primary text-primary-foreground">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">DEVIS #{devisData.devisNumber}</CardTitle>
                <p className="mt-2 opacity-90">Matthéo Termine - Intégrateur Web</p>
              </div>
              <div className="text-right opacity-90">
                <p><strong>Date:</strong> {today}</p>
                <p><strong>Statut:</strong> En attente de signature</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Client Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-primary">Client :</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Nom :</strong> {devisData.clientInfo.name}</p>
                {devisData.clientInfo.company && (
                  <p><strong>Entreprise :</strong> {devisData.clientInfo.company}</p>
                )}
                <p><strong>Email :</strong> {devisData.clientInfo.email}</p>
                {devisData.clientInfo.phone && (
                  <p><strong>Téléphone :</strong> {devisData.clientInfo.phone}</p>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Project Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-primary">
                Projet : {devisData.siteType}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Prestations incluses :</h4>
                  <ul className="space-y-1">
                    {devisData.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Tarification :</h4>
                  <p className="text-2xl font-bold text-primary">{devisData.budget}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    + Maintenance : {devisData.maintenanceCost}€/mois
                  </p>
                  <div className="mt-3 text-sm">
                    <p><strong>Modalités :</strong></p>
                    <p>• 30% à la signature</p>
                    <p>• 70% à la livraison</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Terms */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-primary">Conditions :</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                <p>• Devis valable 30 jours à compter de la date d&apos;émission</p>
                <p>• Délai de réalisation : 2-4 semaines selon la complexité</p>
                <p>• Maintenance et hébergement : engagement minimum 12 mois</p>
                <p>• Modifications majeures après validation : facturation supplémentaire</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Signature Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Signature Électronique</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <SignaturePad 
              onSignatureChange={setSignature}
              disabled={isSubmitting}
            />

            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                disabled={isSubmitting}
              />
              <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                J&apos;accepte les conditions générales de vente et confirme que les informations 
                de ce devis correspondent à ma demande. Je comprends qu&apos;en signant ce document, 
                je m&apos;engage à respecter les modalités de paiement et les conditions énoncées.
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            <div className="text-center">
              <Button
                size="lg"
                onClick={handleSignDevis}
                disabled={!signature || !acceptedTerms || isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Signature en cours...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-5 w-5" />
                    Signer et Valider le Devis
                  </>
                )}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              <Clock className="w-4 h-4 inline mr-1" />
              Après signature, vous recevrez une confirmation et Matthéo vous recontactera sous 24h
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
