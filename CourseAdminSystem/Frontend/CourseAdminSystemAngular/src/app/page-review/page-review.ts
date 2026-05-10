import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AShitService } from '../services/ashit-service';
import { AShit } from '../model/ashit';
import { AuthService } from '../services/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-review',
  standalone: true,
  templateUrl: './page-review.html',
  styleUrl: './page-review.css',
  imports: [CommonModule, FormsModule],
})
export class PageReview implements OnInit {
  constructor(
    private ashitService: AShitService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private AuthService: AuthService,
  ) {
    console.log('PageReview component created');
  }

  newAShit: AShit = {
    ShitID: 0,
    Shitterid: 0,
    Toiletid: undefined,
    Time: new Date(),
    Rating: undefined,
    Review: '',
  };

  ngOnInit(): void {
    console.log('PageReview ngOnInit called');
    this.route.params.subscribe((params: any) => {
      this.newAShit.Toiletid = +params['toiletid'];
    });
  }

  setRating(rating: number): void {
    this.newAShit.Rating = rating;
  }

  submitReview(): void {
    this.newAShit.Time = new Date();
    this.newAShit.Shitterid = this.AuthService.getCurrentShitter()?.Shitterid || 0;

    this.ashitService.createAShit(this.newAShit).subscribe(
      (response: AShit) => {
        console.log('Review submitted:', response);
        this.cdr.markForCheck();
        this.newAShit = {
          ShitID: 0,
          Shitterid: 0,
          Toiletid: undefined,
          Time: new Date(),
          Rating: undefined,
          Review: '',
        };
        this.router.navigate(['/thank-you']);
      },
      (error) => {
        console.error('Error submitting review:', error);
      },
    );
  }
}
