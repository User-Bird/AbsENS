import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seance } from '../models/seance';

@Injectable({ providedIn: 'root' })
export class SeanceService {
  private http = inject(HttpClient);
  private readonly API = 'http://localhost:3000/seances';

  seances = signal<Seance[]>([]);

  loadAll(): void {
    this.http.get<Seance[]>(this.API).subscribe({
      next: (data) => this.seances.set(data),
      error: (err) => console.error('Erreur chargement séances', err)
    });
  }
}
