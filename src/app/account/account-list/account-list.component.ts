import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Transaction } from '../../transaction/transaction';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { amountByCategory, totalAmount } from '../../utils/expense.util';
import { SharedService } from '../../shared-services/expenses.shared-service';
import { AuthService } from 'src/app/auth/auth.service';
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
  dataLoading: boolean = false;

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
    private sharedService: SharedService,
    private authService: AuthService
  ) {}

  //********************* INITIALIZATION **********************/
  ngOnInit() {
    // AuthService => abo à l'observable currentUser$ => récupération User connecté
    this.authService.currentUser$.subscribe(u => {
      if (u) {
        console.log('User connected:', u);
        // Récupérer l'ID de l'utilisateur à partir de l'objet User
        this.userId = +u;

        // AccountService => récupérer les comptes de l'utilisateur
        this.accountService.getAccountsByUser(this.userId).subscribe({
          next: (accounts) => {
            this.accountsList = accounts;
            // Je boucle sur chaque compte
            this.accountsList.forEach(account => {
              // TransactionService => récupérer les transactions
              this.loadTransactionsByAccount(account.id);
            });
            this.dataLoading = true;
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

