import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import{ ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.css',
  imports: [CommonModule],
  standalone: true
})
export class TransactionDetailComponent implements OnInit {
  transaction: Transaction | undefined;
  transactionsListByAccount: Transaction[] = [];
  transactionId: Number | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    const selectedTransactionId = this.route.snapshot.paramMap.get('transactionId');

    if (selectedTransactionId) {
      this.transactionId=+ selectedTransactionId;

      this.transactionService.getOneTransactionById(+this.transactionId).subscribe({
          next: (trans) => {
            this.transaction = trans;
          },
          error: (error) => console.error('Error fetching transaction:', error),
          complete: () => console.log('Transaction fetch completed')
        });
    }
  }

  /*-----------Bouton pour revenir à la liste de transactions------------*/
  /*async goBackToTransactionList() {
    try {
      // je récupère le accountId dans le localStorage
      const selectedAccountId = localStorage.getItem('selectedAccountId');
      console.log('(TransactionComponent) accountID:', selectedAccountId);

      if (selectedAccountId) {
        // J'appelle TransactionService => afficher transactions liées à l'account
        this.transactionsListByAccount = await this.transactionService.getTransactionsByAccount(Number(selectedAccountId));
        this.router.navigate(['/account/detail']);

      } else {
        console.error('No account with this id');
      }
    } catch (error) {
      console.error('Problem to get the transactions:', error);
    }*/
  }

  /*-------------Bouton pour supprimer l'account--------------*/
  /*async deleteTransaction() {
    if (this.transactionId) {
      try {
        await this.transactionService.deleteOneTransactionById(+this.transactionId);
        this.router.navigate(['/account/detail']);

      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    } else {
      console.log("id introuvable")
    }
  }
}*/

