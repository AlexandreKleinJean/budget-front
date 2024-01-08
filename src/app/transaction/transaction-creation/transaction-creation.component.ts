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
  templateUrl: `./transaction-creation.component.html`
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
      // j'appelle AuthService pour récupérer l'ID du user connecté
      this.userId = this.authService.getLoggedInUserId();

      // je récupère l'id du account dans l'URL
      const idString: string | null  = this.route.snapshot.paramMap.get('id');
      if(idString){
        this.accountId = parseInt(idString, 10);
      } else {
        this.accountId = null;
      }

      // je récupère la liste des catégories
      this.categories = this.transactionService.getTransactionCategoriesList();

    } catch (error) {
      console.error('UserId, accountId or categories not found:', error);
    }
  }

  async onTransactionSubmit() {

    try{
      if(this.userId && this.accountId && this.categories){
        // J'appelle la method de accountService pour créer un account
        const newTransaction = await this.transactionService.newTransaction(
          this.subject,
          this.note,
          this.icon,
          this.date,
          this.category,
          this.amount,
          this.accountId
        );

        if (newTransaction) {
          // Un user correspond
          console.log('Transaction successfully created', newTransaction);

          // Redirection vers la page des transactions
          this.router.navigate(['/transactions']);

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
