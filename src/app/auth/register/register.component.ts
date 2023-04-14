import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { RegisterDTO } from '../models/register.model';
import { AuthService } from '../services/auth.service';
import { Observable, map, catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  newUser = new RegisterDTO();
  err: number = 0;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email], this.emailExistsValidator()],
      username: ['', Validators.required],
      roleGroup: this.formBuilder.group({
        role: ['', Validators.required],
      }),
      password: ['', [Validators.required, this.passwordValidator()]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.checkPasswords });
  }

  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.authService.checkEmailExists(control.value).pipe(
        map(emailExists => (emailExists ? { emailExists: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  // Custom validator to check if the password and confirm password fields match
  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value ?? '';
    const confirmPassword = group.get('confirmPassword')?.value ?? '';
  
    return password === confirmPassword ? null : { notMatching: true };
  }
  

  // Custom password validator
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const hasNumber = /\d/.test(value);
      const valid = hasNumber && value.length >= 8;
      return valid ? null : { invalidPassword: true };
    };
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
    });
  }
}
