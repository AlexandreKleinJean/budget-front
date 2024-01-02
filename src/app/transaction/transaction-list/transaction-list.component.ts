import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  imports: [CommonModule],
  standalone: true
})

export class TransactionListComponent implements OnInit {
  selectedAccountId: number | null;
  transactionsListByAccount: Transaction[] = [];

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {}

  async ngOnInit() {

    try {
      // J'appelle AccountService pour récupéré l'ID du account séléctionné
      this.selectedAccountId = this.accountService.selectedAccountId;
      console.log("id du compte :" + this.selectedAccountId)

      if (this.selectedAccountId) {
        // J'appelle TransactionService pour récupérer les transactions concernées
        this.transactionsListByAccount = await this.transactionService.getTransactionsByAccount(this.selectedAccountId);
        console.log("transactions:"+this.transactionsListByAccount)
      } else {
        console.error('No account with this id');
      }
    } catch (error) {
      console.error('PROBLEME:', error);
    }
  }

  goToOneTransaction(transaction: Transaction){
    this.router.navigate(['/transaction', transaction.id])
  }

}
