import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import{ ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { BehaviorService } from 'src/app/shared-services/behavior.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.css',
  imports: [CommonModule, RouterLink],
  standalone: true
})
export class TransactionDetailComponent implements OnInit {
  transaction: Transaction | undefined;
  transactionsListByAccount: Transaction[] = [];
  transactionId: number | null;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private router: Router,
    private behaviorService: BehaviorService
  ) {}

  //*********************** INITIALIZATION *************************/
  ngOnInit() {
    const selectedTransactionId = this.route.snapshot.paramMap.get('transactionId');

    if (selectedTransactionId) {
      this.transactionId=+ selectedTransactionId;

      this.transactionService.getOneTransactionById(+this.transactionId).subscribe({
          next: (tr) => {
            this.transaction = tr;
          },
          error: (error) => console.error('Error fetching transaction:', error)
        });
    }
  }

  //****************** DELETE TRANSACTION BUTTON ********************/
  deleteTransaction() {

    if(this.transactionId){

      this.transactionService.deleteOneTransactionById(this.transactionId).subscribe({
        next: (tr) => {
          console.log('transaction:', tr);
          this.behaviorService.notifState({ type: 'success', message: "Transaction deleted" });
          this.router.navigate(['/account/detail']);
        },
        error: (error) => {
          console.error('Error:', error),
          this.behaviorService.notifState({ type: 'error', message: error });
        }
      });

    } else {
      console.log("TransactionId unknown");
    }
  }
}

