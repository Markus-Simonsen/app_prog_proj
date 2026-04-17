import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToiletService } from '../services/toilet-service';
import { Toilet } from '../model/toilet';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shit-search',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './shit-search.html',
  styleUrl: './shit-search.css',
})
export class ShitSearch implements OnInit {
  Toilets: Toilet[] = [];
  Longitude: number = 0;
  Latitude: number = 0;
  constructor(private toiletService: ToiletService) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  extractLatitude(location: number): number {
    return (location % 10000) / 100;
  }

  extractLongitude(location: number): number {
    // Implementation for extracting longitude from location
    return Math.floor(location / 10000) / 100;
  }

  distanceToToilet(toilet: Toilet, location: number): number {
    const toiletLatitude = this.extractLatitude(toilet.Location);
    const toiletLongitude = this.extractLongitude(toilet.Location);
    const locationLatitude = this.extractLatitude(location);
    const locationLongitude = this.extractLongitude(location);

    // distance by pythagorean
    const latDiff = toiletLatitude - locationLatitude;
    const lonDiff = toiletLongitude - locationLongitude;
    const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
    return distance;
  }

  searchForToilets() {
    const location = this.Longitude * 100 + this.Latitude * 1000000;
    console.log('Searching for toilets near location:', location);
    this.toiletService.getToilets().subscribe((toilets) => {
      this.Toilets = toilets;
      console.log('API response received:', toilets);
      // Order toilets by distance to location
      this.Toilets.sort((a, b) => {
        const distanceA = this.distanceToToilet(a, location);
        const distanceB = this.distanceToToilet(b, location);
        return distanceA - distanceB;
      });
      console.log('Toilets sorted by distance:', this.Toilets);
    });
  }
}
