import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeJobOfferDetailsComponent } from './home-job-offer-details.component';

describe('HomeJobOfferDetailsComponent', () => {
  let component: HomeJobOfferDetailsComponent;
  let fixture: ComponentFixture<HomeJobOfferDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeJobOfferDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeJobOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
