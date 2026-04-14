export type UserRole = 'admin' | 'enseignant';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  password?: string;
  role: UserRole;
  filiereId?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
