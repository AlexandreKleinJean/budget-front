import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterLink, Router } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { BehaviorService } from 'src/app/behavior.service';

@Component({
  selector: 'app-transaction-creation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: `./transaction-creation.component.html`,
  styleUrl: `./transaction-creation.component.css`
})

export class TransactionCreationComponent implements OnInit {
  transaction: Transaction | null;
  categories: string[] = ['Food', 'Transport', 'Sport', 'Invoice', 'Shopping', 'Leisure', 'RealEstate'];
  subject: string = '';
  note: string = '';
  category: string = '';
  amount: number = 0;
  accountId: number | null;

  constructor(
    private transactionService: TransactionService,
    private behaviorService: BehaviorService,
    private router: Router
  ){ }

  ngOnInit(){

    // BehaviorService => récupération Account sélectionné ( dans observable$ )
    this.behaviorService.currentAccount$.subscribe((accountId) => {

      if(accountId){
        this.accountId = accountId
      }
    })
  }

  addNewTransaction() {

    if(this.accountId){

      // TransactionService => créer une transaction
      this.transactionService.newTransaction(
        this.subject,
        this.note,
        this.category,
        this.amount,
        this.accountId
      ).subscribe({

        next: (tr) => {
          console.log('Transaction successfully created', tr);
          this.router.navigate(['/account/detail']);
        },

        error: (error) => console.error('Error creating transaction:', error),
      })

    } else {
      console.error('AccountId undefined');
    }
  }
}
