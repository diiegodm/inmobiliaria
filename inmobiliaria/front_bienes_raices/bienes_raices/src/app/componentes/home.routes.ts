import { Routes } from '@angular/router';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { HomeComponent } from './home/home.component';

import { AnunciosComponent } from './anuncios/anuncios.component';
import { ContacUSComponent } from './contac-us/contac-us.component';
import { IdAnuncioComponent } from './anuncios/id-anuncio/id-anuncio.component';


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
        path: 'propiedadesById/:id',
        component: IdAnuncioComponent
    },
    {
        path: 'contacto',
        component: ContacUSComponent
    }
]