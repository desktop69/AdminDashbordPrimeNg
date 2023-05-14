import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Users } from 'src/app/auth/models/Admin-users.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { confirmPassword } from '../userslayout/formvalidator';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  newUser!: Users;
  users!: Users[];
  userForm!: FormGroup;
  confirmedLabel = 'Confirmed';
  notConfirmedLabel = 'Not Confirmed';
  roleOptions = [{ label: 'Slelect a role ', value: null }, { label: 'Superadmin', value: 'superadmin' }, { label: 'Admin', value: 'admin' }, { label: 'User', value: 'user' }];
  constructor(private authService: AuthService, private messageService: MessageService, private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.userForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      is_confirmed: [false]
    }, {
      validator: confirmPassword
    });
  }

  ngOnInit() {
    this.loeadUserData();
  }

  loeadUserData() {
    this.authService.getAllUsers().subscribe((data) => {
      console.log(" loead all userss list ", data)
      this.users = data;
    });
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
    this.displayModal = false
    this.displayPosition = false;

  }
  onSubmit(): void {
    if (this.userForm.valid) {
      this.authService.AddUsers(this.userForm.value).subscribe((data) => {
        this.newUser = data;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User added Successfully', life: 3000 });
        this.loeadUserData();
        this.closeAllModals();
      },
      );
      this.userForm.reset();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.userForm.status });
      console.log("Form value:", JSON.stringify(this.userForm.value, null, 2));
      console.log("Form status:", this.userForm.status);
    }
  }
  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    const ok = !!(field && field.invalid && (field.dirty || field.touched));
    return ok
  }
  
  onDeleteClick(id: string): void {
    this.authService.delteUser(id).subscribe(
      () => {
        console.log(`User with ID ${id} deleted successfully`);
        this.loeadUserData();
      });
  }
  OnconfirmForDelete(event: Event, id: string, username: string) {
    this.confirmationService.confirm({
      target: event.target!,
      message: "Are you sure that you want to Delete this Job category ?",
      icon: "pi pi-exclamation-triangle",
      acceptButtonStyleClass: "",
      rejectButtonStyleClass: "",
      accept: () => {
        this.onDeleteClick(id);
        this.messageService.add({
          severity: "info",
          summary: "Success",
          detail: ("You have successfully deleted  " + username),
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: ("You have rejected Deleting " + username),
        });
      }
    });
  }
  updateUserswitch(user: Users) {
    //console.log("Data before update: ", user.is_confirmed);
  
    const newupdatedUser: Users = {
      ...user
    };
  
    //console.log("Data after update: ", newupdatedUser);
  
    this.authService.updateUser(newupdatedUser).subscribe((data) => {
      if (newupdatedUser.is_confirmed) {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User confirmed Successfully',
          life: 3000,
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'User is not confirmed',
          life: 3000,
        });
      }
    });
  }
}
