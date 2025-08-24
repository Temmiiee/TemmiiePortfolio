# Configuration du Système de Devis

## 📋 Fonctionnalités

Le système de devis comprend :

1. **Calculateur de devis** (`/devis`) - Formulaire interactif
2. **Page de validation** (`/devis/validation`) - Aperçu du devis généré
3. **Envoi par email** - Notification automatique
4. **Téléchargement PDF** - Génération automatique du devis
5. **Page de confirmation** (`/devis/confirmation`) - Confirmation d'envoi

## 🔧 Configuration Email

### 1. Créer le fichier `.env.local`

Copiez `.env.local.example` vers `.env.local` et remplissez vos informations :

```bash
cp .env.local.example .env.local
```

### 2. Configuration Gmail (Recommandé)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app
SMTP_FROM=noreply@mattheo-termine.fr
CONTACT_EMAIL=contact@mattheo-termine.fr
```

**Étapes pour Gmail :**
1. Activez l'authentification à 2 facteurs
2. Générez un "mot de passe d'application" dans les paramètres Google
3. Utilisez ce mot de passe dans `SMTP_PASS`

### 3. Autres fournisseurs

**Outlook/Hotmail :**
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
```

**Yahoo :**
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

## 🚀 Activation de l'envoi d'emails

### Mode Test (Actuel)
- Les emails sont simulés et affichés dans la console
- Aucune configuration requise pour tester

### Mode Production
Dans `src/app/api/send-devis/route.ts`, décommentez les lignes :

```typescript
// Décommenter ces lignes :
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransporter({...});

// Et dans la fonction :
await Promise.all([
  transporter.sendMail(mailOptionsToProvider),
  transporter.sendMail(mailOptionsToClient),
]);
```

## 📧 Emails envoyés

### 1. Email au prestataire (vous)
- **Sujet :** `Nouveau Devis #XXXX - Nom du client`
- **Contenu :** Détails complets du projet et informations client
- **Format :** HTML avec mise en forme

### 2. Email au client
- **Sujet :** `Confirmation de votre demande de devis #XXXX`
- **Contenu :** Confirmation de réception et prochaines étapes
- **Format :** HTML professionnel

## 🔄 Workflow complet

1. **Client remplit le formulaire** → `/devis`
2. **Clic "Valider le devis"** → Redirection vers `/devis/validation`
3. **Aperçu du devis généré** → Vérification des informations
4. **Téléchargement PDF** (optionnel) → Génération automatique
5. **Clic "Proposer le projet"** → Envoi des emails
6. **Page de confirmation** → `/devis/confirmation`

## 📄 Génération PDF

- **Technologie :** jsPDF + html2canvas
- **Format :** A4, multi-pages si nécessaire
- **Nom du fichier :** `Devis_XXXX_NomClient.pdf`
- **Qualité :** Haute résolution (scale: 2)

## 🛠️ Personnalisation

### Modifier le template de devis
Éditez `src/app/devis/validation/page.tsx` section "Devis Document"

### Modifier les emails
Éditez `src/app/api/send-devis/route.ts` sections `htmlTemplate` et `mailOptionsToClient`

### Ajouter des champs
1. Modifiez `src/components/QuoteCalculator.tsx`
2. Mettez à jour l'interface `DevisData`
3. Adaptez le template de devis

## 🔍 Dépannage

### Erreur d'envoi d'email
- Vérifiez les variables d'environnement
- Testez les identifiants SMTP
- Vérifiez les paramètres de sécurité du fournisseur

### PDF ne se génère pas
- Vérifiez que jsPDF et html2canvas sont installés
- Testez dans un navigateur moderne
- Vérifiez la console pour les erreurs

### Données perdues
- Les données sont stockées dans localStorage
- Vérifiez que JavaScript est activé
- Testez la navigation entre les pages

## 📞 Support

Pour toute question sur l'implémentation, contactez le développeur.
