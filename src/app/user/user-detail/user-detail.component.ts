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

  async ngOnInit() {
    const userId: string | null = this.route.snapshot.paramMap.get('id');
    if (userId) {
      try {
        this.user = await this.userService.getOneUserById(+userId);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
  }

  goToUserList() {
    this.router.navigate(['/users']);
  }

  /*goToEditUserForm(user: User) {
    this.router.navigate(['/edit/user', user.id]);
  }*/
}

