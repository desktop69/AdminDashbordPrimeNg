import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  username = '';
  newPassword = '';
  token = '';

  constructor(private authService: AuthService, private route: ActivatedRoute,private messageService: MessageService,private router :Router) {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    this.authService.resetPassword(this.username, this.newPassword, this.token).subscribe(
      () => {
        alert('Password reset successful.');
        this.messageService.add({severity:'success', summary: 'Successful', detail:'Password reset successful', life: 3000});
        this.router.navigate(['/home/listVoiture']);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred ', life: 3000 });
      }
    );
  }
}

