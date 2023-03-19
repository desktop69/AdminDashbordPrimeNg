import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordSideBarComponent } from './dashbord-side-bar.component';

describe('DashbordSideBarComponent', () => {
  let component: DashbordSideBarComponent;
  let fixture: ComponentFixture<DashbordSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
