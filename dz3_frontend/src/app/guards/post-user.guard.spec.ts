import { TestBed } from '@angular/core/testing';

import { PostUserGuard } from './post-user.guard';

describe('PostUserGuard', () => {
  let guard: PostUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PostUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
