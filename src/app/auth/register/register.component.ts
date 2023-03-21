import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterDTO } from '../models/register.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
registerForm: any;



  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const registerDTO: RegisterDTO = this.registerForm.value;
    this.authService.register(registerDTO).subscribe(
      res => {
        console.log('Registration successful.');
        console.log(res);
      },
      err => {
        console.log('Registration failed.');
        console.log(err);
      }
    );
  }

}
