import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shitter } from '../model/shitter';
import { ShitterService } from '../services/shitter-service';
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
    private shitterService: ShitterService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  Email: string = '';
  Password: string = '';
  shitters: Shitter[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.shitterService.getShitters().subscribe(
      (shitters) => {
        console.log('API response:', shitters);
        this.shitters = shitters;
      },
      (error) => {
        console.error('API error fetching shitters:', error);
      },
    );
  }

  login(): void {
    this.errorMessage = '';               // clear previous errors
    this.isLoading = true;                // show spinner / disable button

    this.shitterService.getShitters().subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/shit-search']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err.status === 401
            ? 'Invalid email or password.'
            : 'Something went wrong. Please try again.';
      },
    });
  }
}