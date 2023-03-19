import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordHeaderComponent } from './dashbord-header.component';

describe('DashbordHeaderComponent', () => {
  let component: DashbordHeaderComponent;
  let fixture: ComponentFixture<DashbordHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
