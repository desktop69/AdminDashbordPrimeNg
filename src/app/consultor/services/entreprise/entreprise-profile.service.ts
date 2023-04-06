import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntrepriseDTO } from '../../models/entreprise/profile-entreprise.model';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseProfileService {

  private apiUrl = 'http://localhost:3000/entreprise';

  constructor(private http: HttpClient) {}

  // Methods for interacting with the API
  getEntrepriseById(id: string): Observable<EntrepriseDTO> {
    return this.http.get<EntrepriseDTO>(`${this.apiUrl}/getEntrepriseById/${id}`);
  }

  updateEntreprise(id: string, entrepriseDto: EntrepriseDTO): Observable<EntrepriseDTO> {
    return this.http.put<EntrepriseDTO>(`${this.apiUrl}/updateEntreprise/${id}`, entrepriseDto);
  }


  createEntreprise(entrepriseDto: EntrepriseDTO, token: string): Observable<EntrepriseDTO> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post<EntrepriseDTO>(`${this.apiUrl}/create`, entrepriseDto, httpOptions);
  }

}
