import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountListComponent } from '../account/account-list/account-list.component';
import { ForecastVisualComponent } from '../forecast/forecast-visual/forecast-visual.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [RouterLink, AccountListComponent, ForecastVisualComponent],
  standalone: true
})

export class DashBoardComponent {

  constructor(
  ) {}

}

