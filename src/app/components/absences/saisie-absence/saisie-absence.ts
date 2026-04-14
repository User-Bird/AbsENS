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

  //Signal containing the Set of absent student IDs
  absents = signal<Set<number>>(new Set());

  ngOnInit(): void {
    this.seanceService.loadAll();
    this.etudiantService.loadAll();
  }

  toggleAbsence(etudiantId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.absents.update(set => {
      const newSet = new Set(set);
      isChecked ? newSet.add(etudiantId) : newSet.delete(etudiantId);
      return newSet;
    });
  }

  onSubmit(): void {
    if (!this.selectedSeanceId()) {
      alert("Veuillez sélectionner une séance.");
      return;
    }

    //Read from the signal using this.absents()
    this.absenceService.enregistrerAbsences(
      Number(this.selectedSeanceId()),
      Array.from(this.absents())
    );

    //Reset the signal to a new empty Set
    this.absents.set(new Set());
    this.selectedSeanceId.set('');
  }
}
