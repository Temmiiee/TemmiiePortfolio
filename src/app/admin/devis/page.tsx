'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  Phone, 
  Building,
  Euro,
  BarChart3,
  Loader2,
  AlertCircle,
  CheckCircle2,
  FileText,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { shouldLog } from '@/lib/config';

interface DevisData {
  id: string;
  devisNumber: string;
  clientInfo: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  };
  siteType: string;
  designType: string;
  features?: string[];
  total: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export default function AdminDevisPage() {
  const [devisList, setDevisList] = useState<DevisData[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchDevis();
    
    // Vérifier les paramètres URL pour les messages
    const params = new URLSearchParams(window.location.search);
    const successParam = params.get('success');
    const errorParam = params.get('error');
    const devisParam = params.get('devis');

    if (successParam && devisParam) {
      const action = successParam === 'approve' ? 'approuvé' : 'refusé';
      setSuccess(`Devis #${devisParam} ${action} avec succès !`);
    } else if (errorParam) {
      setError(getErrorMessage(errorParam));
    }
  }, []);

  const fetchDevis = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/devis?stats=true');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des devis');
      }
      const data = await response.json();
      setDevisList(data.devis || []);
      setStats(data.stats || null);
    } catch (err) {
      setError('Impossible de charger les devis');
      if (shouldLog()) {
        console.error('Erreur:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'not-found': return 'Devis introuvable';
      case 'already-processed': return 'Ce devis a déjà été traité';
      case 'update-failed': return 'Erreur lors de la mise à jour';
      case 'invalid-action': return 'Action invalide';
      case 'server-error': return 'Erreur serveur';
      default: return 'Une erreur est survenue';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">
          <Clock className="h-3 w-3 mr-1" />
          En attente
        </Badge>;
      case 'approved':
        return <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approuvé
        </Badge>;
      case 'rejected':
        return <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50">
          <XCircle className="h-3 w-3 mr-1" />
          Refusé
        </Badge>;
      default:
        return null;
    }
  };

  const handleAction = (devisNumber: string, action: 'approve' | 'reject') => {
    const confirmMessage = action === 'approve' 
      ? `Êtes-vous sûr de vouloir approuver le devis #${devisNumber} ?`
      : `Êtes-vous sûr de vouloir refuser le devis #${devisNumber} ?`;
    
    if (confirm(confirmMessage)) {
      window.location.href = `/api/admin/devis/${devisNumber}?action=${action}`;
    }
  };

  const filteredDevis = devisList.filter(devis => {
    switch (activeTab) {
      case 'pending': return devis.status === 'pending';
      case 'approved': return devis.status === 'approved';
      case 'rejected': return devis.status === 'rejected';
      default: return true;
    }
  });

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-96">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Chargement des devis...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Administration des Devis</h1>
          <p className="text-muted-foreground">Gérez vos demandes de devis</p>
        </div>
        <Button onClick={fetchDevis} variant="outline">
          Actualiser
        </Button>
      </div>

      {/* Messages d'alerte */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-4">
            <div className="flex items-center text-red-700">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          </CardContent>
        </Card>
      )}

      {success && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4">
            <div className="flex items-center text-green-700">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {success}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistiques */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">En attente</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approuvés</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Refusés</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs et liste des devis */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Tous ({devisList.length})</TabsTrigger>
          <TabsTrigger value="pending">En attente ({stats?.pending || 0})</TabsTrigger>
          <TabsTrigger value="approved">Approuvés ({stats?.approved || 0})</TabsTrigger>
          <TabsTrigger value="rejected">Refusés ({stats?.rejected || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredDevis.length === 0 ? (
            <Card>
              <CardContent className="pt-8">
                <div className="text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun devis trouvé</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredDevis.map((devis) => (
              <Card key={devis.id} className="transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Devis #{devis.devisNumber}
                    </CardTitle>
                    {getStatusBadge(devis.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Créé le {format(new Date(devis.createdAt), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Informations client */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Informations Client
                      </h4>
                      <div className="pl-6 space-y-1 text-sm">
                        <p><strong>Nom:</strong> {devis.clientInfo.name}</p>
                        <p className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {devis.clientInfo.email}
                        </p>
                        {devis.clientInfo.phone && (
                          <p className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {devis.clientInfo.phone}
                          </p>
                        )}
                        {devis.clientInfo.company && (
                          <p className="flex items-center">
                            <Building className="h-3 w-3 mr-1" />
                            {devis.clientInfo.company}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Détails du Projet</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Type:</strong> {devis.siteType}</p>
                        <p><strong>Design:</strong> {devis.designType}</p>
                        <p className="flex items-center">
                          <Euro className="h-3 w-3 mr-1" />
                          <strong>Budget:</strong> {devis.total} €
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Fonctionnalités */}
                  {devis.features && devis.features.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Fonctionnalités demandées</h4>
                      <div className="flex flex-wrap gap-1">
                        {devis.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions pour les devis en attente */}
                  {devis.status === 'pending' && (
                    <div className="flex gap-2 pt-4 border-t">
                      <Button
                        onClick={() => handleAction(devis.devisNumber, 'approve')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approuver
                      </Button>
                      <Button
                        onClick={() => handleAction(devis.devisNumber, 'reject')}
                        variant="destructive"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Refuser
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
