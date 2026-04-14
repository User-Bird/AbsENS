import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiliereService } from '../../../services/filiere';
import { Cycle, Filiere } from '../../../models/filiere';

@Component({
  selector: 'app-filiere-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filiere-list.html',
  styleUrl: './filiere-list.css'
})
export class FiliereList implements OnInit {
  filiereService = inject(FiliereService);

  // State for the creation form
  newFiliere: Omit<Filiere, 'id'> = {
    nom: '',
    code: '',
    cycle: 'licence'
  };

  cycles: Cycle[] = ['licence', 'master', 'qualification'];

  ngOnInit(): void {
    this.filiereService.loadAll();
  }

  onSubmit(): void {
    if (!this.newFiliere.nom || !this.newFiliere.code) return;

    // Calculate the next ID numerically to bypass json-server's weird UUIDs
    const currentFilieres = this.filiereService.filieres();
    const maxId = currentFilieres.length > 0
      ? Math.max(...currentFilieres.map(f => Number(f.id) || 0))
      : 0;

    const payload = { ...this.newFiliere, id: (maxId + 1).toString() };

    this.filiereService.create(payload as any);

    // Reset form
    this.newFiliere = { nom: '', code: '', cycle: 'licence' };
  }

  delete(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette filière ?')) {
      this.filiereService.delete(id);
    }
  }
}
