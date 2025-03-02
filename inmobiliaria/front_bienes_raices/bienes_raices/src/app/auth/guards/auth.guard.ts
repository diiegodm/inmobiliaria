import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { catchError, map, of } from 'rxjs';



export const authGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router)

  if (typeof window === 'undefined') {
    return router.createUrlTree(['/auth/login']);
  }
  const tokenValue = localStorage.getItem('token');

  if(tokenValue){
    return true
      }
    
    
      return router.createUrlTree(['/auth/login']);
 
};