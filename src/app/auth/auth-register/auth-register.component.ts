import { Component, OnInit } from '@angular/core';
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
export class AuthRegisterComponent implements OnInit {
  gender: string = '';
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async onRegister() {
    try {
      const user = await this.authService.register(
        this.gender,
        this.firstname,
        this.lastname,
        this.email,
        this.password
      );

      if (user) {
        console.log('Inscription réussie', user);
        // Je redirige vers la page de connexion
        this.router.navigate(['/login']);
      } else {
        console.error('Inscription échouée');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  }
}
