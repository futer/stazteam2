import { TestBed } from '@angular/core/testing';

import { AuthorizationDataService } from './authorization-data.service';

describe('AuthorizationDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizationDataService = TestBed.get(AuthorizationDataService);
    expect(service).toBeTruthy();
  });
});
