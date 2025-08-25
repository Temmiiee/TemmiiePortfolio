import { QuoteCalculator } from "@/components/QuoteCalculator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { type Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Obtenez un devis pour votre site web',
    description: 'Estimez rapidement le coût de votre projet de site web en sélectionnant les fonctionnalités dont vous avez besoin. Devis personnalisé et instantané.',
    robots: {
        index: true,
        follow: true,
    },
};

export default function DevisPage() {
    return (
        <div className="max-w-4xl mx-auto py-12">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-3xl md:text-4xl">Calculateur de Devis</CardTitle>
                    <CardDescription className="text-lg mt-2">
                        Obtenez une estimation personnalisée pour votre projet en quelques clics.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<div>Chargement...</div>}>
                        <QuoteCalculator />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    );
}
