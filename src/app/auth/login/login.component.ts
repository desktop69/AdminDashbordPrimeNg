import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = new User();
  message: string = '';

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

  }


  onLoggedin() {
    console.log(this.user)
    this.authService.login(this.user).subscribe(response => {
      const token = response.res.token;
      this.message = response.res.message;
      this.authService.saveToken(token);
    });
    console.log(this.message)
    console.log("Success");
  }

}
