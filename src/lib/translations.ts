export type Language = 'fr' | 'en';

export const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.projects': 'Projets',
    'nav.process': 'Processus',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Matthéo Termine',
    'hero.subtitle': 'Intégrateur web freelance',
    'hero.description': 'Création de sites web modernes, performants et accessibles pour développer votre présence en ligne',
    'hero.subdescription': 'Spécialisé dans le développement web sur‑mesure, j\'accompagne les entreprises et particuliers dans la création de leur identité numérique.',
    'hero.discover': 'Découvrir',
    
    // About
    'about.title': 'À propos de moi',
    'about.subtitle': 'Développeur passionné par la création d\'expériences web exceptionnelles',
    'about.p1': 'Passionné par la création d\'expériences web performantes et inclusives. Je transforme des idées créatives en sites web fonctionnels, que ce soit en écrivant du code sur‑mesure ou en personnalisant des solutions WordPress.',
    'about.p2': 'Mon objectif est de construire des plateformes qui répondent aux besoins de mes clients et qui offrent une expérience utilisateur fluide et intuitive.',
    'about.p3': 'Je crois fermement en un web ouvert et accessible. C\'est pourquoi j\'accorde une importance capitale au respect des standards, à la performance et aux normes d\'accessibilité (RGAA). Un bon site, selon moi, est un site rapide, facile à utiliser et qui ne laisse personne de côté.',
    'about.p4': 'Constamment en veille technologique, j\'aime explorer de nouveaux outils et de nouvelles méthodes pour améliorer la qualité de mon travail et proposer des solutions toujours plus innovantes.',
    'about.downloadCV': 'Télécharger mon CV',
    'about.downloadCVShort': 'Mon CV',
    
    // Projects
    'projects.title': 'Mes Réalisations',
    'projects.subtitle': 'Découvrez quelques‑uns de mes projets récents qui illustrent mon expertise technique',
    'projects.viewProject': 'Voir le projet',
    'projects.viewSite': 'Voir le site',
    'projects.sourceCode': 'Code source',
    'projects.technologies': 'Technologies',
    'projects.listLabel': 'Liste de mes réalisations récentes',
    
    // Services
    'services.title': 'Mes Services',
    'services.subtitle': 'Solutions web sur-mesure alliant performance, accessibilité et innovation technologique',
    'services.custom.title': 'Développement Web Sur-Mesure',
    'services.custom.desc': 'Applications web modernes avec Next.js, React et TypeScript. Architecture scalable et performance optimisée pour une expérience utilisateur exceptionnelle.',
    'services.wordpress.title': 'Solutions WordPress',
    'services.wordpress.desc': 'Thèmes personnalisés, plugins sur-mesure et optimisation complète pour des sites WordPress performants et sécurisés.',
    'services.performance.title': 'Performance & SEO',
    'services.performance.desc': 'Optimisation Core Web Vitals et stratégies SEO avancées.',
    'services.accessibility.title': 'Accessibilité RGAA',
    'services.accessibility.desc': 'Conformité RGAA 4.1 et WCAG 2.1 AA garantie pour une accessibilité universelle.',
    'services.stack.title': 'Stack Technologique',
    'services.stack.desc': 'Technologies modernes et robustes pour des applications performantes et évolutives.',
    'services.collaboration.title': 'Collaboration & Support',
    'services.collaboration.desc': 'Accompagnement personnalisé et communication transparente tout au long du projet. Méthodologie agile avec livraisons itératives pour un résultat optimal et une collaboration efficace.',
    'services.available': 'Disponible pour nouveaux projets',
    'services.responseTime': 'Response time: < 24h',
    'services.coreWebVitals': 'Core Web Vitals',
    'services.lighthouseScore': 'Lighthouse Score',
    'services.seoOptimization': 'SEO Optimization',
    
    // Process
    'process.title': 'Mon Processus de Travail',
    'process.subtitle': 'Une approche structurée pour votre réussite',
    'process.discovery.title': '1. Découverte',
    'process.discovery.desc': 'Nous discutons de vos objectifs, de votre cible et de vos besoins pour définir les contours de votre projet.',
    'process.design.title': '2. Maquettage & Design',
    'process.design.desc': 'Je conçois une maquette visuelle et un design sur-mesure qui reflètent votre identité de marque.',
    'process.development.title': '3. Développement',
    'process.development.desc': 'Je transforme le design validé en un site web fonctionnel, performant et accessible.',
    'process.deployment.title': '4. Déploiement',
    'process.deployment.desc': 'Je mets votre site en ligne sur l\'hébergement choisi (le vôtre ou celui que je gère pour vous), et je veille à ce qu\'il soit sécurisé, rapide et accessible dès sa mise en service.',
    
    // Accessibility
    'a11y.scrollToTop': 'Retourner en haut de la page',
    'a11y.discoverServices': 'Découvrir mes services',
    
    // Contact
    'contact.title': 'Parlons de Votre Projet',
    'contact.subtitle': 'Prêt à donner vie à votre projet web ? Contactez-moi !',
    'contact.infoLabel': 'Informations de contact',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.phone': 'Téléphone',
    'contact.message': 'Message',
    'contact.send': 'Envoyer',
    'contact.sending': 'Envoi en cours...',
    'contact.success': 'Message envoyé avec succès !',
    'contact.error': 'Erreur lors de l\'envoi du message',
    'contact.validation.name': 'Le nom doit contenir au moins 2 caractères.',
    'contact.validation.email': 'Veuillez entrer une adresse email valide.',
    'contact.validation.message': 'Le message doit contenir au moins 10 caractères.',
    'contact.placeholder.name': 'Votre nom complet',
    'contact.placeholder.email': 'votre.email@exemple.com',
    'contact.placeholder.message': 'Votre message...',
    
    // Footer
    'footer.rights': 'Tous droits réservés.',
    'footer.privacy': 'Politique de confidentialité',
    'footer.accessibility': 'Déclaration d\'accessibilité',
    
    // Social Media
    'social.followMe': 'Suivez-moi',
    'social.linkedin': 'LinkedIn',
    'social.github': 'GitHub',
    'social.malt': 'Malt',
    'social.linkedinAria': 'Visitez mon profil LinkedIn (ouvre dans une nouvelle fenêtre)',
    'social.githubAria': 'Visitez mon profil GitHub (ouvre dans une nouvelle fenêtre)',
    'social.maltAria': 'Visitez mon profil Malt (ouvre dans une nouvelle fenêtre)',

    
    // Common
    'common.cancel': 'Annuler',
    'common.close': 'Fermer',
    
    // Accessibility
    'a11y.skipToMain': 'Aller au contenu principal',
    'a11y.skipToNav': 'Aller à la navigation',
    'a11y.mainContent': 'Contenu principal',
    'a11y.mainNav': 'Navigation principale',
    'a11y.mobileNav': 'Navigation mobile',
    'a11y.openMenu': 'Ouvrir le menu de navigation',
    'a11y.closeMenu': 'Fermer le menu',
    'a11y.mainMenu': 'Menu principal',
    'a11y.webDeveloper': 'Intégrateur Web',
    'a11y.downloadIcon': 'Icône de téléchargement',
    'a11y.scrollToProjects': 'Faire défiler vers mes réalisations',
    'a11y.scrollDescription': 'Cliquez pour découvrir mes réalisations et projets récents',

    'a11y.downloadCV': 'Télécharger mon CV au format PDF (ouvre dans une nouvelle fenêtre)',
    'a11y.viewAllProjects': 'Voir tous mes projets et réalisations',
    'a11y.emailMe': 'Envoyer un email à mattheotermine104@gmail.com',
    'a11y.contactForQuote': 'Contacter Matthéo Termine pour un devis personnalisé',
    
    // Contact details
    'contact.quickResponse': 'Réponse rapide',
    'contact.quickResponseDesc': 'Je réponds généralement sous 24h pour discuter de votre projet',
    'contact.discussProject': 'Discutons de votre projet',
    'contact.formTitle': 'Envoyer un message',
    'contact.formDescription': 'Remplissez le formulaire ci-dessous.',
    'contact.successTitle': 'Succès !',
    'contact.errorTitle': 'Erreur',
    
    // 404 Page
    'notFound.title': 'Page introuvable',
    'notFound.description': 'Oups ! Il semblerait que cette page se soit perdue dans le cyberespace.',
    'notFound.noPanic': 'Pas de panique',
    'notFound.helpText': ', je vais vous aider à retrouver votre chemin.',
    'notFound.backHome': 'Retour à l\'accueil',
    'notFound.contactMe': 'Me contacter',
    'notFound.funFact': 'Le saviez-vous ?',
    'notFound.funFactText': 'L\'erreur 404 tire son nom du numéro de la salle au CERN où se trouvait le premier serveur web. Quand une page n\'était pas trouvée, il fallait littéralement aller dans la salle 404 !',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.process': 'Process',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Matthéo Termine',
    'hero.subtitle': 'Web Developer',
    'hero.description': 'Creating modern, high-performance, and accessible websites to grow your online presence',
    'hero.subdescription': 'Specialized in custom web development, I support businesses and individuals in creating their digital identity.',
    'hero.discover': 'Discover',
    
    // About
    'about.title': 'About Me',
    'about.subtitle': 'Developer passionate about creating exceptional web experiences',
    'about.p1': 'Passionate about creating high-performance and inclusive web experiences. I transform creative ideas into functional websites, whether by writing custom code or customizing WordPress solutions.',
    'about.p2': 'My goal is to build platforms that meet my clients\' needs and provide a smooth and intuitive user experience.',
    'about.p3': 'I firmly believe in an open and accessible web. That\'s why I place great importance on respecting standards, performance, and accessibility standards (WCAG). A good website, in my opinion, is fast, easy to use, and leaves no one behind.',
    'about.p4': 'Constantly keeping up with technology, I enjoy exploring new tools and methods to improve the quality of my work and offer increasingly innovative solutions.',
    'about.downloadCV': 'Download my CV',
    'about.downloadCVShort': 'My CV',
    
    // Projects
    'projects.title': 'My Work',
    'projects.subtitle': 'Discover some of my recent projects that showcase my technical expertise',
    'projects.viewProject': 'View project',
    'projects.viewSite': 'View site',
    'projects.sourceCode': 'Source code',
    'projects.technologies': 'Technologies',
    'projects.listLabel': 'List of my recent projects',
    
    // Services
    'services.title': 'My Services',
    'services.subtitle': 'Custom web solutions combining performance, accessibility and technological innovation',
    'services.custom.title': 'Custom Web Development',
    'services.custom.desc': 'Modern web applications with Next.js, React and TypeScript. Scalable architecture and optimized performance for exceptional user experience.',
    'services.wordpress.title': 'WordPress Solutions',
    'services.wordpress.desc': 'Custom themes, bespoke plugins and complete optimization for high-performance and secure WordPress sites.',
    'services.performance.title': 'Performance & SEO',
    'services.performance.desc': 'Core Web Vitals optimization and advanced SEO strategies.',
    'services.accessibility.title': 'WCAG Accessibility',
    'services.accessibility.desc': 'WCAG 2.1 AA compliance guaranteed for universal accessibility.',
    'services.stack.title': 'Technology Stack',
    'services.stack.desc': 'Modern and robust technologies for high-performance and scalable applications.',
    'services.collaboration.title': 'Collaboration & Support',
    'services.collaboration.desc': 'Personalized support and transparent communication throughout the project. Agile methodology with iterative deliveries for optimal results and efficient collaboration.',
    'services.available': 'Available for new projects',
    'services.responseTime': 'Response time: < 24h',
    'services.coreWebVitals': 'Core Web Vitals',
    'services.lighthouseScore': 'Lighthouse Score',
    'services.seoOptimization': 'SEO Optimization',
    
    // Process
    'process.title': 'My Work Process',
    'process.subtitle': 'A structured approach to your success',
    'process.discovery.title': '1. Discovery',
    'process.discovery.desc': 'We discuss your goals, target audience, and needs to define the scope of your project.',
    'process.design.title': '2. Mockup & Design',
    'process.design.desc': 'I create a visual mockup and custom design that reflects your brand identity.',
    'process.development.title': '3. Development',
    'process.development.desc': 'I transform the validated design into a functional, high-performance, and accessible website.',
    'process.deployment.title': '4. Deployment',
    'process.deployment.desc': 'I launch your site on the chosen hosting (yours or one I manage for you), ensuring it\'s secure, fast, and accessible from day one.',
    
    // Accessibility
    'a11y.scrollToTop': 'Back to top',
    'a11y.discoverServices': 'Discover my services',
    
    // Contact
    'contact.title': 'Let\'s Talk About Your Project',
    'contact.subtitle': 'Ready to bring your web project to life? Contact me!',
    'contact.infoLabel': 'Contact information',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Error sending message',
    'contact.validation.name': 'Name must be at least 2 characters.',
    'contact.validation.email': 'Please enter a valid email address.',
    'contact.validation.message': 'Message must be at least 10 characters.',
    'contact.placeholder.name': 'Your full name',
    'contact.placeholder.email': 'your.email@example.com',
    'contact.placeholder.message': 'Your message...',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.accessibility': 'Accessibility Statement',
    
    // Social Media
    'social.followMe': 'Follow me',
    'social.linkedin': 'LinkedIn',
    'social.github': 'GitHub',
    'social.malt': 'Malt',
    'social.linkedinAria': 'Visit my LinkedIn profile (opens in a new window)',
    'social.githubAria': 'Visit my GitHub profile (opens in a new window)',
    'social.maltAria': 'Visit my Malt profile (opens in a new window)',

    
    // Common
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    
    // Accessibility
    'a11y.skipToMain': 'Skip to main content',
    'a11y.skipToNav': 'Skip to navigation',
    'a11y.mainContent': 'Main content',
    'a11y.mainNav': 'Main navigation',
    'a11y.mobileNav': 'Mobile navigation',
    'a11y.openMenu': 'Open navigation menu',
    'a11y.closeMenu': 'Close menu',
    'a11y.mainMenu': 'Main menu',
    'a11y.webDeveloper': 'Web Developer',
    'a11y.downloadIcon': 'Download icon',
    'a11y.scrollToProjects': 'Scroll to my projects',
    'a11y.scrollDescription': 'Click to discover my recent projects and work',

    'a11y.downloadCV': 'Download my CV in PDF format (opens in a new window)',
    'a11y.viewAllProjects': 'View all my projects and work',
    'a11y.emailMe': 'Send an email to mattheotermine104@gmail.com',
    'a11y.contactForQuote': 'Contact Matthéo Termine for a personalized quote',
    
    // Contact details
    'contact.quickResponse': 'Quick Response',
    'contact.quickResponseDesc': 'I usually respond within 24 hours to discuss your project',
    'contact.discussProject': 'Let\'s discuss your project',
    'contact.formTitle': 'Send a message',
    'contact.formDescription': 'Fill out the form below.',
    'contact.successTitle': 'Success!',
    'contact.errorTitle': 'Error',
    
    // 404 Page
    'notFound.title': 'Page Not Found',
    'notFound.description': 'Oops! It looks like this page got lost in cyberspace.',
    'notFound.noPanic': 'Don\'t panic',
    'notFound.helpText': ', I\'ll help you find your way back.',
    'notFound.backHome': 'Back to Home',
    'notFound.contactMe': 'Contact Me',
    'notFound.funFact': 'Did you know?',
    'notFound.funFactText': 'The 404 error gets its name from the room number at CERN where the first web server was located. When a page wasn\'t found, you literally had to go to room 404!',
  },
} as const;

export function getTranslation(lang: Language, key: string): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const langTranslations = translations[lang] as any;
  
  // Accéder directement à la clé (qui peut contenir des points)
  if (key in langTranslations) {
    return langTranslations[key];
  }
  
  // Si la clé n'existe pas, retourner la clé elle-même
  return key;
}
