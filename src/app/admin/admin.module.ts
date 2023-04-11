import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
// table imports
import { TableModule } from 'primeng/table';
import { TableComponent } from './table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { SidebarModule } from 'primeng/sidebar';

//material imports 
// template imports 
import { AppLayoutModule } from './layout/app.layout.module';
import { AppComponent } from '../app.component';
import { CategorylayoutComponent } from './components/categorylayout/categorylayout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { UserslayoutComponent } from './components/userslayout/userslayout.component';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AdminJobOfferComponent } from './components/admin-job-offer/admin-job-offer.component';
import { AdminResetPasswordComponent } from './components/admin-reset-password/admin-reset-password.component';
import { SharedService } from '../consultor/dashboard-consultor/entreprise/shared/shared';
import { AdminOfferDetailsComponent } from './components/admin-offer-details/admin-offer-details.component';


@NgModule({
  declarations: [
    TableComponent,
    CategorylayoutComponent,
    ProfileComponent,
    AddCategoryComponent,
    UserslayoutComponent,
    AdminJobOfferComponent,
    AdminResetPasswordComponent,
    AdminOfferDetailsComponent,

  ],

  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
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
    ImageModule,
    TagModule,
    CardModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
    TreeTableModule,
    ConfirmPopupModule,
    DividerModule,
    InputSwitchModule,
    PasswordModule,
    DropdownModule,
    OverlayPanelModule


  ],
  providers: [ProductService, ConfirmationService, MessageService,SharedService],
  bootstrap: [TableComponent]
})
export class AdminModule { }