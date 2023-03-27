import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfessionalExperienceDTO } from 'src/app/consultor/models/pro-experience.model';
import { ProExperienceService } from 'src/app/consultor/services/pro-experience.service';

@Component({
  selector: 'app-pro-experience',
  templateUrl: './pro-experience.component.html',
  styleUrls: ['./pro-experience.component.scss']
})
export class ProExperienceComponent implements OnInit {
  isEditing: boolean = false;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  messages!: Message[];
  value1: string = "off";
  value2!: number;
  trainqual!: ProfessionalExperienceDTO;
  proexperience: ProfessionalExperienceDTO[] = [];
  newProExperience = new ProfessionalExperienceDTO();
  showPeriodEnd: boolean = false;
  constructor(private primengConfig: PrimeNGConfig, private proexpService: ProExperienceService,
    private authService: AuthService, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.messages = [
      { severity: 'info', summary: 'Info', detail: 'You havent figured out your Professionel Experience ' },

    ];
    this.primengConfig.ripple = true;
    this.loadProfessionalExperiences()
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
    this.newProExperience = new ProfessionalExperienceDTO();
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

  confirmDelete(item: ProfessionalExperienceDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Professional Experience ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProfessionalExperience(item);
        this.loadProfessionalExperiences()
      }
    });
  }

  deleteProfessionalExperience(item: ProfessionalExperienceDTO) {
    this.proexpService.deleteProfessionalExperienceById(item._id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Professional Experience deleted Successfully', life: 3000 });
        this.loadProfessionalExperiences();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadProfessionalExperiences() {
    const userId = this.authService.getLoggedInUserId();
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.proexpService.getAllProfessionalExperienceByUserId(userId).subscribe((data) => {
      this.proexperience = data;

    },
    );
  }

  updateProfessionalExperience() {
    const id = this.newProExperience._id;
    //console.log("the id is "+id);
    this.proexpService.updateProfessionalExperiencenById(this.newProExperience, id).subscribe(
      (updatedproexp) => {
        console.log(updatedproexp);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Professional Experience updated Successfully', life: 3000 });
        this.loadProfessionalExperiences();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openModalForUpdate(item: ProfessionalExperienceDTO) {
    // console.log('Selected item id:', item._id);
    this.isEditing = true;
    this.newProExperience = { ...item };
    this.displayModal = true;
  }

  createProfessionalExperience() {
    const token = this.authService.getToken();
    this.proexpService.createProfessionalExperience(this.newProExperience, token).subscribe((createdproexp) => {
      console.log(createdproexp);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Professional Experience created Successfully', life: 3000 });
      this.loadProfessionalExperiences(); // Reload trainings qualifications after creating new one
    },
    );

  }


}