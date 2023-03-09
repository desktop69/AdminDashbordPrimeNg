import { ConsultorComponent } from './consultor/consultor.component';
import { TableComponent } from './admin/table/table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './admin/layout/app.layout.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'admin', component: AppLayoutComponent,
    children: [
      { path: 'dashboard', component: TableComponent },
 

    ]
  },
  {
    path: 'consultor', component: ConsultorComponent,
    children: [
      { path: '', component: TableComponent },
  

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
