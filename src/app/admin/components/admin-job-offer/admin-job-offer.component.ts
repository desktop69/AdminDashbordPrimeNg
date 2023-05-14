import { JobOfferService } from 'src/app/consultor/services/offer/job-offer.service';
import { Component } from '@angular/core';
import { Offer } from 'src/app/consultor/models/offer/offer.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-job-offer',
  templateUrl: './admin-job-offer.component.html',
  styleUrls: ['./admin-job-offer.component.scss']
})
export class AdminJobOfferComponent {
  offers!: Offer[];
  selectedOffers!: Offer[];
  constructor(private jobservice: JobOfferService, private confirmationService: ConfirmationService, private messageService: MessageService) {


  }


  ngOnInit() {
    this.getAllOffers();
  }


  getAllOffers() {
    this.jobservice.getAllOffers().subscribe((data) => {
      this.offers = data;
      //console.log('hello',this.offers);
    })
  }

  confirmDelete(item: Offer) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Offer ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteoffer(item);
        this.getAllOffers()
      }
    });
  }

  deleteoffer(item: Offer) {
    this.jobservice.deleteOffer(item._id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Offer deleted Successfully', life: 3000 });
        this.getAllOffers();
      },
      (error) => {
        console.error(error);
      }
    );
  }


  updateUserswitch(offer: Offer) {
    //console.log("Data before update: ", user.is_confirmed);

    const newupdatedOffer: Offer = {
      ...offer
    };

    //console.log("Data after update: ", newupdatedUser);

    this.jobservice.updateOffer(newupdatedOffer, newupdatedOffer._id).subscribe((data) => {
      if (newupdatedOffer.isAccepted) {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Offer Accepted Successfully',
          life: 3000,
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Offer Rejected',
          life: 3000,
        });
      }
    });
  }
}
