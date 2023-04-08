import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobOfferComponent } from './edit-job-offer.component';

describe('EditJobOfferComponent', () => {
  let component: EditJobOfferComponent;
  let fixture: ComponentFixture<EditJobOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJobOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditJobOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
