import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/layout/header/header';
import { Sidebar } from './components/layout/sidebar/sidebar';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar],
  template: `
    <div class="app-layout">
      @if (auth.isAuthenticated()) {
        <app-sidebar class="sidebar"></app-sidebar>
      }

      <div class="main-content">
        @if (auth.isAuthenticated()) {
          <app-header></app-header>
        }

        <main class="content-wrapper" [style.padding]="auth.isAuthenticated() ? '1.5rem' : '0'">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      height: 100vh;
      overflow: hidden;
      background-color: #f4f6f9;
    }
    .sidebar {
      width: 260px;
      background: #1a3a5c;
      color: white;
      transition: width 0.3s;
    }
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .content-wrapper {
      flex: 1;
      overflow-y: auto;
    }
  `]
})
export class App {
  auth = inject(AuthService);
}
