import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DialogComponent } from './consultor/landingPage/dialog/dialog.component';
import { DashbordIndexComponent } from './consultor/Dashbord/dashbord-index/dashbord-index.component';
import { ConsultorComponent } from './consultor/consultor.component';
import { TableComponent } from './admin/table/table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './admin/layout/app.layout.component';
import { AppComponent } from './app.component';
import { ResumeComponent } from './consultor/Dashbord/ResumeData/resume/resume.component';
import { SettingsComponent } from './consultor/Dashbord/settings/settings.component';
import { IndexHomeComponent } from './consultor/landingPage/index-home/index-home.component';

const routes: Routes = [
  { path: "", redirectTo: "consultor", pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'admin', component: AppLayoutComponent,
    children: [
      { path: 'dashboardadmin', component: TableComponent },


    ]
  },
  {
    path: 'consultor', component: IndexHomeComponent,

    children: [

      { path: 'Settings', component: SettingsComponent },
      { path: 'register', component: DialogComponent },




    ]
  },
  {
    path: 'dashboardConsultor', component: DashbordIndexComponent,
    children: [
      { path: 'Resume', component: ResumeComponent },
      { path: 'Settings', component: SettingsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
