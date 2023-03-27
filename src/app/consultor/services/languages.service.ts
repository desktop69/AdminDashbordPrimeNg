import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LanguageDTO } from '../models/langues.model';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  private apiUrl = 'http://localhost:3000/languages';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createLanguageDTO(dto: LanguageDTO, token: string): Observable<LanguageDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    }
    return this.http.post<LanguageDTO>(`${this.apiUrl}/createLangue`, dto, httpOptions);
  }

  getAllLanguageDTOByUserId(IdUser: string): Observable<LanguageDTO[]> {
    return this.http.get<LanguageDTO[]>(`${this.apiUrl}/findAllLanguesByIdUser/${IdUser}`);
  }


  updateLanguage(langedata: LanguageDTO, id: string): Observable<LanguageDTO> {
    return this.http.put<LanguageDTO>(`${this.apiUrl}/updateById/${id}`, langedata);
  }


  deleteLanguage(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/removeLangueById/${id}`);
  }
}
