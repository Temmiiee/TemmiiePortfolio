// Configuration centralisée de l'application
export const config = {
  // Informations de l'entreprise
  company: {
    name: 'Matthéo Termine',
    email: 'mattheotermine104@gmail.com',
    contactEmail: 'contact@mattheo-termine.fr',
    website: 'www.mattheo-termine.fr',
    title: 'Développeur Web Freelance',
  },

  // Configuration des URLs
  urls: {
    production: 'https://www.mattheo-termine.fr',
    development: 'http://localhost:3000',
    admin: '/admin/devis',
  },

  // Configuration des emails
  email: {
    from: process.env.SMTP_FROM || 'noreply@mattheo-termine.fr',
    admin: 'mattheotermine104@gmail.com',
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },

  // Configuration de l'environnement
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',

  // Configuration des timeouts
  timeouts: {
    email: {
      connection: 60000, // 60 secondes
      socket: 60000,     // 60 secondes
      greeting: 30000,   // 30 secondes
      retries: 2,
    },
  },

  // Configuration des limites
  limits: {
    maxEmailConnections: 5,
    maxEmailMessages: 100,
  },

  // Configuration des fichiers
  files: {
    dataDir: 'data',
    devisFile: 'devis.json',
  },

  // Configuration Google Analytics
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID,
  },
} as const;

// Helper pour obtenir l'URL de base
export const getBaseUrl = () => {
  return config.isProduction ? config.urls.production : config.urls.development;
};

// Helper pour vérifier si les logs sont activés
export const shouldLog = () => {
  return config.isDevelopment;
};

// Helper pour la configuration SMTP
export const getEmailConfig = () => {
  const smtpConfig = {
    host: config.email.smtp.host,
    port: config.email.smtp.port,
    secure: config.email.smtp.secure, // true pour port 465, false pour autres ports
    auth: {
      user: config.email.smtp.user,
      pass: config.email.smtp.pass,
    },
    connectionTimeout: config.timeouts.email.connection,
    socketTimeout: config.timeouts.email.socket,
    greetingTimeout: config.timeouts.email.greeting,
    pool: true,
    maxConnections: config.limits.maxEmailConnections,
    maxMessages: config.limits.maxEmailMessages,
    tls: {
      rejectUnauthorized: config.isProduction,
      // Configuration spéciale pour Gmail
      ciphers: 'SSLv3'
    },
  };

  return smtpConfig;
};

// Helper pour valider la configuration SMTP (séparé du getEmailConfig)
export const validateEmailConfig = () => {
  if (!config.email.smtp.user || !config.email.smtp.pass) {
    throw new Error(`Configuration SMTP incomplète: user=${!!config.email.smtp.user}, pass=${!!config.email.smtp.pass}`);
  }
};

export default config;