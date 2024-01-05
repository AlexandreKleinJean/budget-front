import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';
/*import { TransactionFormComponent } from './transaction-form/transaction-form.component';*/
import { RouterModule, Routes } from '@angular/router';
import { AccountService } from './account.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../auth.guard';

const accountRoutes: Routes = [
  /*{ path: 'edit/transaction/:id', component: TransactionFormComponent },*/
  { path: ':id/account', component: AccountCreationComponent, canActivate: [AuthGuard] },
  { path: 'accounts', component: AccountListComponent, canActivate: [AuthGuard] },
  { path: 'account/:id', component: AccountDetailComponent, canActivate: [AuthGuard] }
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
export class AccountModule { }
