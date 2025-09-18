import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export async function GET() {
  try {
    // Récupère l'index des devis signés
    const indexRaw = await get('signedDevis:index');
    // Filtrer pour ne garder que les IDs string valides
    const index = Array.isArray(indexRaw) ? indexRaw.filter((id): id is string => typeof id === 'string' && !!id) : [];
    if (index.length === 0) {
      return NextResponse.json({ devis: [] });
    }
    // Récupère tous les devis signés
    const devisListRaw = await Promise.all(
      index.map(async (id) => await get(`signedDevis:${id}`))
    );
    // Filtrer les devis valides (non null)
    const devisList = devisListRaw.filter(Boolean);
    return NextResponse.json({ devis: devisList });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des devis', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
