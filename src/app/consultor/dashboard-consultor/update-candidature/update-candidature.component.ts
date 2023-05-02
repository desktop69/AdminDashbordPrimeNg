import { Component, Input } from '@angular/core';
import { OfferApplicationWithConsultant } from '../../models/offer/offerapplicationwithconsultant.model';
import { StatusOption } from '../../models/entreprise/statusoptions.model';
import { OfferApplicationService } from '../../services/offer/offer-application.service';
import { JobOfferService } from '../../services/offer/job-offer.service';
import { SendNotificationRequest, WebSocketService } from '../../services/web-socket.service';
import { Offer } from '../../models/offer/offer.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-update-candidature',
  templateUrl: './update-candidature.component.html',
  styleUrls: ['./update-candidature.component.scss']
})
export class UpdateCandidatureComponent {
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  candidature!: OfferApplicationWithConsultant;
  app_obj!: OfferApplicationWithConsultant;
  currentOffer = new Offer();

  statusOptions: any[] = [
    { label: 'Pending', value: 'Pending', icon: 'pi pi-clock' },
    { label: 'Approved', value: 'Approved', icon: 'pi pi-check' },
    { label: 'Rejected', value: 'Rejected', icon: 'pi pi-times' },
    { label: 'Hired', value: 'Hired', icon: 'pi pi-briefcase' }
  ];
  constructor(private aplicationservices: OfferApplicationService,
    private notificationService: WebSocketService,
    private apiofferService: JobOfferService, private authService: AuthService,) { }


  updateStatus(event: any) {
    this.aplicationservices.updateOfferApplication(this.app_obj).subscribe((result) => {
      console.log("object updated to", result);
      this.notifyConsultantUpdated();
    })
  }



  showModalDialog() {
    this.displayModal = true;
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  closeModal() {
    this.displayModal = false;
    this.showPositionDialog('bottom');
  }
  closeButtomModal() {
    this.displayPosition = false;
    this.showPositionDialog('bottom');
  }
  closeAllModals() {
    this.displayModal = false
    this.displayPosition = false;
  }
  onSubmit(): void {
    this.closeAllModals()
  }

  loadDataforUpdate(data: OfferApplicationWithConsultant) {
    this.app_obj = data;
    this.getOffreTitle();
    this.showModalDialog();
    // console.log("App Obj Status:", this.app_obj.status);
  }
  async notifyConsultantUpdated() {
    const consultantId = this.app_obj.consultantId
    if (!consultantId) {
      console.log('Invalid authorization token');
      return;
    }
    const title = await this.getOffreTitle();
    const request: SendNotificationRequest = {
      OfferId: this.app_obj.offerId,
      senderId: this.app_obj.entrepriseId,
      recipientId: consultantId,
      content: `Hi ${this.app_obj.consultantObject.Name},
       we have an update for you concerning your job application for the <span class="color">${title}</span> 
      position. Your application status is currently ${this.app_obj.status} .`,
      category: "general"
    };
    console.log("notification template ", request)

    this.notificationService.sendNotification(request).subscribe(
      (notification) => {
        console.log('Notification sent:', notification);
      },
    );

  }

  async  getOffreTitle(): Promise<string> {
    this.apiofferService.getOfferId(this.app_obj.offerId).
      subscribe(offer => {
        this.currentOffer = offer;
        //console.log(this.currentOffer);
      });
    if (this.currentOffer) {
      return this.currentOffer.titleO
    } else {
      return ""
    }
  }



}
