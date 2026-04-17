import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AShit } from '../model/ashit';
import { AShitService } from '../services/ashit-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shit-info',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './shit-info.html',
  styleUrl: './shit-info.css',
})
export class ShitInfo implements OnInit {
  constructor(
    private ashitService: AShitService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {}
  toiletid: number = 0;
  shits: AShit[] = [];
  newAShit: AShit = {
    ShitID: 0,
    Shitterid: 0,
    ToiletId: 0,
    Time: new Date(),
    Rating: 0,
    Review: '',
  };

  ngOnInit(): void {
    console.log('AshitList ngOnInit called');
    this.route.params.subscribe((params: any) => {
      this.toiletid = +params['toiletid'];
      this.loadShitsFromToilet(this.toiletid, true);
    });
  }

  loadShitsFromToilet(ToiletId: number, jointables: boolean): void {
    console.log('loadShits called with ToiletId:', ToiletId);
    this.ashitService.getShitsByToiletId(ToiletId, jointables).subscribe(
      (moreshits: AShit[]) => {
        console.log('API response received:', moreshits);
        console.log('Number of records:', moreshits.length);
        console.log('After assignment, this.shits:', this.shits);

        this.shits = moreshits;
        console.log('After assignment, this.shits:', this.shits);
        this.cdr.detectChanges(); // Force change detection
      },
      (error) => {
        console.error('API error fetching more shits:', error);
      },
    );
  }
}
