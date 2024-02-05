import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterLink, Router } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-creation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: `./transaction-creation.component.html`,
  styleUrl: `./transaction-creation.component.css`
})

export class TransactionCreationComponent {
  transaction: Transaction | null;
  categories: string[] = ['Food', 'Transport', 'Sport', 'Invoice', 'Shopping', 'Leisure', 'RealEstate'];
  subject: string = '';
  note: string = '';
  category: string = '';
  amount: number = 0;
  accountId: number | null;

  constructor(
    private transactionService: TransactionService,
    private router: Router
  ){ }

  addNewTransaction() {

    // je récupère le userId dans le localStorage
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    // je récupère le accountId dans le localStorage
    const selectedAccountId = localStorage.getItem('selectedAccountId');

    if(loggedInUserId && selectedAccountId){
      this.accountId = +selectedAccountId;

      // TransactionService => créer une transaction
      this.transactionService.newTransaction(
        this.subject,
        this.note,
        this.category,
        this.amount,
        this.accountId
      ).subscribe({

        next: (tr) => {
          this.transaction = tr
          console.log('Transaction successfully created', this.transaction);
          this.router.navigate(['/account/detail']);
        },

        error: (error) => console.error('Error creating transaction:', error),
      })

    } else {
      console.error('UserId and/or AccountId undefined');
    }
  }
}
