import { Component} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrl: './navBar.component.css',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink]
})

export class NavBarComponent {
  constructor(
    private authService: AuthService
  ) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  onLogout() {
    this.authService.logout();
  }
}
