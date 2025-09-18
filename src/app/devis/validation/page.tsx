'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
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

// Function to generate clean PDF without HTML conversion issues
function generateDevisPDF(pdf: jsPDF, devisData: DevisData, devisNumber: string) {
  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let currentY = margin;

  // Colors
  const primaryColor = [30, 64, 175]; // Blue
  const lightBlue = [239, 246, 255];
  const darkGray = [26, 26, 26];
  const lightGray = [156, 163, 175];

  // Helper function to add text with word wrap
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    lines.forEach((line: string, index: number) => {
      pdf.text(line, x, y + (index * (fontSize * 0.5)));
    });
    return y + (lines.length * (fontSize * 0.5));
  };

  // Header section with blue background
  pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  pdf.rect(0, 0, pageWidth, 50, 'F');
  
  // Title
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('DEMANDE DE PROJET', margin, 25);
  
  // Document info
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`N° ${devisNumber}`, pageWidth - margin - 40, 20);
  pdf.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, pageWidth - margin - 40, 30);
  
  // Provider info
  pdf.text('Matthéo Termine', margin, 35);
  pdf.text('Intégrateur Web Freelance', margin, 42);

  currentY = 65;

  // Client Information Section
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('INFORMATIONS CLIENT', margin, currentY);
  currentY += 8;

  // Client details box
  pdf.setFillColor(248, 250, 252);
  pdf.rect(margin, currentY - 3, contentWidth, 25, 'F');
  pdf.setDrawColor(226, 232, 240);
  pdf.rect(margin, currentY - 3, contentWidth, 25, 'S');

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Nom: ${devisData.clientInfo.name}`, margin + 5, currentY + 5);
  pdf.text(`Email: ${devisData.clientInfo.email}`, margin + 5, currentY + 12);
  
  if (devisData.clientInfo.company) {
    pdf.text(`Entreprise: ${devisData.clientInfo.company}`, margin + 5, currentY + 19);
  }
  
  currentY += 35;

  // Project Summary Section
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('RÉSUMÉ DU PROJET', margin, currentY);
  currentY += 8;

  // Project details
  pdf.setFillColor(248, 250, 252);
  pdf.rect(margin, currentY - 3, contentWidth, 35, 'F');
  pdf.setDrawColor(226, 232, 240);
  pdf.rect(margin, currentY - 3, contentWidth, 35, 'S');

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  
  const siteTypeText = devisData.siteType === 'vitrine' ? 'Site vitrine' : 
                      devisData.siteType === 'ecommerce' ? 'E-commerce' : 'Application web';
  pdf.text(`Type de site: ${siteTypeText}`, margin + 5, currentY + 5);
  
  const designText = devisData.designType === 'custom' ? 'Design sur-mesure' : 'Template adapté';
  pdf.text(`Design: ${designText}`, margin + 5, currentY + 12);
  
  if (devisData.technology) {
    const techText = devisData.technology === 'no-preference' ? 'Pas de préférence' : devisData.technology;
    pdf.text(`Technologie: ${techText}`, margin + 5, currentY + 19);
  }

  if (devisData.maintenance) {
    pdf.text('Maintenance & Hébergement: Inclus (49€ HT/mois)', margin + 5, currentY + 26);
  }

  currentY += 45;

  // Features Section if any
  if (devisData.features && devisData.features.length > 0) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('FONCTIONNALITÉS SPÉCIALES', margin, currentY);
    currentY += 8;

    devisData.features.forEach((feature) => {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`• ${feature}`, margin + 5, currentY);
      currentY += 6;
    });
    
    currentY += 5;
  }

  // Project Description if provided
  if (devisData.projectDescription) {
    if (currentY > 230) {
      pdf.addPage();
      currentY = margin;
    }
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DESCRIPTION DÉTAILLÉE', margin, currentY);
    currentY += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    currentY = addText(`"${devisData.projectDescription}"`, margin + 5, currentY, contentWidth - 10);
    currentY += 10;
  }

  // Pricing Section
  if (currentY > 220) {
    pdf.addPage();
    currentY = margin;
  }

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('CONDITIONS FINANCIÈRES', margin, currentY);
  currentY += 8;

  // Total price box
  pdf.setFillColor(lightBlue[0], lightBlue[1], lightBlue[2]);
  pdf.rect(margin, currentY - 3, contentWidth, 15, 'F');
  pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  pdf.rect(margin, currentY - 3, contentWidth, 15, 'S');

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  pdf.text(`Total du projet: ${devisData.total}€ HT`, margin + 5, currentY + 8);

  currentY += 25;

  // Payment terms
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Modalités de paiement:', margin, currentY);
  currentY += 8;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`• Acompte à la signature: 30% (${Math.round(devisData.total * 0.3)}€)`, margin + 5, currentY);
  currentY += 6;
  pdf.text(`• Solde à la livraison: 70% (${Math.round(devisData.total * 0.7)}€)`, margin + 5, currentY);
  currentY += 10;

  if (devisData.maintenance) {
    pdf.text('• Maintenance: facturation mensuelle selon convenance', margin + 5, currentY);
    currentY += 10;
  }

  // Important notice
  if (currentY > 250) {
    pdf.addPage();
    currentY = margin;
  }

  pdf.setFillColor(254, 252, 232);
  pdf.rect(margin, currentY - 3, contentWidth, 30, 'F');
  pdf.setDrawColor(234, 179, 8);
  pdf.rect(margin, currentY - 3, contentWidth, 30, 'S');

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(146, 64, 14);
  pdf.text('⚠️ DOCUMENT NON CONTRACTUEL', margin + 5, currentY + 8);

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  currentY = addText(
    'Ce document est une pré-étude indicative. Il ne constitue pas un devis légal. Le prestataire vous enverra un devis officiel après validation du projet.',
    margin + 5,
    currentY + 15,
    contentWidth - 10,
    9
  );

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text('contact@mattheo-termine.fr | https://mattheo-termine.fr', margin, pageHeight - 10);
}

function DevisValidationContent() {
  const router = useRouter();
  const [devisData, setDevisData] = useState<DevisData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [devisNumber, setDevisNumber] = useState('');

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
    if (!devisData) return;
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Generate PDF programmatically for clean, error-free output
      generateDevisPDF(pdf, devisData, devisNumber);
      
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
      // Generate PDF programmatically for clean output
      const pdf = new jsPDF('p', 'mm', 'a4');
      generateDevisPDF(pdf, devisData, devisNumber);
      const pdfBlob = pdf.output('blob');
      
      // Send PDF via email to provider
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
          className="mb-8 devis-document"
        >
          {/* Professional Header */}
          <div className="devis-header">
            <div style={{ flex: '1 1 0%', minWidth: '220px' }}>
              <h2 
                style={{ 
                  color: '#ffffff', 
                  fontSize: '24px', 
                  margin: '0 0 16px 0',
                  fontWeight: '700',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
              >
                DEMANDE DE PROJET
              </h2>
              <div style={{ fontSize: '12px', lineHeight: '1.4', opacity: '0.95' }}>
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  padding: '12px', 
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <p style={{ margin: '0 0 6px 0', fontWeight: '600', color: '#fff' }}>Prestataire :</p>
                  <p style={{ margin: '2px 0', color: '#fff', fontWeight: '500' }}>Matthéo Termine</p>
                  <p style={{ margin: '2px 0', color: '#fff' }}>Intégrateur Web Freelance</p>
                  <p style={{ margin: '2px 0', color: '#fff' }}>📧 contact@mattheo-termine.fr</p>
                  <p style={{ margin: '2px 0', color: '#fff' }}>🌐 https://mattheo-termine.fr</p>
                </div>
              </div>
            </div>
            <div style={{ 
              textAlign: 'right', 
              fontSize: '11px', 
              lineHeight: '1.4',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              minWidth: '180px'
            }}>
              <p style={{ margin: '2px 0', color: '#fff', fontWeight: '600' }}>
                <strong>N° de demande:</strong><br />
                {/* Affichage côté client uniquement pour éviter l'hydration error */}
                {typeof window !== 'undefined' && devisNumber && (
                  <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{devisNumber}</span>
                )}
              </p>
              <p style={{ margin: '8px 0 2px 0', color: '#fff', fontWeight: '600' }}>
                <strong>Date:</strong><br />
                <span style={{ fontSize: '13px' }}>{today}</span>
              </p>
              <div style={{ 
                marginTop: '12px', 
                padding: '6px 8px',
                backgroundColor: '#dc2626',
                borderRadius: '4px',
                border: '1px solid #b91c1c'
              }}>
                <p style={{ 
                  margin: '0', 
                  color: '#fff', 
                  fontWeight: 'bold', 
                  fontSize: '9px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Document non contractuel
                </p>
              </div>
            </div>
          </div>
          <div style={{ padding: '24px', backgroundColor: '#ffffff', color: '#1a1a1a' }}>
            {/* Informations client */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                marginBottom: '16px', 
                color: '#1e40af',
                borderBottom: '2px solid #3b82f6',
                paddingBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                📋 INFORMATIONS CLIENT
              </h3>
              <div style={{ 
                fontSize: '13px', 
                lineHeight: '1.6',
                backgroundColor: '#f8fafc',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <p style={{ margin: '0', color: '#1a1a1a' }}>
                    <strong style={{ color: '#1e40af' }}>Nom complet :</strong><br />
                    <span style={{ fontSize: '14px' }}>{devisData.clientInfo.name}</span>
                  </p>
                  {devisData.clientInfo.company && (
                    <p style={{ margin: '0', color: '#1a1a1a' }}>
                      <strong style={{ color: '#1e40af' }}>Entreprise :</strong><br />
                      <span style={{ fontSize: '14px' }}>{devisData.clientInfo.company}</span>
                    </p>
                  )}
                  <p style={{ margin: '0', color: '#1a1a1a' }}>
                    <strong style={{ color: '#1e40af' }}>Email :</strong><br />
                    <span style={{ fontSize: '14px' }}>{devisData.clientInfo.email}</span>
                  </p>
                  {devisData.clientInfo.phone && (
                    <p style={{ margin: '0', color: '#1a1a1a' }}>
                      <strong style={{ color: '#1e40af' }}>Téléphone :</strong><br />
                      <span style={{ fontSize: '14px' }}>{devisData.clientInfo.phone}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div style={{ margin: '20px 0', height: '1px', backgroundColor: '#e2e8f0' }}></div>
            
            {/* Récapitulatif du projet */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                marginBottom: '16px', 
                color: '#1e40af',
                borderBottom: '2px solid #3b82f6',
                paddingBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                🎯 RÉSUMÉ DU PROJET
              </h3>
              <div style={{ 
                backgroundColor: '#f8fafc',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ 
                    backgroundColor: '#ffffff',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <p style={{ margin: '0', fontSize: '13px' }}>
                      <strong style={{ color: '#1e40af' }}>Type de site :</strong><br />
                      <span style={{ fontSize: '14px', color: '#1a1a1a' }}>
                        {devisData.siteType === 'vitrine' ? '🏢 Site vitrine' : devisData.siteType === 'ecommerce' ? '🛒 E-commerce' : '⚡ Application web'}
                      </span>
                    </p>
                  </div>
                  <div style={{ 
                    backgroundColor: '#ffffff',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <p style={{ margin: '0', fontSize: '13px' }}>
                      <strong style={{ color: '#1e40af' }}>Design :</strong><br />
                      <span style={{ fontSize: '14px', color: '#1a1a1a' }}>
                        {devisData.designType === 'custom' ? '🎨 Sur-mesure' : '📋 Template adapté'}
                      </span>
                    </p>
                  </div>
                </div>
                
                <div style={{ 
                  backgroundColor: '#ffffff',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '12px'
                }}>
                  <p style={{ margin: '0', fontSize: '13px' }}>
                    <strong style={{ color: '#1e40af' }}>Technologie :</strong><br />
                    <span style={{ fontSize: '14px', color: '#1a1a1a' }}>
                      {devisData.technology === 'no-preference' ? '⚙️ Pas de préférence (choix optimal)' : `⚙️ ${devisData.technology}`}
                    </span>
                  </p>
                </div>

                {devisData.features && devisData.features.length > 0 && (
                  <div style={{ 
                    backgroundColor: '#ffffff',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '12px'
                  }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '13px' }}>
                      <strong style={{ color: '#1e40af' }}>Fonctionnalités spéciales :</strong>
                    </p>
                    <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '13px', color: '#1a1a1a' }}>
                      {devisData.features.map((feature, index) => (
                        <li key={index} style={{ margin: '4px 0' }}>✅ {feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {devisData.projectDescription && (
                  <div style={{ 
                    backgroundColor: '#ffffff',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '12px'
                  }}>
                    <p style={{ margin: '0', fontSize: '13px' }}>
                      <strong style={{ color: '#1e40af' }}>Description détaillée :</strong><br />
                      <span style={{ fontSize: '13px', color: '#1a1a1a', fontStyle: 'italic' }}>
                        &ldquo;{devisData.projectDescription}&rdquo;
                      </span>
                    </p>
                  </div>
                )}

                {devisData.maintenance && (
                  <div style={{ 
                    backgroundColor: '#ecfdf5',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #10b981'
                  }}>
                    <p style={{ margin: '0', fontSize: '13px' }}>
                      <strong style={{ color: '#059669' }}>🔧 Maintenance & Hébergement :</strong><br />
                      <span style={{ fontSize: '14px', color: '#1a1a1a' }}>
                        Inclus (49€ HT / mois)
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div style={{ margin: '20px 0', height: '1px', backgroundColor: '#e2e8f0' }}></div>
            
            {/* Détail des prestations */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                marginBottom: '16px', 
                color: '#1e40af',
                borderBottom: '2px solid #3b82f6',
                paddingBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                📦 PRESTATIONS INCLUSES
              </h3>
              <div style={{ 
                backgroundColor: '#f8fafc',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ 
                    backgroundColor: '#ffffff',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '13px', color: '#1a1a1a', listStyle: 'none' }}>
                      <li style={{ margin: '6px 0', display: 'flex', alignItems: 'flex-start' }}>
                        <span style={{ color: '#10b981', marginRight: '8px', fontSize: '14px' }}>✅</span>
                        Analyse et configuration technique adaptée au projet
                      </li>
                      <li style={{ margin: '6px 0', display: 'flex', alignItems: 'flex-start' }}>
                        <span style={{ color: '#10b981', marginRight: '8px', fontSize: '14px' }}>✅</span>
                        Mise en place du design ({devisData.designType === 'custom' ? 'sur-mesure' : 'template adapté'})
                      </li>
                      <li style={{ margin: '6px 0', display: 'flex', alignItems: 'flex-start' }}>
                        <span style={{ color: '#10b981', marginRight: '8px', fontSize: '14px' }}>✅</span>
                        Intégration des contenus fournis par le client
                      </li>
                      <li style={{ margin: '6px 0', display: 'flex', alignItems: 'flex-start' }}>
                        <span style={{ color: '#10b981', marginRight: '8px', fontSize: '14px' }}>✅</span>
                        Optimisation responsive (mobile et tablette)
                      </li>
                    </ul>
                  </div>
                  <div style={{ 
                    backgroundColor: '#ffffff',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '13px', color: '#1a1a1a', listStyle: 'none' }}>
                      <li style={{ margin: '6px 0', display: 'flex', alignItems: 'flex-start' }}>
                        <span style={{ color: '#10b981', marginRight: '8px', fontSize: '14px' }}>✅</span>
                        Mise en conformité RGPD (base)
                      </li>
                      {devisData.features && devisData.features.length > 0 && devisData.features.map((feature, index) => (
                        <li key={index} style={{ margin: '6px 0', display: 'flex', alignItems: 'flex-start' }}>
                          <span style={{ color: '#10b981', marginRight: '8px', fontSize: '14px' }}>✅</span>
                          {feature}
                        </li>
                      ))}
                      {devisData.maintenance && (
                        <li style={{ margin: '6px 0', display: 'flex', alignItems: 'flex-start' }}>
                          <span style={{ color: '#10b981', marginRight: '8px', fontSize: '14px' }}>✅</span>
                          Maintenance technique et hébergement
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ margin: '20px 0', height: '1px', backgroundColor: '#e2e8f0' }}></div>
            
            {/* Conditions financières */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                marginBottom: '16px', 
                color: '#1e40af',
                borderBottom: '2px solid #3b82f6',
                paddingBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                💰 CONDITIONS FINANCIÈRES
              </h3>
              
              {/* Tableau récapitulatif des coûts */}
              <div style={{ 
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '16px'
              }}>
                <div style={{ 
                  backgroundColor: '#1e40af',
                  color: '#ffffff',
                  padding: '12px',
                  fontWeight: '700',
                  fontSize: '14px',
                  textAlign: 'center'
                }}>
                  RÉCAPITULATIF FINANCIER
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: '#ffffff',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a' }}>
                      💼 Total du projet (HT)
                    </span>
                    <span style={{ 
                      fontSize: '20px', 
                      fontWeight: '700', 
                      color: '#1e40af',
                      backgroundColor: '#eff6ff',
                      padding: '6px 12px',
                      borderRadius: '4px'
                    }}>
                      {devisData.total} €
                    </span>
                  </div>
                  
                  {devisData.maintenance && (
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '12px',
                      backgroundColor: '#ffffff',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>
                        🔧 Maintenance & Hébergement (HT)
                      </span>
                      <span style={{ 
                        fontSize: '16px', 
                        fontWeight: '600', 
                        color: '#059669',
                        backgroundColor: '#ecfdf5',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}>
                        49€ / mois
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Modalités de paiement */}
              <div style={{ 
                backgroundColor: '#fefce8',
                border: '1px solid #eab308',
                borderRadius: '8px',
                padding: '16px'
              }}>
                <h4 style={{ 
                  margin: '0 0 12px 0', 
                  fontSize: '14px', 
                  fontWeight: '700', 
                  color: '#92400e',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  💳 MODALITÉS DE PAIEMENT
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ 
                    backgroundColor: '#ffffff',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #eab308'
                  }}>
                    <p style={{ margin: '0', fontSize: '13px', fontWeight: '600', color: '#92400e' }}>
                      1️⃣ Acompte à la signature
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '700', color: '#1a1a1a' }}>
                      30% ({Math.round(devisData.total * 0.3)} €)
                    </p>
                  </div>
                  <div style={{ 
                    backgroundColor: '#ffffff',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #eab308'
                  }}>
                    <p style={{ margin: '0', fontSize: '13px', fontWeight: '600', color: '#92400e' }}>
                      2️⃣ Solde à la livraison
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '700', color: '#1a1a1a' }}>
                      70% ({Math.round(devisData.total * 0.7)} €)
                    </p>
                  </div>
                </div>
                {devisData.maintenance && (
                  <div style={{ 
                    marginTop: '12px',
                    backgroundColor: '#ffffff',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #eab308'
                  }}>
                    <p style={{ margin: '0', fontSize: '13px', fontWeight: '600', color: '#92400e' }}>
                      🔄 Maintenance : facturation mensuelle ou annuelle selon convenance
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div style={{ margin: '20px 0', height: '1px', backgroundColor: '#e2e8f0' }}></div>
            {/* Mention non contractuel et instructions */}
            <div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                marginBottom: '16px', 
                color: '#dc2626',
                borderBottom: '2px solid #ef4444',
                paddingBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                ⚠️ IMPORTANT - DOCUMENT NON CONTRACTUEL
              </h3>
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
