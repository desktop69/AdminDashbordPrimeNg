import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestFreelancerComponent } from './highest-freelancer.component';

describe('HighestFreelancerComponent', () => {
  let component: HighestFreelancerComponent;
  let fixture: ComponentFixture<HighestFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighestFreelancerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighestFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
