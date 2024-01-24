import { Routes } from '@angular/router';
import { AccountService } from '../account/account.service';
import { AuthService } from '../auth/auth.service';
import { ForecastService } from '../forecast/forecast.service';
import { UserService } from '../user/user.service';
import { TransactionService } from '../transaction/transaction.service';

export default [{
  path: '',
  providers:[AuthService, AccountService, ForecastService, UserService, TransactionService],
  children:[
    {
      path: 'main',
      title: 'Dashboard | Main',
      loadComponent: () =>  import('./dashboard-main/dashboard-main.component').then(module => module.DashBoardMainComponent),
    },
    {
      path: 'detail',
      title: 'Dashboard | Detail',
      loadComponent: () =>  import('./dashboard-detail/dashboard-detail.component').then(module => module.DashBoardDetailComponent),
    },




  ]
}] as Routes;
