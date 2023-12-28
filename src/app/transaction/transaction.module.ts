import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { TransactionService } from './transaction.service';

const transactionRoutes: Routes = [
  { path: 'transactions', component: TransactionListComponent },
  { path: 'transaction/:id', component: TransactionDetailComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(transactionRoutes)
  ],
  providers: [TransactionService]
})
export class TransactionModule { }
