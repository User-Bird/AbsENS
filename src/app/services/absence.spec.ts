import { TestBed } from '@angular/core/testing';

import { Absence } from './absence';

describe('Absence', () => {
  let service: Absence;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Absence);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
