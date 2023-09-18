import { TestBed } from '@angular/core/testing';

import { GetMachinesGuard } from './get-machines.guard';

describe('GetMachinesGuard', () => {
  let guard: GetMachinesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GetMachinesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
