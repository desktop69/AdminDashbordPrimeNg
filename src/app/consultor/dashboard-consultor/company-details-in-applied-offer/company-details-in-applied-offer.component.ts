import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EntrepriseDTO } from '../../models/entreprise/profile-entreprise.model';
import { EntrepriseProfileService } from '../../services/entreprise/entreprise-profile.service';
import { SharedService } from '../entreprise/shared/shared';
import { ActivatedRoute } from '@angular/router';
import { ImageDTO } from '../../models/image.model';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-company-details-in-applied-offer',
  templateUrl: './company-details-in-applied-offer.component.html',
  styleUrls: ['./company-details-in-applied-offer.component.scss']
})
export class CompanyDetailsInAppliedOfferComponent {
  entrepriseData1: { [userId: string]: EntrepriseDTO & { nameE?: any } } = {};
  entreprise!: EntrepriseDTO;
  messages!: Message[];
  shared!: string;
  image!: ImageDTO;
  constructor(private imageService: ImageService,private sharedService: SharedService,private activatedRoute: ActivatedRoute, private entrepriseService: EntrepriseProfileService, private authService: AuthService, private messageService: MessageService) { }
  ngOnInit(): void {


    this.loadEntreprisedata();
    this.loadUserDataAndImage();

  }


  loadUserDataAndImage(): void {
    this.imageService.loadImageByUserId(this.activatedRoute.snapshot.params['id']).subscribe((data) => {
      this.image = data;
    },
      (error) => {
        console.error('Error loading image:', error);
      });
  }

  loadEntreprisedata(): void {
    this.entrepriseService.getEntrepriseById(this.activatedRoute.snapshot.params['id']).subscribe(
      (data) => {
          this.entreprise=data;
        console.log("offer", data);
      },
      (error) => {
        console.error('Error fetching entreprise data:', error);
      }
    );
  }

}
