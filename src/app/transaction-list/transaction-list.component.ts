import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TRANSACTIONS } from '../mock-transaction-list';
import { Transaction } from '../transaction';


@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  imports: [CommonModule],
  standalone: true
})
export class TransactionListComponent {
  transactionsList: Transaction[] = TRANSACTIONS;

}
