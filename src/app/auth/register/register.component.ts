import { Router } from '@angular/router';

import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterDTO } from '../models/register.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent   {
registerForm: any;
newUser = new RegisterDTO();
err: number = 0;


  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router :Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      roleGroup: this.formBuilder.group({
        role: ['', Validators.required],
      }),
      password: ['', Validators.required],
    });
    
  }
  get email() { return this.registerForm.get('email'); }
  
  onSubmit() {
      this.newUser.email = this.registerForm.get('email').value;
      this.newUser.username = this.registerForm.get('username').value;
      this.newUser.password = this.registerForm.get('password').value;
      this.newUser.role = this.registerForm.get('roleGroup.role').value;
      this.authService.register(this.newUser).subscribe((data) => {
          this.newUser = data;
          this.router.navigate(['login']);
        },
      );
    
  }
  

}
