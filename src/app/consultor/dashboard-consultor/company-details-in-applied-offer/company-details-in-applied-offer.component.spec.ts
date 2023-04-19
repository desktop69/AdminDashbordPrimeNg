import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailsInAppliedOfferComponent } from './company-details-in-applied-offer.component';

describe('CompanyDetailsInAppliedOfferComponent', () => {
  let component: CompanyDetailsInAppliedOfferComponent;
  let fixture: ComponentFixture<CompanyDetailsInAppliedOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDetailsInAppliedOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDetailsInAppliedOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
