import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
/*import { UserFormComponent } from './user-form/user-form.component';*/
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';

const userRoutes: Routes = [
  /*{ path: 'edit/user/:id', component: UserFormComponent },*/
  { path: 'register', component: AuthRegisterComponent },
  { path: 'login', component: AuthLoginComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes)
  ],
  providers: [AuthService]
})
export class AuthModule { }
