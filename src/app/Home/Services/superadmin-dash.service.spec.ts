import { TestBed } from '@angular/core/testing';

import { SuperadminDashService } from './superadmin-dash.service';

describe('SuperadminDashService', () => {
  let service: SuperadminDashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperadminDashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
