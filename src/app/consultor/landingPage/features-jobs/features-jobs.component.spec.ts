import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesJobsComponent } from './features-jobs.component';

describe('FeaturesJobsComponent', () => {
  let component: FeaturesJobsComponent;
  let fixture: ComponentFixture<FeaturesJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
