import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TRANSACTIONS } from '../mock-transaction-list';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  imports: [CommonModule],
  standalone: true
})
export class TransactionListComponent {
  transactionsList: Transaction[];

  constructor(
    private router: Router,
    private transactionService: TransactionService
  ){}

  ngOnInit(){
    this.transactionsList = this.transactionService.getTransationList();
  }

  goToOneTransaction(transaction: Transaction){
    this.router.navigate(['/transaction', transaction.id])
  }

}
