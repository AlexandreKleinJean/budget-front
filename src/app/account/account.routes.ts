import { Routes } from '@angular/router';
import { AccountService } from './account.service';
import { AuthService } from '../auth/auth.service';

export default [{
  path: '',
  providers:[AccountService, AuthService],
  children:[
    {
      path: 'account-create',
      title: 'Create an account',
      loadComponent: () => import('./account-creation/account-creation.component').then(module => module.AccountCreationComponent)
    },
    {
      path: 'accounts',
      title: 'Your accounts',
      loadComponent: () => import('./account-list/account-list.component').then(module => module.AccountListComponent)
    },
    {
      path: 'account',
      title: 'Your account',
      loadComponent: () =>  import('./account-detail/account-detail.component').then(module => module.AccountDetailComponent)
    }
  ]
}] as Routes;
