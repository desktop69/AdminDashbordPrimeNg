import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Message, MessageService, PrimeNGConfig, SelectItemGroup } from 'primeng/api';
import { CategoryService } from 'src/app/admin/services/category.service';
import { ProfessionalData } from 'src/app/consultor/models/ProfessionalData.model';
import { ProfessionalDataService } from 'src/app/consultor/services/professional-data.service';

@Component({
  selector: 'app-professional-data',
  templateUrl: './professional-data.component.html',
  styleUrls: ['./professional-data.component.scss']
})
export class ProfessionalDataComponent implements OnInit {
  displayModal!: boolean;
  displayModalcreate!: boolean;
  displayPosition!: boolean;
  position!: string;
  professionaldata!: ProfessionalData;
  messages!: Message[];
  professionalDataForm!: FormGroup;
  newprofessionalDataForm!: FormGroup;

  JobCategorie: any[] = [];
  
  typesOfPositions: any[] = []; // Initialize the array with an empty array as a default value.
  // Example dropdown options
  educationLevels = [
    { name: 'Primary' },
    { name: 'Secondary' },
    { name: 'Professional training' },
    { name: 'Bac' },
    { name: 'Bac +3' },
    { name: 'Bac +5' },
    { name: 'PHD' },
    { name: 'Expert, Research' },
  ];
  
  experienceLevels = [
    { name: 'No experience' },
    { name: 'Less than a year' },
    { name: 'Between 1 and 2 years' },
    { name: 'Between 2 and 5 years' },
    { name: 'Between 5 and 10 years' },
    { name: 'More than 10 years' },
  ];
  
  professionalSituations = [{ name: 'Employed' }, { name: 'Unemployed' }, { name: 'Student' }];
  availabilities = [{ name: 'Immediately' }, { name: 'Part Time' }, { name: 'Full Time' },{ name: 'Freelance' },{ name: 'Internship' }];
  //  desiredWorkLocations = [{ name: 'Tunis' }, { name: 'Nabeul' }, { name: 'Sousse' },]
  desiredWorkLocations = [{
    label: 'Tunis', value: 'tn',
    items: [
      { label: 'centre ville', value: 'cv' },
      { label: 'Areiena', value: 'ar' },
      { label: 'lac', value: 'lc' },
      { label: 'chargiya', value: 'ch' }
    ]
  }]

  constructor(private primengConfig: PrimeNGConfig,
    private prosevices: ProfessionalDataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.messages = [
      { severity: 'info', summary: 'Info', detail: '    You havent figured out your Personal Data' },

    ];
    this.CreateFormForUPdate();

  }
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.DataCharger();
    this.CreateForm();
    this.fetchCategories();
    this.typesOfPositions = [{ name: 'Full-time' }, { name: 'Part-time' }, { name: 'Contract' }, { name: 'Internship' }, { name: 'Freelance' }];
  }

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      const categories = data.filter(category => !category.Parent);
      this.JobCategorie = categories.map(category => {
        const group = {
          label: category.title,
          value: category.title,
          items: category.childrens?.map(child => ({ label: child.title, value: child.title })) || []
        };
        return group;
      });
    });
  }
  
  
  showModalDialogUpdate() {
    this.displayModal = true;
  }
  showModalDialogCReate() {
    this.displayModalcreate = true;
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  closeModal() {
    this.showPositionDialog('bottom');
  }
  closeButtomModal() {
    this.displayPosition = false;
    this.showPositionDialog('bottom');
  }
  closeAllModals() {
    this.displayModal = false
    this.displayPosition = false;
    this.displayModalcreate = false;
    this.displayModalcreate = false;
  }
  DataCharger() {
    this.prosevices.FindProfessionalDataById().subscribe((pro) => {
      console.log(pro);
      this.professionaldata = pro;
      this.initializeFormForUpdate();

    })
  }
  UpdateData() {
    if (this.professionaldata) {
      this.prosevices.updateProfessionalDataById(this.professionaldata).subscribe(p => {
        console.log("new data updated to  " + p);
      })
    } else {
      console.log("professionalData is undefined");
    }
    this.closeAllModals();
    this.ngOnInit();

  }
  CreateForm() {
    // create form
    this.professionalDataForm = this.formBuilder.group({
      Title: [null, Validators.required],
      LevelOfEducation: [null, Validators.required],
      LevelOfExperience: [null, Validators.required],
      CurrentNetSalary: [420, Validators.required],
      ProfessionalSituation: [null, Validators.required,],
      Availability: [null, Validators.required],
      DesiredMinimumNetSalary: [420, Validators.required],
      JobCategorie: [null, Validators.required],
      TypesOfPositions: [null, Validators.required],
      DesiredWorkLocations: [null, Validators.required],
    });
  }
  CreateFormForUPdate() {
    // create form
    this.newprofessionalDataForm = this.formBuilder.group({
      Title: [null, Validators.required],
      LevelOfEducation: [null, Validators.required],
      LevelOfExperience: [null, Validators.required],
      CurrentNetSalary: [420, Validators.required],
      ProfessionalSituation: [null, Validators.required,],
      Availability: [null, Validators.required],
      DesiredMinimumNetSalary: [420, Validators.required],
      JobCategorie: [null, Validators.required],
      TypesOfPositions: [null, ],
      DesiredWorkLocations: [null, Validators.required],
    });
  }
  DeleteProfessionalData() {
    this.prosevices.DeletePersonalDataByUserId().subscribe((del) => {
      console.log("delete" + del);
      this.DataCharger();

    });

  }
  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target!,
      message: "Are you sure that you want to Delete your Professional Data ?",
      icon: "pi pi-exclamation-triangle",
      acceptButtonStyleClass: "",
      rejectButtonStyleClass: "",
      accept: () => {
        this.DeleteProfessionalData();
        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "You have accepted"
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected"
        });
      }
    });
  }
  onSubmit() {

    if (this.professionalDataForm.valid) {
      const professionalData: ProfessionalData = this.professionalDataForm.value;
      console.log(" submitted" + professionalData);
      // Submit the form data to the backend or perform any other action
      console.log("Form value:", JSON.stringify(this.professionalDataForm.value, null, 2));
      this.prosevices.createPersonalData(professionalData).subscribe(
        (data) => {
          console.log(" submitted to backend with data: " + data);
          this.closeAllModals();
        }
      )
    } else {
      const professionalData: ProfessionalData = this.professionalDataForm.value;
      console.log("Form value:", JSON.stringify(this.professionalDataForm.value, null, 2));
      console.log("Form status:", this.professionalDataForm.status);
    }
  }
  onSubmitUpdate() {
    if (this.newprofessionalDataForm.valid) {
      const UpdateprofessionalData: ProfessionalData = this.newprofessionalDataForm.value;
      console.log(" submitted" + UpdateprofessionalData);
      // Submit the form data to the backend or perform any other action
      console.log("Form value:", JSON.stringify(this.newprofessionalDataForm.value, null, 2));
      this.prosevices.updateProfessionalDataById(UpdateprofessionalData).subscribe(
        (data) => {
          console.log(" submitted to backend with data: " + data);
          this.DataCharger();
          this.closeAllModals();

        }
      )
    } else {
      const professionalData: ProfessionalData = this.newprofessionalDataForm.value;
      console.log("Form value:", JSON.stringify(this.newprofessionalDataForm.value, null, 2));
      console.log("Form status:", this.newprofessionalDataForm.status);
    }
  }
  isFieldInvalid(fieldName: string): boolean {
    const field = this.professionalDataForm.get(fieldName);
    const ok = !!(field && field.invalid && (field.dirty || field.touched));
    // console.log("the "+ fieldName +" variable contenus " + ok);
    return ok
  }
  isFieldInvalidUpdate(fieldName: string): boolean {
    const field = this.newprofessionalDataForm.get(fieldName);
    const ok = !!(field && field.invalid && (field.dirty || field.touched));
    // console.log("the "+ fieldName +" variable contenus " + ok);
    return ok
  }
  initializeFormForUpdate() {
    this.CreateFormForUPdate()
    this.newprofessionalDataForm.setValue({
      Title: this.professionaldata.Title,
      LevelOfEducation: this.professionaldata.LevelOfEducation,
      LevelOfExperience: this.professionaldata.LevelOfExperience,
      CurrentNetSalary: this.professionaldata.CurrentNetSalary,
      ProfessionalSituation: this.professionaldata.ProfessionalSituation,
      Availability: this.professionaldata.Availability,
      DesiredMinimumNetSalary: this.professionaldata.DesiredMinimumNetSalary,
      JobCategorie: this.professionaldata.JobCategorie,
      TypesOfPositions: this.professionaldata.TypesOfPositions,
      DesiredWorkLocations: this.professionaldata.DesiredWorkLocations,
    });
    console.log("passing values to the update form", JSON.stringify(this.newprofessionalDataForm.value, null, 2))
    console.log("Form status:", this.newprofessionalDataForm.status);
  }
}