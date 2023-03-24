import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardConsultorComponent } from './dashboard-consultor.component';
import { DashbordHeaderComponent } from './dashbord-header/dashbord-header.component';
import { DashbordIndexComponent } from './dashbord-index/dashbord-index.component';
import { DashbordSideBarComponent } from './dashbord-side-bar/dashbord-side-bar.component';
import { LanguageComponent } from './ResumeData/language/language.component';
import { ProfessionalDataComponent } from './ResumeData/professional-data/professional-data.component';
import { ResumeComponent } from './ResumeData/resume/resume.component';
import { TrainingsQualificationsComponent } from './ResumeData/trainings-qualifications/trainings-qualifications.component';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule } from '@angular/router';
import { DashboardConsultorFooterComponent } from './dashboard-consultor-footer/dashboard-consultor-footer.component';
import { ImageComponent } from './image/image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilesComponent } from './files/files.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { PersonalDataComponent } from './ResumeData/personal-data/personal-data.component';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';


@NgModule({
  declarations: [
    DashboardConsultorComponent,
    DashbordIndexComponent,
    ResumeComponent,
    DashbordHeaderComponent,
    DashbordSideBarComponent,
    SettingsComponent,
    ProfessionalDataComponent,
    TrainingsQualificationsComponent,
    LanguageComponent,
    DashboardConsultorFooterComponent,
    ImageComponent,
    
    FilesComponent,
         PersonalDataComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    SelectButtonModule,
    ButtonModule,
    ToastModule,
    MessagesModule,
    RadioButtonModule
    
  ]
})
export class DashboardConsultorModule { }
