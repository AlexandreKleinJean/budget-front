import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css',
  imports: [CommonModule, RouterLink],
  standalone: true
})

export class TransactionListComponent implements OnInit {
  @Input() userId: number | null;
  @Input() accountId: number | null;
  transactionsListByAccount: Transaction[] = [];

  totalExpenses: number;
  @Output() totalExpensesEvent = new EventEmitter<number>();

  constructor(
    private transactionService: TransactionService
  ) {}

  async ngOnInit() {

    if(this.accountId){

        // je récupère les transactions
        this.transactionService.getTransactionsByAccount(this.accountId)
          .subscribe({
            next: (transactionsByAccount) => {
              this.transactionsListByAccount = transactionsByAccount;
              // je calcul le total des dépenses
              this.calculateTotalAmount();
            },
            error: (error) => console.error('Error fetching transactions:', error)
          });

    } else {
      console.error('No account with this id');
    }
  }

  /*------Calcul du total des montants + envoi vers component parent------*/
  calculateTotalAmount() {
    this.totalExpenses = 0;

    this.transactionsListByAccount.forEach(transaction => {
      this.totalExpenses += transaction.amount;
    });

    this.totalExpensesEvent.emit(this.totalExpenses);
  }

  /*-------------Calcul du total des montants par catégorie--------------*/
  /*calculateExpensesByCategory() {
    this.expensesByCategory = {};

    this.transactionsListByAccount.forEach(transaction => {

      if (!this.expensesByCategory[transaction.category]) {
        this.expensesByCategory[transaction.amount] = 0;
      }

      this.expensesByCategory[transaction.category] += transaction.amount;
    });
  }*/
}

