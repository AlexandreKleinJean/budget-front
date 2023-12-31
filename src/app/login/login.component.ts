import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import{ ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  imports: [CommonModule],
  standalone: true
})

export class LoginComponent implements OnInit {

    constructor(
      private route: ActivatedRoute,
      private router: Router,
    ) {}

    async ngOnInit() {
    }

}
