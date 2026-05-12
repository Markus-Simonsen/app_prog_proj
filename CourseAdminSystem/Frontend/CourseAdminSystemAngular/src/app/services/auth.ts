// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}

  /**
   * Login method that validates credentials against the users list
   */
  login(email: string, password: string): Observable<User | null> {
    return this.userService.login(email, password).pipe(
      tap((user) => {
        if (user) {
          this.currentUserSubject.next(user);
          localStorage.setItem('user_session', JSON.stringify(user));
        }
      }),
    );
  }

  /**
   * Logout method
   */
  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user_session');
  }

  /**
   * Get the current user synchronously (if you just need the value once)
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  /**
   * Restore session from localStorage on app startup
   */
  restoreSession(): void {
    const storedUser = localStorage.getItem('user_session');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (e) {
        console.error('Failed to parse stored user session', e);
      }
    }
  }
}
