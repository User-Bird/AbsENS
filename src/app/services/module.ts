import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Module } from '../models/module';

@Injectable({ providedIn: 'root' })
export class ModuleService {
  private http = inject(HttpClient);
  private readonly API = 'http://localhost:3000/modules';

  modules = signal<Module[]>([]);

  loadAll(): void {
    this.http.get<Module[]>(this.API).subscribe({
      next: (data) => this.modules.set(data),
      error: (err) => console.error('Erreur chargement modules', err)
    });
  }
}
