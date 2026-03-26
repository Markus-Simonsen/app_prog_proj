import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Shitter } from '../model/shitter';
import { ShitterService } from '../services/shitter-service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shitter-list',
  templateUrl: './shitter-list.html',
  styleUrl: './shitter-list.css',
  imports: [CommonModule, DatePipe, FormsModule],
})
export class ShitterList implements OnInit {
  constructor(
    private shitterService: ShitterService,
    private cdr: ChangeDetectorRef,
  ) {}
  shitters: Shitter[] = [];
  newShitter: Shitter = {
    Shitterid: 0,
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
  };

  ngOnInit(): void {
    this.shitterService.getShitters().subscribe(
      (shitters) => {
        console.log('API response:', shitters);
        this.shitters = shitters;
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('API error fetching shitters:', error);
      },
    );
  }

  trackByShitterId(index: number, shitter: Shitter): number {
    return shitter.Shitterid;
  }

  createShitter(): void {
    this.shitterService.createShitter(this.newShitter).subscribe(
      (response) => {
        console.log('Shitter created:', response);
        // Reset form
        this.newShitter = {
          Shitterid: this.shitters.length + 1, // This is just a placeholder. The backend should assign the ID.
          FirstName: '',
          LastName: '',
          Email: '',
          Password: '',
        };
        // Refresh list
        this.ngOnInit();
      },
      (error) => {
        console.error('Error creating shitter:', error);
      },
    );
  }

  deleteShitter(id: number): void {
    this.shitterService.deleteShitter(id).subscribe(
      (response) => {
        console.log('Shitter deleted:', response);
        // Refresh list
        this.ngOnInit();
      },
      (error) => {
        console.error('Error deleting shitter:', error);
      },
    );
  }
}
