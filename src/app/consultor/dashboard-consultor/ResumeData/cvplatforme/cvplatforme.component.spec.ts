import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVPlatformeComponent } from './cvplatforme.component';

describe('CVPlatformeComponent', () => {
  let component: CVPlatformeComponent;
  let fixture: ComponentFixture<CVPlatformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CVPlatformeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CVPlatformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
