import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './layout/app.layout.component';
const routes: Routes = [
  {
    path: '', component : AppLayoutComponent,
    children: [
      { path: '', component: AppComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
