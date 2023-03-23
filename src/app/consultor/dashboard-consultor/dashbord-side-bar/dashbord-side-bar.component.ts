import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashbord-side-bar',
  templateUrl: './dashbord-side-bar.component.html',
  styleUrls: ['./dashbord-side-bar.component.scss']
})
export class DashbordSideBarComponent implements OnInit {

  constructor(public authService:AuthService ,private router :Router) { }

  ngOnInit(

  ): void {
    
  }


  onLogout() {
    this.authService.logout();
  }

}
