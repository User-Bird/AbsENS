export interface Absence {
  id: number;
  seanceId: number;
  etudiantId: number;
  justifiee: boolean;
  motif?: string;
  dateJustification?: string;
}

export interface AbsenceDetail extends Absence {
  etudiantNom?: string;
  etudiantPrenom?: string;
  etudiantCne?: string;
  moduleNom?: string;
  seanceDate?: string;
  seanceCreneau?: string;
}
