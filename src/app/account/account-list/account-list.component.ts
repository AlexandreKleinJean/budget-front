import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Transaction } from '../../transaction/transaction';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { amountByCategory, totalAmount } from '../../utils/expense.util';
import { ExpensesStorageService } from '../../shared-services/expensesStorage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ForecastVisualComponent } from 'src/app/forecast/forecast-visual/forecast-visual.component';
import { BehaviorService } from 'src/app/behavior.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css',
  imports: [RouterLink, ForecastVisualComponent],
  standalone: true
})

export class AccountListComponent implements OnInit {
  userId: number | null;
  dataLoading: boolean = false;

  totalExpensesByAccount: {[accountId: number]: number} = {};
  categoryExpensesByAccount: {[accountId: number]: {[category: string]: number }} = {};

  accountsList: Account[] = [];
  transactionsList: Transaction[] = [];

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private storageService: ExpensesStorageService,
    private behaviorService: BehaviorService
  ) {}

  //********************* INITIALIZATION **********************/
  ngOnInit() {

    // BehaviorService => récupération User connecté ( dans observable$ )
    this.behaviorService.currentUser$.subscribe((userId) => {
      console.log('AccountList => Observable User ID =>', userId);

      if (userId) {
        this.userId = userId;

        // AccountService => récupérer les comptes de l'utilisateur
        this.accountService.getAccountsByUser(this.userId).subscribe({
          next: (accounts) => {
            this.accountsList = accounts;
            // Je boucle sur chaque compte
            this.accountsList.forEach(account => {
              // TransactionService => récupérer les transactions
              this.loadTransactionsByAccount(account.id);
            });
            // BehaviorService => statut de data = TRUE
            this.behaviorService.dataState(true);
          },
          error: (error) => console.error('Error fetching accounts:', error)
        });

      } else {
        console.log('No user connected.');
      }
    });
  }

  //************************* TRANSACTIONS LOADING *************************/
  loadTransactionsByAccount(accountId: number) {
    this.transactionService.getTransactionsByAccount(accountId).subscribe({

      next: (transactions) => {
        // TotalAmount() => calcul du montant total [par account]
        this.totalExpensesByAccount[accountId] = totalAmount(transactions);

        // AmountByCategory() => calcul du montant de chaque category [par account]
        this.categoryExpensesByAccount[accountId] = amountByCategory(transactions);

        // SharedService => je stock les calculs
        this.storageService.setTotalExpensesByAccount(this.totalExpensesByAccount);
        this.storageService.setCategoryExpensesByAccount(this.categoryExpensesByAccount);
      },

      error: (error) => console.error(`Error fetching transactions by account ${accountId}:`, error)
    });
  }

  //**************** ACCOUNT CLIC = (ACCOUNT ID => BEHAVIORSUBJECT) ****************/
  saveAccountId(accountId: number){
    // je stocke accountId dans le behaviorSubject
    this.behaviorService.accountId(accountId);
  }
}

