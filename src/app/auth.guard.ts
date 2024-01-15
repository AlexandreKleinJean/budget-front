import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

export const AuthGuard = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isAuthenticated()) {
    console.log("Well connected !")
    return true;
  } else {
    router.navigate(['/login']);
    console.log("Not connected !")
    return false;
  }
}

