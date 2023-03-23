import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImageDTO } from '../../models/image.model';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-dashbord-header',
  templateUrl: './dashbord-header.component.html',
  styleUrls: ['./dashbord-header.component.scss']
})
export class DashbordHeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private imageService: ImageService) { }

  image!: ImageDTO;
  selectedFile: File | null = null;

  isUserMenuActive = false;
  isUserNotificationMenuActive=false;
  isUseremailActive=false;
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

    this.loadUserDataAndImage()
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
