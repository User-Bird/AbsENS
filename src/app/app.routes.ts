import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth-guard';  // ← auth-guard not auth.guard

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login').then(m => m.Login)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard]
  },
  {
    path: 'filieres',
    loadComponent: () => import('./components/filieres/filiere-list/filiere-list').then(m => m.FiliereList),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'etudiants',
    loadComponent: () => import('./components/etudiants/etudiant-list/etudiant-list').then(m => m.EtudiantList),
    canActivate: [authGuard]
  },
  {
    path: 'etudiants/:id',
    loadComponent: () => import('./components/etudiants/etudiant-detail/etudiant-detail').then(m => m.EtudiantDetail),
    canActivate: [authGuard]
  },
  {
    path: 'modules',
    loadComponent: () => import('./components/modules/module-list/module-list').then(m => m.ModuleList),
    canActivate: [authGuard]
  },
  {
    path: 'absences/saisie',
    loadComponent: () => import('./components/absences/saisie-absence/saisie-absence').then(m => m.SaisieAbsence),
    canActivate: [authGuard]
  },
  {
    path: 'absences/historique',
    loadComponent: () => import('./components/absences/absence-list/absence-list').then(m => m.AbsenceList),
    canActivate: [authGuard]
  },
  {
    path: 'rapports/etudiant/:id',
    loadComponent: () => import('./components/rapports/rapport-etudiant/rapport-etudiant').then(m => m.RapportEtudiant),
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./components/shared/not-found/not-found').then(m => m.NotFound)
  }
];
