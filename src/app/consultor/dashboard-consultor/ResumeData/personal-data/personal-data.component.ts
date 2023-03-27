import { Router } from '@angular/router';
import { ImageService } from 'src/app/consultor/services/image.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PersonalDataDTO } from './../../../models/personal-data.model';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { PersonalDataService } from 'src/app/consultor/services/personal-data.service';
import { ImageDTO } from 'src/app/consultor/models/image.model';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent {
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  value1: string = "off";
  value2!: number;
  personalData!: PersonalDataDTO;
  image!: ImageDTO;
  selectedFile: File | null = null;
  inputs = [{ value: '' }];
  maxInputs = 2;
  messages!: Message[];
  numberOfPersonaldata: number = 0;
  newPersonalData = new PersonalDataDTO();
  isEditing = false;

  constructor(private primengConfig: PrimeNGConfig,
    private personalDataService: PersonalDataService,
    private authService: AuthService,
    private imageService: ImageService,
    private messageService: MessageService,
    private router: Router,) { }
    @ViewChild('fileInput') fileInput!: ElementRef;
    @ViewChild('profilePic') profilePic!: ElementRef;

  ngOnInit() {
    this.messages = [
      { severity: 'info', summary: 'Info', detail: 'You havent figured out your Personal Data' },

    ];
    this.primengConfig.ripple = true;
    this.loadUserDataAndImage();
    this.getPersonalDataByUserId()
  }


  openModalForUpdate() {
    this.isEditing = true;
    this.newPersonalData = {...this.personalData };
    this.inputs = [];
    for (let i = 0; i < this.newPersonalData.phoneNumber.length; i++) {
      this.inputs.push({ value: this.newPersonalData.phoneNumber[i] });
    }
    this.displayModal = true;
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

  createPersonalData() {
    const token = this.authService.getToken();
    this.newPersonalData.phoneNumber = this.inputs.map(input => input.value);
    this.personalDataService.createPersonalData(this.newPersonalData, token).subscribe((newData) => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Personal Data added Succsessfuly', life: 3000 });
      console.log(newData);
      this.getPersonalDataByUserId()

    });

    

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

  getPersonalDataByUserId() {
    const userId = this.authService.getLoggedInUserId();
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.personalDataService.getPersonalDataByUserId(userId).subscribe((data) => {
      this.personalData = data;
      if (this.personalData) {
        this.numberOfPersonaldata = 1;
      }
    });
  }

  updatePersonalData() {
    const userId = this.authService.getLoggedInUserId();
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.newPersonalData.phoneNumber = this.inputs.map(input => input.value);
    this.personalDataService.updatePersonalDataByUserId(this.newPersonalData ,userId).subscribe((updatedData) => {
      console.log(updatedData);
      this.messageService.add({severity:'success', summary: 'Successful', detail:'Personal Data updated Successfully', life: 3000});
      this.getPersonalDataByUserId() // Reload user data after updating personal data
    });
  }


  showModalDialog() {
    this.isEditing = false;
    this.displayModal = true;
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  closeModal() {
    //  this.displayModal = false;
    this.showPositionDialog('bottom');

  }
  closeButtomModal() {
    this.displayPosition = false;
    this.showPositionDialog('bottom');
  }
  closeAllModals() {
    this.displayModal = false
    this.displayPosition = false;

  }


  //images upload delete and submit
  onSubmit(): void {
    // console.log('Token in Component:', this.authService.getToken());
    if (this.selectedFile) {
      this.imageService.addImage(this.selectedFile).subscribe(
        (response) => {
          console.log('Image uploaded successfully:', response);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Image uploaded successfully', life: 3000 });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error uploading image', life: 3000 });
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Waning', detail: 'Image uploaded successfully', life: 3000 });
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
    this.imageService.updateImageByUserId(loggedInUserId, this.selectedFile).subscribe((data) => {
      this.image = data;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Image Updated Succsessfuly', life: 3000 });
    });
  }

  onDeleteImage() {
    const loggedInUserId = this.authService.getLoggedInUserId();
    if (!loggedInUserId) {
      console.error('No logged-in user found');
      return;
    }
    this.imageService.deleteImageByUserId(loggedInUserId).subscribe(
      (response) => {
        //console.log('Image deleted successfully:', response);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Image deleted successfully', life: 3000 });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Deleting  image', life: 3000 });
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

}
