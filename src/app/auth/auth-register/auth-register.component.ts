import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

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
    private authService: AuthService
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
          // Je redirige vers la page de connexion
          this.router.navigate(['/auth/login']);
        },

        error: (error) => console.error('Error register:', error),
      })
  }
}
