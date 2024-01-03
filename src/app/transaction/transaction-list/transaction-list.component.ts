import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { Account } from 'src/app/account/account';
import { AccountService } from 'src/app/account/account.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  imports: [CommonModule],
  standalone: true
})

export class TransactionListComponent implements OnInit {
  selectedAccountId: number | null;
  transactionsListByAccount: Transaction[] = [];
  loggedInUserId: number | null;
  accountsListByUser: Account[] = [];

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private authService: AuthService
  ) {}

  async ngOnInit() {

    try {
      // J'appelle AccountService => récupérer l'ID de l'account sélectionné
      this.selectedAccountId = this.accountService.selectedAccountId;
      console.log("id du compte :" + this.selectedAccountId)

      if (this.selectedAccountId) {
        // J'appelle TransactionService => afficher transactions liées à l'account
        this.transactionsListByAccount = await this.transactionService.getTransactionsByAccount(this.selectedAccountId);
        console.log("transactions:"+this.transactionsListByAccount)

      } else {
        console.error('No account with this id');
      }
    } catch (error) {
      console.error('PROBLEME:', error);
    }
  }

  async goBackToAccountList() {
    // J'appelle AuthService => récupérer l'ID du user connecté
    const loggedInUserId = this.authService.getLoggedInUserId();

    if (loggedInUserId) {
      try {
        // J'appelle AccountService => afficher les accounts liés au user connecté
        const accounts = await this.accountService.getAccountsByUser(loggedInUserId);

        // Je navigue vers la liste des comptes
        this.router.navigate(['/accounts']);

      } catch (error) {
        console.error('Fetch error :', error);
      }
    } else {
      console.error('UserId undefined');
    }
  }


  goToOneTransaction(transaction: Transaction){
    this.router.navigate(['/transaction', transaction.id])
  }

}

