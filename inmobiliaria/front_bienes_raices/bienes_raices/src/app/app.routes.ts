import { Routes } from '@angular/router';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { adminGuard } from './auth/guards/admin.guard';
import { authGuard } from './auth/guards/auth.guard';



export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: 'full'
    },
    {
        path: "",
        loadChildren: () => import('./componentes/home.routes').then(m => m.HOME_ROUTES) 
    },
    {
        path: "auth",
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES) 
    },
    {
        path: "ADMIN",
        canActivate:[adminGuard],
        loadChildren: () => import('./pages/pages.routes').then(m => m.ADMIN_ROUTES) 
    },
    {
        path: "EM",
        canActivate:[authGuard],
        loadChildren: () => import('../app/pages/vendedor-dashboard/vendedor.routes').then(m => m.VENDEDOR_ROUTES) 
    },
    {
        path: "**",
        redirectTo: "home",
        pathMatch: 'full'
    },





];

