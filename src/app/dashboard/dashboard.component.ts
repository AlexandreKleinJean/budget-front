import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountListComponent } from '../account/account-list/account-list.component';
import { TransactionListComponent } from '../transaction/transaction-list/transaction-list.component';
import { ForecastVisualComponent } from '../forecast/forecast-visual/forecast-visual.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [RouterLink, AccountListComponent, TransactionListComponent, ForecastVisualComponent],
  standalone: true
})

export class DashBoardComponent implements OnInit {
  userId: number | null;
  accountId: Number | null = null;

  constructor(){}

  ngOnInit() {

    /*--------------------Récupération de l'id du user connecté----------------------*/
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    console.log('(DashBoard) userID:', loggedInUserId);

    if(loggedInUserId){
      this.userId =+ loggedInUserId;
    }
  }
}

