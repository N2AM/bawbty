import { TestBed } from '@angular/core/testing';

import { CheckVersionsService } from './check-versions.service';

describe('CheckVersionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckVersionsService = TestBed.get(CheckVersionsService);
    expect(service).toBeTruthy();
  });
});
