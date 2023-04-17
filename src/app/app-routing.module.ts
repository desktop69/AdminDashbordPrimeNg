import { CVPlatformeComponent } from './consultor/dashboard-consultor/ResumeData/cvplatforme/cvplatforme.component';

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
import { RequestPasswordResetComponent } from './auth/request-password-reset/request-password-reset.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ProfileEntrepriseComponent } from './consultor/dashboard-consultor/entreprise/profile-entreprise/profile-entreprise.component';

import { AddProfileComponent } from './consultor/dashboard-consultor/entreprise/add-profile/add-profile.component';
import { EditProfileComponent } from './consultor/dashboard-consultor/entreprise/edit-profile/edit-profile.component';
import { ForbiddenComponent } from './consultor/forbidden/forbidden.component';
import { ProfileEntrepriseGuard } from './guards/profile-entreprise.guard';
import { JobOfferComponent } from './consultor/dashboard-consultor/job-offer/job-offer.component';
import { OfferDetailsComponent } from './consultor/dashboard-consultor/job-offer/offer-details/offer-details.component';
import { OfferInfoComponent } from './consultor/dashboard-consultor/job-offer/offer-info/offer-info.component';
import { OfferPlaceComponent } from './consultor/dashboard-consultor/job-offer/offer-place/offer-place.component';
import { OfferSettingsComponent } from './consultor/dashboard-consultor/job-offer/offer-settings/offer-settings.component';
import { OfferConfirmationComponent } from './consultor/dashboard-consultor/job-offer/offer-confirmation/offer-confirmation.component';
import { ListJobOfferComponent } from './consultor/dashboard-consultor/list-job-offer/list-job-offer.component';
import { ViewJobOfferComponent } from './consultor/dashboard-consultor/view-job-offer/view-job-offer.component';
import { EditJobOfferComponent } from './consultor/dashboard-consultor/edit-job-offer/edit-job-offer.component';
import { AddCategoryComponent } from './admin/components/add-category/add-category.component';
import { CategorylayoutComponent } from './admin/components/categorylayout/categorylayout.component';
import { ProfileComponent } from './admin/components/profile/profile.component';
import { UserslayoutComponent } from './admin/components/userslayout/userslayout.component';
import { AdminJobOfferComponent } from './admin/components/admin-job-offer/admin-job-offer.component';
import { AdminOfferDetailsComponent } from './admin/components/admin-offer-details/admin-offer-details.component';
import { NotificationsComponent } from './consultor/notifications/notifications.component';

const routes: Routes = [
  { path: "", redirectTo: "consultor", pathMatch: "full" },
  {
    path: 'admin', component: AppLayoutComponent,
    children: [
      { path: 'table', component: TableComponent },
      { path: 'category', component: CategorylayoutComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'newcategory', component: AddCategoryComponent },
      { path: 'users', component: UserslayoutComponent },
      { path: 'offers', component: AdminJobOfferComponent },
      { path: 'admin-offer-details/:id', component: AdminOfferDetailsComponent },
    


    ]
  },
  {
    path: 'consultor', component: IndexHomeComponent
  },
  {
    path: 'dashboardConsultor', component: DashboardConsultorComponent,
    children: [
      { path: '', redirectTo: 'statistics', pathMatch: 'full' },
      { path: 'statistics', component: DashbordIndexComponent },
      { path: 'Resume', component: ResumeComponent },
      { path: 'Settings', component: SettingsComponent },
      { path: 'jobs', component: FeaturesJobsComponent },
      { path: 'image', component: ImageComponent },
      { path: 'file', component: FilesComponent },
      { path: 'CVplatforme', component: CVPlatformeComponent },
      { path: 'profile-entreprise', component: ProfileEntrepriseComponent, canActivate: [ProfileEntrepriseGuard] },
      { path: 'add-profile', component: AddProfileComponent },
      { path: 'edit-profile/:id', component: EditProfileComponent },
      { path: 'test', component: NotificationsComponent },
      {
        path: 'Job-offer',
        component: JobOfferComponent,
        children: [
          { path: '', redirectTo: 'offer-info', pathMatch: 'full' },
          { path: 'offer-info', component: OfferInfoComponent },
          { path: 'offer-details', component: OfferDetailsComponent },
          { path: 'offer-settings', component: OfferSettingsComponent },
          { path: 'offer-place', component: OfferPlaceComponent },
          { path: 'offer-confirmation', component: OfferConfirmationComponent },
        ],
      },
      { path: 'offer-list', component: ListJobOfferComponent },
      { path: 'view-job-offer/:id', component: ViewJobOfferComponent },
      { path: 'edit-job-offer/:id', component: EditJobOfferComponent },



    ]
  },

  {
    path: 'entreprise', component: EntrepriseComponent,
    children: [

    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'request-password-reset', component: RequestPasswordResetComponent },
  { path: 'password-reset', component: ResetPasswordComponent },
  { path: 'forbidden', component: ForbiddenComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
