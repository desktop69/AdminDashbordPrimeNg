import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOfferDetailsComponent } from './admin-offer-details.component';

describe('AdminOfferDetailsComponent', () => {
  let component: AdminOfferDetailsComponent;
  let fixture: ComponentFixture<AdminOfferDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOfferDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
