import { Component } from '@angular/core';
import { JobOfferComponent } from '../job-offer/job-offer.component';
import { JobOfferService } from '../../services/offer/job-offer.service';
import { Offer } from '../../models/offer/offer.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-job-offer',
  templateUrl: './view-job-offer.component.html',
  styleUrls: ['./view-job-offer.component.scss']
})
export class ViewJobOfferComponent {
  currentOffer = new Offer();
  constructor(private apiofferService: JobOfferService, private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.apiofferService.getOfferId(this.activatedRoute.snapshot.params['id']).
      subscribe(offer => {
        this.currentOffer = offer;
        console.log(this.currentOffer);
      });
  }



}
