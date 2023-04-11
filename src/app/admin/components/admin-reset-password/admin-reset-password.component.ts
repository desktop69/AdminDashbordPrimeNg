import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImageService } from 'src/app/consultor/services/image.service';
import { confirmPassword } from '../userslayout/formvalidator';
import { SharedService } from 'src/app/consultor/dashboard-consultor/entreprise/shared/shared';

@Component({
  selector: 'app-admin-reset-password',
  templateUrl: './admin-reset-password.component.html',
  styleUrls: ['./admin-reset-password.component.scss']
})
export class AdminResetPasswordComponent {
  userForm!: FormGroup;

  constructor(
    public authService: AuthService,
    private imageService: ImageService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private sharedService: SharedService) {

      this.userForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]  
      }, {
        validator: confirmPassword
      });
    }




    ngOnInit() {
  

    }


    onSubmit(): void {
      if (this.userForm.valid) {
        console.log(this.userForm.value.password);
        this.authService.resetPasswordAdminwithUserName(this.userForm.value.username, this.userForm.value.password)
        .subscribe((data) => {
       
          this.sharedService.changeMessage({severity:'success', summary: 'Successful', detail:'Password reset successfully ', life: 3000});
         
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
}
