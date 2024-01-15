import { Routes } from '@angular/router';
import { TransactionService } from './transaction.service';
import { AccountService } from '../account/account.service';
import { AuthService } from '../auth/auth.service';

export default [{
  path: '',
  providers:[TransactionService, AccountService, AuthService],
  children:[
    {
      path: 'transactions',
      title: 'Your transactions',
      loadComponent: () => import('./transaction-list/transaction-list.component').then(module => module.TransactionListComponent)
    },
    {
      path: ':accountId/create/transaction',
      title: 'Create a transaction',
      loadComponent: () => import('./transaction-creation/transaction-creation.component').then(module => module.TransactionCreationComponent)
    },
    {
      path: 'transaction',
      title: 'Your transaction',
      loadComponent: () =>  import('./transaction-detail/transaction-detail.component').then(module => module.TransactionDetailComponent)
    }
  ]
}] as Routes;
