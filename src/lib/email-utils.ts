import nodemailer from 'nodemailer';
import { getEmailConfig, config, shouldLog } from './config';

// Configuration SMTP centralisée
export const createEmailTransporter = () => {
  return nodemailer.createTransport(getEmailConfig());
};

// Fonction pour envoyer un email avec retry logic
export const sendEmailWithRetry = async (
  transporter: nodemailer.Transporter, 
  options: nodemailer.SendMailOptions, 
  retries = config.timeouts.email.retries
) => {
  for (let i = 0; i <= retries; i++) {
    try {
      const result = await transporter.sendMail(options);
      if (shouldLog()) {
        console.log(`Email envoyé avec succès (tentative ${i + 1}):`, result.messageId);
      }
      return result;
    } catch (error) {
      if (shouldLog()) {
        console.error(`Tentative ${i + 1} échouée:`, error);
      }
      if (i === retries) throw error;
      // Attendre 2 secondes avant de réessayer
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
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
    background-color: #f5f5f5 !important;
    margin: 0 !important;
    padding: 20px !important;
    width: 100% !important;
  }
  .container { 
    max-width: 600px !important; 
    margin: 0 auto !important;
    background: #ffffff !important;
    border: 1px solid #dddddd !important;
  }
  .header { 
    background-color: #2563eb !important; 
    color: #ffffff !important; 
    padding: 30px !important; 
    text-align: center !important;
  }
  .header h1 {
    margin: 0 0 15px 0 !important;
    font-size: 24px !important;
    font-weight: bold !important;
    color: #ffffff !important;
  }
  .content { 
    background: #ffffff !important; 
    padding: 30px !important;
  }
  .footer { 
    background-color: #6b7280 !important; 
    color: #ffffff !important; 
    padding: 25px !important; 
    text-align: center !important;
  }
  p { 
    margin: 15px 0 !important; 
    color: #333333 !important;
    line-height: 1.6 !important;
  }
  strong { 
    color: #000000 !important; 
    font-weight: bold !important; 
  }
  ul, li {
    color: #333333 !important;
  }
`;

// Template d'email de base
export const createEmailTemplate = (
  title: string,
  content: string,
  footer: string = `
    <div class="footer">
      <p>contact@mattheo-termine.fr | www.mattheo-termine.fr</p>
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
