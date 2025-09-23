import { NextRequest, NextResponse } from 'next/server';
import { createEmailTransporter, sendEmailWithRetry } from '@/lib/email-utils';
import { config, shouldLog } from '@/lib/config';

export async function POST(request: NextRequest) {
  // Simple authentification pour éviter les abus
  const authHeader = request.headers.get('authorization');
  if (authHeader !== 'Bearer test-email-auth') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    // Création du transporteur
    const transporter = createEmailTransporter();
    
    // Test de connexion SMTP
    if (shouldLog()) {
      console.log('Test de la connexion SMTP...');
    }
    await transporter.verify();
    if (shouldLog()) {
      console.log('✅ Connexion SMTP réussie');
    }

    // Test d'envoi d'email simple
    const testEmailOptions = {
      from: config.email.from,
      to: config.email.admin,
      subject: 'Test Email - Configuration SMTP',
      html: `
        <html>
          <body>
            <h2>Test Email Configuration</h2>
            <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
            <p><strong>Environnement:</strong> ${config.isProduction ? 'Production' : 'Development'}</p>
            <p><strong>Configuration SMTP:</strong></p>
            <ul>
              <li>Host: ${config.email.smtp.host}</li>
              <li>Port: ${config.email.smtp.port}</li>
              <li>Secure: ${config.email.smtp.secure}</li>
              <li>User: ${config.email.smtp.user ? '✅ Défini' : '❌ Non défini'}</li>
              <li>Password: ${config.email.smtp.pass ? '✅ Défini' : '❌ Non défini'}</li>
            </ul>
            <p>Si vous recevez cet email, la configuration SMTP fonctionne correctement !</p>
          </body>
        </html>
      `
    };

    if (shouldLog()) {
      console.log('Test d\'envoi d\'email...');
    }
    const result = await sendEmailWithRetry(transporter, testEmailOptions);
    if (shouldLog()) {
      console.log('✅ Email de test envoyé:', result.messageId);
    }

    return NextResponse.json({
      success: true,
      message: 'Test SMTP réussi',
      details: {
        connectionVerified: true,
        emailSent: true,
        messageId: result.messageId,
        timestamp: new Date().toISOString(),
        config: {
          host: config.email.smtp.host,
          port: config.email.smtp.port,
          secure: config.email.smtp.secure,
          userDefined: !!config.email.smtp.user,
          passDefined: !!config.email.smtp.pass,
          environment: config.isProduction ? 'production' : 'development'
        }
      }
    });

  } catch (error) {
    if (shouldLog()) {
      console.error('❌ Erreur lors du test SMTP:', error);
    }
    
    return NextResponse.json({
      success: false,
      error: 'Test SMTP échoué',
      details: {
        message: (error as Error).message,
        code: (error as NodeJS.ErrnoException)?.code || 'UNKNOWN',
        command: (error as { command?: string })?.command || 'UNKNOWN',
        response: (error as { response?: string })?.response || 'UNKNOWN',
        responseCode: (error as { responseCode?: number })?.responseCode || 0,
        config: {
          host: config.email.smtp.host,
          port: config.email.smtp.port,
          secure: config.email.smtp.secure,
          userDefined: !!config.email.smtp.user,
          passDefined: !!config.email.smtp.pass,
          environment: config.isProduction ? 'production' : 'development'
        }
      }
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Test SMTP endpoint',
    usage: 'POST avec Authorization: Bearer test-email-auth',
    note: 'Cet endpoint teste la configuration SMTP et envoie un email de test'
  });
}