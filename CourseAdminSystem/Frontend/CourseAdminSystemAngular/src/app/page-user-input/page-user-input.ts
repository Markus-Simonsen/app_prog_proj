import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AShitService } from '../services/ashit-service';
import { AShit } from '../model/ashit';
import { ToiletService } from '../services/toilet-service';
import { Router } from '@angular/router';
import { Toilet } from '../model/toilet';

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

  newAShit: AShit = {
    ShitID: 0,
    Shitterid: 0,
    Toiletid: undefined,
    Time: new Date(),
    Rating: undefined,
    Review: '',
  };

  constructor(
    private ashitService: AShitService,
    private toiletService: ToiletService,
    private router: Router,) {
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

        // Step 2: use the returned toiletid for the ashit record
        this.newAShit.Toiletid = toilet.ToiletId;
        this.newAShit.Time = new Date();

        this.ashitService.createAShit(this.newAShit).subscribe(
          (response: AShit) => {
            console.log('AShit created:', response);
            this.router.navigate(['/thank-you']);
          },
          (error) => {
            console.error('Error creating ashit record:', error);
          },
        );
      },
      (error) => {
        console.error('Error creating toilet:', error);
      },
    );
  }
}