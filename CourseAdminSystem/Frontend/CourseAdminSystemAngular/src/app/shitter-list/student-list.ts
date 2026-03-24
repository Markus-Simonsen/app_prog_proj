import { Component } from '@angular/core';
import { StudentCard } from '../student-card/student-card';
import { Student } from '../model/shitter';

@Component({
  selector: 'app-student-list',
  imports: [StudentCard],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  students: Student[] = [
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      studyProgram: 1,
      dob: new Date(2000, 1, 1),
      email: 'jane.doe@mailinator.com',
      phone: '+4511111111',
    },
    {
      id: 2,
      firstName: 'Super',
      lastName: 'Man',
      studyProgram: 2,
      dob: new Date(2002, 2, 28),
      email: 'super.man@mailinator.com',
      phone: '+4522222222',
    },
    {
      id: 3,
      firstName: 'Super',
      lastName: 'Woman',
      studyProgram: 1,
      dob: new Date(2001, 7, 1),
      email: 'super.woman@mailinator.com',
      phone: '+4533333333',
    },
  ];
}
