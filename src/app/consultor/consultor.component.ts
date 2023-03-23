import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-consultor',
  templateUrl: './consultor.component.html',
  styleUrls: ['./consultor.component.scss']
})
export class ConsultorComponent {
  constructor(public authService:AuthService ,private router :Router) { }

  ngOnInit( ): void {
    this.authService.loadToken();
    if (this.authService.getToken()==null || this.authService.isTokenExpired())
    this.router.navigate(['/consultor']); 

    console.log("who logged",this.authService.isloggedIn)
  }


}
