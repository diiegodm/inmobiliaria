import { Routes } from '@angular/router';
import { VendedorDashboardComponent } from './vendedor-dashboard.component';
import { PropiedadesVEndedorComponent } from './propiedades/propiedades.component';





export const VENDEDOR_ROUTES: Routes = [


 {
    path:'empleado',
    component:VendedorDashboardComponent
 },
 {
   path:'propiedades',
   component:PropiedadesVEndedorComponent
}

]