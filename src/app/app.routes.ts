import { Routes } from '@angular/router';
import { AuthService } from './auth/auth.service';
/*import { AuthGuard } from './auth.guard';*/

export const routes: Routes = [
  {
    path: '',
    providers:[AuthService],
    loadComponent: () =>  import('./home/home.component').then(module => module.HomeComponent)
  },
  {
    path: 'auth',
    /*canActivate: [AuthGuard],*/
    loadChildren: () => import('./auth/auth.routes')
  },
  /*{
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.routes')
  },*/
  {
    path: 'forecast',
    /*canActivate: [AuthGuard],*/
    loadChildren: () => import('./forecast/forecast.routes')
  },
  {
    path: 'account',
    /*canActivate: [AuthGuard],*/
    loadChildren: () => import('./account/account.routes')
  },
  {
    path: 'transaction',
    /*canActivate: [AuthGuard],*/
    loadChildren: () => import('./transaction/transaction.routes')
  },
  { path: '**',
    loadComponent: () =>  import('./page-not-found/page-not-found.component').then(module => module.PageNotFoundComponent)
  }
];
