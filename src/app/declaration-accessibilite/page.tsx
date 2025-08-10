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
                        Matthéo s’engage à rendre son site internet accessible conformément au référentiel général d’amélioration de l’accessibilité (RGAA), version 4.1. Cette démarche s’inscrit dans ma volonté de proposer un web inclusif et de garantir l’égalité d’accès à l’information pour tous.
                    </p>
                    <p>
                        La présente déclaration d’accessibilité s’applique au site portfolio de Matthéo, accessible à l’adresse [URL de votre site].
                    </p>

                    <h2>État de conformité</h2>
                    <p>
                        Le site est en <strong>conformité totale</strong> avec le référentiel général d’amélioration de l’accessibilité (RGAA), version 4.1.
                    </p>
                    
                    <h3>Résultats des tests</h3>
                    <p>
                      Les tests de conformité ont été réalisés en interne en s'appuyant sur les combinaisons de navigateurs et de lecteurs d'écran suivantes :
                    </p>
                    <ul>
                        <li>Firefox avec NVDA</li>
                        <li>Google Chrome avec JAWS</li>
                        <li>Safari avec VoiceOver</li>
                    </ul>

                    <h2>Contenus non accessibles</h2>
                    <p>
                        L'ensemble des contenus et des fonctionnalités du site sont accessibles sans dérogation.
                    </p>

                    <h2>Établissement de cette déclaration d’accessibilité</h2>
                    <p>
                        Cette déclaration a été établie le 10 août 2025.
                    </p>

                    <h2>Retour d’information et contact</h2>
                    <p>
                        Si vous n’arrivez pas à accéder à un contenu ou à un service, ou si vous constatez une non-conformité, vous pouvez me contacter pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.
                    </p>
                    <p>
                        Le <Link href="/#contact">formulaire de contact</Link> est à votre disposition pour toute question.
                    </p>

                    <h2>Voies de recours</h2>
                    <p>
                        Si vous constatez un défaut d’accessibilité vous empêchant d’accéder à un contenu ou à une fonctionnalité du site, que vous nous l’avez signalé et que vous n’avez pas obtenu de réponse satisfaisante, vous pouvez utiliser les voies de recours suivantes :
                    </p>
                    <ul>
                        <li>Écrire un message au <a href="https://formulaire.defenseurdesdroits.fr/" target="_blank" rel="noopener noreferrer">Défenseur des droits</a>.</li>
                        <li>Contacter le délégué du <a href="https://www.defenseurdesdroits.fr/saisir/delegues" target="_blank" rel="noopener noreferrer">Défenseur des droits dans votre région</a>.</li>
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
