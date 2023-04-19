import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedOffersConsultantComponent } from './applied-offers-consultant.component';

describe('AppliedOffersConsultantComponent', () => {
  let component: AppliedOffersConsultantComponent;
  let fixture: ComponentFixture<AppliedOffersConsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedOffersConsultantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppliedOffersConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
