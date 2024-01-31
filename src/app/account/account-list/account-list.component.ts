import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Transaction } from '../../transaction/transaction';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { amountByCategory, totalAmount } from '../../utils/expense.util';
import { SharedService } from '../../shared-services/expenses.shared-service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css',
  imports: [RouterLink],
  standalone: true
})

export class AccountListComponent implements OnInit {
  @Input() userId: number | null;

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

  async ngOnInit() {

      if (this.userId) {

        try {
          // AccountService => récupérer les comptes du loggedInUser
          this.accountsList = await this.accountService.getAccountsByUser(+this.userId);

          // AccountService => récupérer les transactions
          for (let account of this.accountsList) {
            let transactions = await this.transactionService.getTransactionsByAccount(account.id);

            // je calcule les montants [par account]
            this.totalExpensesByAccount[account.id] = totalAmount(transactions);

            // je calcule les montants de chaque category [par account]
            this.categoryExpensesByAccount[account.id] = amountByCategory(transactions);

            // SharedService => je stock mes calculs
            this.sharedService.setTotalExpensesByAccount(this.totalExpensesByAccount);
            this.sharedService.setCategoryExpensesByAccount(this.categoryExpensesByAccount);
          }
        } catch (error) {
          console.error('Error fetching accounts:', error);
        }

      } else {
        console.error('UserId undefined');
      }
  }

  /*-----------Method pour stocker accountId en localStorage--------------*/
  saveAccountId(account: Account){
    // je stocke le accountId dans le localStorage
    localStorage.setItem('selectedAccountId', account.id.toString());
  }
}

