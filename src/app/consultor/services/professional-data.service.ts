import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfessionalData } from '../models/ProfessionalData.model';


@Injectable({
  providedIn: 'root'
})
export class ProfessionalDataService {

  private apiUrl = 'http://localhost:3000/professional-data';
  constructor(private http: HttpClient, private authService: AuthService) {
    const loggedInUserId = this.authService.getLoggedInUserId();

  }

  FindProfessionalDataById(id :string): Observable<ProfessionalData> {
   // const loggedInUserId = this.authService.getLoggedInUserId();

    console.log(" here calling the service");
    return this.http.get<ProfessionalData>(`${this.apiUrl}/getProfessionalDataByIdUser/${id}`);

  }
  updateProfessionalDataById(data: ProfessionalData): Observable<ProfessionalData> {
    const loggedInUserId = this.authService.getLoggedInUserId();
    return this.http.put<ProfessionalData>(`${this.apiUrl}/updateProfessionalDataByUserId/${loggedInUserId}`, data);
  }
  // deleteProfessionalData
  DeletePersonalDataByUserId(): Observable<ProfessionalData> {
    const loggedInUserId = this.authService.getLoggedInUserId();
    return this.http.delete<any>(`${this.apiUrl}/deleteProfessionalData/${loggedInUserId}`);
  }

  createPersonalData(data: ProfessionalData): Observable<ProfessionalData> {
    const token = this.authService.getToken();
    console.log(" Personal Data services token: " + token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    console.log(data)

    return this.http.post<ProfessionalData>(`${this.apiUrl}/create`, data, httpOptions);
  }

}