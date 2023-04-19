import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { SharedService } from '../entreprise/shared/shared';
import { EntrepriseProfileService } from '../../services/entreprise/entreprise-profile.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { OfferApplicationService } from '../../services/offer/offer-application.service';
import { Offer } from '../../models/offer/offer.model';
import { EntrepriseDTO } from '../../models/entreprise/profile-entreprise.model';
import { OfferApplication } from '../../models/offer/OfferApplication.model';

@Component({
  selector: 'app-applied-offers-consultant',
  templateUrl: './applied-offers-consultant.component.html',
  styleUrls: ['./applied-offers-consultant.component.scss']
})
export class AppliedOffersConsultantComponent {
  // entreprise!: EntrepriseDTO;
  messages!: Message[];
  appliedoffers: Offer[] = [];
  offerApplications :OfferApplication[] = [];
  shared!: string;
  entrepriseData1: { [userId: string]: EntrepriseDTO & { nameE?: any } } = {};
  selectedappliedOffers!: Offer[];
  constructor(private sharedService: SharedService,
    private entrepriseService: EntrepriseProfileService,
    private authService: AuthService,
    private messageService: MessageService,
    private offerApplicationService: OfferApplicationService) { }

  ngOnInit(): void {
    this.sharedService.currentMessage.subscribe(message => {
      if (message) {

        setTimeout(() => {
          this.messageService.add(message);
        }, 0);
        // Reset the message after a delay
        setTimeout(() => {
          this.sharedService.changeMessage(null);
        }, 5000);
      }
    });

    this.messages = [
      { severity: 'info', summary: 'Info', detail: 'You havent figured out your Profile Company' },
    ];

 

    this.getAppliedOffers();

  }
  getAppliedOffers(): void {
    const consultantId = this.authService.getLoggedInUserId();
    if (!consultantId) {
      console.error('No logged-in user found');
      return;
    }
    this.offerApplicationService.getAppliedOffersByConsultantId(consultantId).subscribe(
      (data) => {
        this.appliedoffers = data;
        console.log('Entreprise', this.appliedoffers);
        this.getAllOffersApplicationsData(consultantId);
        // Load entreprise data for each applied offer 
        //because when i stored the offer i put the id of the entreprise in the fileld IDUser
        this.appliedoffers.forEach(offer => {
          this.loadEntreprisedata(offer.IdUser);
          
        });
  
    });
  }
  


  loadEntreprisedata(entrepriseId: string): void {
    this.entrepriseService.getEntrepriseById(entrepriseId).subscribe(
      (data) => {
        if (data) {
          this.entrepriseData1[entrepriseId] = {
            ...(this.entrepriseData1[entrepriseId] ?? {}),
            ...data
          };
        }
        console.log("offer", data);
      },
      (error) => {
        console.error('Error fetching entreprise data:', error);
      }
    );
  }

  getMatchingOfferApplication(offerId: string): OfferApplication | undefined {
    return this.offerApplications.find(
      (offerApplication) => offerApplication.offerId === offerId
    );
  }

  getAllOffersApplicationsData(consultantId: string): void {
    this.offerApplicationService.getOffersApplicationsByConsultantId(consultantId).subscribe(
      (data) => {
        this.offerApplications = data;
      },
    );
  }
}
