import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 1. ADD THIS IMPORT
import { EtudiantService } from '../../../services/etudiant';
import { FiliereService } from '../../../services/filiere';
import { SemestreService } from '../../../services/semestre';
import { RouterModule } from '@angular/router'; // Add this at the top

@Component({
  selector: 'app-etudiant-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ← add RouterModule
  templateUrl: './etudiant-list.html',
  styleUrl: './etudiant-list.css'
})
export class EtudiantList implements OnInit {
  etudiantService = inject(EtudiantService);
  filiereService = inject(FiliereService);
  semestreService = inject(SemestreService);

  // User Selections (Signals)
  selectedFiliereId = signal<number | ''>('');
  selectedSemestreId = signal<number | ''>('');
  selectedGroupe = signal<string>('');

  ngOnInit(): void {
    // Load all data into signals on init
    this.filiereService.loadAll();
    this.semestreService.loadAll();
    this.etudiantService.loadAll();
  }

  // Handle cascading resets
  onFiliereChange() {
    this.selectedSemestreId.set('');
    this.selectedGroupe.set('');
  }

  onSemestreChange() {
    this.selectedGroupe.set('');
  }

  // ─── COMPUTED SIGNALS FOR FILTERS ──────────────────────────────

  // 1. Filter Semesters based on selected Filière
  availableSemestres = computed(() => {
    const fId = Number(this.selectedFiliereId());
    if (!fId) return [];
    return this.semestreService.semestres().filter(s => s.filiereId === fId);
  });

  // 2. Extract unique Groupes based on selected Semester
  availableGroupes = computed(() => {
    const sId = Number(this.selectedSemestreId());
    if (!sId) return [];
    const studentsInSem = this.etudiantService.etudiants().filter(e => e.semestreId === sId);
    // Use Set to get unique group names
    return [...new Set(studentsInSem.map(e => e.groupe))].sort();
  });

  // 3. Final Student Table Filter
  filteredEtudiants = computed(() => {
    let list = this.etudiantService.etudiants();
    const fId = Number(this.selectedFiliereId());
    const sId = Number(this.selectedSemestreId());
    const grp = this.selectedGroupe();

    if (fId) list = list.filter(e => e.filiereId === fId);
    if (sId) list = list.filter(e => e.semestreId === sId);
    if (grp) list = list.filter(e => e.groupe === grp);

    return list;
  });
}
