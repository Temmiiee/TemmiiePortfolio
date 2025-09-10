import { type Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Déclaration d’accessibilité',
    description: 'Déclaration d’accessibilité du portfolio de Matthéo Termine, intégrateur web freelance, conformément au RGAA.',
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
                        Matthéo Termine s’engage à rendre son site internet accessible conformément à l’article 47 de la loi n° 2005-102 du 11 février 2005.
                    </p>
                    <p>
                        Cette déclaration d’accessibilité s’applique au portfolio web de Matthéo Termine.
                    </p>

                    <h2>État de conformité</h2>
                    <p>
                        Le portfolio web de Matthéo Termine est <strong>totalement conforme</strong> avec le référentiel général d’amélioration de l’accessibilité (RGAA), version 4.1.
                    </p>
                    
                    <h2>Résultats des tests</h2>
                    <p>L’audit de conformité réalisé en interne révèle que :</p>
                    <ul>
                      <li>100% des critères du RGAA version 4.1 sont respectés.</li>
                    </ul>

                    <h2>Contenus non accessibles</h2>
                    <p>
                        L&apos;ensemble des contenus et des fonctionnalités du site sont accessibles.
                    </p>
                    
                    {/* 
                    <h3 className="!text-xl">Non conformité</h3>
                    <p>[Lister ici les non-conformités]</p>

                    <h3 className="!text-xl">Contenus non soumis à l’obligation d’accessibilité</h3>
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

                    <h2>Environnement de test</h2>
                    <h3>Agents utilisateurs, technologies d’assistance et outils utilisés pour vérifier l’accessibilité</h3>
                    <p>Les vérifications de conformité ont été réalisées avec les combinaisons de navigateurs et de lecteurs d&apos;écran suivantes :</p>
                    <ul>
                        <li>Firefox avec NVDA</li>
                        <li>Google Chrome avec JAWS</li>
                        <li>Safari avec VoiceOver</li>
                    </ul>

                    <h3>Pages du site ayant fait l’objet de la vérification de conformité</h3>
                    <ul>
                        <li>Page d&apos;accueil</li>
                        <li>Déclaration d&apos;accessibilité</li>
                    </ul>

                    <h2>Retour d’information et contact</h2>
                    <p>
                        Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le responsable du site internet pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.
                    </p>
                    <ul>
                      <li><Link href="/#contact">Envoyer un message via le formulaire de contact</Link></li>
                    </ul>
                    
                    <h2>Voies de recours</h2>
                    <p>
                        Cette procédure est à utiliser dans le cas suivant : vous avez signalé au responsable du site internet un défaut d’accessibilité qui vous empêche d’accéder à un contenu ou à un des services du portail et vous n’avez pas obtenu de réponse satisfaisante.
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
