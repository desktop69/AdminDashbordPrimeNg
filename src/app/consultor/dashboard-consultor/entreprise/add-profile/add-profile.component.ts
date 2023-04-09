import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EntrepriseDTO } from 'src/app/consultor/models/entreprise/profile-entreprise.model';
import { ImageDTO } from 'src/app/consultor/models/image.model';
import { EntrepriseProfileService } from 'src/app/consultor/services/entreprise/entreprise-profile.service';
import { ImageService } from 'src/app/consultor/services/image.service';
import { SharedService } from '../shared/shared';
import { data } from 'src/app/utils/data';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent {
  countries = data;
  image!: ImageDTO;
  selectedFile: File | null = null;
  entreprise: EntrepriseDTO = new EntrepriseDTO();
  inputs = [{ value: '' }];
  maxInputs = 2;
  telE!: string[];
  
  constructor(private router:Router ,private entrepriseService: EntrepriseProfileService,
    private authService :AuthService,private imageService: ImageService,private messageService:MessageService,
    private sharedService: SharedService) { }
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('profilePic') profilePic!: ElementRef;
  ngOnInit(): void {
    this.entreprise.activitySectorE = 'Select an Activity Area';
  }


  addCompanyAndUploadImage() {
    const token = this.authService.getToken();
    console.log(token);
    this.entreprise.telE = this.inputs.map(input => input.value);
    this.entrepriseService.createEntreprise(this.entreprise, token).subscribe(response => {
      console.log('Company added successfully', response);
      // Company added successfully, now upload the image
      this.onSubmit();
      this.sharedService.changeMessage({severity:'success', summary: 'Successful', detail:'Company added successfully ', life: 3000});
      this.router.navigate(['/dashboardConsultor/profile-entreprise']);
    });
  }


  
  




     //add another input for the phone number
     addInput() {
      if (this.inputs.length < this.maxInputs) {
        this.inputs.push({ value: '' });
      }
    }   
    //delete an input for the phone number
    deleteInput(index: number) {
      this.inputs.splice(index, 1);
    }



    updateCompany() {
      const userId = this.authService.getLoggedInUserId();
      if (!userId) {
        console.error('No logged-in user found');
        return;
      }
      this.entreprise.telE= this.inputs.map(input => input.value);
      this.entrepriseService.updateEntreprise(userId,this.entreprise ).subscribe((entreprise) => {
        console.log(entreprise);
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

    keys(obj: object): string[] {
      return Object.keys(obj);
    }
    onSelectCountry(): void {
      if (this.entreprise.countryE !== 'Tunisia') {
        this.entreprise.regionE = '';
        this.entreprise.villeE = '';
      }
    }
  
  
    getCities(country: string, region: string): string[] {
      const countryData = (this.countries as {[key: string]: any})[country];
      return countryData?.[region]?.cities || [];
    }
}
