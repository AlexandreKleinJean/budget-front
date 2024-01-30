import { Component, Input, OnInit } from '@angular/core';
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

export class TransactionCreationComponent implements OnInit {
  userId: number | null;
  transaction: Transaction|undefined;
  categories: string[];
  subject: string = '';
  note: string = '';
  icon: string = '';
  date: Date;
  category: string = '';
  amount: number;
  accountId: number | null;

  constructor(
    private transactionService: TransactionService,
    private router: Router
  ){ }

  ngOnInit() {
    try {
      // je récupère la liste des catégories
      this.categories = this.transactionService.getTransactionCategoriesList();
    } catch (error) {
      console.error('Categories not found:', error);
    }
  }

  async addNewTransaction() {

    try{
      // je récupère le userId dans le localStorage
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      // je récupère le accountId dans le localStorage
      const selectedAccountId = localStorage.getItem('selectedAccountId');

      if(loggedInUserId && selectedAccountId && this.categories){
        this.accountId = +selectedAccountId;
        // j'appelle la method de TransactionService pour créer une transaction
        const newTransaction = await this.transactionService.newTransaction(
          this.subject,
          this.note,
          this.category,
          this.amount,
          this.accountId
        );

        if (newTransaction) {
          console.log('Transaction successfully created', newTransaction);
          // Je redirige vers le login
          this.router.navigate(['/account']);
        } else {
          console.error('Transaction creation error');
        }

      } else {
          console.error('UserId, AccountId are undefined');
      }

    } catch (error) {
      console.error('Error on account creation:', error);
    }
  }
}
