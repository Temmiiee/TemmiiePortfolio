import { NextRequest, NextResponse } from 'next/server';
import { createEmailTransporter, sendEmailWithRetry, getDefaultEmailConfig } from '@/lib/email-utils';
import { config, shouldLog } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    const defaultEmailConfig = getDefaultEmailConfig();

    // Template HTML pour l'email de contact
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nouveau message de contact - ${name}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333333; 
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: #2563eb; 
            color: #ffffff; 
            padding: 24px; 
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content { 
            padding: 24px; 
          }
          .contact-info {
            background: #f8f9fa;
            padding: 16px;
            border-radius: 5px;
            margin: 16px 0;
          }
          .message-content {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 5px;
            padding: 16px;
            margin: 16px 0;
          }
          .footer { 
            background: #333333; 
            color: #ffffff; 
            padding: 20px; 
            text-align: center;
            border-radius: 0 0 8px 8px;
          }
          .highlight {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 12px;
            margin: 16px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Nouveau Message de Contact</h1>
            <p>Reçu depuis votre site web</p>
          </div>
          
          <div class="content">
            <div class="contact-info">
              <h3>Informations du contact</h3>
              <p><strong>Nom :</strong> ${name}</p>
              <p><strong>Email :</strong> ${email}</p>
              <p><strong>Date :</strong> ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</p>
            </div>

            <div class="message-content">
              <h3>Message :</h3>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>

            <div class="highlight">
              <p><strong>⚡ Action requise :</strong> Répondez directement à l'adresse <strong>${email}</strong></p>
            </div>
          </div>

          <div class="footer">
            <p>Message envoyé depuis mattheo-termine.fr</p>
            <p>Pour répondre, utilisez directement l'adresse : ${email}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Configuration de l'email à envoyer
    const mailOptions = {
      ...defaultEmailConfig,
      to: config.email.admin, // Votre adresse email
      replyTo: email, // L'email du visiteur pour pouvoir répondre directement
      subject: `💬 Nouveau message de ${name} - Contact Website`,
      html: htmlTemplate,
    };

    // Créer le transporteur et envoyer l'email
    try {
      const transporter = createEmailTransporter();
      await sendEmailWithRetry(transporter, mailOptions);
      
      if (shouldLog()) {
        console.log(`Email de contact envoyé avec succès de ${email}`);
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Message envoyé avec succès !' 
      });
      
    } catch (mailError) {
      if (shouldLog()) {
        console.error('Erreur lors de l\'envoi de l\'email de contact:', mailError);
      }
      
      return NextResponse.json({ 
        error: 'Erreur lors de l\'envoi du message', 
        details: mailError instanceof Error ? mailError.message : String(mailError)
      }, { status: 500 });
    }

  } catch (error) {
    if (shouldLog()) {
      console.error('Erreur dans l\'API de contact:', error);
    }
    
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la demande' },
      { status: 500 }
    );
  }
}
