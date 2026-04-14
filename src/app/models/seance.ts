export interface Seance {
  id: number;
  moduleId: number;
  date: string;        // "2026-04-01"
  creneau: string;     // "08:00-10:00"
  type: TypeSeance;
  salle?: string;
  effectuee: boolean;
}

