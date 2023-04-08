import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobOfferComponent } from './view-job-offer.component';

describe('ViewJobOfferComponent', () => {
  let component: ViewJobOfferComponent;
  let fixture: ComponentFixture<ViewJobOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJobOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJobOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
