import { ImageComponent } from './consultor/dashboard-consultor/image/image.component';
import { DashbordIndexComponent } from './consultor/dashboard-consultor/dashbord-index/dashbord-index.component';
import { FeaturesJobsComponent } from './consultor/landingPage/features-jobs/features-jobs.component';
import { DashboardConsultorComponent } from './consultor/dashboard-consultor/dashboard-consultor.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DialogComponent } from './consultor/landingPage/dialog/dialog.component';

import { ConsultorComponent } from './consultor/consultor.component';
import { TableComponent } from './admin/table/table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './admin/layout/app.layout.component';
import { AppComponent } from './app.component';

import { IndexHomeComponent } from './consultor/landingPage/index-home/index-home.component';
import { ResumeComponent } from './consultor/dashboard-consultor/ResumeData/resume/resume.component';
import { SettingsComponent } from './consultor/dashboard-consultor/settings/settings.component';
import { FilesComponent } from './consultor/dashboard-consultor/files/files.component';

const routes: Routes = [
  { path: "", redirectTo: "consultor", pathMatch: "full" },
  {
    path: 'admin', component: AppLayoutComponent,
    children: [
      { path: 'dashboardadmin', component: TableComponent },


    ]
  },
  {
    path: 'consultor', component: IndexHomeComponent
  },
  {
    path: 'dashboardConsultor', component: DashboardConsultorComponent,
    children: [
      { path: 'statistics', component: DashbordIndexComponent },
      { path: 'Resume', component: ResumeComponent },
      { path: 'Settings', component: SettingsComponent },
      { path: 'jobs', component: FeaturesJobsComponent },
      { path: 'image', component: ImageComponent },
      { path: 'file', component: FilesComponent }

    ]
  },

  {
    path: 'entreprise', component: EntrepriseComponent,
    children: [

    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
