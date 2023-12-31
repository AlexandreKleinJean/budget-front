import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user';

import{ ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: `./user-login.component.html`,
  imports: [CommonModule],
  standalone: true
})

export class UserLoginComponent implements OnInit {
    user: User|undefined;
    email: string = '';
    password: string = '';

    constructor(
      private route: ActivatedRoute,
      private router: Router,
    ) {}

    async ngOnInit() {
    }

    onSubmit() {
      if (this.user) {
        console.log("Form submitted");
        this.router.navigate(['/user', this.user.id]);
      } else {
        console.log("User doesn't exist");
      }
    }

}
