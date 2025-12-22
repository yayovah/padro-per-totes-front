import { TestBed } from '@angular/core/testing';

import { Resposta } from './resposta';

describe('Resposta', () => {
  let service: Resposta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Resposta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
