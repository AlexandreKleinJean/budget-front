import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  imports: [CommonModule],
  standalone: true
})

export class UserListComponent implements OnInit {
  usersList: User[] = [];

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit() {
    try {
      this.usersList = await this.userService.getUserList();
    } catch (error) {
      console.error('PROBLEME:', error);
    }
  }

  goToOneUser(user: User){
    this.router.navigate(['/user', user.id])
  }

}
