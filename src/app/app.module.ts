import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
// table imports
import {TableModule} from 'primeng/table';
import { TableComponent } from './table/table.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ProductService } from './table/product.service';
import { RatingModule } from 'primeng/rating';
// crud table imprts tests
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SidebarComponent } from './sidebar/sidebar.component';
import {SidebarModule} from 'primeng/sidebar';
import { BodyComponent } from './AdminDashbord/body/body.component';
import { SidenavComponent } from './AdminDashbord/sidenav/sidenav.component';
import { DashboardComponent } from './AdminDashbord/dashboard/dashboard.component';
import { ProductsComponent } from './AdminDashbord/products/products.component';
//material imports 
// template imports 
import { AppLayoutModule } from './layout/app.layout.module';




@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SidebarComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    AccordionModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    RatingModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    SidebarModule,
    AppLayoutModule,
    
        
  ],
  providers: [ProductService,ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
