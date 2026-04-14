import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantList } from './etudiant-list';

describe('EtudiantList', () => {
  let component: EtudiantList;
  let fixture: ComponentFixture<EtudiantList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantList],
    }).compileComponents();

    fixture = TestBed.createComponent(EtudiantList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
