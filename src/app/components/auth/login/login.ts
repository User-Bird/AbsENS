import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private auth = inject(AuthService);

  email    = signal('');
  password = signal('');
  loading  = signal(false);

  // ⬅️ REWRITE TO USE ASYNC/AWAIT
  async onSubmit(): Promise<void> {
    const mail = this.email().trim();
    const pass = this.password().trim();

    if (!mail || !pass) return;

    // Trigger loading UI
    this.loading.set(true);

    // Wait for the login logic and routing to finish
    const success = await this.auth.login(mail, pass);

    // Disable loading UI
    this.loading.set(false);

    // Trigger alert only if it failed
    if (!success) {
      alert('Email ou mot de passe incorrect');
    }
  }
}
