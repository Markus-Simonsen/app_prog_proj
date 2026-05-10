import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from './services/auth';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Shitter } from './model/shitter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('CourseAdminSystemAngular');
  currentShitter$: Observable<Shitter | null>;

  constructor(private authService: AuthService) {
    this.currentShitter$ = this.authService.currentShitter$;
  }

  ngOnInit(): void {
    // Restore the user object from local storage immediately
    this.authService.restoreSession();
  }

  logout(): void {
    this.authService.logout();
  }
}
