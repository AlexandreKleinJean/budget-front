import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
/*import { UserFormComponent } from './user-form/user-form.component';*/
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './user.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../auth.guard';

const userRoutes: Routes = [
  /*{ path: 'edit/user/:id', component: UserFormComponent },*/
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes)
  ],
  providers: [UserService]
})
export class UserModule { }
