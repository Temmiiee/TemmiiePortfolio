import { createEmailTemplate, getEmailBaseStyles } from './email-utils';
import { config } from './config';

export interface DevisEmailData {
  devisNumber: string;
  clientInfo: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  };
  siteType: string;
  designType: string;
  features?: string[];
  total: string;
  createdAt?: string;
}

// Template pour l'email du prestataire avec boutons admin
export const createProviderEmailTemplate = (devisData: DevisEmailData, baseUrl: string, today: string) => {
  const adminStyles = `
    ${getEmailBaseStyles()}
    .admin-section {
      background-color: #f0f9ff !important;
      padding: 20px !important;
      margin: 20px 0 !important;
      border: 2px solid #2563eb !important;
      text-align: center !important;
    }
    .admin-button {
      display: inline-block !important;
      padding: 12px 24px !important;
      margin: 10px !important;
      text-decoration: none !important;
      border-radius: 6px !important;
      font-weight: bold !important;
      text-align: center !important;
    }
    .btn-approve {
      background-color: #16a34a !important;
      color: #ffffff !important;
    }
    .btn-reject {
      background-color: #dc2626 !important;
      color: #ffffff !important;
    }
    .client-info { 
      background-color: #f8f9fa !important; 
      padding: 20px !important; 
      margin: 15px 0 !important;
      border: 1px solid #e9ecef !important;
      border-left: 4px solid #2563eb !important;
    }
    .features { 
      background-color: #f8f9fa !important; 
      padding: 20px !important;
      border: 1px solid #e9ecef !important;
      border-left: 4px solid #2563eb !important;
    }
    .total { 
      background-color: #2563eb !important; 
      color: #ffffff !important; 
      padding: 25px !important; 
      text-align: center !important; 
      font-size: 22px !important; 
      font-weight: bold !important;
      margin: 20px 0 !important;
    }
  `;

  const content = `
    <div class="client-info">
      <h3 style="color: #2563eb !important; margin-top: 0 !important;">Informations Client</h3>
      <p><strong>Nom:</strong> ${devisData.clientInfo.name}</p>
      ${devisData.clientInfo.company ? `<p><strong>Entreprise:</strong> ${devisData.clientInfo.company}</p>` : ''}
      <p><strong>Email:</strong> ${devisData.clientInfo.email}</p>
      ${devisData.clientInfo.phone ? `<p><strong>Téléphone:</strong> ${devisData.clientInfo.phone}</p>` : ''}
    </div>

    <div class="features">
      <h3 style="color: #2563eb !important; margin-top: 0 !important;">Détails du Projet</h3>
      <p><strong>Type de site:</strong> ${devisData.siteType}</p>
      <p><strong>Type de design:</strong> ${devisData.designType}</p>
      ${devisData.features && devisData.features.length > 0 ? `
        <p><strong>Fonctionnalités demandées:</strong></p>
        <ul>
          ${devisData.features.map((feature: string) => `<li>${feature}</li>`).join('')}
        </ul>
      ` : ''}
    </div>

    <div class="total">
      Estimation: ${devisData.total} €
    </div>
    
    <div class="admin-section">
      <h3 style="color: #2563eb !important; margin-bottom: 15px !important;">Actions Admin</h3>
      <p style="margin-bottom: 20px !important;">Approuver ou refuser cette demande de devis :</p>
      <a href="${baseUrl}/admin/devis/${devisData.devisNumber}?action=approve" class="admin-button btn-approve">✅ Approuver</a>
      <a href="${baseUrl}/admin/devis/${devisData.devisNumber}?action=reject" class="admin-button btn-reject">❌ Refuser</a>
      <br><br>
      <a href="${baseUrl}/admin/devis" style="color: #2563eb; text-decoration: underline;">📋 Voir tous les devis</a>
    </div>

    <p style="margin-top: 30px;">Ce devis a été généré automatiquement depuis votre site web.</p>
    <p>Répondez rapidement au client: ${devisData.clientInfo.email}</p>
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouveau Devis - ${devisData.devisNumber}</title>
      <style>
        ${adminStyles}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nouveau Devis Reçu</h1>
          <p><strong>Numéro:</strong> ${devisData.devisNumber}</p>
          <p><strong>Date:</strong> ${today}</p>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>${config.company.contactEmail} | ${config.company.website}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Template pour l'email de confirmation client
export const createClientConfirmationTemplate = (devisData: DevisEmailData) => {
  const content = `
    <p>Merci pour votre demande. Votre projet va être analysé par le prestataire.</p>
    <div style="background-color: #2563eb !important; color: #ffffff !important; padding: 20px !important; text-align: center !important; margin: 25px 0 !important; font-weight: bold !important; font-size: 18px !important;">
      <strong>Numéro de demande : ${devisData.devisNumber}</strong>
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
    <p>Cordialement,<br>${config.company.name}<br>${config.company.title}</p>
  `;

  return createEmailTemplate(
    `Votre demande de projet est bien reçue ! - Bonjour ${devisData.clientInfo.name}`,
    content
  );
};

// Template pour notification de statut (approuvé/refusé)
export const createStatusNotificationTemplate = (
  devis: { clientInfo: { name: string }; devisNumber: string; siteType: string; total: string; createdAt: string }, 
  status: 'approved' | 'rejected'
) => {
  const isApproved = status === 'approved';
  const statusText = isApproved ? 'Approuvé' : 'Refusé';
  const statusColor = isApproved ? '#16a34a' : '#dc2626';
  const statusEmoji = isApproved ? '✅' : '❌';

  const statusStyles = `
    ${getEmailBaseStyles()}
    .status-badge {
      background-color: ${statusColor} !important;
      color: #ffffff !important;
      padding: 15px 25px !important;
      text-align: center !important;
      margin: 20px 0 !important;
      font-weight: bold !important;
      font-size: 18px !important;
      border-radius: 8px !important;
    }
    .header { 
      background-color: ${statusColor} !important; 
      color: #ffffff !important; 
      padding: 30px !important; 
      text-align: center !important;
    }
  `;

  const content = `
    <p>Bonjour <strong>${devis.clientInfo.name}</strong>,</p>
    
    <div class="status-badge">
      Statut: ${statusText}
    </div>
    
    ${isApproved ? `
      <p>Excellente nouvelle ! Votre projet a été accepté.</p>
      <p>Nous allons vous recontacter très prochainement pour :</p>
      <ul>
        <li>Finaliser les détails techniques</li>
        <li>Établir un planning de réalisation</li>
        <li>Vous fournir un devis détaillé officiel</li>
      </ul>
      <p>Merci de nous avoir fait confiance pour votre projet !</p>
    ` : `
      <p>Nous vous remercions pour votre intérêt, mais nous ne pourrons pas donner suite à votre demande pour ce projet.</p>
      <p>Cela peut être dû à :</p>
      <ul>
        <li>Une surcharge de travail actuelle</li>
        <li>Une inadéquation avec notre domaine d'expertise</li>
        <li>Des contraintes techniques particulières</li>
      </ul>
      <p>N'hésitez pas à nous recontacter pour de futurs projets.</p>
    `}
    
    <p><strong>Résumé de votre demande :</strong></p>
    <ul>
      <li>Type: ${devis.siteType}</li>
      <li>Budget estimé: ${devis.total} €</li>
      <li>Date de demande: ${new Date(devis.createdAt).toLocaleDateString('fr-FR')}</li>
    </ul>
    
    <p>Cordialement,<br>
    <strong>${config.company.name}</strong><br>
    ${config.company.title}</p>
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mise à jour de votre devis #${devis.devisNumber}</title>
      <style>
        ${statusStyles}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${statusEmoji} Devis ${statusText}</h1>
          <p>Mise à jour de votre demande #${devis.devisNumber}</p>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>${config.company.contactEmail} | ${config.company.website}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};