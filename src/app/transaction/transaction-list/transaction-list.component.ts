import { Component, Input, OnInit } from '@angular/core';
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
  @Input() userId: Number | null;
  @Input() accountId: Number | null;
  transactionsListByAccount: Transaction[] = [];

  constructor(
    private transactionService: TransactionService
  ) {}

  async ngOnInit() {

    if(this.accountId){

      try {
        this.transactionsListByAccount = await this.transactionService.getTransactionsByAccount(+this.accountId);

      } catch (error) {
        console.error('Error fetching transactions:', error);
      }

    } else {
      console.error('No account with this id');
    }
  }

}

