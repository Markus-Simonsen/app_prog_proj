import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShitterList } from './shitter-list/shitter-list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ShitterList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('CourseAdminSystemAngular');
}
