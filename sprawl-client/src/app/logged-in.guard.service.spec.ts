import { TestBed } from '@angular/core/testing';

import { LoggedInGuardService } from './logged-in.guard.service';

describe('LoggedIn.GuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggedIn.GuardService = TestBed.get(LoggedIn.GuardService);
    expect(service).toBeTruthy();
  });
});
