import { promises as fs } from 'fs';
import path from 'path';
import { config, shouldLog } from './config';

export interface DevisData {
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

const DEVIS_FILE = path.join(process.cwd(), config.files.dataDir, config.files.devisFile);

// Assurer que le dossier data existe
const ensureDataDir = async () => {
  const dataDir = path.join(process.cwd(), config.files.dataDir);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Lire tous les devis
export const getAllDevis = async (): Promise<DevisData[]> => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DEVIS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    if (shouldLog()) {
      console.log('Aucun fichier devis trouvé, création d\'un nouveau fichier');
    }
    return [];
  }
};

// Sauvegarder un devis
export const saveDevis = async (devis: Omit<DevisData, 'id' | 'createdAt' | 'updatedAt'>): Promise<DevisData> => {
  await ensureDataDir();
  const allDevis = await getAllDevis();
  
  const newDevis: DevisData = {
    ...devis,
    id: generateId(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  allDevis.push(newDevis);
  await fs.writeFile(DEVIS_FILE, JSON.stringify(allDevis, null, 2));
  return newDevis;
};

// Mettre à jour le statut d'un devis
export const updateDevisStatus = async (devisNumber: string, status: 'approved' | 'rejected'): Promise<DevisData | null> => {
  const allDevis = await getAllDevis();
  const devisIndex = allDevis.findIndex(d => d.devisNumber === devisNumber);
  
  if (devisIndex === -1) {
    return null;
  }
  
  allDevis[devisIndex].status = status;
  allDevis[devisIndex].updatedAt = new Date().toISOString();
  
  await fs.writeFile(DEVIS_FILE, JSON.stringify(allDevis, null, 2));
  return allDevis[devisIndex];
};

// Trouver un devis par numéro
export const getDevisByNumber = async (devisNumber: string): Promise<DevisData | null> => {
  const allDevis = await getAllDevis();
  return allDevis.find(d => d.devisNumber === devisNumber) || null;
};

// Générer un ID unique
const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Statistiques
export const getDevisStats = async () => {
  const allDevis = await getAllDevis();
  return {
    total: allDevis.length,
    pending: allDevis.filter(d => d.status === 'pending').length,
    approved: allDevis.filter(d => d.status === 'approved').length,
    rejected: allDevis.filter(d => d.status === 'rejected').length,
  };
};
