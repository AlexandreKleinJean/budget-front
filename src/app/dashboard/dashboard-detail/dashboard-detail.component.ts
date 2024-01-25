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
  totalExpenses: number | undefined;

  constructor(private transactionListComponent: TransactionListComponent){}

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

    /*-----------Récupération du total des dépenses du compte----------*/

    // je m'abonne à l'event de l'enfant TransactionListComponent
    this.transactionListComponent.totalExpensesEvent.subscribe((totalExpenses: number) => {
      // je stocke la valeur dans ma variable
      this.totalExpenses = totalExpenses;
    });
    console.log('(DashBoard-detail) total expenses:', this.totalExpenses);
  }

  /*--------Bouton BACK (retourner sur le dashboard)--------*/
  goBackToDashboard() {
    this.accountId = null;
  }
}

