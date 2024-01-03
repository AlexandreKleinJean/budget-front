import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import{ ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  imports: [CommonModule],
  standalone: true
})
export class TransactionDetailComponent implements OnInit {
  transaction: Transaction | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  async ngOnInit() {
    const transactionId: string | null = this.route.snapshot.paramMap.get('id');
    if (transactionId) {
      try {
        this.transaction = await this.transactionService.getOneTransactionById(+transactionId);
      } catch (error) {
        console.error('Error fetching transaction:', error);
      }
    }
  }

  goBackToTransactionList() {

    if (this.transaction && this.transaction.accountId) {
      const accountId = this.transaction.accountId;
      this.router.navigate([`/${accountId}/transactions`]);
    } else {
      console.error("Transaction or accountId not available");
    }
  }

  goToEditTransactionForm(transaction: Transaction) {
    this.router.navigate(['/edit/transaction', transaction.id]);
  }
}

