import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LanguageDTO } from 'src/app/consultor/models/langues.model';
import { LanguagesService } from 'src/app/consultor/services/languages.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  isEditing: boolean = false;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  messages!: Message[];
  value1: string = "off";
  value2!: number;
  languages: LanguageDTO[] = [];
  newLanguages= new LanguageDTO();

  constructor(private primengConfig: PrimeNGConfig,private LanguageService: LanguagesService,
    private authService :AuthService,private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.messages = [
      { severity: 'info', summary: 'Info', detail: 'You havent figured out your Languages ' },

    ];
    this.primengConfig.ripple = true;
    this.loadLaguages()
  }


  openModalForUpdate(item: LanguageDTO) {
    // console.log('Selected item id:', item._id);
     this.isEditing = true;
     this.newLanguages = { ...item };
     this.displayModal = true;
   }
  
  confirmDelete(item: LanguageDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Languages ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletelangue(item);
        this.loadLaguages()
      }
    });
  }

  deletelangue(item: LanguageDTO) {
    this.LanguageService.deleteLanguage(item._id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'langue deleted Successfully', life: 3000 });
        this.loadLaguages(); 
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
 
  updateLanguages() {
    const id= this.newLanguages._id;
    //console.log("the id is "+id);
    this.LanguageService.updateLanguage(this.newLanguages, id).subscribe(
      (updatedLangue) => {

        console.log(updatedLangue);

        this.messageService.add({severity:'success', summary: 'Successful', detail:'Training qualification updated Successfully', life: 3000});
        this.loadLaguages(); 
      },
      (error) => {
        console.error(error);
      }
    );
  }


  loadLaguages() {
    const userId = this.authService.getLoggedInUserId();
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.LanguageService.getAllLanguageDTOByUserId(userId).subscribe((data) => {
      this.languages=data; 
      console.log(this.languages)
      },
    );
  }

  createLangue() {
    const token = this.authService.getToken();
    this.LanguageService.createLanguageDTO(this.newLanguages,token).subscribe((createdLangue) => {
        //console.log(createdLangue);
        this.messageService.add({severity:'success', summary: 'Successful', detail:'Langue created Successfully', life: 3000});
        this.loadLaguages(); // Reload trainings qualifications after creating new one
      },
    );
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
      this.isEditing=false;

      this.newLanguages = new LanguageDTO();
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
}
