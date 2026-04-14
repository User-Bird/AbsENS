import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EtudiantService } from '../../../services/etudiant';
import { AbsenceService } from '../../../services/absence';
import { SeanceService } from '../../../services/seance';

@Component({
  selector: 'app-rapport-etudiant',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rapport-etudiant.html',
  styleUrl: './rapport-etudiant.css'
})
export class RapportEtudiant implements OnInit {
  route = inject(ActivatedRoute);
  etudiantService = inject(EtudiantService);
  absenceService = inject(AbsenceService);
  seanceService = inject(SeanceService);

  etudiantId = signal<string>(''); // Changed to string
  currentDate = new Date();

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Keep it as a string to match json-server safely
      this.etudiantId.set(params.get('id') || '');
    });

    this.etudiantService.loadAll();
    this.absenceService.loadAll();
    this.seanceService.loadAll();
  }

  // ─── SAFE COMPUTED SIGNALS ─────────────────────────────────

  etudiant = computed(() => {
    // Force string comparison!
    return this.etudiantService.etudiants().find(e => String(e.id) === this.etudiantId());
  });

  absences = computed(() => {
    return this.absenceService.absences()
      .filter(a => String(a.etudiantId) === this.etudiantId()) // Force string comparison
      .map(a => {
        const seance = this.seanceService.seances().find(s => String(s.id) === String(a.seanceId));
        return { ...a, seance };
      });
  });

  stats = computed(() => {
    const list = this.absences();
    return {
      total: list.length,
      nonJustifiees: list.filter(a => !a.justifiee).length
    };
  });

  imprimer(): void {
    window.print();
  }
}
