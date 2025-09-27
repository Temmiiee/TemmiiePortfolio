// Configuration centralisée de l'application
export const config = {
  // Informations de l'entreprise
  company: {
    name: 'Matthéo Termine',
    email: 'mattheotermine104@gmail.com',
    contactEmail: 'mattheotermine104@gmail.com', // Changé vers l'adresse qui fonctionne
    website: 'www.mattheo-termine.fr',
    title: 'Développeur Web Freelance',
    siret: '991 804 493 00013',
  },

  // Configuration des URLs
  urls: {
    production: 'https://mattheo-termine.fr',
    development: 'http://localhost:3000',
    admin: '/admin/devis',
  },

  // Configuration des emails
  email: {
    from: process.env.SMTP_FROM || 'mattheotermine104@gmail.com', // Utiliser une adresse vérifiée
    admin: 'mattheotermine104@gmail.com',
    smtp: {
      host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
      port: parseInt(process.env.SMTP_PORT || '2525'),
      secure: process.env.SMTP_SECURE === 'true' || false,
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
      connection: 30000,
      socket: 30000,
      greeting: 10000,
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
  // En production, essayer plusieurs sources
  if (config.isProduction) {
    // 1. Variable d'environnement NEXT_PUBLIC_BASE_URL (si set au build)
    if (process.env.NEXT_PUBLIC_BASE_URL && !process.env.NEXT_PUBLIC_BASE_URL.includes('localhost')) {
      return process.env.NEXT_PUBLIC_BASE_URL;
    }
    
    // 2. Variables d'environnement serveur (disponibles uniquement côté serveur)
    if (typeof window === 'undefined') {
      // Variable d'environnement serveur BASE_URL
      if (process.env.BASE_URL && !process.env.BASE_URL.includes('localhost')) {
        return process.env.BASE_URL;
      }
    }
    
    // 3. Fallback sur la configuration statique de production
    return config.urls.production;
  }
  
  // En développement
  return process.env.NEXT_PUBLIC_BASE_URL || config.urls.development;
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
    secure: config.email.smtp.secure,
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
  const hasUser = !!config.email.smtp.user;
  const hasPass = !!config.email.smtp.pass;
  const hasHost = !!config.email.smtp.host;
  
  console.log('=== SMTP CONFIG VALIDATION ===');
  console.log('SMTP_HOST:', config.email.smtp.host);
  console.log('SMTP_PORT:', config.email.smtp.port);
  console.log('SMTP_USER exists:', hasUser);
  console.log('SMTP_PASS exists:', hasPass);
  console.log('Raw env SMTP_USER:', process.env.SMTP_USER ? 'SET' : 'NOT_SET');
  console.log('Raw env SMTP_PASS:', process.env.SMTP_PASS ? 'SET' : 'NOT_SET');
  
  if (!hasUser || !hasPass) {
    const error = `Configuration SMTP incomplète: user=${hasUser}, pass=${hasPass}, host=${hasHost}`;
    console.error(error);
    throw new Error(error);
  }
};

export default config;
