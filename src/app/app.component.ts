import { Component} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './navBar/navBar.component';
import { NotificationComponent } from './notification/notification.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.css',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, NavBarComponent, NotificationComponent, FooterComponent]
})

export class AppComponent {
  constructor() {}
}
