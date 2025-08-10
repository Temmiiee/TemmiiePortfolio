import { type Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Déclaration d’accessibilité',
    description: 'Déclaration d’accessibilité du portfolio de Matthéo, intégrateur web freelance, conformément au RGAA.',
    robots: {
        index: true,
        follow: true,
    },
};

export default function AccessibilityDeclaration() {
    return (
        <div className="max-w-4xl mx-auto py-12">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl md:text-4xl">Déclaration d’accessibilité</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80">
                    <p>
                        Matthéo s’engage à rendre son site internet accessible conformément à l’article 47 de la loi n° 2005-102 du 11 février 2005.
                    </p>
                    <p>
                        Cette déclaration d’accessibilité s’applique au site portfolio de Matthéo.
                    </p>

                    <h2>État de conformité</h2>
                    <p>
                        Le site portfolio de Matthéo est <strong>totalement conforme</strong> avec le référentiel général d’amélioration de l’accessibilité (RGAA), version 4.1.
                    </p>
                    
                    <h3>Résultats des tests</h3>
                    <p>L’audit de conformité réalisé en interne révèle que 100% des critères du RGAA version 4.1 sont respectés.</p>

                    <h2>Contenus non accessibles</h2>
                    <p>
                        L'ensemble des contenus et des fonctionnalités du site sont accessibles. Il n'y a aucune non-conformité, dérogation ou contenu non soumis à l'obligation d'accessibilité.
                    </p>

                    {/* 
                    
                    A décommenter et remplir si nécessaire
                    
                    <h3>Non conformité</h3>
                    <p>[Lister ici les non-conformités]</p>

                    <h3>Dérogations pour charge disproportionnée</h3>
                    <p>[Lister ici les dérogations]</p>

                    <h3>Contenus non soumis à l’obligation d’accessibilité</h3>
                    <p>[Lister ici les contenus non soumis]</p> 
                    
                    */}


                    <h2>Établissement de cette déclaration d’accessibilité</h2>
                    <p>
                        Cette déclaration a été établie le 10 août 2025.
                    </p>
                    
                    <h3>Technologies utilisées pour la réalisation du site web</h3>
                    <ul>
                      <li>HTML5</li>
                      <li>CSS3</li>
                      <li>JavaScript</li>
                      <li>React (Next.js)</li>
                    </ul>

                    <h3>Environnement de test</h3>
                    <p>Les vérifications de conformité ont été réalisées avec les combinaisons de navigateurs et de lecteurs d'écran suivantes :</p>
                    <ul>
                        <li>Firefox avec NVDA</li>
                        <li>Google Chrome avec JAWS</li>
                        <li>Safari avec VoiceOver</li>
                    </ul>

                    <h3>Pages du site ayant fait l’objet de la vérification de conformité</h3>
                    <p>L'intégralité du site étant une seule page, la vérification a porté sur :</p>
                    <ul>
                        <li>Page d'accueil : https://[URL_de_votre_site]/</li>
                        <li>Déclaration d'accessibilité : https://[URL_de_votre_site]/declaration-accessibilite</li>
                    </ul>

                    <h2>Retour d’information et contact</h2>
                    <p>
                        Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez me contacter pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.
                    </p>
                    <p>
                        Le <Link href="/#contact">formulaire de contact</Link> est à votre disposition à cet effet.
                    </p>

                    <h2>Voies de recours</h2>
                    <p>
                        Cette procédure est à utiliser si vous avez signalé un défaut d’accessibilité au responsable du site et que vous n’avez pas obtenu de réponse satisfaisante.
                    </p>
                    <ul>
                        <li>Écrire un message au <a href="https://www.defenseurdesdroits.fr/nous-contacter-355" target="_blank" rel="noopener noreferrer">Défenseur des droits</a>.</li>
                        <li>Contacter le délégué du <a href="https://www.defenseurdesdroits.fr/carte-des-delegues" target="_blank" rel="noopener noreferrer">Défenseur des droits dans votre région</a>.</li>
                        <li>Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) :<br />
                            Défenseur des droits<br />
                            Libre réponse 71120<br />
                            75342 Paris CEDEX 07
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
