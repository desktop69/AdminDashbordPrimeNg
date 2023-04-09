import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from 'src/app/consultor/models/offer/offer.model';
import { OfferFormDataService } from 'src/app/consultor/services/offer/shared/offer-form-data.service';
import { data } from 'src/app/utils/data';

@Component({
  selector: 'app-offer-place',
  templateUrl: './offer-place.component.html',
  styleUrls: ['./offer-place.component.scss']
})
export class OfferPlaceComponent {
  countries = data;

  offerPlaceData: Partial<Offer> = this.offerFormDataService.getStepData('offerPlace');


  constructor(
    private offerFormDataService: OfferFormDataService,
    private router: Router
  ) {}

  keys(obj: object): string[] {
    return Object.keys(obj);
  }
  onSelectCountry(): void {
    if (this.offerPlaceData.Address !== 'Tunisia') {
      this.offerPlaceData.Region = '';
      this.offerPlaceData.City = '';
    }
  }


  getCities(country: string, region: string): string[] {
    const countryData = (this.countries as {[key: string]: any})[country];
    return countryData?.[region]?.cities || [];
  }

  onSubmit(): void {
    this.offerFormDataService.updateStepData('offerPlace', this.offerPlaceData);
  
    this.router.navigate(['/dashboardConsultor/Job-offer/offer-settings']);
  }
  onBack(): void {
    this.router.navigate(['/dashboardConsultor/Job-offer/offer-details']); 
  }
}
