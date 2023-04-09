import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImageDTO } from 'src/app/consultor/models/image.model';
import { ImageService } from 'src/app/consultor/services/image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  image!: ImageDTO;
  username!: string;
  userroles!: string;
  useremail!: string;

  constructor(
    public authService: AuthService,
    private imageService: ImageService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder) { }
    ngOnInit() {
      this.loadUserDataAndImage();
      this.fetchUser();
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
    fetchUser(){
      this.username= this.authService.LoggedUserName;
      this.useremail = this.authService.emailUser;
      this.userroles= this.authService.roles.toUpperCase();
    }
}
