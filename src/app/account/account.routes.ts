import { Routes } from '@angular/router';
import { AccountService } from './account.service';

export default [{
  path: '',
  providers:[AccountService],
  children:[
    {
      path: ':id/account',
      loadComponent: () => import('./account-creation/account-creation.component').then(module => module.AccountCreationComponent)
    },
    {
      path: 'accounts',
      loadComponent: () => import('./account-list/account-list.component').then(module => module.AccountListComponent)
    },
    {
      path: 'account/:id',
      loadComponent: () =>  import('./account-detail/account-detail.component').then(module => module.AccountDetailComponent)
    }
  ]
}] as Routes;
