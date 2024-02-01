import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

import{ RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: `./auth-login.component.html`,
  styleUrl:`./auth-login.component.css`,
  imports: [FormsModule, RouterLink],
  standalone: true
})

export class AuthLoginComponent implements OnInit {
    user: User|undefined;
    email: string = '';
    password: string = '';
    loggedInUser: User | undefined;
    loggedInUserId: number | undefined;

    constructor(
      private authService:  AuthService,
      private router:  Router
    ) {}

    async ngOnInit() {
    }
    /*------------------------Bouton de connection--------------------*/
    async onSubmit() {
      try {
        // AuthService => récupérer le user de l'API
        const user = await this.authService.login(this.email, this.password);

        if (user) {
          // le user existe
          console.log('Authentification réussie', user);
          // Je redirige vers le dashboard
          this.router.navigate(['/account/list']);

        } else {
          // le user n'existe pas
          console.error('Erreur d\'authentification');
        }
      } catch (error) {
        console.error('Erreur lors de l\'authentification:', error);
      }
    }

    /*--------Bouton pour aller sur le formulaire d'inscription--------*/
    /*goToRegistration(){
      this.router.navigate(['/register'])
    }*/
  }
