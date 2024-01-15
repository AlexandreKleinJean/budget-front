import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import{ ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.css',
  imports: [CommonModule, RouterLink],
  standalone: true
})
export class TransactionDetailComponent implements OnInit {
  transaction: Transaction | undefined;
  transactionsListByAccount: Transaction[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  async ngOnInit() {
    const transactionId: string | null = this.route.snapshot.paramMap.get('transactionId');
    console.log(transactionId)
    if (transactionId) {
      try {
        this.transaction = await this.transactionService.getOneTransactionById(+transactionId);
      } catch (error) {
        console.error('Error fetching transaction:', error);
      }
    }
  }

  async goBackToTransactionList() {
    // je récupère le accountId dans le localStorage
    try {
      // je récupère le accountId dans le localStorage
      const selectedAccountId = localStorage.getItem('selectedAccountId');
      console.log('(TransactionComponent) accountID:', selectedAccountId);

      if (selectedAccountId) {
        // J'appelle TransactionService => afficher transactions liées à l'account
        this.transactionsListByAccount = await this.transactionService.getTransactionsByAccount(Number(selectedAccountId));
      } else {
        console.error('No account with this id');
      }
    } catch (error) {
      console.error('Problem to get the transactions:', error);
    }
  }

  /*goToEditTransactionForm(transaction: Transaction) {
    this.router.navigate(['/edit/transaction', transaction.id]);
  }*/
}

