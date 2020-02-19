import { TestBed } from '@angular/core/testing';

import { PolicyholdersService } from './policyholders.service';

describe('PolicyholdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolicyholdersService = TestBed.get(PolicyholdersService);
    expect(service).toBeTruthy();
  });
});
