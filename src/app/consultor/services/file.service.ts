import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FileDTO } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'http://localhost:3000/upload-files';
  constructor(private http: HttpClient, private authService: AuthService) {}

  addFile(file: File): Observable<FileDTO> {
    const formData = new FormData();
    formData.append('file', file);

    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<FileDTO>(`${this.apiUrl}/createFile`, formData, {
      headers,
    });
  }

  
  deletefile(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteFileById/${userId}`);
  }

  
  getFileByUserId(userId: string): Observable<FileDTO[]> {
    return this.http.get<FileDTO[]>(`${this.apiUrl}/getAllFilesByUserId/${userId}`);
  }


  updateFileById(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.patch(`${this.apiUrl}/updateFileById/${id}`, formData);
  }

}
