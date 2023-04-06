import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileEntrepriseGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('isEntreprise', this.authService.checkRole("entreprise"));
    if (this.authService.checkRole("entreprise")) {
      return true;
    } else {
      this.router.navigate(['/forbidden']);
      return false;
    }
  }
}

