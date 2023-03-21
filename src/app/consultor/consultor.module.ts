import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultorComponent } from './consultor.component';
import { IndexHomeComponent } from './landingPage/index-home/index-home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { DashbordHeaderComponent } from './Dashbord/dashbord-header/dashbord-header.component';
import { DashbordIndexComponent } from './Dashbord/dashbord-index/dashbord-index.component';
import { DashbordSideBarComponent } from './Dashbord/dashbord-side-bar/dashbord-side-bar.component';
import { LanguageComponent } from './Dashbord/ResumeData/language/language.component';
import { ProfessionalDataComponent } from './Dashbord/ResumeData/professional-data/professional-data.component';
import { ResumeComponent } from './Dashbord/ResumeData/resume/resume.component';
import { TrainingsQualificationsComponent } from './Dashbord/ResumeData/trainings-qualifications/trainings-qualifications.component';
import { SettingsComponent } from './Dashbord/settings/settings.component';
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
import { RegisterDTO } from '../auth/models/register.model';





@NgModule({
  declarations: [
    ConsultorComponent,
    IndexHomeComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ContentComponent,
    FeaturesJobsComponent,
    FeaturesCityComponent,
    HighestFreelancerComponent,
    MembershipPlansComponent,
    DashbordIndexComponent,
    ResumeComponent,
    DashbordHeaderComponent,
    DashbordSideBarComponent,
    LoginComponent,
    SettingsComponent,
    ProfessionalDataComponent,
    TrainingsQualificationsComponent,
    LanguageComponent,
    DialogComponent,
    RegisterComponent,





  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]

})
export class ConsultorModule { }
