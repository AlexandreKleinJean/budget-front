import { Routes } from '@angular/router';
/*import { AuthGuard } from './auth.guard';*/

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>  import('./home/home.component').then(module => module.HomeComponent)
  },
  {
    path: '',
    /*canActivate: [AuthGuard],*/
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: '',
    /*canActivate: [AuthGuard],*/
    loadChildren: () => import('./account/account.routes')
  },
  {
    path: '',
    /*canActivate: [AuthGuard],*/
    loadChildren: () => import('./transaction/transaction.routes')
  },
  { path: '**',
    loadComponent: () =>  import('./page-not-found/page-not-found.component').then(module => module.PageNotFoundComponent)
  }
];
