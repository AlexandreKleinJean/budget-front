import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [RouterLink]
})

export class HomeComponent {

  constructor(
    private router: Router
  ) {}

  /*goToLogin(){
    this.router.navigate(['/login'])
  }

  goToRegistration(){
    this.router.navigate(['/register'])
  }*/
}
