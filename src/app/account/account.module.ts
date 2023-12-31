import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
/*import { TransactionFormComponent } from './transaction-form/transaction-form.component';*/
import { RouterModule, Routes } from '@angular/router';
import { AccountService } from './account.service';
import { FormsModule } from '@angular/forms';

const accountRoutes: Routes = [
  /*{ path: 'edit/transaction/:id', component: TransactionFormComponent },*/
  { path: 'accounts', component: AccountListComponent },
  { path: 'account/:id', component: AccountDetailComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(accountRoutes)
  ],
  providers: [AccountService]
})
export class TransactionModule { }
