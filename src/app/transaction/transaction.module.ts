import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { RouterModule, Routes } from '@angular/router';
import { TransactionService } from './transaction.service';
import { FormsModule } from '@angular/forms';

const transactionRoutes: Routes = [
  { path: 'edit/transaction/:id', component: TransactionFormComponent },
  { path: 'transactions', component: TransactionListComponent },
  { path: 'transaction/:id', component: TransactionDetailComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(transactionRoutes)
  ],
  providers: [TransactionService]
})
export class TransactionModule { }
