import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Politique de confidentialité - Matthéo Termine",
  description: "Politique de confidentialité et gestion des cookies du site mattheo-termine.fr, intégrateur web freelance spécialisé en accessibilité RGAA.",
  openGraph: {
    title: "Politique de confidentialité - Matthéo Termine",
    description: "Politique de confidentialité et gestion des cookies du site mattheo-terme.fr",
    url: "https://mattheo-termine.fr/politique-confidentialite",
  },
};

export default function PolitiqueConfidentialite() {
  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-space-grotesk font-bold mb-4">
            Politique de confidentialité
          </h1>
          <p className="text-lg text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              La présente politique de confidentialité décrit comment Matthéo Termine 
              (&quot;nous&quot;, &quot;notre&quot; ou &quot;nos&quot;) collecte, utilise et protège vos informations 
              personnelles lorsque vous utilisez notre site web mattheo-termine.fr 
              (&quot;le Service&quot;).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Informations collectées</h2>
            
            <h3 className="text-xl font-semibold mb-3">2.1 Informations fournies volontairement</h3>
            <p>
              Lorsque vous nous contactez via le formulaire de contact ou de devis, 
              nous collectons les informations suivantes :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone (optionnel)</li>
              <li>Entreprise ou organisation (optionnel)</li>
              <li>Message et détails du projet</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.2 Données de navigation</h3>
            <p>
              Avec votre consentement, nous collectons automatiquement certaines 
              informations techniques :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Adresse IP (anonymisée)</li>
              <li>Type de navigateur et version</li>
              <li>Pages visitées et durée de visite</li>
              <li>Référent et page de sortie</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Utilisation des cookies</h2>
            
            <h3 className="text-xl font-semibold mb-3">3.1 Types de cookies utilisés</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-green-600 mb-2">Cookies essentiels</h4>
                <p className="text-sm">
                  Nécessaires au fonctionnement du site (préférences de thème, 
                  consentement aux cookies). Ces cookies ne peuvent pas être désactivés.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">Cookies analytiques</h4>
                <p className="text-sm">
                  Google Analytics nous aide à comprendre comment les visiteurs 
                  utilisent notre site. Ces données sont anonymisées et utilisées 
                  uniquement pour améliorer l&apos;expérience utilisateur.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-purple-600 mb-2">Cookies marketing</h4>
                <p className="text-sm">
                  Actuellement non utilisés. Cette catégorie est prévue pour de 
                  futurs outils de suivi marketing si nécessaire.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Base légale du traitement</h2>
            <p>
              Nous traitons vos données personnelles sur les bases légales suivantes :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Consentement :</strong> pour les cookies analytiques et marketing</li>
              <li><strong>Intérêt légitime :</strong> pour répondre à vos demandes de contact</li>
              <li><strong>Exécution d&apos;un contrat :</strong> pour la réalisation de prestations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Partage des données</h2>
            <p>
              Nous ne vendons, n&apos;échangeons ni ne louons vos informations personnelles 
              à des tiers. Vos données peuvent être partagées uniquement dans les cas suivants :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Avec votre consentement explicite</li>
              <li>Pour se conformer à une obligation légale</li>
              <li>Avec des prestataires de services (hébergement, analytics) sous contrat de confidentialité</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Conservation des données</h2>
            <p>
              Nous conservons vos données personnelles pendant les durées suivantes :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Données de contact :</strong> 3 ans après le dernier contact</li>
              <li><strong>Consentement aux cookies :</strong> 1 an</li>
              <li><strong>Données analytiques :</strong> 26 mois maximum (Google Analytics)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données</li>
              <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
              <li><strong>Droit d&apos;effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit de portabilité :</strong> récupérer vos données dans un format structuré</li>
              <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Retrait du consentement :</strong> retirer votre consentement à tout moment</li>
            </ul>
            <p>
              Pour exercer vos droits, contactez-nous à : 
              <a href="mailto:contact@mattheo-termine.fr" className="text-primary hover:underline ml-1">
                contact@mattheo-termine.fr
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles 
              appropriées pour protéger vos données contre tout accès non autorisé, 
              toute altération, divulgation ou destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité ou 
              le traitement de vos données personnelles, vous pouvez nous contacter :
            </p>
            <div className="bg-muted p-4 rounded-lg mt-4">
              <p><strong>Matthéo Termine</strong></p>
              <p>Intégrateur Web Freelance</p>
              <p>Email : contact@mattheo-termine.fr</p>
            </div>
            <p className="mt-4">
              Vous avez également le droit de déposer une plainte auprès de la CNIL 
              (Commission Nationale de l&apos;Informatique et des Libertés) si vous estimez 
              que vos droits ne sont pas respectés.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Modifications</h2>
            <p>
              Cette politique de confidentialité peut être mise à jour périodiquement. 
              Nous vous informerons de tout changement significatif en publiant la 
              nouvelle politique sur cette page avec une date de mise à jour révisée.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}