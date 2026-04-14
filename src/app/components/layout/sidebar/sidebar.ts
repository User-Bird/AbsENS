import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <aside class="sidebar-container">
      <div class="sidebar-logo">
        <h2>AbsENS</h2>
      </div>

      <nav class="sidebar-nav">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">📊 Dashboard</a>

        @if (auth.isAdmin()) {
          <a routerLink="/filieres" routerLinkActive="active" class="nav-link">📁 Filières</a>
        }

        <a routerLink="/modules" routerLinkActive="active" class="nav-link">📚 Modules</a>
        <a routerLink="/etudiants" routerLinkActive="active" class="nav-link">🎓 Étudiants</a>

        @if (auth.isEnseignant()) {
          <a routerLink="/absences/saisie" routerLinkActive="active" class="nav-link">✍️ Saisie d'absence</a>
        }

        <a routerLink="/absences/historique" routerLinkActive="active" class="nav-link">🕒 Historique</a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar-container {
      height: 100%;
      background: #1a3a5c;
      color: white;
      display: flex;
      flex-direction: column;
    }
    .sidebar-logo {
      padding: 1.5rem;
      text-align: center;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .sidebar-logo h2 { margin: 0; font-size: 1.5rem; letter-spacing: 1px; }
    .sidebar-nav {
      padding: 1rem 0;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      padding: 1rem 1.5rem;
      color: #cbd5e1;
      text-decoration: none;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .nav-link:hover { background: rgba(255,255,255,0.05); color: white; }
    .nav-link.active { background: rgba(255,255,255,0.1); color: white; border-left: 4px solid #60a5fa; }
  `]
})
export class Sidebar {
  auth = inject(AuthService);
}
