import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { Account } from 'src/app/account/account';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css',
  imports: [CommonModule, RouterLink],
  standalone: true
})

export class TransactionListComponent implements OnInit {
  selectedAccountId: number | null;
  transactionsListByAccount: Transaction[] = [];
  loggedInUserId: number | null;
  accountsListByUser: Account[] = [];

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {}

  async ngOnInit() {

    try {
      // je récupère le accountId dans le localStorage
      const selectedAccountId = localStorage.getItem('selectedAccountId');
      console.log('(TransactionComponent) accountID:', selectedAccountId);

      if (selectedAccountId) {
        // J'appelle TransactionService => afficher transactions liées à l'account
        this.transactionsListByAccount = await this.transactionService.getTransactionsByAccount(Number(selectedAccountId));
      } else {
        console.error('No account with this id');
      }
    } catch (error) {
      console.error('Problem to get the transactions:', error);
    }
  }

  /*--------Bouton BACK (retourner sur la liste de accounts)--------*/
  async goBackToAccountList() {
    try {
      // je récupère le userId dans le localStorage
      const loggedInUserId = localStorage.getItem('loggedInUserId');

      if (loggedInUserId) {
        // J'appelle AccountService pour récupérer les comptes du loggedInUser
        this.accountsListByUser = await this.accountService.getAccountsByUser(Number(loggedInUserId));
      } else {
        console.error('UserId undefined');
      }
    } catch (error) {
      console.error('PROBLEME:', error);
    }
  }

}

