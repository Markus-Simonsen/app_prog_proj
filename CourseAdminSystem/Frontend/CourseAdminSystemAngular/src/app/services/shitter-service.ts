import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shitter } from '../model/shitter';

@Injectable({
  providedIn: 'root',
})
export class ShitterService {
  baseUrl: string = 'http://localhost:5090/api';
  constructor(private http: HttpClient) {}
  getShitters(): Observable<Shitter[]> {
    return this.http.get<Shitter[]>(`${this.baseUrl}/shitter`);
  }
  getShitter(id: number): Observable<Shitter> {
    return this.http.get<Shitter>(`${this.baseUrl}/shitter/${id}`);
  }
  createShitter(shitter: Shitter): Observable<any> {
    return this.http.post(`${this.baseUrl}/shitter`, shitter);
  }
  deleteShitter(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/shitter/${id}`);
  }
}
