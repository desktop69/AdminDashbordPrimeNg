import { AuthService } from 'src/app/auth/services/auth.service';
import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';
import { FileDTO } from '../../models/file.model';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent {
  file!: FileDTO;
  selectedFile: File | null = null;
  constructor(private authService :AuthService ,private fileService :FileService){
    
  }
  ngOnInit(): void {

    const loggedInUserId = this.authService.getLoggedInUserId();
    if (!loggedInUserId) {
      console.error('No logged-in user found');
      return;
    }
    this.fileService.getFileByUserId(loggedInUserId).subscribe(
      (data) => {
        this.file = data;
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
          console.log('File uploaded successfully:', response);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      console.warn('No file selected');
    }
  }

}
