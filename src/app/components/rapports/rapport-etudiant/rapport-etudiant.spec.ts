import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportEtudiant } from './rapport-etudiant';

describe('RapportEtudiant', () => {
  let component: RapportEtudiant;
  let fixture: ComponentFixture<RapportEtudiant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapportEtudiant],
    }).compileComponents();

    fixture = TestBed.createComponent(RapportEtudiant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
