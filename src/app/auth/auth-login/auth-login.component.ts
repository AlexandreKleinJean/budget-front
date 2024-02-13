import { Component } from '@angular/core';
import { User } from '../../user/user';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import{ RouterLink, Router } from '@angular/router';
import { BehaviorService } from 'src/app/shared-services/behavior.service';

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
      private router: Router,
      private behaviorService: BehaviorService
    ) {}

    /*------------------------Bouton de connection--------------------*/
    onSubmit() {

        // AuthService => récupérer le user de l'API
        this.authService.login(this.email, this.password).subscribe({

          next: (u) => {

            if(u){
              console.log('Authentification réussie', u);
              this.behaviorService.userId(u.id);
              this.behaviorService.notifState({type: 'success', message: 'Good to see you !'});
              this.router.navigate(['/account/list']);
            }
          },

        error: (error) => {
          console.error('Error:', error),
          this.behaviorService.notifState({ type: 'error', message: error });
        }
      })
  }
}
