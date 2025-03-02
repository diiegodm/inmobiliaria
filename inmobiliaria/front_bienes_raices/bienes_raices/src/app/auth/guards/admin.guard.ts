import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router)
 


  if (typeof window === 'undefined') {
    return router.createUrlTree(['/auth/login']);
  }

  const tokenValue = localStorage.getItem('token');
  const roleValue = localStorage.getItem('role');
  const newRole: number = parseInt(localStorage.getItem('role') || '1', 10);


  const allowedRoles = [0];


  if(tokenValue && roleValue && allowedRoles.includes(newRole)){
return true
  }


  return router.createUrlTree(['/auth/login']);
};
