import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImageDTO } from '../../models/image.model';
import { ImageService } from '../../services/image.service';
import { OfferFormDataService } from '../../services/offer/shared/offer-form-data.service';
import { WebSocketService } from '../../services/web-socket.service';
import { Notificationobjects } from '../../models/notification.model';

@Component({
  selector: 'app-dashbord-header',
  templateUrl: './dashbord-header.component.html',
  styleUrls: ['./dashbord-header.component.scss']
})
export class DashbordHeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router,
    private imageService: ImageService,
    private offerFormDataService: OfferFormDataService,
    private notificationService: WebSocketService) { }

  image!: ImageDTO;
  selectedFile: File | null = null;
  isUserMenuActive = false;
  isUserNotificationMenuActive = false;
  isUseremailActive = false;
  //
  notifications: Notificationobjects[] = [];
  toggleUserMenu(): void {
    this.isUserMenuActive = !this.isUserMenuActive;
  }


  toggleUserMenunot(): void {
    this.isUserNotificationMenuActive = !this.isUserNotificationMenuActive;
  }

  toggleUserEmail(): void {
    this.isUseremailActive = !this.isUseremailActive;
  }

  ngOnInit(): void {

    this.loadUserDataAndImage();
   // this.loeadnewNotification();
   // this.getAllNotifications();
  }

  loadUserDataAndImage(): void {
    const loggedInUserId = this.authService.getLoggedInUserId();
    if (!loggedInUserId) {
      console.error('No logged-in user found');
      return;
    }
    this.imageService.loadImageByUserId(loggedInUserId).subscribe((data) => {
      this.image = data;
    },
      (error) => {
        console.error('Error loading image:', error);
      });
  }



  onLogout() {
    this.authService.logout();
    this.offerFormDataService.resetFormData();
  }
  //
  loeadnewNotification() {
    const recipientId = this.authService.getLoggedInUserId();
    if(recipientId){
    //  this.notificationService.joinRoom(recipientId);
      this.notificationService.getNotifications().subscribe(data => {
        this.notifications.unshift(data);
      });
    } else{ 
      console.log("user is is null");
    }

  }
  getAllNotifications() {
    this.notificationService.getAllNotifications().subscribe((data) => {
      console.log(data);
      this.notifications = data;
    });
  }
}
