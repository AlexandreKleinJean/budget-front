import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { RouterLink, Router } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { BehaviorService } from 'src/app/shared-services/behavior.service';

@Component({
  selector: 'app-transaction-creation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: `./transaction-creation.component.html`,
  styleUrl: `./transaction-creation.component.css`
})

export class TransactionCreationComponent implements OnInit {
  transaction: Transaction | null;
  categories: string[] = ['Food', 'Transport', 'Sport', 'Invoice', 'Shopping', 'Leisure', 'RealEstate'];
  accountId: number | null;
  reactiveTransactionForm: FormGroup;

  constructor(
    private transactionService: TransactionService,
    private behaviorService: BehaviorService,
    private router: Router
  ){ }

  ngOnInit(){

    this.reactiveTransactionForm = new FormGroup({
      subject: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]+$")]),
      note: new FormControl(null),
      category: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
      amount: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]+$")])
    })

    // BehaviorService => récupération Account sélectionné ( dans observable$ )
    this.behaviorService.currentAccount$.subscribe((accountId) => {

      if(accountId){
        this.accountId = accountId
      }
    })
  }

  //********************** Blur => msg d'erreur ************************/
  invalidField(fieldName: string) {
    const field = this.reactiveTransactionForm.get(fieldName);
    if (field && field.invalid && field.value !== null) {
      if (fieldName === 'subject') {
        this.behaviorService.notifState({type: 'error', message: 'Transaction subject is required in a valid format'});
      } else if (fieldName === 'category') {
        this.behaviorService.notifState({type: 'error', message: 'Transaction category is required in a valid format'});
      } else if (fieldName === 'amount') {
        this.behaviorService.notifState({type: 'error', message: 'Transaction amount is required in a valid format'});
      }
    }
  }

  addNewTransaction() {

    // ReactiveTransactionForm => récupérer les values d'input
    const subject: string = this.reactiveTransactionForm.get('subject').value;
    const note: string = this.reactiveTransactionForm.get('note').value;
    const category: string = this.reactiveTransactionForm.get('category').value;
    const amount: number = this.reactiveTransactionForm.get('amount').value;

    if(this.accountId && subject && category && amount){

      // TransactionService => créer une transaction
      this.transactionService.newTransaction(
        subject,
        note,
        category,
        amount,
        this.accountId
      ).subscribe({

        next: (tr) => {
          console.log('Transaction successfully created', tr);
          this.behaviorService.notifState({ type: 'success', message: "Transaction successfully created" });
          this.router.navigate(['/account/detail']);
        },

        error: (error) => {
          console.error('Error:', error),
          this.behaviorService.notifState({ type: 'error', message: error });
        }
      })

    } else {
      this.behaviorService.notifState({ type: 'error', message: "All inputs must have a value" });
    }
  }
}
