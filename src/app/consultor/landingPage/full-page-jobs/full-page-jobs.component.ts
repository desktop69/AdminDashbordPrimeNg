import { Component } from '@angular/core';
import { EntrepriseDTO } from '../../models/entreprise/profile-entreprise.model';
import { Offer } from '../../models/offer/offer.model';
import { EntrepriseProfileService } from '../../services/entreprise/entreprise-profile.service';
import { ImageService } from '../../services/image.service';
import { JobOfferService } from '../../services/offer/job-offer.service';

@Component({
  selector: 'app-full-page-jobs',
  templateUrl: './full-page-jobs.component.html',
  styleUrls: ['./full-page-jobs.component.scss']
})
export class FullPageJobsComponent {
  offers: Offer[] = [];
  rows: number = 10;
  totalRecords: number = 0;
  currentPage: number = 1;
  entrepriseData: { [userId: string]: (EntrepriseDTO & { image?: any }) } = {};
  entrepriseData1: { [userId: string]: EntrepriseDTO & { nameE?: any } } = {};


  offerEntreprise: Offer[] = [];
  image: any;
  constructor(private apiofferService: JobOfferService
    , private imageService: ImageService,
    private entrepriseService: EntrepriseProfileService) { }

  ngOnInit(): void {
    this.getOffers();
    this.apiofferService.getAllOffers().subscribe((offerEntreprise) => {
      this.offerEntreprise = offerEntreprise;
      offerEntreprise.forEach((offer) => {
        this.loadEntreprisedata(offer.IdUser);
        this.loadEntrepriseImage(offer.IdUser);
      });
    });

  }

  getOffers(): void {
    this.apiofferService.getAllOfferspagination(this.currentPage, this.rows).subscribe(response => {
      this.offers = response.offers;
      this.totalRecords = response.totalRecords;
    });
  }

  // getOffers(): void {
  //   this.apiofferService.getAllOffers().subscribe((response) => {
  //     this.offers = response
  //       .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  //       .slice(0, 5);
  //   });
  // }
  


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

      },
      (error) => {
        console.error('Error loading image:', error);
      }
    );
  }










  paginate(event: any): void {
    this.currentPage = event.page + 1;
    this.rows = event.rows;
    this.getOffers();
  }



  timeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

    if (diffInSeconds < 60) return `Now`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} days ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} months ago`;
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} years ago`;
  }
}



