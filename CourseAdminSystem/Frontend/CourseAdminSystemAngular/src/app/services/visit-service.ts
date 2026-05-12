import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visit } from '../model/visit';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  baseUrl: string = 'http://localhost:5090/api';
  constructor(private http: HttpClient) {}
  getMoreShits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${this.baseUrl}/visit`);
  }
  getVisit(id: number): Observable<Visit> {
    return this.http.get<Visit>(`${this.baseUrl}/visit/${id}`);
  }
  createVisit(visit: Visit): Observable<any> {
    return this.http.post(`${this.baseUrl}/visit`, visit);
  }
  deleteVisit(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/visit/${id}`);
  }
  getShitsByToiletId(toiletId: number, jointables: boolean): Observable<Visit[]> {
    return this.http.get<Visit[]>(
      `${this.baseUrl}/visit?toiletId=${toiletId}&jointables=${jointables}`,
    );
  }
}
