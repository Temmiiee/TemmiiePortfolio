import { NextRequest, NextResponse } from 'next/server';
import { getAllDevis, getDevisStats } from '@/lib/devis-storage';
import { shouldLog } from '@/lib/config';

type Stats = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeStats = searchParams.get('stats') === 'true';

    const devis = await getAllDevis();
    
    // Trier par date de création (plus récent en premier)
    const sortedDevis = devis.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const response: { devis: typeof sortedDevis; stats?: Stats } = { devis: sortedDevis };

    if (includeStats) {
      response.stats = await getDevisStats();
    }

    return NextResponse.json(response);

  } catch (error) {
    if (shouldLog()) {
      console.error('Erreur lors de la récupération des devis:', error);
    }
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des devis' },
      { status: 500 }
    );
  }
}
