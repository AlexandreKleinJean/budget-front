import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  imports: [],
  standalone: true
})

export class UserListComponent implements OnInit {
  usersList: User[] = [];

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {

      this.userService.getUserList().subscribe({

        next: (allUsers) => {
          this.usersList = allUsers;
        },
        error: (error) => console.error('Error fetching users:', error),
        complete: () => console.log('Users fetch completed')
      });
  }

  goToOneUser(user: User){
    this.router.navigate(['/user', user.id])
  }

}
