// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Shitter } from '../model/shitter';
import { HttpClient } from '@angular/common/http';
import { ShitterService } from './shitter-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentShitterSubject = new BehaviorSubject<Shitter | null>(null);
  public currentShitter$: Observable<Shitter | null> = this.currentShitterSubject.asObservable();

  constructor(
    private http: HttpClient,
    private shitterService: ShitterService,
  ) {}

  /**
   * Login method that validates credentials against the shitters list
   */
  login(email: string, password: string): Observable<Shitter[]> {
    return this.shitterService.getShitters().pipe(
      tap((shitters) => {
        // Find shitter with matching email and password
        const foundShitter = shitters.find((s) => s.Email === email && s.Password === password);

        if (foundShitter) {
          // Update the BehaviorSubject with the authenticated shitter
          this.currentShitterSubject.next(foundShitter);
          // Persist to localStorage for "stay logged in"
          localStorage.setItem('shitter_session', JSON.stringify(foundShitter));
        } else {
          throw new Error('Invalid email or password.');
        }
      }),
    );
  }

  /**
   * Logout method
   */
  logout(): void {
    this.currentShitterSubject.next(null);
    localStorage.removeItem('shitter_session');
  }

  /**
   * Get the current shitter synchronously (if you just need the value once)
   */
  getCurrentShitter(): Shitter | null {
    return this.currentShitterSubject.getValue();
  }

  /**
   * Restore session from localStorage on app startup
   */
  restoreSession(): void {
    const storedShitter = localStorage.getItem('shitter_session');
    if (storedShitter) {
      try {
        const shitter = JSON.parse(storedShitter);
        this.currentShitterSubject.next(shitter);
      } catch (e) {
        console.error('Failed to parse stored shitter session', e);
      }
    }
  }
}
