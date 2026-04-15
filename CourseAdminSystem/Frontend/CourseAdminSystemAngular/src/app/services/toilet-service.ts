import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Toilet } from '../model/toilet';

@Injectable({
  providedIn: 'root',
})
export class ToiletService {
  baseUrl: string = 'http://localhost:5090/api';

  constructor(private http: HttpClient) {}

  getToilets(): Observable<Toilet[]> {
    return this.http.get<Toilet[]>(`${this.baseUrl}/toilet`);
  }

  getToilet(id: number): Observable<Toilet> {
    return this.http.get<Toilet>(`${this.baseUrl}/toilet/${id}`);
  }

  createToilet(toilet: Toilet): Observable<Toilet> {
    return this.http.post<Toilet>(`${this.baseUrl}/toilet`, toilet);
  }

  deleteToilet(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/toilet/${id}`);
  }

  updateToilet(id: number, toilet: Toilet): Observable<any> {
    return this.http.put(`${this.baseUrl}/toilet/${id}`, toilet);
  }
}
