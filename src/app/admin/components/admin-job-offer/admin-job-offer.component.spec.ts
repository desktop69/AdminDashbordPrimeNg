import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobOfferComponent } from './admin-job-offer.component';

describe('AdminJobOfferComponent', () => {
  let component: AdminJobOfferComponent;
  let fixture: ComponentFixture<AdminJobOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJobOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJobOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
