import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  imports: [CommonModule, FormsModule],
})
export class UserList implements OnInit {
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}
  users: User[] = [];
  newUser: User = {
    Userid: 0,
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
  };

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        console.log('API response:', users);
        this.users = users;
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('API error fetching users:', error);
      },
    );
  }

  trackByUserId(index: number, user: User): number {
    return user.Userid;
  }

  createUser(): void {
    this.userService.createUser(this.newUser).subscribe(
      (response) => {
        console.log('User created:', response);
        // Reset form
        this.newUser = {
          Userid: this.users.length + 1, // This is just a placeholder. The backend should assign the ID.
          FirstName: '',
          LastName: '',
          Email: '',
          Password: '',
        };
        // Refresh list
        this.ngOnInit();
      },
      (error) => {
        console.error('Error creating user:', error);
      },
    );
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      (response) => {
        console.log('User deleted:', response);
        // Refresh list
        this.ngOnInit();
      },
      (error) => {
        console.error('Error deleting user:', error);
      },
    );
  }
}
