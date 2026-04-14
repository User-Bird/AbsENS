import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereList } from './filiere-list';

describe('FiliereList', () => {
  let component: FiliereList;
  let fixture: ComponentFixture<FiliereList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiliereList],
    }).compileComponents();

    fixture = TestBed.createComponent(FiliereList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
