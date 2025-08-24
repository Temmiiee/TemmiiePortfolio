import { NextRequest, NextResponse } from 'next/server';

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
    const { devisData, devisNumber, signatureLink } = await request.json();

    if (!devisData || !devisNumber) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    const today = new Date().toLocaleDateString('fr-FR');

    // Template HTML pour l'email
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
                <p><strong>Nombre de pages:</strong> ${devisData.pages}</p>
                <p><strong>Budget estimé:</strong> ${devisData.budget}</p>
                <p><strong>Délai souhaité:</strong> ${devisData.timeline}</p>
                
                ${devisData.features && devisData.features.length > 0 ? `
                  <p><strong>Fonctionnalités demandées:</strong></p>
                  <ul>
                    ${devisData.features.map((feature: string) => `<li>${feature}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            </div>

            <div class="total">
              Estimation: ${devisData.budget}
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
      to: process.env.CONTACT_EMAIL || 'contact@mattheo-termine.fr',
      subject: `Nouveau Devis #${devisNumber} - ${devisData.clientInfo.name}`,
      html: htmlTemplate,
    };

    // Email de confirmation pour le client
    const mailOptionsToClient = {
      from: process.env.SMTP_FROM || 'noreply@mattheo-termine.fr',
      to: devisData.clientInfo.email,
      subject: `Votre devis #${devisNumber} est prêt à signer !`,
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
              <h1>🎉 Votre Devis est Prêt !</h1>
              <p>Bonjour ${devisData.clientInfo.name}</p>
            </div>

            <div class="content">
              <p>Excellente nouvelle ! Votre devis personnalisé est maintenant prêt.</p>

              <div class="highlight">
                <strong>Devis #${devisNumber} - ${devisData.budget}</strong>
              </div>

              <p><strong>Récapitulatif de votre projet:</strong></p>
              <ul>
                <li>Type de projet: ${devisData.siteType}</li>
                <li>Budget: ${devisData.budget}</li>
                <li>Prestations incluses: ${devisData.features ? devisData.features.slice(0, 3).join(', ') + '...' : 'Détails dans le devis'}</li>
              </ul>

              <div style="background: #3F51B5; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <h3 style="margin: 0 0 15px 0;">✍️ Signature Électronique</h3>
                <p style="margin: 0 0 15px 0;">Vous pouvez maintenant signer votre devis en ligne !</p>
                <a href="${signatureLink}" style="display: inline-block; background: white; color: #3F51B5; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                  📝 Signer le Devis Maintenant
                </a>
              </div>

              <p><strong>Avantages de la signature électronique :</strong></p>
              <ul>
                <li>✅ Signature immédiate, pas d'impression nécessaire</li>
                <li>✅ Valeur juridique identique à une signature manuscrite</li>
                <li>✅ Démarrage plus rapide de votre projet</li>
                <li>✅ Suivi automatique et notifications</li>
              </ul>

              <p><strong>Après signature :</strong></p>
              <ol>
                <li>Validation de votre projet sous 24h</li>
                <li>Facturation de l'acompte (30%)</li>
                <li>Démarrage immédiat du développement</li>
              </ol>

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
