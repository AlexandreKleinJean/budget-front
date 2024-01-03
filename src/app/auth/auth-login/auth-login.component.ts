import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

import{ ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: `./auth-login.component.html`,
  imports: [CommonModule, FormsModule],
  standalone: true
})

export class AuthLoginComponent implements OnInit {
    user: User|undefined;
    email: string = '';
    password: string = '';
    loggedInUser: User | undefined;
    loggedInUserId: number | undefined;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authService:  AuthService,
      private userService: UserService
    ) {}

    async ngOnInit() {
    }

    async onSubmit() {
      try {
        // J'appelle la method de authService pour récupérer le user de l'API
        const user = await this.authService.login(this.email, this.password);

        if (user) {
          // Un user correspond
          console.log('Authentification réussie', user);

          // Redirection vers la page des comptes
          this.router.navigate(['/accounts']);

        } else {
          // Un user ne correspond paas
          console.error('Erreur d\'authentification');
        }
      } catch (error) {
        // Gérer les erreurs de l'appel à la méthode login
        console.error('Erreur lors de l\'authentification:', error);
      }
    }

    goToRegistration(){
      this.router.navigate(['/register'])
    }
  }
