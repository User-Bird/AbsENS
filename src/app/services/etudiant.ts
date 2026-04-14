import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Etudiant } from '../models/etudiant';
import { ToastService } from './toast';

@Injectable({ providedIn: 'root' })
export class EtudiantService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private readonly API = 'http://localhost:3000/etudiants';

  etudiants = signal<Etudiant[]>([]);
  loading = signal<boolean>(false);

  loadAll(): void {
    this.loading.set(true);
    this.http.get<Etudiant[]>(this.API).subscribe({
      next: (data) => {
        this.etudiants.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.toast.error('Erreur lors du chargement des étudiants');
        this.loading.set(false);
      }
    });
  }

  getById(id: number) {
    return this.http.get<Etudiant>(`${this.API}/${id}`);
  }

  create(etudiant: Omit<Etudiant, 'id'>): void {
    this.http.post<Etudiant>(this.API, etudiant).subscribe({
      next: (newEtu) => {
        this.etudiants.update(list => [...list, newEtu]);
        this.toast.success('Étudiant ajouté');
      },
      error: () => this.toast.error('Erreur lors de la création')
    });
  }

  delete(id: number): void {
    this.http.delete(`${this.API}/${id}`).subscribe({
      next: () => {
        this.etudiants.update(list => list.filter(e => e.id !== id));
        this.toast.success('Étudiant supprimé');
      },
      error: () => this.toast.error('Erreur lors de la suppression')
    });
  }
}
