import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role')
  
  if (token && role) {
  
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      Role: role
    }
  });
  }
  
    return next(req);
  };
