import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPlaceComponent } from './offer-place.component';

describe('OfferPlaceComponent', () => {
  let component: OfferPlaceComponent;
  let fixture: ComponentFixture<OfferPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
