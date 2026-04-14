export type Cycle = 'licence' | 'master' | 'qualification';

export interface Filiere {
  id: number;
  nom: string;       // "Informatique", "Mathematiques"...
  code: string;      // "INFO", "MATH", "PHY"...
  cycle: Cycle;
  description?: string;
}
