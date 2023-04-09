import { TestBed } from '@angular/core/testing';

import { CategoryEventsService } from './category-events.service';

describe('CategoryEventsService', () => {
  let service: CategoryEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
