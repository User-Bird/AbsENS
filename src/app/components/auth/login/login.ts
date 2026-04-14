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

  onSubmit(): void {
    if (!this.email() || !this.password()) return;
    this.loading.set(true);
    this.auth.login(this.email(), this.password());
    setTimeout(() => this.loading.set(false), 2000);
  }
}
