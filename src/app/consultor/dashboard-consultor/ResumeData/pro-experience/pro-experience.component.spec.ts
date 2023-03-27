import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProExperienceComponent } from './pro-experience.component';

describe('ProExperienceComponent', () => {
  let component: ProExperienceComponent;
  let fixture: ComponentFixture<ProExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
