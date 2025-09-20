import { NextRequest, NextResponse } from 'next/server';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Configuration de timeout pour éviter les blocages
  connectionTimeout: 30000, // 30 secondes
  socketTimeout: 30000, // 30 secondes
  greetingTimeout: 10000, // 10 secondes
});

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

    // Template HTML pour l'email (sans signature)
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nouveau Devis - ${devisNumber}</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #1f2937; 
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }
          .header { 
            background: #1e40af; 
            color: #ffffff; 
            padding: 30px;
            border-radius: 12px 12px 0 0;
            text-align: center;
          }
          .header h1 {
            margin: 0 0 15px 0;
            font-size: 28px;
            font-weight: 700;
          }
          .content { 
            background: #ffffff; 
            padding: 30px;
            border-left: 1px solid #e5e7eb;
            border-right: 1px solid #e5e7eb;
          }
          .section { 
            margin-bottom: 30px; 
          }
          .section h3 { 
            color: #1e40af; 
            border-bottom: 2px solid #1e40af; 
            padding-bottom: 10px; 
            margin-top: 0; 
            font-size: 20px;
            font-weight: 600;
          }
          .client-info { 
            background: #f8fafc; 
            padding: 20px; 
            margin: 15px 0;
            border-radius: 8px;
            border-left: 4px solid #1e40af;
          }
          .features { 
            background: #f8fafc; 
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #1e40af;
          }
          .features ul { 
            margin: 15px 0; 
            padding-left: 20px; 
          }
          .features li { 
            margin-bottom: 8px; 
            color: #1f2937; 
          }
          .total { 
            background: #1e40af; 
            color: #ffffff; 
            padding: 25px; 
            text-align: center; 
            font-size: 22px; 
            font-weight: 700;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(30, 64, 175, 0.2);
          }
          .footer { 
            background: linear-gradient(135deg, #374151 0%, #1f2937 100%); 
            color: #ffffff; 
            padding: 25px; 
            text-align: center;
            border-radius: 0 0 12px 12px;
          }
          p { 
            margin: 12px 0; 
            color: #1f2937;
            line-height: 1.6;
          }
          strong { 
            color: #111827; 
            font-weight: 700; 
          }
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
      // Copie au prestataire
      cc: 'mattheotermine104@gmail.com',
      subject: `Votre demande de projet #${devisNumber} a bien été reçue !`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Confirmation Devis</title>
        <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.6; 
              color: #1f2937;
              background-color: #f8fafc;
              margin: 0;
              padding: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px;
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            .header { 
              background: #1e40af; 
              color: #ffffff; 
              padding: 30px; 
              text-align: center;
              border-radius: 12px 12px 0 0;
            }
            .header h1 {
              margin: 0 0 15px 0;
              font-size: 24px;
              font-weight: 700;
            }
            .content { 
              background: #ffffff; 
              padding: 30px;
              border-left: 1px solid #e5e7eb;
              border-right: 1px solid #e5e7eb;
            }
            .footer { 
              background: linear-gradient(135deg, #374151 0%, #1f2937 100%); 
              color: #ffffff; 
              padding: 25px; 
              text-align: center;
              border-radius: 0 0 12px 12px;
            }
            .highlight { 
              background: #1e40af; 
              color: #ffffff; 
              padding: 20px; 
              text-align: center; 
              margin: 25px 0; 
              font-weight: 700; 
              font-size: 18px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(30, 64, 175, 0.2);
            }
            p { 
              margin: 15px 0; 
              color: #1f2937;
              line-height: 1.6;
            }
            li { 
              margin-bottom: 8px; 
              color: #1f2937; 
            }
            strong { 
              color: #111827; 
              font-weight: 700; 
            }
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

    // Envoi des emails en parallèle pour éviter les timeouts
    try {
      await Promise.all([
        transporter.sendMail(mailOptionsToProvider),
        transporter.sendMail(mailOptionsToClient)
      ]);
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
