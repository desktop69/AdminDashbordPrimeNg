import { SkillsDTO } from './../../../models/skills.model';
import { Component } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SkillsService } from 'src/app/consultor/services/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  isEditing: boolean = false;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  messages!: Message[];
  value1: string = "off";
  value2!: number;
  skills: SkillsDTO[] = [];
  newSkills= new SkillsDTO();

  constructor(private primengConfig: PrimeNGConfig,private skillsService: SkillsService,
    private authService :AuthService,private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.messages = [
      { severity: 'info', summary: 'Info', detail: 'You havent figured out your Skills ' },

    ];
    this.primengConfig.ripple = true;
    this.loadSkills()
  }


  openModalForUpdate(item: SkillsDTO) {
    // console.log('Selected item id:', item._id);
     this.isEditing = true;
     this.newSkills = { ...item };
     this.displayModal = true;
   }
  
  confirmDelete(item: SkillsDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Skill ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteSkills(item);
        this.loadSkills()
      }
    });
  }

  deleteSkills(item: SkillsDTO) {
    this.skillsService.deleteSkill(item._id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'skill deleted Successfully', life: 3000 });
        this.loadSkills(); 
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
 
  
  

  updateskill() {
    const id= this.newSkills._id;
    //console.log("the id is "+id);
    this.skillsService.updateSkill(this.newSkills, id).subscribe(
      (updatedSkill) => {
        this.messageService.add({severity:'success', summary: 'Successful', detail:'Skill updated Successfully', life: 3000});
        this.loadSkills(); 
      },
      (error) => {
        console.error(error);
      }
    );
  }


  loadSkills() {
    const userId = this.authService.getLoggedInUserId();
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.skillsService.getAllSkillsDTOByUserId(userId).subscribe((data) => {
      this.skills=data; 
      //console.log(this.skills)
      },
    );
  }

  createskill() {
    const token = this.authService.getToken();
    this.skillsService.createSkill(this.newSkills,token).subscribe((createdskilll) => {
        //console.log(createdLangue);
        this.messageService.add({severity:'success', summary: 'Successful', detail:'Langue created Successfully', life: 3000});
        this.loadSkills();
      //hedhy besh ki tokhroj w ma taamelsh ajout wela update yreseti linputs
      //zedtha fl classet lkol 
        this.newSkills = new SkillsDTO();
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
      

      //hedhy besh ki tokhroj w ma taamelsh ajout wela update yreseti linputs
      //zedtha fl classet lkol 
      this.newSkills = new SkillsDTO();
      //  this.displayModal = false;
      this.isEditing=false;
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
