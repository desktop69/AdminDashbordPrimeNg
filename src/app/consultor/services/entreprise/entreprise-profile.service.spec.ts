import { TestBed } from '@angular/core/testing';

import { EntrepriseProfileService } from './entreprise-profile.service';

describe('EntrepriseProfileService', () => {
  let service: EntrepriseProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrepriseProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
