import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Offer } from 'src/app/consultor/models/offer/offer.model';
import { OfferFormDataService } from 'src/app/consultor/services/offer/shared/offer-form-data.service';

@Component({
  selector: 'app-offer-settings',
  templateUrl: './offer-settings.component.html',
  styleUrls: ['./offer-settings.component.scss']
})
export class OfferSettingsComponent {
  submitted:boolean=false;
  offerSettingsData: Partial<Offer> = this.offerFormDataService.getStepData('offerSettings');

  constructor(
    private offerFormDataService: OfferFormDataService,
    private router: Router,
    public authService :AuthService
  ) {}

  ngOnInit():void {
   this.offerSettingsData.emailforsendmails = this.authService.emailUser;
    this.offerSettingsData.responable = this.authService.LoggedUserName;
    this.offerSettingsData.date = new Date();
  }
  
  onSubmit(): void {
  
    if ( this.offerSettingsData.responable && this.offerSettingsData.emailforsendmails) {
      this.offerFormDataService.updateStepData('offerSettings', this.offerSettingsData);
      this.router.navigate(['/dashboardConsultor/Job-offer/offer-confirmation']);
      return;
    }   
      
    this.submitted = true; 
}


  onBack(): void {
    this.router.navigate(['/dashboardConsultor/Job-offer/offer-place']); 
  }

}
