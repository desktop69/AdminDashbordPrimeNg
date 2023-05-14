
//import {OfferApplicationWithConsultant} from '../../models/offer/OfferApplicationWithConsultant.model'

import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/auth/services/auth.service";
import { OfferApplication } from "../../models/offer/OfferApplication.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { OfferApplicationWithConsultant } from "../../models/offer/offerapplicationwithconsultant.model";

@Injectable({
  providedIn: 'root'
})
export class OfferApplicationService {
  private apiUrl = 'http://localhost:3000/offer-application';

  constructor(private http: HttpClient, private authService: AuthService) { }

  applyForOffer(offerApplication: OfferApplication): Observable<any> {
    return this.http.post(`${this.apiUrl}/applyForOffer`, offerApplication);
  }
  getAppliedOffersByConsultantId(consultantId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/appliedOffers/${consultantId}`);
  }
  getOffersApplicationsByConsultantId(consultantId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getOffersApplicationsByConsultantId/${consultantId}`);
  }
  getOfferApplicationsByOffreId(id: string): Observable<OfferApplicationWithConsultant[]> {
    return this.http.get<OfferApplicationWithConsultant[]>(`${this.apiUrl}/getOffersApplicationsByOffreId/${id}`);
  }
  updateOfferApplication(updateData: OfferApplicationWithConsultant): Observable<OfferApplicationWithConsultant> {
    const offerApplicationId = updateData._id;
    const url = `${this.apiUrl}/updateOfferApplication/${offerApplicationId}`;
    return this.http.put<OfferApplicationWithConsultant>(url, updateData);
  }
  getAppliedOffers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getallofferapplication/`);
  }
  getOfferApplicationsByEntrepriseId(entrepriseID: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getOfferApplicationsByEntrepriseId/${entrepriseID}`);
  }
  // Get all offers applications by entreprise ID
  // add this method
  getOfferAppliByIdAndPending(entrepriseID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAppliByIdAndPending/${entrepriseID}`);
  }

  // add this method
  getAppliByIdAndApproved(entrepriseID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAppliByIdAndApproved/${entrepriseID}`);
  }

  // add this method
  getAppliByIdAndRejected(entrepriseID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAppliByIdAndRejected/${entrepriseID}`);
  }

  // add this method
  getAppliByIdAndHired(entrepriseID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAppliByIdAndHired/${entrepriseID}`);
  }

  // Get all offers applications by entreprise ID
  // add this method
  getOfferAppliByconsultIdAndPending(consultantId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getOfferAppliByconsultIdAndPending/${consultantId}`);
  }

  // add this method
  getAppliByconsultIdAndApproved(consultantId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAppliByconsultIdAndApproved/${consultantId}`);
  }

  // add this method
  getAppliByconsultIdAndRejected(consultantId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAppliByconsultIdAndRejected/${consultantId}`);
  }

  // add this method
  getAppliByconsultIdAndHired(consultantId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAppliByconsultIdAndHired/${consultantId}`);
  }
}


