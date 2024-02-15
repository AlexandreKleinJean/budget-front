import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';
import{ RouterLink, Router } from '@angular/router';
import { BehaviorService } from 'src/app/shared-services/behavior.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  templateUrl: `./auth-login.component.html`,
  styleUrl:`./auth-login.component.css`,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
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

    //****************** Bouton de connection ************************/
    onSubmit() {

      // ReactiveLoginForm => récupérer les values d'input
      if (this.reactiveLoginForm.valid) {
        const email: string = this.reactiveLoginForm.get('email').value;
        const password = this.reactiveLoginForm.get('password').value;

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
    }
  }
}
