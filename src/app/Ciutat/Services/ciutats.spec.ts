import { TestBed } from '@angular/core/testing';

import { Ciutats } from './ciutats';

describe('Ciutats', () => {
  let service: Ciutats;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ciutats);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
