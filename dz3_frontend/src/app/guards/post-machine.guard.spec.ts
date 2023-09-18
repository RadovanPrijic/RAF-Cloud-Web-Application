import { TestBed } from '@angular/core/testing';

import { PostMachineGuard } from './post-machine.guard';

describe('PostMachineGuard', () => {
  let guard: PostMachineGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PostMachineGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
