import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EntrepriseDTO } from 'src/app/consultor/models/entreprise/profile-entreprise.model';
import { ImageDTO } from 'src/app/consultor/models/image.model';
import { EntrepriseProfileService } from 'src/app/consultor/services/entreprise/entreprise-profile.service';
import { ImageService } from 'src/app/consultor/services/image.service';
import { SharedService } from '../shared/shared';
import { data } from 'src/app/utils/data';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  countries = data;
  inputs = [{ value: '' }];
  maxInputs = 2;
  currentProfile = new EntrepriseDTO();
  image!: ImageDTO;
  selectedFile: File | null = null;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private entrepriseService: EntrepriseProfileService, private authService: AuthService, private imageService: ImageService,
    private messageService: MessageService,
    private sharedService: SharedService) { }
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('profilePic') profilePic!: ElementRef;
  ngOnInit(): void {

    this.inputs = [];

    this.imageService.loadImageByUserId(this.activatedRoute.snapshot.params['id']).subscribe((data) => {
      this.image = data;
    });


    this.entrepriseService.getEntrepriseById(this.activatedRoute.snapshot.params['id']).
      subscribe(entrep => {
        this.currentProfile = entrep;
        for (let i = 0; i < this.currentProfile.telE.length; i++) {
          this.inputs.push({ value: this.currentProfile.telE[i] });
        }
      });

  }

  updateProfileEntreprise() {

    this.currentProfile.telE = this.inputs.map(input => input.value);
    this.entrepriseService.updateEntreprise(this.activatedRoute.snapshot.params['id'], this.currentProfile).subscribe(entrep => {

      this.updateImageByUserId();
      this.sharedService.changeMessage({ severity: 'success', summary: 'Successful', detail: 'Profile Updated successfully ', life: 3000 });
      this.router.navigate(['/dashboardConsultor/profile-entreprise']);
    
    }
    );
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

  keys(obj: object): string[] {
    return Object.keys(obj);
  }
  onSelectCountry(): void {
    if (this.currentProfile.countryE !== 'Tunisia') {
      this.currentProfile.regionE = '';
      this.currentProfile.villeE = '';
    }
  }


  getCities(country: string, region: string): string[] {
    const countryData = (this.countries as {[key: string]: any})[country];
    return countryData?.[region]?.cities || [];
  }

}
