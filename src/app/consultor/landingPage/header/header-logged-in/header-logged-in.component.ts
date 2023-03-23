import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImageDTO } from 'src/app/consultor/models/image.model';
import { ImageService } from 'src/app/consultor/services/image.service';

@Component({
  selector: 'app-header-logged-in',
  templateUrl: './header-logged-in.component.html',
  styleUrls: ['./header-logged-in.component.scss']
})
export class HeaderLoggedInComponent {


  constructor(public authService: AuthService, private router: Router, private imageService: ImageService) { }

  image!: ImageDTO;
  selectedFile: File | null = null;

  isUserMenuActive = false;
  isUserNotificationMenuActive = false;
  isUseremailActive = false;


  ngOnInit(): void {

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

    this.authService.getUserById(loggedInUserId).subscribe(
      (userData) => {
        const userId = userData.id; // Assuming the user object has an 'id' property
        this.imageService.loadImageByUserId(userId).subscribe(
          (data) => {
            this.image = data;
          },
          (error) => {
            console.error('Error loading image:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }



  onLogout() {
    this.authService.logout();
  }
}
