import { Injectable, inject, signal } from '@angular/core'; // ← Don't forget to add signal here!
import { HttpClient } from '@angular/common/http';
import { Absence } from '../models/absence';
import { ToastService } from './toast';
import { forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AbsenceService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private readonly API = 'http://localhost:3000/absences';

  // 1. ADDED: State management for the history page
  absences = signal<Absence[]>([]);

  // Your existing method for Phase 5
  enregistrerAbsences(seanceId: number, etudiantIds: number[]): void {
    if (etudiantIds.length === 0) {
      this.toast.info('Aucune absence à enregistrer.');
      return;
    }

    const requests = etudiantIds.map(etuId => {
      const newAbsence: Omit<Absence, 'id'> = {
        seanceId: seanceId,
        etudiantId: etuId,
        justifiee: false
      };
      return this.http.post<Absence>(this.API, newAbsence);
    });

    forkJoin(requests).subscribe({
      next: () => this.toast.success(`${etudiantIds.length} absence(s) enregistrée(s) avec succès !`),
      error: () => this.toast.error('Erreur lors de l\'enregistrement des absences.')
    });
  }

  // 2. ADDED: Method to fetch all absences for Phase 6
  loadAll(): void {
    this.http.get<Absence[]>(this.API).subscribe({
      next: (data) => this.absences.set(data),
      error: () => this.toast.error('Erreur lors du chargement de l\'historique')
    });
  }

  // 3. ADDED: Method to justify a specific absence for Phase 6
  justifier(id: number, motif: string): void {
    const today = new Date().toISOString().split('T')[0];
    const payload = { justifiee: true, motif: motif, dateJustification: today };

    this.http.patch<Absence>(`${this.API}/${id}`, payload).subscribe({
      next: (updatedAbsence) => {
        // Update the signal locally so the UI refreshes instantly
        this.absences.update(list => list.map(a => a.id === id ? { ...a, ...updatedAbsence } : a));
        this.toast.success('Absence justifiée avec succès');
      },
      error: () => this.toast.error('Erreur lors de la justification')
    });
  }
}
