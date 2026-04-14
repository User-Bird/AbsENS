import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="app-header">
      <div class="user-info">
        @if (auth.currentUser(); as user) {
          <span class="user-role badge">{{ user.role }}</span>
          <span class="user-name">Pr. {{ user.nom }} {{ user.prenom }}</span>
        }
      </div>
      <button class="btn-logout" (click)="auth.logout()">Déconnexion</button>
    </header>
  `,
  styles: [`
    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .user-info { display: flex; align-items: center; gap: 1rem; }
    .badge {
      background: #eef2f6; color: #1a3a5c;
      padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; text-transform: uppercase; font-weight: bold;
    }
    .user-name { font-weight: 600; color: #333; }
    .btn-logout {
      background: #ffebee; color: #d32f2f; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-weight: 600; transition: background 0.2s;
    }
    .btn-logout:hover { background: #ffcdd2; }
  `]
})
export class Header {
  auth = inject(AuthService);
}
