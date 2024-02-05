import { Component, OnInit } from '@angular/core';

import{ ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  imports: [],
  standalone: true
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const userId: string | null = this.route.snapshot.paramMap.get('id');

    if (userId) {

      this.userService.getOneUserById(+userId).subscribe({

        next: (u) => {
          this.user = u;
        },
        error: (error) => console.error('Error fetching user:', error),
        complete: () => console.log('User fetch completed')
      });
    }
  }

  goToUserList() {
    this.router.navigate(['/users']);
  }

  /*goToEditUserForm(user: User) {
    this.router.navigate(['/edit/user', user.id]);
  }*/
}

