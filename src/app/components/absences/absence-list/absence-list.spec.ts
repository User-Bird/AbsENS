import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceList } from './absence-list';

describe('AbsenceList', () => {
  let component: AbsenceList;
  let fixture: ComponentFixture<AbsenceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenceList],
    }).compileComponents();

    fixture = TestBed.createComponent(AbsenceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
