import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { AccountService } from 'src/app/account/account.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-transaction-creation',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private authService: AuthService
  ){ }

  ngOnInit() {
    try {
      // J'appelle AuthService pour récupéré l'ID du user connecté
      this.userId = this.authService.getLoggedInUserId();
      console.log("userId :" + this.userId)

      // J'appelle AccountService pour récupéré l'ID du account concerné
      this.accountId = this.accountService.selectedAccountId;

      // je récupère la liste des catégories
      this.categories = this.transactionService.getTransactionCategoriesList();

    } catch (error) {
      console.error('UserId, accountId or categories not found:', error);
    }
  }

  async addNewTransaction() {

    try{
      if(this.userId && this.accountId && this.categories){
        // J'appelle la method de TransactionService pour créer une transaction
        const newTransaction = await this.transactionService.newTransaction(
          this.subject,
          this.note,
          this.category,
          this.amount,
          this.accountId
        );

        if (newTransaction) {
          // Un user correspond
          console.log('Transaction successfully created', newTransaction);

          // Redirection vers la page des transactions
          this.router.navigate([`${this.accountId}/transactions`]);

          } else {
            // Un user ne correspond paas
            console.error('Account creation error');
          }
      } else {
          // Gérer les erreurs de l'appel à la méthode login
          console.error('UserId is not available');
      }

    } catch (error) {
      console.error('Error on account creation:', error);
    }
  }

  /*
  // je vérifie si une catégorie correspondant à la catégorie initiale
  currentCategory(checkedCategory: string): boolean {

    if (this.transaction) {
      return this.transaction.category.includes(checkedCategory);
    }
    return false;
  }*/
}
