import { Component } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EntrepriseDTO } from '../../models/entreprise/profile-entreprise.model';
import { EntrepriseProfileService } from '../../services/entreprise/entreprise-profile.service';
import { SharedService } from '../entreprise/shared/shared';
import { JobOfferService } from '../../services/offer/job-offer.service';
import { Offer } from '../../models/offer/offer.model';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-list-job-offer',
  templateUrl: './list-job-offer.component.html',
  styleUrls: ['./list-job-offer.component.scss']
})
export class ListJobOfferComponent {
  offers: Offer[] = [];
  messages!: Message[];
  shared!: string;
  selectedOffers!: Offer[];
  constructor(private sharedService: SharedService, private authService: AuthService, private messageService: MessageService
    ,  private apiServiceOffer :JobOfferService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.sharedService.currentMessage.subscribe(message => {
      if (message) {

        setTimeout(() => {
          this.messageService.add(message);
        }, 0);
        // Clear the message after displaying it
        this.sharedService.changeMessage(null);
      }
    });

    this.messages = [
      { severity: 'info', summary: 'Info', detail: 'You havent figured out your Profile Company' },
    ];

   this.getAllOffersByIdEntreprsie();

  }


  getAllOffersByIdEntreprsie(){
    const userId = this.authService.getLoggedInUserId();
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.apiServiceOffer.getAllOfferByUserId(userId).subscribe((data) => {
      this.offers=data; 
      console.log(this.offers)
      },
    );
  }


    
  confirmDelete(item: Offer) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Offer ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteoffer(item);
        this.getAllOffersByIdEntreprsie()
      }
    });
  }

  deleteoffer(item: Offer) {
    this.apiServiceOffer.deleteOffer(item._id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Offer deleted Successfully', life: 3000 });
        this.getAllOffersByIdEntreprsie(); 
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  }


