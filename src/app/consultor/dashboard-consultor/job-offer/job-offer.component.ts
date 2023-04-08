import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})
export class JobOfferComponent {


  items!: MenuItem[];

  subscription!: Subscription;

  constructor(public messageService: MessageService) {} // public ticketService: TicketService

  ngOnInit() {
    this.items = [
      {
        label: 'Offer Info',
        routerLink: 'offer-info',
      },
      {
        label: 'Offer Details',
        routerLink: 'offer-details',
      },
      {
        label: 'Offer Place',
        routerLink: 'offer-place',
      },
      {
        label: 'Offer Settings',
        routerLink: 'offer-settings',
      },
      {
        label: 'Confirmation',
        routerLink: 'offer-confirmation',
      },
    ];

    // this.subscription = this.ticketService.paymentComplete$.subscribe((personalInformation) =>{
    //     this.messageService.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.'});
    // });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

