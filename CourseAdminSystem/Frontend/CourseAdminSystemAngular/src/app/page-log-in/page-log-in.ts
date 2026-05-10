import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  Email: string = '';
  Password: string = '';
  shitters: Shitter[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    // this.shitterService.getShitters().subscribe(
    //   (shitters) => {
    //     console.log('API response:', shitters);
    //     this.shitters = shitters;
    //   },
    //   (error) => {
    //     console.error('API error fetching shitters:', error);
    //   },
    // );
  }

  login(): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.shitterService.login(this.Email, this.Password).subscribe(
      (response: Shitter) => {
        console.log('Login successful:', response);
        this.isLoading = false;
        localStorage.setItem('shitterId', response.Shitterid.toString());
        this.router.navigate(['/shit-search']);
      },
      (error) => {
        this.isLoading = false;
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password.';
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      this.cdr.detectChanges();
      },
  );
}
}