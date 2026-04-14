export type TypeSeance = 'CM' | 'TD' | 'TP';

export interface Module {
  id: number;
  nom: string;
  code: string;
  semestreId: number;
  enseignantId: number;
  volumeHoraire: number;
  coefficient: number;
}
