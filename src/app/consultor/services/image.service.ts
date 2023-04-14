import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImageDTO } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:3000/upload-image';

  constructor(private http: HttpClient, private authService: AuthService) { }

  loadImageByUserId(IdUser: string): Observable<any> {
    return this.http.get<ImageDTO>(`${this.apiUrl}/loadImageByUserId/${IdUser}`);
  }
  
  loadImagesByUserIds(userIds: string[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/loadImagesByUserIds`, { userIds });
  }
  

  deleteImageByUserId(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteImageByUserId/${userId}`);
  }


  addImage(image: File): Observable<ImageDTO> {
    const formData = new FormData();
    formData.append('image', image);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`,
      }),
    };

    return this.http.post<ImageDTO>(`${this.apiUrl}/createImage`, formData, httpOptions);
  }


  updateImageByUserId(IdUser: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`,
      }),
    };

    return this.http.patch<any>(`${this.apiUrl}/updateImageByUserId/${IdUser}`, formData, httpOptions);
  }
}