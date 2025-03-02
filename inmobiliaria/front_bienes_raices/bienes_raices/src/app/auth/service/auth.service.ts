import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient)
private router: Router = inject(Router)
  constructor() { }

  

  login(userLoginForm: any): Observable<any> {
    return this.http.post('http://localhost:3500/users/login',userLoginForm)
  }

  setUserData(token: string, role: number, ) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role.toString());
   
  
    if (role === 0) {
      this.router.navigate(['/ADMIN/admin']); // Redirigir a admin
    } else if (role === 1) {
      this.router.navigate(['/EM/empleado']); // Redirigir a vendedor
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/auth/login']); 
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
