import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Toilet } from '../model/toilet';
import { ToiletService } from '../services/toilet-service';

@Component({
  selector: 'app-toilet-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './toilet-list.html',
  styleUrl: './toilet-list.css',
})
export class ToiletList implements OnInit {
  toilets: Toilet[] = [];
  newToilet: Toilet = {
    ToiletId: 0,
    Location: 0,
  };

  constructor(private toiletService: ToiletService) {}

  ngOnInit(): void {
    this.loadToilets();
  }

  loadToilets(): void {
    this.toiletService.getToilets().subscribe(
      (toilets: Toilet[]) => {
        this.toilets = toilets;
      },
      (error: any) => {
        console.error('Error loading toilets:', error);
      },
    );
  }

  createToilet(): void {
    this.toiletService.createToilet(this.newToilet).subscribe(
      (response: Toilet) => {
        this.toilets.push(response);
        this.newToilet = {
          ToiletId: 0,
          Location: 0,
        };
      },
      (error: any) => {
        console.error('Error creating toilet:', error);
      },
    );
  }

  deleteToilet(id: number): void {
    this.toiletService.deleteToilet(id).subscribe(
      () => this.loadToilets(),
      (error: any) => {
        console.error('Error deleting toilet:', error);
      },
    );
  }

  trackByToiletId(index: number, toilet: Toilet): number {
    return toilet.ToiletId;
  }
}
