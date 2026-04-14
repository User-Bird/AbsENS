import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, AuthState } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly API = 'http://localhost:3000';

  // ── State ──────────────────────────────────────────────────────────────
  private _authState = signal<AuthState>({
    user: this.loadFromStorage(),
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  });

  // ── Public selectors ───────────────────────────────────────────────────
  readonly currentUser = computed(() => this._authState().user);
  readonly isAuthenticated = computed(() => this._authState().isAuthenticated);
  readonly isAdmin = computed(() => this._authState().user?.role === 'admin');
  readonly isEnseignant = computed(() => this._authState().user?.role === 'enseignant');

  // ── Login ──────────────────────────────────────────────────────────────
  login(email: string, password: string): void {
    const params = new HttpParams().set('email', email).set('password', password);
    this.http.get<User[]>(`${this.API}/users`, { params })
      .subscribe({
        next: (users) => {
          if (users.length === 0) {
            alert('Email ou mot de passe incorrect');
            return;
          }
          const user = users[0];
          const fakeToken = btoa(`${user.id}:${user.email}:${Date.now()}`);

          // Persist
          localStorage.setItem('token', fakeToken);
          localStorage.setItem('currentUser', JSON.stringify(user));

          // Update state
          this._authState.set({ user, token: fakeToken, isAuthenticated: true });

          this.router.navigate(['/dashboard']);
        },
        error: () => alert('Erreur de connexion au serveur'),
      });
  }

  // ── Logout ─────────────────────────────────────────────────────────────
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this._authState.set({ user: null, token: null, isAuthenticated: false });
    this.router.navigate(['/login']);
  }

  // ── Helper ─────────────────────────────────────────────────────────────
  private loadFromStorage(): User | null {
    const raw = localStorage.getItem('currentUser');
    return raw ? JSON.parse(raw) : null;
  }
}
