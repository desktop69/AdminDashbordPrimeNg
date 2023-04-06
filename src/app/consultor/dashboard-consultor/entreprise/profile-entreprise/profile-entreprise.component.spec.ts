import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEntrepriseComponent } from './profile-entreprise.component';

describe('ProfileEntrepriseComponent', () => {
  let component: ProfileEntrepriseComponent;
  let fixture: ComponentFixture<ProfileEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEntrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
