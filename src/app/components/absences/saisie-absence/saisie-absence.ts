import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeanceService } from '../../../services/seance';
import { EtudiantService } from '../../../services/etudiant';
import { AbsenceService } from '../../../services/absence';

@Component({
  selector: 'app-saisie-absence',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './saisie-absence.html',
  styleUrl: './saisie-absence.css'
})
export class SaisieAbsence implements OnInit {
  seanceService = inject(SeanceService);
  etudiantService = inject(EtudiantService);
  absenceService = inject(AbsenceService);

  selectedSeanceId = signal<number | ''>('');

  // We use a Set to keep track of which student IDs have been checked
  absentStudentIds = new Set<number>();

  ngOnInit(): void {
    this.seanceService.loadAll();
    this.etudiantService.loadAll();
  }

  toggleAbsence(etudiantId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.absentStudentIds.add(etudiantId);
    } else {
      this.absentStudentIds.delete(etudiantId);
    }
  }

  onSubmit(): void {
    if (!this.selectedSeanceId()) {
      alert("Veuillez sélectionner une séance.");
      return;
    }

    // Convert the Set to an array and send it to the service
    this.absenceService.enregistrerAbsences(
      Number(this.selectedSeanceId()),
      Array.from(this.absentStudentIds)
    );

    // Clear checkboxes after submission
    this.absentStudentIds.clear();
    this.selectedSeanceId.set('');
  }
}
