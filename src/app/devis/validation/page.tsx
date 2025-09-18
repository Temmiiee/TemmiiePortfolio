'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, Suspense, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download, Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';

interface DevisData {
  siteType: string;
  designType: string;
  technology?: string;
  features: string[];
  maintenance?: boolean;
  projectDescription?: string;
  clientInfo: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
  };
  total: number;
}

function DevisValidationContent() {
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
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Configuration optimisée pour le PDF avec taille correcte
      await pdf.html(devisRef.current, {
        margin: [8, 8, 8, 8],
        autoPaging: 'text',
        html2canvas: {
          scale: 0.6,
          useCORS: true,
          backgroundColor: '#ffffff',
          letterRendering: true,
          allowTaint: false,
          removeContainer: true,
          logging: false,
          height: 1122, // Hauteur A4 en pixels (794 * 1.414)
          width: 794,   // Largeur A4 en pixels
        },
        width: 194, // Largeur en mm pour A4 (210 - marges)
        windowWidth: 794,
        x: 0,
        y: 0,
        callback: function(pdf: jsPDF) {
          // Ajuster la taille si nécessaire  
          const pdfWithInternal = pdf as jsPDF & { internal: { getNumberOfPages(): number } };
          const pageCount = pdfWithInternal.internal.getNumberOfPages();
          console.log(`PDF généré avec ${pageCount} page(s)`);
        }
      });
      
      pdf.save(`Devis_${devisNumber}_${devisData.clientInfo.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
    }
  };

  const handleSubmitDevis = async () => {
    if (!devisData || !devisRef.current) return;
    setIsSubmitting(true);
    try {
      // Générer le PDF du devis avec configuration optimisée
      const pdf = new jsPDF('p', 'mm', 'a4');
      await pdf.html(devisRef.current, {
        margin: [8, 8, 8, 8],
        autoPaging: 'text',
        html2canvas: {
          scale: 0.6,
          useCORS: true,
          backgroundColor: '#ffffff',
          letterRendering: true,
          allowTaint: false,
          removeContainer: true,
          logging: false,
          height: 1122,
          width: 794,
        },
        width: 194,
        windowWidth: 794,
        x: 0,
        y: 0,
      });
      const pdfBlob = pdf.output('blob');
      // Envoyer le PDF par email au prestataire
      const formData = new FormData();
      formData.append('pdf', pdfBlob, `Devis_${devisNumber}_${devisData.clientInfo.name.replace(/\s+/g, '_')}.pdf`);
      formData.append('devisData', JSON.stringify(devisData));
      formData.append('devisNumber', devisNumber);
      const response = await fetch('/api/send-devis', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
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
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/devis">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au calculateur
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-center mb-2 text-black">Demande de projet</h1>
          <p className="text-center text-gray-700">
            Vérifiez les détails de votre demande avant envoi.<br />
            Ce document est une pré-étude indicative et non un devis contractuel.
          </p>
        </div>

        {/* Devis Document */}
        <div 
          ref={devisRef} 
          className="mb-8 bg-white" 
          style={{ 
            fontFamily: 'Arial, sans-serif', 
            fontSize: '12px', 
            lineHeight: '1.4', 
            color: '#000000',
            maxWidth: '794px',
            width: '794px',
            margin: '0 auto',
            padding: '16px',
            boxSizing: 'border-box'
          }}
        >
          <div 
            className="p-4 bg-white" 
            style={{ 
              borderBottom: '2px solid #e5e7eb', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '0'
            }}
          >
            <div style={{ flex: '1' }}>
              <h2 
                style={{ 
                  color: '#000000', 
                  fontSize: '20px', 
                  margin: '0 0 12px 0',
                  fontWeight: 'bold'
                }}
              >
                DEMANDE DE PROJET
              </h2>
              <div style={{ fontSize: '10px', lineHeight: '1.3' }}>
                <p style={{ margin: '0', fontWeight: 'bold', color: '#000' }}>Prestataire :</p>
                <p style={{ margin: '1px 0', color: '#000' }}>Matthéo Termine</p>
                <p style={{ margin: '1px 0', color: '#000' }}>Intégrateur Web Freelance</p>
                <p style={{ margin: '1px 0', color: '#000' }}>Email: contact@mattheo-termine.fr</p>
                <p style={{ margin: '1px 0', color: '#000' }}>Site: https://mattheo-termine.fr</p>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '10px', lineHeight: '1.3' }}>
              <p style={{ margin: '1px 0', color: '#000' }}><strong>Numéro:</strong> {devisNumber}</p>
              <p style={{ margin: '1px 0', color: '#000' }}><strong>Date:</strong> {today}</p>
              <p style={{ margin: '6px 0 0 0', color: '#dc2626', fontWeight: 'bold', fontSize: '9px' }}>
                DOCUMENT NON CONTRACTUEL
              </p>
            </div>
          </div>
          <div style={{ padding: '16px', backgroundColor: '#ffffff', color: '#000000' }}>
            {/* Informations client */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                marginBottom: '12px', 
                color: '#1f2937',
                borderBottom: '1px solid #d1d5db',
                paddingBottom: '4px'
              }}>
                INFORMATIONS CLIENT
              </h3>
              <div style={{ fontSize: '12px', lineHeight: '1.5' }}>
                <p style={{ margin: '4px 0', color: '#000' }}>
                  <strong>Nom :</strong> {devisData.clientInfo.name}
                </p>
                {devisData.clientInfo.company && (
                  <p style={{ margin: '4px 0', color: '#000' }}>
                    <strong>Entreprise :</strong> {devisData.clientInfo.company}
                  </p>
                )}
                <p style={{ margin: '4px 0', color: '#000' }}>
                  <strong>Email :</strong> {devisData.clientInfo.email}
                </p>
                {devisData.clientInfo.phone && (
                  <p style={{ margin: '4px 0', color: '#000' }}>
                    <strong>Téléphone :</strong> {devisData.clientInfo.phone}
                  </p>
                )}
              </div>
            </div>
            <Separator className="my-6" />
            {/* Récapitulatif du projet */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-black">Résumé du projet</h3>
              <div className="space-y-2">
                <p><strong>Type de site :</strong> {devisData.siteType === 'vitrine' ? 'Site vitrine' : devisData.siteType === 'ecommerce' ? 'E-commerce' : 'Application web'}</p>
                <p><strong>Design :</strong> {devisData.designType === 'custom' ? 'Sur-mesure' : 'Basé sur un template'}</p>
                <p><strong>Technologie :</strong> {devisData.technology === 'no-preference' ? 'Pas de préférence' : devisData.technology}</p>
                {devisData.features && devisData.features.length > 0 && (
                  <p><strong>Fonctionnalités :</strong> {devisData.features.join(', ')}</p>
                )}
                {devisData.projectDescription && (
                  <p><strong>Description :</strong> {devisData.projectDescription}</p>
                )}
                {devisData.maintenance && (
                  <p><strong>Maintenance & Hébergement :</strong> Oui (49€ HT / mois)</p>
                )}
              </div>
            </div>
            <Separator className="my-6" />
            {/* Détail des prestations */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-black">Prestations incluses</h3>
              <ul className="space-y-2 ml-4 text-black list-disc">
                <li>Analyse et configuration technique adaptée au projet</li>
                <li>Mise en place du design ({devisData.designType === 'custom' ? 'sur-mesure' : 'template adapté'})</li>
                <li>Intégration des contenus fournis par le client (textes, images, logo)</li>
                <li>Optimisation responsive (mobile et tablette)</li>
                <li>Mise en conformité RGPD (base)</li>
                {devisData.features && devisData.features.length > 0 && devisData.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
                {devisData.maintenance && (
                  <li>Maintenance technique, hébergement, sauvegardes et assistance</li>
                )}
              </ul>
            </div>
            <Separator className="my-6" />
            {/* Conditions financières */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-black">Conditions financières</h3>
              <div className="space-y-2">
                <p><strong>Total HT :</strong> {devisData.total} €</p>
                {devisData.maintenance && (
                  <p><strong>Maintenance & Hébergement :</strong> 49€ HT / mois</p>
                )}
                <div className="mt-4">
                  <p><strong>Modalités de paiement :</strong></p>
                  <ul className="ml-4 space-y-1 text-black list-disc">
                    <li>30% à la signature du devis</li>
                    <li>70% à la livraison du site</li>
                    {devisData.maintenance && (
                      <li>Maintenance : facturation mensuelle ou annuelle</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            {/* Mention non contractuel et instructions */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">Projet de devis</h3>
              <p className="mb-4 font-bold text-red-600">Document non contractuel tant qu’il n’est pas validé par le prestataire.</p>
              <p className="mb-4">Ce document est une pré-étude indicative générée automatiquement selon votre demande. Il ne constitue pas un devis légal ni un engagement du prestataire.</p>
              <p className="mb-4">Après analyse, le prestataire pourra vous envoyer un devis officiel à signer si le projet est accepté.</p>
              <div className="border-2 border-dashed border-black p-4 bg-white rounded-lg">
                <p className="text-sm text-black mb-2">Vous serez recontacté par email après validation du projet.</p>
              </div>
            </div>
          </div>
        </div>

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
                Envoyer la demande de projet
              </>
            )}
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-foreground/70">
            En cliquant sur &quot;Envoyer la demande de projet&quot;, votre pré-étude sera transmise à Matthéo Termine.<br />
            Vous recevrez une réponse personnalisée après analyse.
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
