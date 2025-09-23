import nodemailer from 'nodemailer';
import { getEmailConfig, validateEmailConfig, config, shouldLog } from './config';

// Configuration SMTP centralisée
export const createEmailTransporter = () => {
  try {
    // Valider la configuration seulement à l'exécution
    validateEmailConfig();
    
    const emailConfig = getEmailConfig();
    // Configuration SMTP visible seulement en développement
    return nodemailer.createTransport(emailConfig);
  } catch (error) {
    if (shouldLog()) {
      console.error('Erreur lors de la création du transporteur email:', error);
    }
    throw error;
  }
};

// Fonction pour envoyer un email avec retry logic
export const sendEmailWithRetry = async (
  transporter: nodemailer.Transporter, 
  options: nodemailer.SendMailOptions, 
  retries = config.timeouts.email.retries
) => {
  let lastError: Error | null = null;
  
  for (let i = 0; i <= retries; i++) {
    try {
      const result = await transporter.sendMail(options);
      // Email envoyé avec succès (logs seulement en développement)
      return result;
    } catch (error) {
      lastError = error as Error;
      const errorDetails = {
        tentative: `${i + 1}/${retries + 1}`,
        code: (error as NodeJS.ErrnoException)?.code || 'UNKNOWN',
        command: (error as { command?: string })?.command || 'UNKNOWN',
        response: (error as { response?: string })?.response || 'UNKNOWN',
        responseCode: (error as { responseCode?: number })?.responseCode || 0,
        message: (error as Error)?.message
      };
      
      if (shouldLog()) {
        console.error(`Tentative ${i + 1} échouée:`, errorDetails);
      } else {
        // En production, log quand même les erreurs critiques
        console.error(`Email - Tentative ${i + 1} échouée:`, {
          code: errorDetails.code,
          responseCode: errorDetails.responseCode,
          message: errorDetails.message
        });
      }
      
      if (i === retries) {
        // Dernier essai, on lance l'erreur avec plus de contexte
        const enhancedError = new Error(`Échec d'envoi email après ${retries + 1} tentatives: ${lastError.message}`) as Error & {
          originalError: Error;
          details: typeof errorDetails;
        };
        enhancedError.originalError = lastError;
        enhancedError.details = errorDetails;
        throw enhancedError;
      }
      
      // Attendre 2 secondes avant de réessayer
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Cette ligne ne devrait jamais être atteinte, mais TypeScript l'exige
  throw new Error('Fonction sendEmailWithRetry: fin inattendue');
};

// Base des styles CSS pour les emails
export const getEmailBaseStyles = () => `
  /* Reset pour les clients mail */
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; }
  
  body { 
    font-family: Arial, sans-serif !important; 
    line-height: 1.6 !important; 
    color: #333333 !important;
    background-color: #f8fafc !important;
    margin: 0 !important;
    padding: 20px !important;
    width: 100% !important;
  }
  .container { 
    max-width: 600px !important; 
    margin: 0 auto !important;
    background: #ffffff !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
  }
  .header { 
    background-color: #2563eb !important; 
    color: #ffffff !important; 
    padding: 30px !important; 
    text-align: center !important;
    border-radius: 8px 8px 0 0 !important;
  }
  .header h1 {
    margin: 0 0 15px 0 !important;
    font-size: 24px !important;
    font-weight: bold !important;
    color: #ffffff !important;
  }
  .header p {
    margin: 5px 0 !important;
    color: #ffffff !important;
    font-size: 16px !important;
  }
  .content { 
    background: #ffffff !important; 
    padding: 30px !important;
    color: #374151 !important;
  }
  .content p {
    margin: 15px 0 !important; 
    color: #374151 !important;
    line-height: 1.6 !important;
  }
  .footer { 
    background-color: #e6e6e6 !important;
    color: #ffffff !important; 
    padding: 25px !important; 
    text-align: center !important;
    border-radius: 0 0 8px 8px !important;
  }
  .footer p {
    margin: 5px 0 !important;
    color: #ffffff !important;
  }
  p { 
    margin: 15px 0 !important; 
    color: #374151 !important;
    line-height: 1.6 !important;
  }
  strong { 
    color: #1f2937 !important; 
    font-weight: bold !important; 
  }
  ul, li {
    color: #374151 !important;
    margin: 5px 0 !important;
  }
  h3 {
    color: #1f2937 !important;
    margin: 20px 0 10px 0 !important;
  }
`;

// Template d'email de base
export const createEmailTemplate = (
  title: string,
  content: string,
  footer: string = `
    <div class="footer">
      <p style="color: #ffffff !important; margin: 5px 0 !important;">contact@mattheo-termine.fr | www.mattheo-termine.fr</p>
    </div>
  `
) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
      ${getEmailBaseStyles()}
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>${title}</h1>
      </div>
      <div class="content">
        ${content}
      </div>
      ${footer}
    </div>
  </body>
  </html>
`;

// Configuration par défaut pour les emails
export const getDefaultEmailConfig = () => ({
  from: config.email.from,
});

// Ré-exporter getBaseUrl depuis config
export { getBaseUrl } from './config';
