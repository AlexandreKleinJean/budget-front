import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import{ ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  imports: [CommonModule],
  standalone: true
})
export class TransactionDetailComponent implements OnInit{

  transactionList: Transaction[];
  transaction: Transaction|undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ){}

    ngOnInit(){
      const transactionId: string|null = this.route.snapshot.paramMap.get('id');

      if(transactionId){
        this.transaction = this.transactionService.getTransactionById(+transactionId);
      }
    }

    goToTransactionList(){
      this.router.navigate(['/transactions']);
    }

    goToEditTransactionForm(transaction: Transaction){
      this.router.navigate(['/edit/transaction', transaction.id])
    }
}

