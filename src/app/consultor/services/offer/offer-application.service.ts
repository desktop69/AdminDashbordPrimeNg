import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferApplication } from '../../models/offer/OfferApplication.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OfferApplicationService {
  private apiUrl = 'http://localhost:3000/offer-application';

  constructor(private http: HttpClient, private authService: AuthService) {}

  applyForOffer(offerApplication: OfferApplication): Observable<any> {

    return this.http.post(`${this.apiUrl}/applyForOffer`, offerApplication);
  }


  getAppliedOffersByConsultantId(consultantId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/appliedOffers/${consultantId}`);
  }
  

  getOffersApplicationsByConsultantId(consultantId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getOffersApplicationsByConsultantId/${consultantId}`);
  }
  
}
