import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsQualificationsComponent } from './trainings-qualifications.component';

describe('TrainingsQualificationsComponent', () => {
  let component: TrainingsQualificationsComponent;
  let fixture: ComponentFixture<TrainingsQualificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingsQualificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingsQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
