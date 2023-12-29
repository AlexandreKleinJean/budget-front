/*import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';


@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `./transaction-form.component.html`
})

export class TransactionFormComponent implements OnInit {
  transaction: Transaction|undefined;
  categories: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ){ }

  ngOnInit() {
    // je récupère l'id de la transaction à éditer
    const transactionId: string|null = this.route.snapshot.paramMap.get('id');
    if(transactionId){
      this.transaction = this.transactionService.getTransactionById(+transactionId);
    } else {
      this.transaction = undefined
    }

    // je récupère la liste des catégories
    this.categories = this.transactionService.getTransactionCategoriesList();
  }

  // je vérifie si une catégorie correspondant à la catégorie initiale
  currentCategory(checkedCategory: string): boolean {

    if (this.transaction) {
      return this.transaction.category.includes(checkedCategory);
    }
    return false;
  }

  onSubmit() {
    if (this.transaction) {
      console.log("Form submitted");
      this.router.navigate(['/transaction', this.transaction.id]);
    } else {
      console.log("Transaction is undefined");
    }
  }

}*/
