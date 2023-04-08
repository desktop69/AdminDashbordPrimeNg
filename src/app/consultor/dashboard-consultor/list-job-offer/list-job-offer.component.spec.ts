import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJobOfferComponent } from './list-job-offer.component';

describe('ListJobOfferComponent', () => {
  let component: ListJobOfferComponent;
  let fixture: ComponentFixture<ListJobOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListJobOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListJobOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
