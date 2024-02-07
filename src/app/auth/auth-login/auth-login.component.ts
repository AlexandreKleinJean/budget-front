import { Component } from '@angular/core';
import { User } from '../../user/user';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import{ RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: `./auth-login.component.html`,
  styleUrl:`./auth-login.component.css`,
  imports: [FormsModule, RouterLink],
  standalone: true
})

export class AuthLoginComponent {
    user: User|undefined;
    email: string = '';
    password: string = '';
    loggedInUser: User | undefined;
    loggedInUserId: number | undefined;
    loggedInUser$ = new BehaviorSubject<User | null>(null);

    constructor(
      private authService: AuthService,
      private router: Router
    ) {}

    /*------------------------Bouton de connection--------------------*/
    onSubmit() {

        // AuthService => récupérer le user de l'API
        this.authService.login(this.email, this.password).subscribe({

          next: (u) => {
            console.log('Authentification réussie', u);
            this.router.navigate(['/account/list']);
          },

        error: (error) => console.error('Error register:', error)
      })
  }

    /*--------Bouton pour aller sur le formulaire d'inscription--------*/
    /*goToRegistration(){
      this.router.navigate(['/register'])
    }*/
  }
