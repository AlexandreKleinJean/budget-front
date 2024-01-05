import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
/*import { TransactionFormComponent } from './transaction-form/transaction-form.component';*/
import { RouterModule, Routes } from '@angular/router';
import { TransactionService } from './transaction.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../auth.guard';

const transactionRoutes: Routes = [
  /*{ path: 'edit/transaction/:id', component: TransactionFormComponent },*/
  { path: ':id/transactions', component: TransactionListComponent, canActivate: [AuthGuard] },
  { path: 'transaction/:id', component: TransactionDetailComponent, canActivate: [AuthGuard] }
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
