export interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  cne: string;
  cin: string;
  email: string;
  telephone?: string;
  filiereId: number;
  semestreId: number;
  groupe: string;
  photo?: string;
  dateNaissance?: string;
  ville?: string;
}
