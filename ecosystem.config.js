module.exports = {
  apps: [{
    name: 'portfolio',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/TemmiiePortfolio',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10,

    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_BASE_URL: 'https://mattheo-termine.fr',
      TZ: 'Europe/Paris',
      SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
      SMTP_PORT: process.env.SMTP_PORT || '587',
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS,
      SMTP_FROM: process.env.SMTP_FROM,
      GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
      NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || 'G-B54DKYN6DV',
    },

    error_file: '/home/deploy/logs/portfolio-error.log',
    out_file: '/home/deploy/logs/portfolio-out.log',
    log_file: '/home/deploy/logs/portfolio.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    time: true,
    log_type: 'json',
    merge_logs: true,

    node_args: '--max-old-space-size=512',
    exec_mode: 'fork',

    ignore_watch: [
      'node_modules',
      '.git',
      '.next',
      'logs'
    ],
  }]
};