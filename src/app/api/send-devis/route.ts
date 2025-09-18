import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    // Récupérer le FormData (PDF + devisData + devisNumber)
    const formData = await request.formData();
    const devisNumber = formData.get('devisNumber');
    const devisDataRaw = formData.get('devisData');
    const pdfFile = formData.get('pdf');

    console.log('--- [API/send-devis] Début traitement POST ---');
    const contentType = request.headers.get('content-type');
    console.log('Content-Type:', contentType);

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
      pdf: !!pdfFile,
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
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #ffffff; }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; background: #ffffff; }
          .header { background: #2563eb; color: #ffffff; padding: 24px; }
          .content { background: #ffffff; padding: 24px; }
          .section { margin-bottom: 24px; }
          .section h3 { color: #333333; border-bottom: 2px solid #2563eb; padding-bottom: 8px; margin-top: 0; font-size: 18px; }
          .client-info { background: #f8f9fa; padding: 16px; margin: 12px 0; }
          .features { background: #f8f9fa; padding: 16px; }
          .features ul { margin: 0; padding-left: 20px; }
          .features li { margin-bottom: 6px; color: #333333; }
          .total { background: #2563eb; color: #ffffff; padding: 20px; text-align: center; font-size: 20px; font-weight: bold; }
          .footer { background: #333333; color: #ffffff; padding: 20px; text-align: center; }
          p { margin: 10px 0; color: #333333; }
          strong { color: #333333; font-weight: 600; }
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
      attachments: pdfFile && typeof pdfFile !== 'string' ? [{
        filename: `devis-${devisNumber}.pdf`,
        content: Buffer.from(await (pdfFile as File).arrayBuffer()),
        contentType: 'application/pdf',
      }] : [],
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
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #ffffff; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff; }
            .header { background: #2563eb; color: #ffffff; padding: 24px; text-align: center; }
            .content { background: #ffffff; padding: 24px; }
            .footer { background: #333333; color: #ffffff; padding: 20px; text-align: center; }
            .highlight { background: #2563eb; color: #ffffff; padding: 16px; text-align: center; margin: 20px 0; font-weight: bold; font-size: 16px; }
            p { margin: 12px 0; color: #333333; }
            ul { margin: 12px 0; padding-left: 20px; }
            li { margin-bottom: 6px; color: #333333; }
            strong { color: #333333; font-weight: 600; }
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

    // Envoi réel des emails
    try {
      const resultProvider = await transporter.sendMail(mailOptionsToProvider);
      console.log('📧 Email envoyé au prestataire:', resultProvider.accepted, resultProvider.response);
      const resultClient = await transporter.sendMail(mailOptionsToClient);
      console.log('📧 Email envoyé au client:', resultClient.accepted, resultClient.response);
    } catch (mailError) {
  console.error('Erreur lors de l\'envoi des emails:', mailError);
  return NextResponse.json({ error: 'Erreur lors de l\'envoi des emails', details: mailError instanceof Error ? mailError.message : String(mailError) }, { status: 500 });
    }

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
