import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentCard } from './student-card/student-card';
import { StudentList } from './student-list/student-list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, StudentCard, StudentList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('CourseAdminSystemAngular');
}
