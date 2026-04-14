import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisieAbsence } from './saisie-absence';

describe('SaisieAbsence', () => {
  let component: SaisieAbsence;
  let fixture: ComponentFixture<SaisieAbsence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaisieAbsence],
    }).compileComponents();

    fixture = TestBed.createComponent(SaisieAbsence);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
