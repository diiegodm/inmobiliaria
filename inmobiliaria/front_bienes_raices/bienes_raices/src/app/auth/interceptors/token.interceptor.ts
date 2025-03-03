import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const router = inject(Router);

  if (token && role) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Role: role
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) { 
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        router.navigate(['/login']); // Redirigir al login si el token es inválido
      }
      return throwError(() => error);
    })
  );
};
