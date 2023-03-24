import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImageDTO } from '../../models/image.model';
import { ImageService } from '../../services/image.service';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  image!: ImageDTO;
  selectedFile: File | null = null;
  inputs = [{ value: '' }];
  maxInputs = 5;

  constructor(private imageService: ImageService, private authService: AuthService) { }
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('profilePic') profilePic!: ElementRef;
  ngOnInit(): void {
    // const userId = '6419d010b5b53f7169f7afcc';
    // this.imageService.loadImageByUserId(userId).subscribe(
    //   (data) => {
    //     this.image = data;
    //   },
    //   (error) => {
    //     console.error('Error loading image:', error);
    //   }
    // );

    this.loadUserDataAndImage()
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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.imagePreview(file);
  }

  imagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profilePic.nativeElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onUploadButtonClick(): void {
    this.fileInput.nativeElement.click();
  }

  onSubmit(): void {
    // console.log('Token in Component:', this.authService.getToken());
    if (this.selectedFile) {
      this.imageService.addImage(this.selectedFile).subscribe(
        (response) => {
          console.log('Image uploaded successfully:', response);
    
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    } else {
      console.warn('No file selected');
    }
  }

  updateImageByUserId(): void {
    if (!this.selectedFile) {
      console.warn('No file selected');
      return;
    }
    const loggedInUserId = this.authService.getLoggedInUserId();
    if (!loggedInUserId) {
      console.error('No logged-in user found');
      return;
    }
    this.imageService.updateImageByUserId(loggedInUserId, this.selectedFile).subscribe(
      (data) => {
        this.image = data;
      },
      (error) => {
        console.error('Error updating image:', error);
      }
    );
  }

  onDeleteImage() {
    const loggedInUserId = this.authService.getLoggedInUserId();
    if (!loggedInUserId) {
      console.error('No logged-in user found');
      return;
    }
    this.imageService.deleteImageByUserId(loggedInUserId).subscribe(
      (response) => {
        console.log('Image deleted successfully:', response);

      },
      (error) => {
        console.error('Error deleting image:', error);
      }
    );
  }


}
