import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Shitter } from '../model/shitter';
import { ShitterService } from '../services/shitter-service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-shitter-list',
  templateUrl: './shitter-list.html',
  styleUrl: './shitter-list.css',
  imports: [CommonModule, DatePipe],
})
export class ShitterList implements OnInit {
  constructor(
    private shitterService: ShitterService,
    private cdr: ChangeDetectorRef,
  ) {}
  shitters: Shitter[] = [];

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
    return shitter.shitterid;
  }
}
