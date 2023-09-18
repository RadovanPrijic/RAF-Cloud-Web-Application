import { TestBed } from '@angular/core/testing';

import { GetUsersGuard } from './get-users.guard';

describe('GetUsersGuard', () => {
  let guard: GetUsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GetUsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
