import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AdditionalDataDTO } from '../models/additional-data.model';

@Injectable({
  providedIn: 'root'
})
export class AdditionalDataService {
  private apiUrl = 'http://localhost:3000/additional-data';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createAdditionalData(dto: AdditionalDataDTO, token: string): Observable<AdditionalDataDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    }
    return this.http.post<AdditionalDataDTO>(`${this.apiUrl}/createAdditionalInfo`, dto, httpOptions);
  }

  getAllAdditionalDataByUserId(IdUser: string): Observable<AdditionalDataDTO[]> {
    return this.http.get<AdditionalDataDTO[]>(`${this.apiUrl}/findAllAdditionalInfoByIdUser/${IdUser}`);
  }


  updateAdditionalDatanById(proexp: AdditionalDataDTO, id: string): Observable<AdditionalDataDTO> {
    return this.http.put<AdditionalDataDTO>(`${this.apiUrl}/updateAdditionalInfo/${id}`, proexp);
  }


  deleteAdditionalDataById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/removeAdditionalInfoById/${id}`);
  }
}
