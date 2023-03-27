import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfessionalExperienceDTO } from '../models/pro-experience.model';

@Injectable({
  providedIn: 'root'
})
export class ProExperienceService {

  private apiUrl = 'http://localhost:3000/professional-experience';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createProfessionalExperience(dto: ProfessionalExperienceDTO, token: string): Observable<ProfessionalExperienceDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    }
    return this.http.post<ProfessionalExperienceDTO>(`${this.apiUrl}/createProExperience`, dto, httpOptions);
  }

  getAllProfessionalExperienceByUserId(IdUser: string): Observable<ProfessionalExperienceDTO[]> {
    return this.http.get<ProfessionalExperienceDTO[]>(`${this.apiUrl}/findAllProExperienceByIdUser/${IdUser}`);
  }


  updateProfessionalExperiencenById(proexp: ProfessionalExperienceDTO, id: string): Observable<ProfessionalExperienceDTO> {
    return this.http.put<ProfessionalExperienceDTO>(`${this.apiUrl}/updateById/${id}`, proexp);
  }


  deleteProfessionalExperienceById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/removeProExperienceById/${id}`);
  }
}
