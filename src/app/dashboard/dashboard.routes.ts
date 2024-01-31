import { Routes } from '@angular/router';
import { AccountService } from '../account/account.service';
import { AuthService } from '../auth/auth.service';
import { ForecastService } from '../forecast/forecast.service';
import { UserService } from '../user/user.service';
import { TransactionService } from '../transaction/transaction.service';

export default [{
  path: '',
  providers:[AuthService,
            AccountService,
            ForecastService,
            UserService,
            TransactionService
          ],
  title: 'Dashboard',
  loadComponent: () =>  import('./dashboard.component').then(module => module.DashBoardComponent)
}] as Routes;
