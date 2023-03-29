import { TestBed } from '@angular/core/testing';

import { ProfessionalDataService } from './professional-data.service';

describe('ProfessionalDataService', () => {
  let service: ProfessionalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
