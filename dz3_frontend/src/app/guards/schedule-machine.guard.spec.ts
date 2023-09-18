import { TestBed } from '@angular/core/testing';

import { ScheduleMachineGuard } from './schedule-machine.guard';

describe('ScheduleMachineGuard', () => {
  let guard: ScheduleMachineGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ScheduleMachineGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
