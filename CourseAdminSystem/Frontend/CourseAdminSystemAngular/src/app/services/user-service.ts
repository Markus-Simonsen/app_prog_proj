import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost:5090/api';
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`);
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`);
  }
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/login`, {
      Email: email,
      Password: password,
    });
  }
  createUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/user`, user);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${id}`);
  }
  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${id}`, user);
  }
}
