import { AdditionalDataService } from './../../../services/additional-data.service';
import { Component } from '@angular/core';
import { AdditionalDataDTO } from 'src/app/consultor/models/additional-data.model';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-additional-data',
  templateUrl: './additional-data.component.html',
  styleUrls: ['./additional-data.component.scss']
})
export class AdditionalDataComponent {
  isEditing: boolean = false;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  messages!: Message[];
  value1: string = "off";
  value2!: number;
  additionaldata: AdditionalDataDTO[] = [];
  newadditionalData = new AdditionalDataDTO();
  showPeriodEnd: boolean = false;
  constructor(private primengConfig: PrimeNGConfig, private AdditionalDataService: AdditionalDataService,
    private authService: AuthService, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.messages = [
      { severity: 'info', summary: 'Info', detail: 'You havent figured out your Additional Information ' },

    ];
    this.primengConfig.ripple = true;
    this.loadAdiitionalInfos()
  }


  showModalDialog() {
    this.isEditing=false;
    this.displayModal = true;
    
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  closeModal() {
    this.isEditing=false;
    this.newadditionalData = new AdditionalDataDTO();
    //  this.displayModal = false;
    this.showPositionDialog('bottom');
  }
  closeButtomModal() {
    this.displayPosition = false;
    this.showPositionDialog('bottom');
  }
  closeAllModals() {
    this.isEditing=false;
    this.displayModal = false
    this.displayPosition = false;
  }

  confirmDelete(item: AdditionalDataDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Additional Information ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteAdiitionalInfo(item);
        this.loadAdiitionalInfos()
      }
    });
  }

  deleteAdiitionalInfo(item: AdditionalDataDTO) {
    this.AdditionalDataService.deleteAdditionalDataById(item._id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Additional Information deleted Successfully', life: 3000 });
        this.loadAdiitionalInfos();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadAdiitionalInfos() {
    const userId = this.authService.getLoggedInUserId();
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.AdditionalDataService.getAllAdditionalDataByUserId(userId).subscribe((data) => {
      this.additionaldata = data;

    },
    );
  }

  updateAdiitionalInfo() {
    const id = this.newadditionalData._id;
    //console.log("the id is "+id);
    this.AdditionalDataService.updateAdditionalDatanById(this.newadditionalData, id).subscribe(
      (updatedproexp) => {
        console.log(updatedproexp);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Additional Information updated Successfully', life: 3000 });
        this.loadAdiitionalInfos();
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openModalForUpdate(item: AdditionalDataDTO) {
    // console.log('Selected item id:', item._id);
    this.isEditing = true;
    this.newadditionalData = { ...item };
    this.displayModal = true;
  }

  createAdiitionalInfo() {
    const token = this.authService.getToken();
    this.AdditionalDataService.createAdditionalData(this.newadditionalData, token).subscribe((createdproexp) => {
      console.log(createdproexp);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Additional Information created Successfully', life: 3000 });
      this.loadAdiitionalInfos(); 
      this.newadditionalData = new AdditionalDataDTO();
    },
    );

  }
}
