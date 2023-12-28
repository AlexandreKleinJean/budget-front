import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  templateUrl: `app-transaction-form.component.html`
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

  onSubmit(){
    console.log("Form submited")
    this.router.navigate(['/transaction', this.transaction.id])
  }
}
