import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Absence } from '../models/absence';
import { ToastService } from './toast';
import { forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AbsenceService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private readonly API = 'http://localhost:3000/absences';

  // We use forkJoin to send multiple POST requests at once for each absent student
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
}
