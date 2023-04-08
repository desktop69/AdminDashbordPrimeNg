import { TestBed } from '@angular/core/testing';

import { OfferFormDataService } from './offer-form-data.service';

describe('OfferFormDataService', () => {
  let service: OfferFormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferFormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
