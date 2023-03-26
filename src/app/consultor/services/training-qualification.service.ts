import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TrainingsQualificationsDTO } from '../models/trainingQualification.model';


@Injectable({
  providedIn: 'root'
})
export class TrainingQualificationService {
  private apiUrl = 'http://localhost:3000/trainings-qualifications';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // getAllTrainingQualification(): Observable<TrainingsQualificationsDTO[]> {
  //   return this.http.get<TrainingsQualificationsDTO[]>(`${this.apiUrl}/getAllTrainingsQualificationsData`)
  // }

  createTrainingQualification(dto: TrainingsQualificationsDTO, token: string): Observable<TrainingsQualificationsDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    }
    return this.http.post<TrainingsQualificationsDTO>(`${this.apiUrl}/createTrainingQualifcationsData`, dto, httpOptions);
  }

  getAllTrainingQualificationByUserId(IdUser: string): Observable<TrainingsQualificationsDTO[]> {
    return this.http.get<TrainingsQualificationsDTO[]>(`${this.apiUrl}/getAllTrainingsQualificationsByIUser/${IdUser}`);
  }

  updateTrainingQualificationByUserId(dataDto: TrainingsQualificationsDTO, IdUser: string): Observable<TrainingsQualificationsDTO> {
    return this.http.put<TrainingsQualificationsDTO>(`${this.apiUrl}/updateTrainingQualifcationsDataByIUser/${IdUser}`, dataDto);
  }

  updateTrainingQualificationById(trainingQualification: TrainingsQualificationsDTO, id: string): Observable<TrainingsQualificationsDTO> {
    return this.http.put<TrainingsQualificationsDTO>(`${this.apiUrl}/updateById/${id}`, trainingQualification);
}


  deleteTrainingQualificationByUserId(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteTrainingQualificationsDataById/${id}`);
  }

}

