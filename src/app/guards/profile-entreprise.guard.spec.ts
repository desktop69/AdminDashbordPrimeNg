import { TestBed } from '@angular/core/testing';

import { ProfileEntrepriseGuard } from './profile-entreprise.guard';

describe('ProfileEntrepriseGuard', () => {
  let guard: ProfileEntrepriseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfileEntrepriseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
