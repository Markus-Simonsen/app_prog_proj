import { Component, OnInit } from '@angular/core';
import { Shitter } from '../model/shitter';
import { ShitterService } from '../services/shitter-service';

@Component({
  selector: 'app-shitter-list',
  templateUrl: './shitter-list.html',
  styleUrl: './shitter-list.css',
})
export class ShitterList implements OnInit {
  constructor(private shitterService: ShitterService) {}
  students: Shitter[] = [];

  ngOnInit(): void {
    this.shitterService.getShitters().subscribe(
      (shitters) => {
        console.log('API response:', shitters);
        this.students = shitters;
      },
      (error) => {
        console.error('API error fetching students:', error);
      },
    );
  }
}
