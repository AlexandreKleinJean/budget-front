import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';
import{ RouterLink, Router } from '@angular/router';
import { BehaviorService } from 'src/app/shared-services/behavior.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  templateUrl: `./auth-login.component.html`,
  styleUrl:`./auth-login.component.css`,
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true
})

export class AuthLoginComponent implements OnInit {
    user: User|undefined;
    loggedInUser: User | undefined;
    loggedInUserId: number | undefined;
    loggedInUser$ = new BehaviorSubject<User | null>(null);
    reactiveLoginForm: FormGroup;

    constructor(
      private authService: AuthService,
      private router: Router,
      private behaviorService: BehaviorService
    ) {}

    ngOnInit(){
      this.reactiveLoginForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required)
      })
    }

    //********************** Blur => msg d'erreur ************************/
    invalidField(fieldName: string) {
      const field = this.reactiveLoginForm.get(fieldName);
      if (field && field.invalid && field.value !== null) {
        if (fieldName === 'email') {
          this.behaviorService.notifState({type: 'error', message: 'Email is required in a valid format'});
        } else if (fieldName === 'password') {
          this.behaviorService.notifState({type: 'error', message: 'Password is required'});
        }
      }
    }

    //********************** Bouton de connection ************************/
    onSubmit() {

      // ReactiveLoginForm => récupérer les values d'input
      const email: string = this.reactiveLoginForm.get('email').value;
      const password: string = this.reactiveLoginForm.get('password').value;

      // Je check que les champs sont remplis
      if(email && password){

        // AuthService => récupérer le user de l'API
        this.authService.login(email, password).subscribe({

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

      } else {
        this.behaviorService.notifState({type: 'error', message: 'All inputs must have a value'});
      }

    }
}

