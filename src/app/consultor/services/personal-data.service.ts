import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalDataDTO } from '../models/personal-data.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {
  private apiUrl = 'http://localhost:3000/personal-data';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllPersonalData(): Observable<PersonalDataDTO[]> {
    return this.http.get<PersonalDataDTO[]>(`${this.apiUrl}/getAllPersonalData`);
  }

  createPersonalData(dto: PersonalDataDTO, token: string): Observable<PersonalDataDTO> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.post<PersonalDataDTO>(`${this.apiUrl}/createPersonalData`, dto, httpOptions);
  }

  getPersonalDataByUserId(id: string): Observable<PersonalDataDTO> {
    return this.http.get<PersonalDataDTO>(`${this.apiUrl}/getPersonalDataByUserId/${id}`);
  }

  updatePersonalDataByUserId(dataDto: PersonalDataDTO, IdUser: string): Observable<PersonalDataDTO> {
    return this.http.put<PersonalDataDTO>(`${this.apiUrl}/PersonalDataByUserId/${IdUser}`, dataDto );
  }

}
