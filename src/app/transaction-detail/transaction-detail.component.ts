import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import{ ActivatedRoute } from '@angular/router';
import { TRANSACTIONS } from '../mock-transaction-list';
import { Transaction } from '../transaction';


@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  imports: [CommonModule],
  standalone: true
})
export class TransactionDetailComponent implements OnInit{

  transactionList: Transaction[];
  transaction: Transaction|undefined;

  constructor(private route: ActivatedRoute){}

    ngOnInit(){
      this.transactionList = TRANSACTIONS;
      const transactionId: string|null = this.route.snapshot.paramMap.get('id');

      if(transactionId){
        this.transaction = this.transactionList.find(transaction => transaction.id == +transactionId);
      }
    }
}

