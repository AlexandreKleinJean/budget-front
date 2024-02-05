import { Component} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './navBar/navBar.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, NavBarComponent]
})

export class AppComponent {
  constructor(
    private authService: AuthService
  ) {}

}
