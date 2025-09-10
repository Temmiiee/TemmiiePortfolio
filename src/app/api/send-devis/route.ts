import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Pour les tests, on simule l'envoi d'email
// En production, décommentez les lignes nodemailer et configurez vos variables d'environnement

// import nodemailer from 'nodemailer';
// const transporter = nodemailer.createTransporter({
//   host: process.env.SMTP_HOST || 'smtp.gmail.com',
//   port: parseInt(process.env.SMTP_PORT || '587'),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

export async function POST(request: NextRequest) {
  try {
    // Récupérer le FormData (PDF + devisData + devisNumber)
    const formData = await request.formData();
    const devisNumber = formData.get('devisNumber');
    const devisDataRaw = formData.get('devisData');
    // PDF non utilisé ici, mais récupérable :
    // const pdfFile = formData.get('pdf');

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

    // Enregistrement du devis dans devis.json
    const devisFilePath = path.join(process.cwd(), 'src', 'app', 'api', 'devis.json');
    let devisList = [];
    try {
      devisList = JSON.parse(fs.readFileSync(devisFilePath, 'utf-8'));
    } catch {
      devisList = [];
    }
    devisList.push({
      devisNumber: devisNumber,
      devisData: devisData,
      status: 'en_attente',
      date: today,
      pdf: null // PDF non stocké pour l'instant
    });
    fs.writeFileSync(devisFilePath, JSON.stringify(devisList, null, 2));

    // Template HTML pour l'email (sans signature)
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nouveau Devis - ${devisNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { background: #3F51B5; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
          .section { margin-bottom: 20px; }
          .section h3 { color: #3F51B5; border-bottom: 2px solid #3F51B5; padding-bottom: 5px; }
          .client-info { background: white; padding: 15px; border-radius: 5px; margin: 10px 0; }
          .features { background: white; padding: 15px; border-radius: 5px; }
          .features ul { margin: 0; padding-left: 20px; }
          .total { background: #009688; color: white; padding: 15px; border-radius: 5px; text-align: center; font-size: 18px; font-weight: bold; }
          .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nouveau Devis Reçu</h1>
            <p><strong>Numéro:</strong> ${devisNumber}</p>
            <p><strong>Date:</strong> ${today}</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h3>Informations Client</h3>
              <div class="client-info">
                <p><strong>Nom:</strong> ${devisData.clientInfo.name}</p>
                ${devisData.clientInfo.company ? `<p><strong>Entreprise:</strong> ${devisData.clientInfo.company}</p>` : ''}
                <p><strong>Email:</strong> ${devisData.clientInfo.email}</p>
                ${devisData.clientInfo.phone ? `<p><strong>Téléphone:</strong> ${devisData.clientInfo.phone}</p>` : ''}
              </div>
            </div>

            <div class="section">
              <h3>Détails du Projet</h3>
              <div class="features">
                <p><strong>Type de site:</strong> ${devisData.siteType}</p>
                <p><strong>Type de design:</strong> ${devisData.designType}</p>
                ${devisData.features && devisData.features.length > 0 ? `
                  <p><strong>Fonctionnalités demandées:</strong></p>
                  <ul>
                    ${devisData.features.map((feature: string) => `<li>${feature}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            </div>

            <div class="total">
              Estimation: ${devisData.total} €
            </div>
          </div>

          <div class="footer">
            <p>Ce devis a été généré automatiquement depuis votre site web.</p>
            <p>Répondez rapidement au client: ${devisData.clientInfo.email}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email pour vous (le prestataire)
    const mailOptionsToProvider = {
      from: process.env.SMTP_FROM || 'noreply@mattheo-termine.fr',
      to: 'mattheotermine104@gmail.com',
      subject: `Nouveau Devis #${devisNumber} - ${devisData.clientInfo.name}`,
      html: htmlTemplate,
    };

    // Email de confirmation pour le client (sans signature)
    const mailOptionsToClient = {
      from: process.env.SMTP_FROM || 'noreply@mattheo-termine.fr',
      to: devisData.clientInfo.email,
      subject: `Votre demande de projet #${devisNumber} a bien été reçue !`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Confirmation Devis</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #3F51B5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
            .highlight { background: #009688; color: white; padding: 10px; border-radius: 5px; text-align: center; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Votre demande de projet est bien reçue !</h1>
              <p>Bonjour ${devisData.clientInfo.name}</p>
            </div>

            <div class="content">
              <p>Merci pour votre demande. Votre projet va être analysé par le prestataire.</p>
              <div class="highlight">
                <strong>Numéro de demande : ${devisNumber}</strong>
              </div>
              <p>Vous recevrez une réponse personnalisée après analyse.</p>
              <p><strong>Résumé de votre projet :</strong></p>
              <ul>
                <li>Type de projet: ${devisData.siteType}</li>
                <li>Budget estimé: ${devisData.total} €</li>
                <li>Prestations incluses: ${devisData.features ? devisData.features.slice(0, 3).join(', ') + '...' : 'Détails dans le devis'}</li>
              </ul>
              <p>Ce document n'est pas un devis contractuel. Vous recevrez un devis officiel à signer si le projet est accepté.</p>
              <p>Des questions ? Répondez simplement à cet email !</p>
              <p>Cordialement,<br>Matthéo Termine<br>Intégrateur Web Freelance</p>
            </div>
            <div class="footer">
              <p>contact@mattheo-termine.fr | www.mattheo-termine.fr</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Pour les tests, on simule l'envoi d'email
    // En production, décommentez ces lignes :
    // await Promise.all([
    //   transporter.sendMail(mailOptionsToProvider),
    //   transporter.sendMail(mailOptionsToClient),
    // ]);

    // Simulation pour les tests
    console.log('📧 Email simulé envoyé au prestataire:', mailOptionsToProvider.subject);
    console.log('📧 Email simulé envoyé au client:', mailOptionsToClient.subject);

    // Attendre un peu pour simuler l'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: 'Devis envoyé avec succès',
      devisNumber 
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi du devis:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du devis' },
      { status: 500 }
    );
  }
}
