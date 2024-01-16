import { Routes } from '@angular/router';
import { AccountService } from '../account/account.service';
import { AuthService } from '../auth/auth.service';

export default [{
  path: '',
    loadComponent: () =>  import('./dashboard.component').then(module => module.DashBoardComponent),
  providers:[AuthService, AccountService]
}] as Routes;
