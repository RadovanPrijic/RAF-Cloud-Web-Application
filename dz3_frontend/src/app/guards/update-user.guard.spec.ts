import { TestBed } from '@angular/core/testing';

import { UpdateUserGuard } from './update-user.guard';

describe('UpdateUserGuard', () => {
  let guard: UpdateUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UpdateUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
