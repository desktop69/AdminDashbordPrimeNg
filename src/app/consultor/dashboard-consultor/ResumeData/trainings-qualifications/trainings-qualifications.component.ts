import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, MessageService, Message, ConfirmationService } from 'primeng/api';
import { TrainingQualificationService } from 'src/app/consultor/services/training-qualification.service';
import { TrainingsQualificationsDTO } from 'src/app/consultor/models/trainingQualification.model';

@Component({
  selector: 'app-trainings-qualifications',
  templateUrl: './trainings-qualifications.component.html',
  styleUrls: ['./trainings-qualifications.component.scss']
})
export class TrainingsQualificationsComponent implements OnInit {
  isEditing: boolean = false;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  messages!: Message[];
  value1: string = "off";
  value2!: number;
  trainqual!:TrainingsQualificationsDTO;
  trainingsQualifications: TrainingsQualificationsDTO[] = [];
  newTrainingQualification= new TrainingsQualificationsDTO();

  constructor(private primengConfig: PrimeNGConfig,private trainingQualificationService: TrainingQualificationService,
    private authService :AuthService,private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.messages = [
      { severity: 'info', summary: 'Info', detail: 'You havent figured out your Trainings ' },

    ];
    this.primengConfig.ripple = true;
    this.loadTrainingsQualifications()
  }


  
  confirmDelete(item: TrainingsQualificationsDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this training qualification?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTrainingQualification(item);
        this.loadTrainingsQualifications()
      }
    });
  }

  deleteTrainingQualification(item: TrainingsQualificationsDTO) {
    this.trainingQualificationService.deleteTrainingQualificationByUserId(item._id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Training qualification deleted Successfully', life: 3000 });
        this.loadTrainingsQualifications(); // Reload trainings qualifications after deleting one
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  openModalForUpdate(item: TrainingsQualificationsDTO) {
   // console.log('Selected item id:', item._id);
    this.isEditing = true;
    this.newTrainingQualification = { ...item };
    this.displayModal = true;
  }
  
  

  updateTrainingQualification() {
    const id= this.newTrainingQualification._id;
    //console.log("the id is "+id);
    this.trainingQualificationService.updateTrainingQualificationById(this.newTrainingQualification, id).subscribe(
      (updatedTrainingQualification) => {
        console.log(updatedTrainingQualification);
        this.messageService.add({severity:'success', summary: 'Successful', detail:'Training qualification updated Successfully', life: 3000});
        this.loadTrainingsQualifications(); 
      },
      (error) => {
        console.error(error);
      }
    );
  }


  loadTrainingsQualifications() {
    const userId = this.authService.getLoggedInUserId();
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.trainingQualificationService.getAllTrainingQualificationByUserId(userId).subscribe((data) => {
      this.trainingsQualifications=data; 
      console.log(this.trainingsQualifications)
      },
    );
  }

  createTrainingQualification() {
    const token = this.authService.getToken();
    this.trainingQualificationService.createTrainingQualification(this.newTrainingQualification,token).subscribe((createdTrainingQualification) => {
        console.log(createdTrainingQualification);
        this.messageService.add({severity:'success', summary: 'Successful', detail:'Training qualification created Successfully', life: 3000});
        this.loadTrainingsQualifications(); 
        this.newTrainingQualification = new TrainingsQualificationsDTO();
      },
    );
  }

  showModalDialog() {
    this.displayModal = true;
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  closeModal() {
    this.isEditing=false;
    this.newTrainingQualification= new TrainingsQualificationsDTO()
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
}
