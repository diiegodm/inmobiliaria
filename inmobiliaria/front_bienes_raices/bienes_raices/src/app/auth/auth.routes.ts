import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from '../pages/admin-dashboard/admin-dashboard.component';


export const AUTH_ROUTES: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
   
   
];
