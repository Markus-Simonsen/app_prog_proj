import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VisitService } from '../services/visit-service';
import { Visit } from '../model/visit';
import { AuthService } from '../services/auth';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-review',
  standalone: true,
  templateUrl: './page-review.html',
  styleUrl: './page-review.css',
  imports: [CommonModule, FormsModule, RouterLink],
})
export class PageReview implements OnInit {
  constructor(
    private visitService: VisitService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private AuthService: AuthService,
  ) {
    console.log('PageReview component created');
  }

  newVisit: Visit = {
    VisitID: 0,
    Userid: 0,
    Toiletid: undefined,
    Time: new Date(),
    Rating: undefined,
    Review: '',
  };
  currentUser: any = null;

  ngOnInit(): void {
    console.log('PageReview ngOnInit called');
    this.route.params.subscribe((params: any) => {
      this.newVisit.Toiletid = +params['toiletid'];
    });
    this.currentUser = this.AuthService.getCurrentUser();
  }

  setRating(rating: number): void {
    this.newVisit.Rating = rating;
  }

  submitReview(): void {
    const currentUser = this.AuthService.getCurrentUser();
    if (!currentUser) {
      console.warn('Cannot submit review: user is not logged in.');
      return;
    }

    this.newVisit.Time = new Date();
    this.newVisit.Userid = currentUser.Userid;

    this.visitService.createVisit(this.newVisit).subscribe(
      (response: Visit) => {
        console.log('Review submitted:', response);
        this.cdr.markForCheck();
        this.newVisit = {
          VisitID: 0,
          Userid: 0,
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
