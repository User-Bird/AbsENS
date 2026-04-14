import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantDetail } from './etudiant-detail';

describe('EtudiantDetail', () => {
  let component: EtudiantDetail;
  let fixture: ComponentFixture<EtudiantDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(EtudiantDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
