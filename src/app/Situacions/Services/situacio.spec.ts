import { TestBed } from '@angular/core/testing';

import { Situacio } from './situacio';

describe('Situacio', () => {
  let service: Situacio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Situacio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
