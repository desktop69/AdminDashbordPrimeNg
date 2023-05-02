import { Component } from '@angular/core';
import { JobOfferComponent } from '../job-offer/job-offer.component';
import { JobOfferService } from '../../services/offer/job-offer.service';
import { Offer } from '../../models/offer/offer.model';
import { ActivatedRoute } from '@angular/router';
import { OfferApplicationService } from '../../services/offer/offer-application.service';
import { OfferApplicationWithConsultant } from '../../models/offer/offerapplicationwithconsultant.model';

@Component({
  selector: 'app-view-job-offer',
  templateUrl: './view-job-offer.component.html',
  styleUrls: ['./view-job-offer.component.scss']
})
export class ViewJobOfferComponent {
  currentOffer = new Offer();
  offre_id!: string;
  candidature!: OfferApplicationWithConsultant[];
  constructor(private apiofferService: JobOfferService,
    private activatedRoute: ActivatedRoute,
    private aplicationservices: OfferApplicationService) { }

  ngOnInit(): void {
    this.offre_id = this.activatedRoute.snapshot.params['id']
    this.apiofferService.getOfferId(this.offre_id).
      subscribe(offer => {
        this.currentOffer = offer;
        //console.log(this.currentOffer);
      });
      this.loeadCondidature();
  }
  loeadCondidature() {
    this.aplicationservices.getOfferApplicationsByOffreId(this.offre_id).subscribe((data) => {
      this.candidature = data;
      console.log("applications data is equal to ", data)
    })
  }


}
