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
  async ngOnInit() {

    // LocalStorage => récupérer l'Id du user
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    console.log('(AccountList) userID:', loggedInUserId);

    if(loggedInUserId){
          this.userId =+ loggedInUserId;

        try {
          // AccountService => récupérer les accounts du user
          this.accountsList = await this.accountService.getAccountsByUser(+this.userId);

          // Je boucle sur chaque account
          for (let account of this.accountsList) {

            // AccountService => récupérer les transactions associées
            let transactions = await this.transactionService.getTransactionsByAccount(account.id);

            // TotalAmount() => calcul du montant total [par account]
            this.totalExpensesByAccount[account.id] = totalAmount(transactions);

            // AmountByCategory() => calcul du montant de chaque category [par account]
            this.categoryExpensesByAccount[account.id] = amountByCategory(transactions);

            // SharedService => je stock les calculs
            this.sharedService.setTotalExpensesByAccount(this.totalExpensesByAccount);
            console.log("Expense total du account" + account.id + "a été mis à jour")
            this.sharedService.setCategoryExpensesByAccount(this.categoryExpensesByAccount);
            console.log("Expense par catégorie du account" + account.id + "a été mis à jour")
          }
        } catch (error) {
          console.error('Error fetching accounts:', error);
        }

      } else {
        console.error('UserId undefined');
      }
  }

  //**************** ACCOUNT CLIC = (ACCOUNT ID => LOCAL STORAGE) ****************/
  saveAccountId(account: Account){
    // je stocke le accountId dans le localStorage
    localStorage.setItem('selectedAccountId', account.id.toString());
  }
}

