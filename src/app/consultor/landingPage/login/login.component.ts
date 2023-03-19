import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Dashbord/AuthService-Service .service';
import { User } from '../../Dashbord/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = new User();
  message: string = '';

  constructor(private authService : AuthServiceService,
    private router: Router) { }

  ngOnInit(): void {

  }


  onLoggin(){
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
