import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AbsenceService } from '../../../services/absence';
import { EtudiantService } from '../../../services/etudiant';
import { SeanceService } from '../../../services/seance';

@Component({
  selector: 'app-absence-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './absence-list.html',
  styleUrl: './absence-list.css'
})
export class AbsenceList implements OnInit {
  absenceService = inject(AbsenceService);
  etudiantService = inject(EtudiantService);
  seanceService = inject(SeanceService);

  // Filters
  filterJustifiee = signal<string>('all'); // 'all', 'yes', 'no'

  ngOnInit(): void {
    this.absenceService.loadAll();
    this.etudiantService.loadAll();
    this.seanceService.loadAll();
  }

  // Combine the data from the 3 tables
  absencesDetaillees = computed(() => {
    let rawAbsences = this.absenceService.absences();
    const filter = this.filterJustifiee();

    // Apply Filter
    if (filter === 'yes') rawAbsences = rawAbsences.filter(a => a.justifiee);
    if (filter === 'no') rawAbsences = rawAbsences.filter(a => !a.justifiee);

    // Map relationships
    return rawAbsences.map(absence => {
      const etudiant = this.etudiantService.etudiants().find(e => e.id === absence.etudiantId);
      const seance = this.seanceService.seances().find(s => s.id === absence.seanceId);
      return { ...absence, etudiant, seance };
    }).sort((a, b) => {
      // Sort by date descending (newest first)
      const dateA = a.seance?.date || '';
      const dateB = b.seance?.date || '';
      return dateB.localeCompare(dateA);
    });
  });

  onJustifier(absenceId: number): void {
    const motif = prompt('Veuillez saisir le motif de justification (ex: Certificat médical) :');
    if (motif && motif.trim().length > 0) {
      this.absenceService.justifier(absenceId, motif);
    }
  }
}
