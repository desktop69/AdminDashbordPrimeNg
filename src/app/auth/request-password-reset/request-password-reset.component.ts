import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { AuthService } from "../services/auth.service";


@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent {
  emailOrUsername = '';

  constructor(private authService: AuthService,private messageService: MessageService) {}

  onSubmit() {
    this.authService.requestPasswordReset(this.emailOrUsername).subscribe(
      () => {
        //alert('Password reset link sent to your email.');
        this.messageService.add({severity:'success', summary: 'Successful', detail:'Password reset link sent to your email.', life: 3000});
      },
      (error) => {
       // alert(`An error occurred: ${error.error.message}`);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred ', life: 3000 });
      }
    );
  }
}


