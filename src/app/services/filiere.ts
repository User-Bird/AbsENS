import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filiere } from '../models/filiere';
import { ToastService } from './toast'; // Adjust path if needed

@Injectable({ providedIn: 'root' })
export class FiliereService {
  private http = inject(HttpClient);
  private toast = inject(ToastService); // Reusing your toast service!
  private readonly API = 'http://localhost:3000/filieres';

  // Signals for state management
  filieres = signal<Filiere[]>([]);
  loading = signal<boolean>(false);

  // Read
  loadAll(): void {
    this.loading.set(true);
    this.http.get<Filiere[]>(this.API).subscribe({
      next: (data) => {
        this.filieres.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.toast.error('Erreur lors du chargement des filières');
        this.loading.set(false);
      }
    });
  }

  // Create
  create(filiere: Omit<Filiere, 'id'>): void {
    this.http.post<Filiere>(this.API, filiere).subscribe({
      next: (newFiliere) => {
        this.filieres.update(filieres => [...filieres, newFiliere]);
        this.toast.success('Filière ajoutée avec succès');
      },
      error: () => this.toast.error('Erreur lors de la création')
    });
  }

  // Update
  update(id: number, filiere: Partial<Filiere>): void {
    this.http.patch<Filiere>(`${this.API}/${id}`, filiere).subscribe({
      next: (updatedFiliere) => {
        this.filieres.update(filieres =>
          filieres.map(f => f.id === id ? { ...f, ...updatedFiliere } : f)
        );
        this.toast.success('Filière mise à jour');
      },
      error: () => this.toast.error('Erreur lors de la mise à jour')
    });
  }

  // Delete
  delete(id: number): void {
    this.http.delete(`${this.API}/${id}`).subscribe({
      next: () => {
        this.filieres.update(filieres => filieres.filter(f => f.id !== id));
        this.toast.success('Filière supprimée');
      },
      error: () => this.toast.error('Erreur lors de la suppression')
    });
  }
}
