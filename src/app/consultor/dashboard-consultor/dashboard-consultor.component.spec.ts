import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardConsultorComponent } from './dashboard-consultor.component';

describe('DashboardConsultorComponent', () => {
  let component: DashboardConsultorComponent;
  let fixture: ComponentFixture<DashboardConsultorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardConsultorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardConsultorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
