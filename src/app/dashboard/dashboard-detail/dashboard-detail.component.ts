import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountDetailComponent } from 'src/app/account/account-detail/account-detail.component';
import { TransactionListComponent } from 'src/app/transaction/transaction-list/transaction-list.component';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrl: './dashboard-detail.component.css',
  imports: [RouterLink, AccountDetailComponent, TransactionListComponent],
  standalone: true
})

export class DashBoardDetailComponent implements OnInit {
  userId: number | null;
  accountId: Number | null = null;

  constructor(){}

  ngOnInit() {

    /*-----------------Récupération de l'id du user------------------*/
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    console.log('(DashBoard-detail) userID:', loggedInUserId);

    if(loggedInUserId){
      this.userId =+ loggedInUserId;
    }

    /*-----------Récupération de l'id du account sélectionné----------*/
    const selectedAccountId = localStorage.getItem('selectedAccountId');
    console.log('(DashBoard-detail) accountID:', selectedAccountId);
    if(selectedAccountId){
      this.accountId= +selectedAccountId
    }
  }

  /*--------Bouton BACK (retourner sur le dashboard)--------*/
  goBackToDashboard() {
    this.accountId = null;
  }
}

