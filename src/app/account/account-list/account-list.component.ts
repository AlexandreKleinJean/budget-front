import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Transaction } from '../../transaction/transaction';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { amountByCategory, totalAmount } from '../../utils/expense.util';
import { SharedService } from '../../shared-services/expenses.shared-service';
import { ForecastVisualComponent } from 'src/app/forecast/forecast-visual/forecast-visual.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css',
  imports: [RouterLink, ForecastVisualComponent],
  standalone: true
})

export class AccountListComponent implements OnInit {
  userId: number | null;

  totalExpensesByAccount: {
    [accountId: number]: number
  } = {};

  categoryExpensesByAccount: {
    [accountId: number]: { [category: string]: number }
  } = {};

  accountsList: Account[] = [];
  transactionsList: Transaction[] = [];

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private sharedService: SharedService
  ) {}

  //********************* INITIALIZATION **********************/
  ngOnInit() {

    // LocalStorage => récupérer l'Id du user
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    console.log('(AccountList) userID:', loggedInUserId);

    if(loggedInUserId){
        this.userId =+ loggedInUserId;

          // AccountService => récupérer les accounts du user
          this.accountService.getAccountsByUser(this.userId).subscribe({

            next: (accounts) => {

              this.accountsList = accounts;

              // Je boucle sur chaque account
              this.accountsList.forEach(account => {
                // TransactionService => récupérer les transactions
                this.loadTransactionsByAccount(account.id);
              });
            },

            error: (error) => console.error('Error fetching accounts:', error)
          });

    } else {
      console.error('UserId undefined');
    }
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
        this.sharedService.setTotalExpensesByAccount(this.totalExpensesByAccount);
        console.log("Expense total du account " + accountId + " a été mis à jour");
        this.sharedService.setCategoryExpensesByAccount(this.categoryExpensesByAccount);
        console.log("Expense par catégorie du account " + accountId + " a été mis à jour");
      },

      error: (error) => console.error(`Error fetching transactions by account ${accountId}:`, error)
    });
  }

  //**************** ACCOUNT CLIC = (ACCOUNT ID => LOCAL STORAGE) ****************/
  saveAccountId(account: Account){
    // je stocke le accountId dans le localStorage
    localStorage.setItem('selectedAccountId', account.id.toString());
  }
}

