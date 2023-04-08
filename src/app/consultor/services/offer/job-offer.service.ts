import { Injectable } from '@angular/core';
import { Offer } from '../../models/offer/offer.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {
  private apiUrl = 'http://localhost:3000/offer';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createOffer(dto: Partial<Offer>, token: string): Observable<Offer>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    }
    return this.http.post<Offer>(`${this.apiUrl}/createOffer`, dto, httpOptions);
  }

  getAllOfferByUserId(IdUser: string): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/findAllOfferByIdUser/${IdUser}`);
  }


  updateOffer(langedata: Offer, id: string): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiUrl}/updateOfferById/${id}`, langedata);
  }


  deleteOffer(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/removeOfferById/${id}`);
  }

  getOfferId(IdUser: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.apiUrl}/getOfferbyId/${IdUser}`);
  }
  
}
