import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

import{ RouterLink } from '@angular/router';

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
    ) {}

    async ngOnInit() {
    }
    /*------------------------Bouton de connection--------------------*/
    async onSubmit() {
      try {
        // J'appelle la method de authService pour récupérer le user de l'API
        const user = await this.authService.login(this.email, this.password);

        if (user) {
          // Un user correspond
          console.log('Authentification réussie', user);

        } else {
          // Un user ne correspond pas
          console.error('Erreur d\'authentification');
        }
      } catch (error) {
        // Gérer les erreurs de l'appel à la méthode login
        console.error('Erreur lors de l\'authentification:', error);
      }
    }

    /*--------Bouton pour aller sur le formulaire d'inscription--------*/
    /*goToRegistration(){
      this.router.navigate(['/register'])
    }*/
  }
