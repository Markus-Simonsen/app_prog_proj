import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AShitService } from '../services/ashit-service';
import { AShit } from '../model/ashit';

@Component({
  selector: 'app-ashit-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ashit-list.html',
  styleUrl: './ashit-list.css',
})
export class AshitList implements OnInit {
  AShit: AShit[] = [];
  newAShit: AShit = {
    ShitID: 0,
    Shitterid: 0,
    ToiletId: undefined,
    Time: new Date(),
    Rating: undefined,
    Review: ''
  };

  constructor(private ashitService: AShitService) {
    console.log('AshitList component created');
  }

  ngOnInit(): void {
    console.log('AshitList ngOnInit called');
    this.loadAShit();
  }

  loadAShit(): void {
    console.log('loadAShit called');
    this.ashitService.getMoreShits().subscribe(
      (moreshits: AShit[]) => {
        console.log('API response received:', moreshits);
        console.log('Number of records:', moreshits.length);
        this.AShit = moreshits;
      },
      (error) => {
        console.error('API error fetching more shits:', error);
      }
    );
  }

  createAShit(): void {
    //Auto-generated data before API call, to be deleted later
    this.newAShit.Time = new Date();
    this.newAShit.Shitterid = 1;
    this.ashitService.createAShit(this.newAShit).subscribe(
      (response: AShit) => {
        this.AShit.push(response);
        this.newAShit = {
          ShitID: 0,
          Shitterid: 0,
          ToiletId: undefined,
          Time: new Date(),
          Rating: undefined,
          Review: ''
        };
      },
      (error) => {
        console.error('Error creating shit record:', error);
      }
    );
  }
}
