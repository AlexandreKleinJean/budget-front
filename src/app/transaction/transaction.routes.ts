import { Routes } from '@angular/router';
import { TransactionService } from './transaction.service';

export default [{
  path: '',
  providers:[TransactionService],
  children:[
    {
      path: ':accountId/create/transaction',
      loadComponent: () => import('./transaction-creation/transaction-creation.component').then(module => module.TransactionCreationComponent)
    },
    {
      path: ':accountId/transactions',
      loadComponent: () => import('./transaction-list/transaction-list.component').then(module => module.TransactionListComponent)
    },
    {
      path: 'transaction/:transactionId',
      loadComponent: () =>  import('./transaction-detail/transaction-detail.component').then(module => module.TransactionDetailComponent)
    }
  ]
}] as Routes;
