import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shitter } from '../model/shitter';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './page-log-in.html',
  styleUrl: './page-log-in.css',
})
export class PageLogIn implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  Email: string = '';
  Password: string = '';
  shitters: Shitter[] = []; 
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {}

  login(): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.Email, this.Password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/shit-search']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err.message === 'Invalid email or password.'
            ? 'Invalid email or password.'
            : 'Something went wrong. Please try again.';
      },
    });
  }
}
