'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Download, Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DevisData {
  siteType: string;
  designType: string;
  pages: number;
  features: string[];
  timeline: string;
  budget: string;
  clientInfo: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
  };
  total: number;
}

function DevisValidationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [devisData, setDevisData] = useState<DevisData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [devisNumber, setDevisNumber] = useState('');
  const devisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Récupérer les données du devis depuis les paramètres URL ou localStorage
    const data = localStorage.getItem('devisData');
    if (data) {
      const parsedData = JSON.parse(data);
      setDevisData(parsedData);
      
      // Générer un numéro de devis unique
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      setDevisNumber(`${year}-${month}${day}-${random}`);
    }
  }, []);

  const handleDownloadPDF = async () => {
    if (!devisRef.current || !devisData) return;

    try {
      // Créer un canvas à partir du contenu HTML
      const canvas = await html2canvas(devisRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      // Créer le PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Ajouter la première page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Ajouter des pages supplémentaires si nécessaire
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Télécharger le PDF
      pdf.save(`Devis_${devisNumber}_${devisData.clientInfo.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
    }
  };

  const handleSubmitDevis = async () => {
    if (!devisData) return;

    setIsSubmitting(true);

    try {
      // Sauvegarder le numéro de devis pour la page de confirmation
      localStorage.setItem('lastDevisNumber', devisNumber);

      // Envoyer le devis par email avec lien de signature
      const response = await fetch('/api/send-devis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          devisData,
          devisNumber,
          signatureLink: `${window.location.origin}/devis/signature/${devisNumber}`,
        }),
      });

      if (response.ok) {
        // Rediriger vers une page de confirmation
        router.push('/devis/confirmation');
      } else {
        throw new Error('Erreur lors de l\'envoi du devis');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de l\'envoi du devis. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!devisData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Chargement du devis...</h2>
          <p className="text-muted-foreground">Veuillez patienter</p>
        </div>
      </div>
    );
  }

  const today = new Date().toLocaleDateString('fr-FR');

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/devis">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au calculateur
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-center mb-2">Validation du Devis</h1>
          <p className="text-center text-foreground/80">
            Vérifiez les détails de votre projet avant envoi
          </p>
        </div>

        {/* Devis Document */}
        <Card ref={devisRef} className="mb-8 shadow-lg">
          <CardHeader className="bg-primary text-primary-foreground">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold">DEVIS</CardTitle>
                <div className="mt-4 space-y-1 text-primary-foreground/90">
                  <p className="font-semibold">Prestataire :</p>
                  <p>Matthéo Termine</p>
                  <p>Intégrateur Web Freelance</p>
                  <p>Email: contact@mattheo-termine.fr</p>
                  <p>SIRET: XXXXXXXXX</p>
                </div>
              </div>
              <div className="text-right text-primary-foreground/90">
                <p><strong>Numéro de devis:</strong> {devisNumber}</p>
                <p><strong>Date:</strong> {today}</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            {/* Client Info */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-primary">Client :</h3>
              <div className="space-y-1">
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
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Objet : Création d'un {devisData.siteType} + maintenance & hébergement
              </h3>
              
              <div className="space-y-6">
                {/* Phase 1 */}
                <div>
                  <h4 className="font-semibold text-accent mb-3">
                    Phase 1 – Création du {devisData.siteType} (Forfait: {devisData.budget})
                  </h4>
                  <ul className="space-y-2 ml-4">
                    <li>• Analyse et configuration du CMS (WordPress ou custom)</li>
                    <li>• Mise en place d'un thème/modèle adapté (design: {devisData.designType})</li>
                    <li>• Intégration des contenus fournis (textes, images, logo)</li>
                    <li>• Optimisation responsive (mobile et tablette)</li>
                    <li>• Mise en place minimale RGPD (mentions légales, politique cookies de base)</li>
                    <li>• Formation rapide à la gestion du contenu</li>
                    {devisData.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Phase 2 */}
                <div>
                  <h4 className="font-semibold text-accent mb-3">
                    Phase 2 – Maintenance & Hébergement (45€ HT / mois)
                  </h4>
                  <ul className="space-y-2 ml-4">
                    <li>• Hébergement web (espace serveur, base de données, certificat SSL inclus)</li>
                    <li>• Maintenance technique (mises à jour CMS, plugins, sécurité)</li>
                    <li>• Sauvegardes régulières</li>
                    <li>• Assistance technique de base (corrections mineures, monitoring)</li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Financial Conditions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-primary">Conditions financières</h3>
              <div className="space-y-2">
                <p><strong>Coût de création (une seule fois) :</strong> {devisData.budget}</p>
                <p><strong>Maintenance + Hébergement :</strong> 45€ HT / mois (facturation mensuelle ou annuelle)</p>
                <div className="mt-4">
                  <p><strong>Modalités de paiement :</strong></p>
                  <ul className="ml-4 space-y-1">
                    <li>• 30% à la signature du devis</li>
                    <li>• 70% à la livraison du site</li>
                    <li>• Maintenance : facturation mensuelle ou annuelle</li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Validity and Signature */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Validité et signature</h3>
              <p className="mb-4">Devis valable 30 jours à compter de la date d'émission.</p>
              <p className="mb-6">Bon pour accord :</p>
              <div className="border-2 border-dashed border-border p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Signature et cachet du client :</p>
                <div className="h-20"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg" onClick={handleDownloadPDF}>
            <Download className="mr-2 h-5 w-5" />
            Télécharger le PDF
          </Button>
          
          <Button 
            size="lg" 
            onClick={handleSubmitDevis}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Proposer le projet
              </>
            )}
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-foreground/70">
            En cliquant sur "Proposer le projet", ce devis sera envoyé à Matthéo Termine qui vous recontactera rapidement.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DevisValidationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Chargement...</h2>
        </div>
      </div>
    }>
      <DevisValidationContent />
    </Suspense>
  );
}
