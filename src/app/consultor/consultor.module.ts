import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultorComponent } from './consultor.component';
import { IndexHomeComponent } from './landingPage/index-home/index-home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BannerComponent } from './landingPage/banner/banner.component';
import { ContentComponent } from './landingPage/content/content.component';
import { FeaturesCityComponent } from './landingPage/features-city/features-city.component';
import { FeaturesJobsComponent } from './landingPage/features-jobs/features-jobs.component';
import { FooterComponent } from './landingPage/footer/footer.component';
import { HeaderComponent } from './landingPage/header/header.component';
import { HighestFreelancerComponent } from './landingPage/highest-freelancer/highest-freelancer.component';
import { LoginComponent } from '../auth/login/login.component';
import { MembershipPlansComponent } from './landingPage/membership-plans/membership-plans.component';
import { DialogComponent } from './landingPage/dialog/dialog.component';
import { RegisterComponent } from '../auth/register/register.component';
import { HeaderLoggedOutComponent } from './landingPage/header/header-logged-out/header-logged-out.component';
import { HeaderLoggedInComponent } from './landingPage/header/header-logged-in/header-logged-in.component';






@NgModule({
  declarations: [
    ConsultorComponent,
    IndexHomeComponent,
    FooterComponent,
    BannerComponent,
    ContentComponent,
    FeaturesJobsComponent,
    FeaturesCityComponent,
    HighestFreelancerComponent,
    MembershipPlansComponent,
    LoginComponent,
    DialogComponent,
    RegisterComponent,
    HeaderLoggedOutComponent,
    HeaderLoggedInComponent,
    HeaderComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ]

})
export class ConsultorModule { }
