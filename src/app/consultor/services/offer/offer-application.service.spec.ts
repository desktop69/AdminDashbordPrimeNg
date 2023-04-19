import { TestBed } from '@angular/core/testing';

import { OfferApplicationService } from './offer-application.service';

describe('OfferApplicationService', () => {
  let service: OfferApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
