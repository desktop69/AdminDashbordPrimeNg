import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardConsultorFooterComponent } from './dashboard-consultor-footer.component';

describe('DashboardConsultorFooterComponent', () => {
  let component: DashboardConsultorFooterComponent;
  let fixture: ComponentFixture<DashboardConsultorFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardConsultorFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardConsultorFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
