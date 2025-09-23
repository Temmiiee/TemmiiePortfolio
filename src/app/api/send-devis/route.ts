import { NextRequest, NextResponse } from 'next/server';
import { saveDevis } from '@/lib/devis-storage';
import { 
  createEmailTransporter, 
  sendEmailWithRetry, 
  getDefaultEmailConfig
} from '@/lib/email-utils';
import { 
  createProviderEmailTemplate,
  createClientConfirmationTemplate,
  type DevisEmailData
} from '@/lib/devis-email-templates';
import { config, getBaseUrl, shouldLog } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    // Récupérer le FormData (PDF + devisData + devisNumber)
    const formData = await request.formData();
    const devisNumber = formData.get('devisNumber');
    const devisDataRaw = formData.get('devisData');
    const pdfFile = formData.get('pdf');

    if (!devisDataRaw || !devisNumber) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Parse devisData
    let devisData;
    try {
      devisData = JSON.parse(devisDataRaw as string);
    } catch {
      return NextResponse.json(
        { error: 'Données devis invalides' },
        { status: 400 }
      );
    }

    const today = new Date().toLocaleDateString('fr-FR');
    const baseUrl = getBaseUrl();
    const defaultEmailConfig = getDefaultEmailConfig();

    // Sauvegarder le devis dans la base de données
    try {
      await saveDevis({
        devisNumber: devisNumber as string,
        clientInfo: devisData.clientInfo,
        siteType: devisData.siteType,
        designType: devisData.designType,
        features: devisData.features,
        total: devisData.total,
        status: 'pending'
      });
      if (shouldLog()) {
        console.log('Devis sauvegardé avec succès:', devisNumber);
      }
    } catch (saveError) {
      if (shouldLog()) {
        console.error('Erreur lors de la sauvegarde du devis:', saveError);
      }
      // On continue même si la sauvegarde échoue
    }

    // Préparer les données pour les templates
    const emailData: DevisEmailData = {
      devisNumber: devisNumber as string,
      clientInfo: devisData.clientInfo,
      siteType: devisData.siteType,
      designType: devisData.designType,
      features: devisData.features,
      total: devisData.total
    };

    // Générer les templates d'emails
    const providerEmailHtml = createProviderEmailTemplate(emailData, baseUrl, today);
    const clientEmailHtml = createClientConfirmationTemplate(emailData);

    // Email pour le prestataire
    const mailOptionsToProvider = {
      ...defaultEmailConfig,
      to: config.email.admin,
      subject: `Nouveau Devis #${devisNumber} - ${devisData.clientInfo.name}`,
      html: providerEmailHtml,
      attachments: pdfFile && typeof pdfFile !== 'string' ? [{
        filename: `devis-${devisNumber}.pdf`,
        content: Buffer.from(await (pdfFile as File).arrayBuffer()),
        contentType: 'application/pdf',
      }] : [],
    };

    // Email de confirmation pour le client
    const mailOptionsToClient = {
      ...defaultEmailConfig,
      to: devisData.clientInfo.email,
      cc: config.email.admin,
      subject: `Votre demande de projet #${devisNumber} a bien été reçue !`,
      html: clientEmailHtml,
    };

    // Créer le transporteur à l'exécution
    let transporter;
    try {
      transporter = createEmailTransporter();
    } catch (transporterError) {
      if (shouldLog()) {
        console.error('Erreur de configuration SMTP:', transporterError);
      }
      return NextResponse.json({ 
        error: 'Configuration email non disponible',
        details: (transporterError as Error).message
      }, { status: 500 });
    }

    // Test de connexion SMTP (seulement en développement)
    if (shouldLog()) {
      try {
        await transporter.verify();
        if (shouldLog()) {
          console.log('Connexion SMTP vérifiée');
        }
      } catch (verifyError) {
        if (shouldLog()) {
          console.error('Erreur de vérification SMTP:', verifyError);
        }
        // On continue quand même car parfois verify() échoue mais sendMail fonctionne
      }
    }

    try {
      // Envoyer l'email au prestataire en premier (priorité)
      await sendEmailWithRetry(transporter, mailOptionsToProvider);
      if (shouldLog()) {
        console.log('Email prestataire envoyé');
      }
      
      // Puis envoyer la confirmation au client
      await sendEmailWithRetry(transporter, mailOptionsToClient);
      if (shouldLog()) {
        console.log('Email client envoyé');
      }
      
    } catch (mailError) {
      if (shouldLog()) {
        console.error('Erreur lors de l\'envoi des emails après toutes les tentatives:', mailError);
      }
      return NextResponse.json({ 
        error: 'Erreur lors de l\'envoi des emails', 
        details: mailError instanceof Error ? mailError.message : String(mailError),
        devisNumber // On retourne quand même le numéro pour que l'utilisateur sache que ça a été traité
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Devis envoyé avec succès',
      devisNumber 
    });

  } catch (error) {
    if (shouldLog()) {
      console.error('Erreur lors de l\'envoi du devis:', error);
    }
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du devis' },
      { status: 500 }
    );
  }
}
