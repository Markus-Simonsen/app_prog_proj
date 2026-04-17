import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-shit-map',
  imports: [],
  templateUrl: './shit-map.html',
  styleUrl: './shit-map.css',
})
export class ShitMap {
  location: number = 0;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.location = +params['location'];

      const map = L.map('map').setView([55.67, 12.56], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);
      var longitude = (this.location % 10000) / 100;
      var latitude = Math.floor(this.location / 10000) / 100;
      var marker = L.marker([latitude, longitude]).addTo(map);
    });
  }
}
