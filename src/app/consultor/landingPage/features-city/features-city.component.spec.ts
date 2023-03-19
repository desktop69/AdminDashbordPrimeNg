import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesCityComponent } from './features-city.component';

describe('FeaturesCityComponent', () => {
  let component: FeaturesCityComponent;
  let fixture: ComponentFixture<FeaturesCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesCityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
