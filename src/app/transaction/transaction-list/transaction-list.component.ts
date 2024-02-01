import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { amountByCategory, totalAmount } from '../../utils/expense.util';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css',
  imports: [CommonModule, RouterLink],
  standalone: true
})

export class TransactionListComponent implements OnInit {
  @Input() userId: Number | null;
  @Input() accountId: Number | null;

  @Output() totalExpensesEvent = new EventEmitter<number>();
  totalExpenses: number;

  transactionsListByAccount: Transaction[] = [];
  expensesByCategory: { [banane: string]: number };


  constructor(
    private transactionService: TransactionService
  ) {}

  async ngOnInit() {

    if(this.accountId){

      try {
        // je récupère les transactions
        this.transactionsListByAccount = await this.transactionService.getTransactionsByAccount(+this.accountId);
        // je calcul les dépenses par catégories
        this.calculateExpensesByCategory();
        // je calcul le total des dépenses
        this.calculateTotalAmount();
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }

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
  calculateExpensesByCategory() {
    this.expensesByCategory = {};

    this.transactionsListByAccount.forEach(transaction => {

      if (!this.expensesByCategory[transaction.category]) {
        this.expensesByCategory[transaction.amount] = 0;
      }

      this.expensesByCategory[transaction.category] += transaction.amount;
    });
  }
}

