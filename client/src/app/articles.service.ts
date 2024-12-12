import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private apiUrl = 'http://localhost:5000/api/articles'; 
  

  constructor(private http: HttpClient) {}

  getArticles(): Observable<unknown[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
