import { TestBed } from '@angular/core/testing';

import { Semestre } from './semestre';

describe('Semestre', () => {
  let service: Semestre;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Semestre);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
