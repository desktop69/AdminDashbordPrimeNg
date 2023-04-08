import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from 'src/app/consultor/models/offer/offer.model';
import { OfferFormDataService } from 'src/app/consultor/services/offer/shared/offer-form-data.service';

@Component({
  selector: 'app-offer-place',
  templateUrl: './offer-place.component.html',
  styleUrls: ['./offer-place.component.scss']
})
export class OfferPlaceComponent {


  offerPlaceData: Partial<Offer> = this.offerFormDataService.getStepData('offerPlace');

  constructor(
    private offerFormDataService: OfferFormDataService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.offerFormDataService.updateStepData('offerPlace', this.offerPlaceData);
  
    this.router.navigate(['/dashboardConsultor/Job-offer/offer-settings']);
  }
  onBack(): void {
    this.router.navigate(['/dashboardConsultor/Job-offer/offer-details']); 
  }
}
