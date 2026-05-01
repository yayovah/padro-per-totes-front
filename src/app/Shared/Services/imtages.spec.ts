import { TestBed } from '@angular/core/testing';

import { Imtages } from './imtages';

describe('Imtages', () => {
  let service: Imtages;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Imtages);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
