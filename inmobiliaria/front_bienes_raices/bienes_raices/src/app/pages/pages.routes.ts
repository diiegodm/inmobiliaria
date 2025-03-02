import { Routes } from '@angular/router';
import { EmpleadosComponent } from './admin-dashboard/empleados/empleados.component';
import { ClientesComponent } from './admin-dashboard/clientes/clientes.component';
import { PropiedadesComponent } from './admin-dashboard/propiedades/propiedades.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';




export const ADMIN_ROUTES: Routes = [

    {
        path: 'admin',
        component: AdminDashboardComponent
    },
    {
        path: 'clientes',
        component: ClientesComponent
    },
    {
        path: 'empleados',
        component: EmpleadosComponent
    },
    {
        path: 'propiedades',
        component: PropiedadesComponent
    },

]