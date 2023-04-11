import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/consultor/models/offer/offer.model';
import { JobOfferService } from 'src/app/consultor/services/offer/job-offer.service';

@Component({
  selector: 'app-admin-offer-details',
  templateUrl: './admin-offer-details.component.html',
  styleUrls: ['./admin-offer-details.component.scss']
})
export class AdminOfferDetailsComponent {
  currentOffer = new Offer();
  constructor(private apiofferService: JobOfferService, private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.apiofferService.getOfferId(this.activatedRoute.snapshot.params['id']).
      subscribe(offer => {
        this.currentOffer = offer;
        //console.log(this.currentOffer);
      });
}
}