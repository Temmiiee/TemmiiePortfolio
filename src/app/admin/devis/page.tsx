'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock, Eye, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface SignedDevis {
  id: string;
  devisNumber: string;
  clientInfo: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
  };
  siteType: string;
  budget: string;
  signedAt: string;
  status: 'signed' | 'accepted' | 'rejected';
  signature: string;
}

export default function AdminDevisPage() {
  const [devisList, setDevisList] = useState<SignedDevis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSignedDevis();
  }, []);

  const loadSignedDevis = async () => {
    try {
      // En production, ceci ferait un appel API
      // Pour les tests, on simule avec des données statiques
      const mockDevis: SignedDevis[] = [
        {
          id: 'devis-001',
          devisNumber: '2025-0124-001',
          clientInfo: {
            name: 'Jean Dupont',
            email: 'jean.dupont@email.com',
            company: 'Entreprise ABC',
            phone: '06 12 34 56 78'
          },
          siteType: 'Site Multi-pages Professionnel',
          budget: '1150€ HT',
          signedAt: new Date().toISOString(),
          status: 'signed',
          signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
        },
        {
          id: 'devis-002',
          devisNumber: '2025-0123-002',
          clientInfo: {
            name: 'Marie Martin',
            email: 'marie.martin@email.com',
            company: 'Startup XYZ'
          },
          siteType: 'Application Web',
          budget: '2500€ HT',
          signedAt: new Date(Date.now() - 86400000).toISOString(), // Hier
          status: 'accepted',
          signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
        }
      ];

      setDevisList(mockDevis);
    } catch (error) {
      console.error('Erreur lors du chargement des devis:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptDevis = async (devisId: string) => {
    try {
      // En production, appel API pour accepter
      console.log('Acceptation du devis:', devisId);
      
      // Mettre à jour localement pour les tests
      setDevisList(prev => 
        prev.map(devis => 
          devis.id === devisId 
            ? { ...devis, status: 'accepted' as const }
            : devis
        )
      );

      alert('Devis accepté ! Le client va recevoir une confirmation.');
    } catch (error) {
      console.error('Erreur lors de l\'acceptation:', error);
      alert('Erreur lors de l\'acceptation du devis.');
    }
  };

  const handleRejectDevis = async (devisId: string) => {
    const reason = prompt('Raison du refus (optionnel):');
    
    try {
      // En production, appel API pour refuser
      console.log('Refus du devis:', devisId, 'Raison:', reason);
      
      // Mettre à jour localement pour les tests
      setDevisList(prev => 
        prev.map(devis => 
          devis.id === devisId 
            ? { ...devis, status: 'rejected' as const }
            : devis
        )
      );

      alert('Devis refusé. Le client va recevoir une notification.');
    } catch (error) {
      console.error('Erreur lors du refus:', error);
      alert('Erreur lors du refus du devis.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'signed':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'accepted':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Accepté</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Refusé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-bold mb-2">Chargement des devis...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Administration - Devis Signés</h1>
          <p className="text-gray-600">
            Gérez les devis signés par vos clients
          </p>
        </div>

        {devisList.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun devis signé</h3>
              <p className="text-gray-600">
                Les devis signés par vos clients apparaîtront ici.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {devisList.map((devis) => (
              <Card key={devis.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">
                        Devis #{devis.devisNumber}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">
                        {devis.siteType} - {devis.budget}
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(devis.status)}
                      <p className="text-sm text-gray-500 mt-1">
                        Signé le {new Date(devis.signedAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Informations client */}
                    <div>
                      <h4 className="font-semibold mb-3">Informations Client</h4>
                      <div className="space-y-2">
                        <p><strong>Nom :</strong> {devis.clientInfo.name}</p>
                        {devis.clientInfo.company && (
                          <p><strong>Entreprise :</strong> {devis.clientInfo.company}</p>
                        )}
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-500" />
                          <a 
                            href={`mailto:${devis.clientInfo.email}`}
                            className="text-primary hover:underline"
                          >
                            {devis.clientInfo.email}
                          </a>
                        </div>
                        {devis.clientInfo.phone && (
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-gray-500" />
                            <a 
                              href={`tel:${devis.clientInfo.phone}`}
                              className="text-primary hover:underline"
                            >
                              {devis.clientInfo.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Signature */}
                    <div>
                      <h4 className="font-semibold mb-3">Signature Électronique</h4>
                      <div className="border border-gray-200 rounded-lg p-4 bg-white">
                        <Image 
                          src={devis.signature} 
                          alt="Signature du client"
                          className="max-w-full h-auto border border-gray-300 rounded"
                          style={{ maxHeight: '100px' }}
                          width={200}
                          height={100}
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Signée le {new Date(devis.signedAt).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/devis/${devis.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          Voir le détail
                        </Link>
                      </Button>

                      {devis.status === 'signed' && (
                        <>
                          <Button 
                            size="sm"
                            onClick={() => handleAcceptDevis(devis.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Accepter le Projet
                          </Button>
                          
                          <Button 
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRejectDevis(devis.id)}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Refuser le Projet
                          </Button>
                        </>
                      )}

                      {devis.status === 'accepted' && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          ✅ Projet accepté - En cours de développement
                        </Badge>
                      )}

                      {devis.status === 'rejected' && (
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          ❌ Projet refusé
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/">
              Retour à l&apos;accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
