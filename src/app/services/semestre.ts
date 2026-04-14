import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Semestre } from '../models/semestre';

@Injectable({ providedIn: 'root' })
export class SemestreService {
  private http = inject(HttpClient);
  private readonly API = 'http://localhost:3000/semestres';

  semestres = signal<Semestre[]>([]);

  loadAll(): void {
    this.http.get<Semestre[]>(this.API).subscribe({
      next: (data) => this.semestres.set(data),
      error: (err) => console.error('Erreur chargement semestres', err)
    });
  }
}
