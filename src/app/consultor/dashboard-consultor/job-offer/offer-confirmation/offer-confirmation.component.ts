import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from 'src/app/consultor/models/offer/offer.model';
import { OfferFormDataService } from 'src/app/consultor/services/offer/shared/offer-form-data.service';
import { SharedService } from '../../entreprise/shared/shared';
import { MessageService } from 'primeng/api';
import { JobOfferService } from 'src/app/consultor/services/offer/job-offer.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-offer-confirmation',
  templateUrl: './offer-confirmation.component.html',
  styleUrls: ['./offer-confirmation.component.scss']
})
export class OfferConfirmationComponent {
  offerInfoData: Partial<Offer> = this.offerFormDataService.getStepData('offerInfo');
  offerDetailsData: Partial<Offer> = this.offerFormDataService.getStepData('offerDetails');
  offerSettingsData: Partial<Offer> = this.offerFormDataService.getStepData('offerSettings');
  offerPlaceData: Partial<Offer> = this.offerFormDataService.getStepData('offerPlace');

  constructor(private offerFormDataService: OfferFormDataService,
    private router:Router,
    private messageService:MessageService,
    private sharedService: SharedService,
    private apiServiceOffer :JobOfferService
    ,private authService :AuthService) { }

  onBack(): void {
    this.router.navigate(['/dashboardConsultor/Job-offer/offer-settings']); 
  }


  addOffer() {
    const token = this.authService.getToken();
    const formData = this.offerFormDataService.getFormData(); // hedhy nlemm biha 4 objet fi object w njibhom 
    this.apiServiceOffer.createOffer(formData,token).subscribe(response => {


        this.sharedService.changeMessage({severity:'success', summary: 'Successful', detail:'Company added successfully ', life: 3000});
  
        // Reset the form data in local storage
        this.offerFormDataService.resetFormData();
  
        this.router.navigate(['/dashboardConsultor/offer-list']);
      });
  }


  
  
}