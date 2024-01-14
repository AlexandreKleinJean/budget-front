import { Routes } from '@angular/router';
import { AuthService } from './auth.service';

export default [{
  path: '',
  providers:[AuthService],
  children:[
    {
      path: 'login',
      loadComponent: () => import('./auth-login/auth-login.component').then(module => module.AuthLoginComponent)
    },
    {
      path: 'accounts',
      loadComponent: () => import('./auth-register/auth-register.component').then(module => module.AuthRegisterComponent)
    }
  ]
}] as Routes;
