import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AShitService } from '../services/ashit-service';
import { AShit } from '../model/ashit';

@Component({
  selector: 'app-page-review',
  standalone: true,
  templateUrl: './page-review.html',
  styleUrl: './page-review.css',
  imports: [CommonModule, FormsModule],
})
export class PageReview implements OnInit {
  currentUserId?: number;
  constructor(
    private ashitService: AShitService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
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
    this.route.queryParams.subscribe((params) => {
      const toiletid = params['toiletid'];
      const userid = params['userid'];

      if (toiletid) {
        this.newAShit.Toiletid = Number(toiletid);
      }

      if (userid) {
        this.newAShit.Shitterid = Number(userid);
      }

      const storedUserId = Number(localStorage.getItem('currentUserId'));
      if (!this.newAShit.Shitterid && storedUserId) {
        this.newAShit.Shitterid = storedUserId;
      }

      this.currentUserId = this.newAShit.Shitterid;
    });
  }

  setRating(rating: number): void {
    this.newAShit.Rating = rating;
  }

  submitReview(): void {
    this.newAShit.Time = new Date();
    if (!this.newAShit.Shitterid) {
      const storedUserId = Number(localStorage.getItem('currentUserId'));
      this.newAShit.Shitterid = storedUserId || 0;
    }

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