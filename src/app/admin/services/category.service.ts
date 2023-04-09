import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorieDto } from '../interface/categorie.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = "http://localhost:3000/categorie";

  constructor(private http: HttpClient) { }
  // Get all categories
  getAllCategories(): Observable<CategorieDto[]> {
    return this.http.get<CategorieDto[]>(`${this.apiUrl}/all`);
  }

  // Get a category by ID
  getCategoryById(id: string): Observable<CategorieDto> {
    return this.http.get<CategorieDto>(`${this.apiUrl}/get/${id}`);
  }

  // Get children of a category by ID
  getCategoryChildren(id: string): Observable<CategorieDto> {
    return this.http.get<CategorieDto>(`${this.apiUrl}/childrens/${id}`);
  }

  // Add a new category
  addCategory(category: CategorieDto): Observable<CategorieDto> {
    return this.http.post<CategorieDto>(`${this.apiUrl}/add`, category);
  }
  deltecategory(id: string): Observable<CategorieDto> {
    return this.http.delete<CategorieDto>(`${this.apiUrl}/deletecat/${id}`);
  }
  updateCategorie(categorie: CategorieDto) {
    console.log("Sending from Services  update request:", JSON.stringify(categorie, null, 2));
    return this.http.put<CategorieDto>(`${this.apiUrl}/update`, categorie);
  }
}
