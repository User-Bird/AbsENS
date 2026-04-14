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

  etudiantId = signal<number>(0);
  currentDate = new Date();

  ngOnInit(): void {
    // 1. Grab the ID from the URL
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.etudiantId.set(id);
    });

    // 2. Ensure our data is loaded
    this.etudiantService.loadAll();
    this.absenceService.loadAll();
    this.seanceService.loadAll();
  }

  // ─── COMPUTED SIGNALS ──────────────────────────────────────

  etudiant = computed(() => {
    return this.etudiantService.etudiants().find(e => e.id === this.etudiantId());
  });

  absences = computed(() => {
    const etuId = this.etudiantId();
    return this.absenceService.absences()
      .filter(a => a.etudiantId === etuId)
      .map(a => {
        const seance = this.seanceService.seances().find(s => s.id === a.seanceId);
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

  // ─── PRINT METHOD ──────────────────────────────────────────
  imprimer(): void {
    window.print();
  }
}
