import { Component, Input } from '@angular/core';
import { Student } from '../model/student';

@Component({
  selector: 'app-student-card',
  imports: [StudentCard],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css',
})
export class StudentCard {
  @Input() student!: Student;
}
