import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleService } from '../../../services/module';
import { SemestreService } from '../../../services/semestre';

@Component({
  selector: 'app-module-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './module-list.html',
  styleUrl: './module-list.css'
})
export class ModuleList implements OnInit {
  moduleService = inject(ModuleService);
  semestreService = inject(SemestreService);

  ngOnInit(): void {
    this.moduleService.loadAll();
    this.semestreService.loadAll();
  }

  getSemestreNom(id: number): string {
    const sem = this.semestreService.semestres().find(s => s.id === id);
    return sem ? sem.nom : 'Inconnu';
  }
}
