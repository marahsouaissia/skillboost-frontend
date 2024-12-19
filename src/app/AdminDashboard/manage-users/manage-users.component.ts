import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Si nécessaire pour les formulaires
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import {NgClass} from "@angular/common";
@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    NgClass,
    CommonModule, // Ajoutez CommonModule ici
    FormsModule,
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data; // Assign the array of users
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    );
  }


  onAddUser(): void {
    console.log('Navigate to Add User page.');
  }

  onEditUser(user: User): void {
    console.log('Navigate to Edit User page for user:', user);
  }

  onDeleteUser(user: User): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser( user._id ).subscribe(
        () => {
          console.log('User deleted successfully.');
          this.fetchUsers(); // Mettre à jour la liste des utilisateurs
        },
        (error: any) => {
          console.error('Error deleting user', error);
        }
      );
    }
  }

}
