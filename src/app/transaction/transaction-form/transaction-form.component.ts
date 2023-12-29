import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';


@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./transaction-form.component.html`
})

export class TransactionFormComponent implements OnInit {
  @Input() transaction: Transaction;
  categories: string[];

  constructor(
    private transactionService: TransactionService,
    private router: Router
  ){ }

  ngOnInit() {
    this.categories = this.transactionService.getTransactionCategoriesList();
  }

  hasCategory(checkedCategory: string): boolean{
    return this.transaction.category.includes(checkedCategory);
  }

  selectCategory($event: Event, checkedCategory: string){
    const isChecked = ($event.target as HTMLInputElement).checked;
    if(isChecked){
      this.categories.push(checkedCategory)
    } else {
      const index = this.categories.indexOf(checkedCategory);
      this.categories.splice(index, 1)
    }
  }

  /*justOneCategory(category: string): boolean{
    if(this.transaction.category.length>1) {
      return false
    } else {
      return true;
    }
  }*/

  onSubmit(){
    console.log("Form submited")
    this.router.navigate(['/transaction', this.transaction.id])
  }
}
