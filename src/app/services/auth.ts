import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, AuthState } from '../models/user';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API = 'http://localhost:3000';

  private _authState = signal<AuthState>({
    user: this.loadFromStorage(),
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  });

  readonly currentUser = computed(() => this._authState().user);
  readonly isAuthenticated = computed(() => this._authState().isAuthenticated);
  readonly isAdmin = computed(() => this._authState().user?.role === 'admin');
  readonly isEnseignant = computed(() => this._authState().user?.role === 'enseignant');

  /**
   * Async login compatible with Zoneless Change Detection
   */
  async login(email: string, password: string): Promise<boolean> {
    try {
      const sanitizedEmail = email.toLowerCase().trim();
      const url = `${this.API}/users?email=${encodeURIComponent(sanitizedEmail)}&password=${encodeURIComponent(password)}`;

      const users = await firstValueFrom(this.http.get<User[]>(url));

      if (!users || users.length === 0) return false;

      const user = users[0];
      const fakeToken = btoa(`${user.id}:${user.email}:${Date.now()}`);

      localStorage.setItem('token', fakeToken);
      localStorage.setItem('currentUser', JSON.stringify(user));

      // Update state FIRST
      this._authState.set({ user, token: fakeToken, isAuthenticated: true });

      // Wait for navigation to complete
      const navOk = await this.router.navigate(['/dashboard']);
      return navOk;

    } catch (error) {
      console.error('Login error', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this._authState.set({ user: null, token: null, isAuthenticated: false });
    this.router.navigate(['/login']);
  }

  private loadFromStorage(): User | null {
    const raw = localStorage.getItem('currentUser');
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
