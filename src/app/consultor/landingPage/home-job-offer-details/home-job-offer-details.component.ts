import { Offer } from 'src/app/consultor/models/offer/offer.model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOfferService } from '../../services/offer/job-offer.service';
import { EntrepriseDTO } from '../../models/entreprise/profile-entreprise.model';
import { EntrepriseProfileService } from '../../services/entreprise/entreprise-profile.service';
import { ImageService } from '../../services/image.service';
import { OfferApplicationService } from '../../services/offer/offer-application.service';
import { OfferApplication } from '../../models/offer/OfferApplication.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MessageService } from 'primeng/api';
import { SharedService } from '../../dashboard-consultor/entreprise/shared/shared';
import { Subject } from 'rxjs';
import { Notificationobjects } from '../../models/notification.model';
import { SendNotificationRequest, WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-home-job-offer-details',
  templateUrl: './home-job-offer-details.component.html',
  styleUrls: ['./home-job-offer-details.component.scss']
})
export class HomeJobOfferDetailsComponent {
  offer = new Offer();
  offerEntreprise: Offer[] = [];
  notifications: Notificationobjects[] = [];
  private ngUnsubscribe = new Subject<void>();
  image: any;
  entrepriseData: { [userId: string]: (EntrepriseDTO & { image?: any }) } = {};
  entrepriseData1: { [userId: string]: EntrepriseDTO & { nameE?: any } } = {};
  constructor(private apiofferService: JobOfferService, private activatedRoute: ActivatedRoute, private imageService: ImageService,
    private entrepriseService: EntrepriseProfileService,
    private offerApplicationService: OfferApplicationService,
    private authService :AuthService,private messageService:MessageService,
    private sharedService: SharedService,
    private router :Router,
    private notificationService: WebSocketService,) { }




  ngOnInit(): void {
    this.apiofferService.getOfferId(this.activatedRoute.snapshot.params['id']).
      subscribe(offer => {
        this.offer = offer;
        this.loadEntreprisedata(offer.IdUser);
        this.loadEntrepriseImage(offer.IdUser);
        //console.log(this.currentOffer);
      });
  }
  
  applyForOffer(entrepriseId: string): void {
    const consultantId = this.authService.getLoggedInUserId();
    if (!consultantId) {
      console.log('Invalid authorization token');
      return;
    }
  
    const offerApplication: OfferApplication = {
      offerId: this.activatedRoute.snapshot.params['id'],
      entrepriseId: entrepriseId,
      consultantId: consultantId,
      appliedAt: new Date(),
      status: 'Pending'
    };
  
    this.offerApplicationService.applyForOffer(offerApplication).subscribe(
      (response) => {
        this.sendNotification();
        this.sharedService.changeMessage({severity:'success', summary: 'Successful', detail:'Applied successfully ', life: 3000});
        this.router.navigate(['/dashboardConsultor/applied-offers-consultant']);
        
      });
  }
  
  sendNotification() {
    const consultantId = this.authService.getLoggedInUserId();
    if (!consultantId) {
      console.log('Invalid authorization token');
      return;
    }
  
    const request: SendNotificationRequest = {
      OfferId: this.activatedRoute.snapshot.params['id'],
      senderId: consultantId,
      recipientId: this.offer.IdUser,
      content: `${this.authService.LoggedUserName} Applied for a job offer <span class="color">${this.offer.titleO}</span>`,

      category: "general"
    };	
  
    this.notificationService.sendNotification(request).subscribe(
      (notification) => {
        console.log('Notification sent:', notification);
      },
      (error) => {
        console.error('Error sending notification:', error);
      },
    );
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
        console.log("hello", data);
      },
      (error) => {
        console.error('Error fetching entreprise data:', error);
      }
    );
  }



  loadEntrepriseImage(entrepriseId: string): void {
    this.imageService.loadImageByUserId(entrepriseId).subscribe(
      (imageData) => {
        if (!imageData) {
          return
        }
        this.entrepriseData[entrepriseId] = {
          ...(this.entrepriseData[entrepriseId] ?? {}),
          image: imageData,
        };
        console.log("hello", imageData);
      },
      (error) => {
        console.error('Error loading image:', error);
      }
    );
  }

  daysSincePosted(postingDate: Date): number {
    const today = new Date();
    const postDate = new Date(postingDate);
    const differenceInMilliseconds = today.getTime() - postDate.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
  }
  
}
