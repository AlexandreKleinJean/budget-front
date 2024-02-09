import { Routes } from '@angular/router';
import { AccountService } from './account.service';
import { AuthService } from '../auth/auth.service';
import { TransactionService } from '../transaction/transaction.service';
import { ForecastService } from '../forecast/forecast.service';
import { UserService } from '../user/user.service';
import { ExpensesStorageService } from '../shared-services/expensesStorage.service';
import { HttpClient } from '@angular/common/http';

export default [{
  path: '',
  providers:[
    AccountService,
    ForecastService,
    UserService,
    TransactionService,
    ExpensesStorageService,
    HttpClient
  ],
  children:[
    {
      path: 'list',
      title: 'Your accounts',
      loadComponent: () => import('./account-list/account-list.component').then(module => module.AccountListComponent)
    },
    {
      path: 'detail',
      title: 'Your account',
      loadComponent: () =>  import('./account-detail/account-detail.component').then(module => module.AccountDetailComponent)
    },
    /*{
      path: 'create',
      title: 'Create an account',
      loadComponent: () => import('./account-creation/account-creation.component').then(module => module.AccountCreationComponent)
    }*/
  ]
}] as Routes;
