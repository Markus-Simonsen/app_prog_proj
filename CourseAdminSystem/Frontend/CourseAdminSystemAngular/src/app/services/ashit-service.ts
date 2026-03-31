import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AShit } from '../model/ashit';

@Injectable({
  providedIn: 'root',
})
export class AShitService {
  baseUrl: string = "http://localhost:5090/api";
  constructor(private http: HttpClient) { }
  getMoreShits(): Observable<AShit[]> {
  return this.http.get<AShit[]>(`${this.baseUrl}/ashit`);
  }
  getAShit(id: number): Observable<AShit> {
  return this.http.get<AShit>(`${this.baseUrl}/ashit/${id}`);
  }
  createAShit(ashit: AShit): Observable<any> {
  return this.http.post(`${this.baseUrl}/ashit`, ashit);
  }
  deleteAShit(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/ashit/${id}`);
  }
}
