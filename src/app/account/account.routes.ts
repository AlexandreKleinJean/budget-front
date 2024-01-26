import { Routes } from '@angular/router';
import { AccountService } from './account.service';
import { AuthService } from '../auth/auth.service';
import { TransactionService } from '../transaction/transaction.service';

export default [{
  path: '',
  providers:[AccountService, TransactionService, AuthService],
  children:[
    /*{
      path: 'list',
      title: 'Your accounts',
      loadComponent: () => import('./account-list/account-list.component').then(module => module.AccountListComponent)
    },*/
    {
      path: '',
      title: 'Your account',
      loadComponent: () =>  import('./account-detail/account-detail.component').then(module => module.AccountDetailComponent)
    },
    {
      path: 'create',
      title: 'Create an account',
      loadComponent: () => import('./account-creation/account-creation.component').then(module => module.AccountCreationComponent)
    }
  ]
}] as Routes;
