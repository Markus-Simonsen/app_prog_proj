import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VisitService } from '../services/visit-service';
import { Visit } from '../model/visit';
import { ToiletService } from '../services/toilet-service';
import { Router } from '@angular/router';
import { Toilet } from '../model/toilet';
import { AuthService } from '../services/auth';
import { User } from '../model/user';

@Component({
  selector: 'app-page-user-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './page-user-input.html',
  styleUrl: './page-user-input.css',
})
export class PageUserInput implements OnInit {
  Longitude: number | null = null;
  Latitude: number | null = null;

  newVisit: Visit = {
    VisitID: 0,
    Userid: 0,
    Toiletid: undefined,
    Time: new Date(),
    Rating: undefined,
    Review: '',
  };

  constructor(
    private visitService: VisitService,
    private toiletService: ToiletService,
    private router: Router,
    private authService: AuthService,
  ) {
    console.log('PageUserInput component created');
  }

  ngOnInit(): void {
    console.log('PageUserInput ngOnInit called');
  }

  buildLocation(): number {
    return Math.round((this.Latitude ?? 0) * 10000 + (this.Longitude ?? 0));
  }

  submit(): void {
    if (this.Latitude === null || this.Longitude === null) {
      console.error('Latitude or Longitude is missing');
      return;
    }

    console.log('Location being sent:', this.buildLocation()); // temporary debug

    const newToilet: Toilet = {
      ToiletId: 0,
      Location: this.buildLocation(),
    };

    // Step 1: create the toilet
    this.toiletService.createToilet(newToilet).subscribe(
      (toilet: Toilet) => {
        console.log('Toilet created:', toilet);

        // Step 2: use the returned toiletid for the visit record
        this.newVisit.Toiletid = toilet.ToiletId;
        this.newVisit.Time = new Date();
        this.newVisit.Userid = this.authService.getCurrentUser()?.Userid ?? 0; // Get current user ID or default to 0

        this.visitService.createVisit(this.newVisit).subscribe(
          (response: Visit) => {
            console.log('Visit created:', response);
            this.router.navigate(['/thank-you']);
          },
          (error) => {
            console.error('Error creating visit record:', error);
          },
        );
      },
      (error) => {
        console.error('Error creating toilet:', error);
      },
    );
  }
}
