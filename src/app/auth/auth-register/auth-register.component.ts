import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { BehaviorService } from 'src/app/shared-services/behavior.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css'],
  imports: [FormsModule, RouterLink],
  standalone: true
})
export class AuthRegisterComponent {
  gender: string = '';
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private behaviorService: BehaviorService
  ) {}

  onRegister() {

    // AuthService => créer un user en API
      this.authService.register(
        this.gender,
        this.firstname,
        this.lastname,
        this.email,
        this.password
      ).subscribe({

        next:(u) => {
          console.log('Inscription réussie', u);
          this.behaviorService.notifState({type: 'success', message: 'Welcome to myBudget !'});
          this.router.navigate(['/auth/login']);
        },

        error: (error) => {
          console.error('Error:', error),
          this.behaviorService.notifState({ type: 'error', message: error });
        }
      })
  }
}
