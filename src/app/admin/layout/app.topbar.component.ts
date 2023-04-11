import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { ImageService } from 'src/app/consultor/services/image.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImageDTO } from 'src/app/consultor/models/image.model';
import { OfferFormDataService } from 'src/app/consultor/services/offer/shared/offer-form-data.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.css']
})
export class AppTopBarComponent {
    @ViewChild('topbarmenu') topBarMenu!: ElementRef;
    profileOptions!: SelectItem[];
    selectedProfileOption: any;
    appendToProfileDropdown: any;
    items!: MenuItem[];
    image!: ImageDTO;
    selectedFile: File | null = null;


    //toggle
    isUserMenuActive = false;
    isUserNotificationMenuActive=false;
    isUseremailActive=false;


    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService ,private imageService :ImageService, public authService :AuthService) {  
     }

      ngOnInit() {
        this.loadUserDataAndImage()
      }

      toggleUserMenu(): void {
        this.isUserMenuActive = !this.isUserMenuActive;
      }
      
    
      toggleUserMenunot(): void {
        this.isUserNotificationMenuActive = !this.isUserNotificationMenuActive;
      }
    
      toggleUserEmail(): void {
        this.isUseremailActive = !this.isUseremailActive;
      }

    
      loadUserDataAndImage(): void {
        const loggedInUserId = this.authService.getLoggedInUserId();
        if (!loggedInUserId) {
          console.error('No logged-in user found');
          return;
        }
        this.imageService.loadImageByUserId(loggedInUserId).subscribe((data) => {
          this.image = data;
          console.log('Image loaded',this.image)
        },
          (error) => {
            console.error('Error loading image:', error);
          });
      }
    
    
    
      onLogout() {
        this.authService.logout();
    
      }
      

}
