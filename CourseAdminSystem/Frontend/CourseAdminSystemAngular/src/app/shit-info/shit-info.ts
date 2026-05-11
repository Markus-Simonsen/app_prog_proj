import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AShit } from '../model/ashit';
import { AShitService } from '../services/ashit-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shit-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shit-info.html',
  styleUrl: './shit-info.css',
})
export class ShitInfo implements OnInit {
  currentUserId?: number;
  constructor(
    private ashitService: AShitService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  toiletid: number = 0;
  shits: AShit[] = [];
  newAShit: AShit = {
    ShitID: 0,
    Shitterid: 0,
    Toiletid: 0,
    Time: new Date(),
    Rating: 0,
    Review: '',
  };

  ngOnInit(): void {
    console.log('AshitList ngOnInit called');
    this.currentUserId = Number(localStorage.getItem('currentUserId')) || undefined;
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

  onLeaveReview(): void {
    if (this.currentUserId) {
      this.router.navigate(['/page-review'], {
        queryParams: {
          toiletid: this.toiletid,
          userid: this.currentUserId,
        },
      });
      return;
    }

    this.router.navigate(['/page-log-in'], {
      queryParams: {
        redirectTo: `/shit-info/${this.toiletid}`,
      },
    });
  }

  onSeeOnMap(): void {
    const location = this.shits[0]?.TheToilet?.Location;
    if (location) {
      this.router.navigate(['/shit-map', location]);
    }
  }
}
