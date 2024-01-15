import { Routes } from '@angular/router';
import { AuthService } from './auth.service';

export default [{
  path: '',
  providers:[AuthService],
  children:[
    {
      path: 'login',
      title: 'Auth | Login',
      loadComponent: () => import('./auth-login/auth-login.component').then(module => module.AuthLoginComponent)
    },
    {
      path: 'register',
      title: 'Auth | Register',
      loadComponent: () => import('./auth-register/auth-register.component').then(module => module.AuthRegisterComponent)
    }
  ]
}] as Routes;
