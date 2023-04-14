import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPageJobsComponent } from './full-page-jobs.component';

describe('FullPageJobsComponent', () => {
  let component: FullPageJobsComponent;
  let fixture: ComponentFixture<FullPageJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullPageJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullPageJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
