import { TestBed } from '@angular/core/testing';

import { Permis } from './permis';

describe('Permis', () => {
  let service: Permis;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Permis);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
