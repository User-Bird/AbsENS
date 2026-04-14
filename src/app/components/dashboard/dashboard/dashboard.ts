import { Component, OnInit, inject, computed, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtudiantService } from '../../../services/etudiant';
import { AbsenceService } from '../../../services/absence';
import { SeanceService } from '../../../services/seance';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  etudiantService = inject(EtudiantService);
  absenceService = inject(AbsenceService);
  seanceService = inject(SeanceService);

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart: any;

  // ─── 1. COMPUTED KPIs ──────────────────────────────────────
  totalEtudiants = computed(() => this.etudiantService.etudiants().length);
  totalSeances = computed(() => this.seanceService.seances().length);
  totalAbsences = computed(() => this.absenceService.absences().length);

  absencesNonJustifiees = computed(() =>
    this.absenceService.absences().filter(a => !a.justifiee).length
  );

  constructor() {
    // ─── 2. REACTIVE CHART DRAWING ───────────────────────────
    // The effect() hook runs automatically whenever the signals it reads change.
    effect(() => {
      const absences = this.absenceService.absences();
      // Wait for data to load before drawing
      if (absences.length > 0) {
        // Slight delay to ensure the ViewChild canvas is rendered in the DOM
        setTimeout(() => this.renderChart(), 0);
      }
    });
  }

  ngOnInit(): void {
    // Fetch all data required for the dashboard
    this.etudiantService.loadAll();
    this.absenceService.loadAll();
    this.seanceService.loadAll();
  }

  // ─── 3. CHART.JS LOGIC ─────────────────────────────────────
  renderChart() {
    if (this.chart) this.chart.destroy(); // Destroy previous chart if it exists
    if (!this.chartCanvas) return;

    const justifiees = this.totalAbsences() - this.absencesNonJustifiees();
    const nonJustifiees = this.absencesNonJustifiees();

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Absences Justifiées', 'Absences Non Justifiées'],
        datasets: [{
          data: [justifiees, nonJustifiees],
          backgroundColor: ['#10b981', '#ef4444'], // Green and Red
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}
