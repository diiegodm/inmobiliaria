import { Routes } from '@angular/router';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { HomeComponent } from './home/home.component';

import { AnunciosComponent } from './anuncios/anuncios.component';
import { ContacUSComponent } from './contac-us/contac-us.component';


export const HOME_ROUTES: Routes = [


    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'Nosotros',
        component: NosotrosComponent
    },
    {
        path: 'anuncios',
        component: AnunciosComponent
    },
    {
        path: 'contacto',
        component: ContacUSComponent
    }
]