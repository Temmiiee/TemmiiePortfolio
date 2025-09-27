import { NextRequest, NextResponse } from 'next/server';
import { getBaseUrl, shouldLog } from '@/lib/config';

/* eslint-disable @typescript-eslint/no-unused-vars */

export async function POST(request: NextRequest) {
  try {
    const { devisId, signature, clientInfo, signedAt } = await request.json();
    const baseUrl = getBaseUrl();

    if (!devisId || !signature || !clientInfo || !signedAt) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // En production, vous sauvegarderiez en base de données
    // Pour les tests, on simule la sauvegarde
    const signedDevis = {
      id: devisId,
      signature,
      clientInfo,
      signedAt,
      status: 'signed',
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    // En production, vous enverriez les emails ici
    const htmlTemplateProvider = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Devis Signé - ${devisId}</title>
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
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }
          .header { 
            background: linear-gradient(135deg, #a259ff 0%, #8b3ff0 100%); 
            color: white; 
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
          .signature-box { 
            background: #f8fafc; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            text-align: center;
            border: 1px solid #e5e7eb;
          }
          .signature-img { 
            max-width: 300px; 
            border: 2px solid #a259ff; 
            border-radius: 8px; 
            padding: 10px;
            background: white;
          }
          .client-info { 
            background: #f8fafc; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 15px 0;
            border-left: 4px solid #a259ff;
          }
          .action-buttons { 
            text-align: center; 
            margin: 30px 0;
            padding: 25px;
            background: #f8fafc;
            border-radius: 8px;
          }
          .btn { 
            display: inline-block; 
            padding: 14px 28px; 
            margin: 0 10px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: 600;
            font-size: 16px;
            transition: all 0.2s;
          }
          .btn-accept { 
            background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
            color: white;
            box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
          }
          .btn-reject { 
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); 
            color: white;
            box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
          }
          .footer { 
            background: linear-gradient(135deg, #374151 0%, #1f2937 100%); 
            color: white; 
            padding: 20px; 
            text-align: center; 
            border-radius: 0 0 12px 12px;
          }
          .warning-box {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #f59e0b;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Devis Signé !</h1>
            <p><strong>Devis ID:</strong> ${devisId}</p>
            <p><strong>Signé le:</strong> ${new Date(signedAt).toLocaleString('fr-FR')}</p>
          </div>
          
          <div class="content">
            <h3>Informations Client</h3>
            <div class="client-info">
              <p><strong>Nom:</strong> ${clientInfo.name}</p>
              ${clientInfo.company ? `<p><strong>Entreprise:</strong> ${clientInfo.company}</p>` : ''}
              <p><strong>Email:</strong> ${clientInfo.email}</p>
              ${clientInfo.phone ? `<p><strong>Téléphone:</strong> ${clientInfo.phone}</p>` : ''}
            </div>

            <h3>Signature Électronique</h3>
            <div class="signature-box">
              <p><strong>Signature capturée le:</strong> ${new Date(signedAt).toLocaleString('fr-FR')}</p>
              <img src="${signature}" alt="Signature du client" class="signature-img" />
            </div>

            <div class="action-buttons">
              <h3>Actions requises :</h3>
              <p>Vous devez maintenant accepter ou refuser ce projet signé.</p>
              <a href="${baseUrl}/admin/devis/${devisId}/accept" class="btn btn-accept">
                ✅ Accepter le Projet
              </a>
              <a href="${baseUrl}/admin/devis/${devisId}/reject" class="btn btn-reject">
                ❌ Refuser le Projet
              </a>
            </div>

            <div class="warning-box">
              <p><strong>⏰ Important :</strong> Répondez rapidement au client pour maintenir une bonne relation commerciale.</p>
            </div>
          </div>

          <div class="footer">
            <p>Signature électronique valide et horodatée</p>
            <p>IP: ${signedDevis.ipAddress} | ${new Date(signedAt).toISOString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Template HTML pour l'email de confirmation au client
    const htmlTemplateClient = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Devis Signé - Confirmation</title>
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
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }
          .header { 
            background: linear-gradient(135deg, #a259ff 0%, #8b3ff0 100%); 
            color: white; 
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
            color: white; 
            padding: 20px; 
            text-align: center; 
            border-radius: 0 0 12px 12px;
          }
          .highlight { 
            background: linear-gradient(135deg, #a259ff 0%, #8b3ff0 100%); 
            color: white; 
            padding: 20px; 
            border-radius: 8px; 
            text-align: center; 
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(162, 89, 255, 0.2);
          }
          .highlight h3 {
            margin: 0 0 10px 0;
            font-size: 18px;
          }
          .timeline { 
            background: #f8fafc; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0;
            border-left: 4px solid #a259ff;
          }
          .timeline h3 {
            color: #a259ff;
            margin-top: 0;
          }
          .timeline ol {
            margin: 15px 0;
            padding-left: 20px;
          }
          .timeline li {
            margin: 8px 0;
            color: #4b5563;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Devis Signé avec Succès</h1>
            <p>Merci ${clientInfo.name} !</p>
          </div>
          
          <div class="content">
            <p>Bonjour ${clientInfo.name},</p>
            
            <p>Votre signature électronique a été enregistrée avec succès.</p>
            
            <div class="highlight">
              <h3>Devis #${devisId} - SIGNÉ</h3>
              <p>Signé le ${new Date(signedAt).toLocaleString('fr-FR')}</p>
            </div>
            
            <div class="timeline">
              <h3>Prochaines étapes :</h3>
              <ol>
                <li><strong>Validation (24-48h)</strong> - Matthéo examine votre devis signé</li>
                <li><strong>Confirmation</strong> - Vous recevez l'acceptation ou les ajustements</li>
                <li><strong>Acompte</strong> - Facturation de 30% pour démarrer</li>
                <li><strong>Développement</strong> - Création de votre site web</li>
                <li><strong>Livraison</strong> - Mise en ligne et formation</li>
              </ol>
            </div>
            
            <p><strong>Important :</strong> Votre signature est juridiquement valide et engage les deux parties selon les conditions du devis.</p>
            
            <p>Si vous avez des questions, n'hésitez pas à me contacter directement.</p>
            
            <p>Cordialement,<br>
            Matthéo Termine<br>
            Intégrateur Web Freelance</p>
          </div>

          <div class="footer">
            <p>mattheotermine104@gmail.com | www.mattheo-termine.fr</p>
            <p>Signature horodatée: ${new Date(signedAt).toISOString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // En production, vous enverriez les emails ici
    // Pour les tests, on simule

    // Simulation d'attente
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: 'Devis signé avec succès',
      devisId,
      signedAt
    });

  } catch (error) {
    if (shouldLog()) {
      console.error('Erreur lors de la signature du devis:', error);
    }
    return NextResponse.json(
      { error: 'Erreur lors de la signature du devis' },
      { status: 500 }
    );
  }
}
