export interface Semestre {
  id: number;
  nom: string;       // "S1", "S2", "S3"...
  filiereId: number;
  annee: string;     // "2025-2026"
  actif: boolean;
}
