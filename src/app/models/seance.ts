
import { TypeSeance } from './module';   // ← add this line

export interface Seance {
  id: number;
  moduleId: number;
  date: string;
  creneau: string;
  type: TypeSeance;
  salle?: string;
  effectuee: boolean;
}
