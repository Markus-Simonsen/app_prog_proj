import { Component, OnInit, computed, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToiletService } from '../services/toilet-service';
import { Toilet } from '../model/toilet';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shit-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './shit-search.html',
  styleUrls: ['./shit-search.css'],
})
export class ShitSearch implements OnInit {
  private toiletsSignal = signal<Toilet[]>([]);
  private latitudeSignal: WritableSignal<number | null> = signal(5512);
  private longitudeSignal: WritableSignal<number | null> = signal(1234);

  readonly Invalid = computed(() => {
    const latitude = this.latitudeSignal();
    const longitude = this.longitudeSignal();
    return (
      latitude == null ||
      longitude == null ||
      latitude < 5500 ||
      latitude > 5600 ||
      longitude < 1200 ||
      longitude > 1300
    );
  });

  constructor(private toiletService: ToiletService) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  get Toilets(): Toilet[] {
    return this.toiletsSignal();
  }

  set Toilets(value: Toilet[]) {
    this.toiletsSignal.set(value);
  }

  get Latitude(): number | null {
    return this.latitudeSignal();
  }

  set Latitude(value: number | string | null) {
    this.latitudeSignal.set(value === '' || value == null ? null : Number(value));
  }

  get Longitude(): number | null {
    return this.longitudeSignal();
  }

  set Longitude(value: number | string | null) {
    this.longitudeSignal.set(value === '' || value == null ? null : Number(value));
  }

  extractLatitude(location: number): number {
    return (location % 10000) / 100;
  }

  extractLongitude(location: number): number {
    return Math.floor(location / 10000) / 100;
  }

  distanceToToilet(toilet: Toilet, location: number): number {
    const toiletLatitude = this.extractLatitude(toilet.Location);
    const toiletLongitude = this.extractLongitude(toilet.Location);
    const locationLatitude = this.extractLatitude(location);
    const locationLongitude = this.extractLongitude(location);

    const latDiff = toiletLatitude - locationLatitude;
    const lonDiff = toiletLongitude - locationLongitude;
    return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
  }

  searchForToilets() {
    if (this.Invalid()) {
      return;
    }

    const latitude = this.Latitude as number;
    const longitude = this.Longitude as number;
    const location = longitude * 100 + latitude * 1000000;
    console.log('Searching for toilets near location:', location);

    this.toiletService.getToilets().subscribe((toilets) => {
      const sortedToilets = [...toilets].sort((a, b) => {
        const distanceA = this.distanceToToilet(a, location);
        const distanceB = this.distanceToToilet(b, location);
        return distanceA - distanceB;
      });

      this.toiletsSignal.set(sortedToilets);
      console.log('Toilets sorted by distance:', this.Toilets);
    });
  }
}
