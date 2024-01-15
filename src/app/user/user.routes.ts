import { Routes } from '@angular/router';
import { UserService } from './user.service';

export default [{
  path: '',
  providers:[UserService],
  children:[
      {
        path: 'users',
        title: 'Users',
        loadComponent: () => import('./user-list/user-list.component').then(module => module.UserListComponent)
      },
      {
        path: 'user/:id',
        title: 'User',
        loadComponent: () => import('./user-detail/user-detail.component').then(module => module.UserDetailComponent)
      }
    ]
  }] as Routes;
