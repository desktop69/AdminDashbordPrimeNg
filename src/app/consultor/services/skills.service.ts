import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SkillsDTO } from '../models/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private apiUrl = 'http://localhost:3000/skills';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createSkill(dto: SkillsDTO, token: string): Observable<SkillsDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    }
    return this.http.post<SkillsDTO>(`${this.apiUrl}/create`, dto, httpOptions);
  }

  getAllSkillsDTOByUserId(IdUser: string): Observable<SkillsDTO[]> {
    return this.http.get<SkillsDTO[]>(`${this.apiUrl}/findAllSkillsByIdUser/${IdUser}`);
  }


  updateSkill(skilldata: SkillsDTO, id: string): Observable<SkillsDTO> {
    return this.http.put<SkillsDTO>(`${this.apiUrl}/updateById/${id}`, skilldata);
  }


  deleteSkill(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteskills/${id}`);
  }
}
