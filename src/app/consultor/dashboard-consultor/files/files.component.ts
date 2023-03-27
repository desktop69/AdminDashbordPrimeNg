import { FileDTO } from './../../models/file.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent {
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  messages!: Message[];
  value1: string = "off";
  value2!: number;
  file!: FileDTO[];
  files: FileDTO[] = [];
  newFile= new FileDTO();
  
  isEditing: boolean = false;
  selectedFile: File | null = null;
  constructor(private authService :AuthService ,private fileService :FileService,private primengConfig: PrimeNGConfig,private messageService: MessageService,
    private confirmationService: ConfirmationService){
    
  }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loadfilesOfUser();
  }


loadfilesOfUser(){
  const loggedInUserId = this.authService.getLoggedInUserId();
    if (!loggedInUserId) {
      console.error('No logged-in user found');
      return;
    }
    this.fileService.getFileByUserId(loggedInUserId).subscribe(
      (data) => {
        this.file = data;
        console.log(this.file);
      
      },
      (error) => {
        console.error('Error loading file:', error);
      }
    );
}


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
    //this.imagePreview(file);
  }
  

  onSubmit(): void {
    if (this.selectedFile) {
      this.fileService.addFile(this.selectedFile).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'File uploaded successfully', life: 3000 });
          this.loadfilesOfUser();
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error uploading file', life: 3000 });
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'No file selected', life: 3000 });
    }
  }

  confirmDelete(file: FileDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this File ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletefile(file);
        this.loadfilesOfUser()
      }
    });
  }

  downloadFile(file: FileDTO): void {
    const link = document.createElement('a');
    link.href = 'data:' + file.contentType + ';base64,' + file.data;
    link.download = file.name;
    link.click();
  }
  

  deletefile(file: FileDTO) {
    this.fileService.deletefile(file._id).subscribe(
      () => {
      console.log( this.file);
        
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'File  deleted Successfully', life: 3000 });
        this.loadfilesOfUser();
      },
      (error) => {
        console.error(error);
      }
    );
  }


  updateImageByUserId(): void {
    if (!this.selectedFile) {
      console.warn('No file selected');
      return;
    }
    const id= this.newFile._id;
    if (!id) {
      console.error('No logged-in user found');
      return;
    }
    this.fileService.updateFileById(id, this.selectedFile).subscribe(
      (data) => {
        this.file = data;
        console.log(this.file);
        this.messageService.add({severity:'success', summary: 'Successful', detail:'file updated Successfully', life: 3000});
        this.loadfilesOfUser(); 
      },
      (error) => {
        console.error('Error updating file:', error);
      }
    );
  }


  openModalForUpdate(file: FileDTO) {
  console.log('Selected item id:', file._id);
     this.isEditing = true;
     this.newFile = { ...file};
     this.displayModal = true;
   }

  showModalDialog() {
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
    this.displayModal=false
    this.displayPosition = false;
  }


 

  onDeletefile() {
    const loggedInUserId = this.newFile._id;
    if (!loggedInUserId) {
      console.error('No logged-in user found');
      return;
    }
    this.fileService.deletefile(loggedInUserId).subscribe(
      (response) => {
        this.messageService.add({severity:'success', summary: 'Successful', detail:'file deleted Successfully', life: 3000});
        this.loadfilesOfUser(); 

      },
      (error) => {
        console.error('Error deleting image:', error);
      }
    );
  }
}
