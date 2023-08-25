import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-module/auth.service';
import { tap } from 'rxjs';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router:Router = inject(Router);
  return authService.isLoggedIn$.pipe(
    tap(isLoggedIn=>{
      if(!isLoggedIn){
        router.navigate(['login'])
      }
    })
  );
};
