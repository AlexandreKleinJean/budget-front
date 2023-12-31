import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';

import{ ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: `./user-login.component.html`,
  imports: [CommonModule, FormsModule],
  standalone: true
})

export class UserLoginComponent implements OnInit {
    user: User|undefined;
    email: string = '';
    password: string = '';

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService:  UserService
    ) {}

    async ngOnInit() {
    }

    async onSubmit() {
      try {
        const user = await this.userService.login(this.email, this.password);

        if (user) {
          // Authentification réussie
          console.log('Authentification réussie', user);
        } else {
          // Authentification échouée
          console.error('Erreur d\'authentification');
        }
      } catch (error) {
        // Gérer les erreurs de l'appel à la méthode login
        console.error('Erreur lors de l\'authentification:', error);
      }
    }
  }
