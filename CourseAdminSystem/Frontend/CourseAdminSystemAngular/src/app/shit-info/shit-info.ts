import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Visit } from '../model/visit';
import { VisitService } from '../services/visit-service';
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
    private visitService: VisitService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {}
  toiletid: number = 0;
  shits: Visit[] = [];
  newVisit: Visit = {
    VisitID: 0,
    Userid: 0,
    Toiletid: 0,
    Time: new Date(),
    Rating: 0,
    Review: '',
  };

  ngOnInit(): void {
    console.log('VisitList ngOnInit called');
    this.route.params.subscribe((params: any) => {
      const id = params?.toiletid ? +params['toiletid'] : this.toiletid;
      this.toiletid = id;
      if (id) {
        this.loadShitsFromToilet(id, true);
      }
    });
  }

  loadShitsFromToilet(ToiletId: number, jointables: boolean): void {
    console.log('loadShits called with ToiletId:', ToiletId);
    this.visitService.getShitsByToiletId(ToiletId, jointables).subscribe(
      (moreshits: Visit[]) => {
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
