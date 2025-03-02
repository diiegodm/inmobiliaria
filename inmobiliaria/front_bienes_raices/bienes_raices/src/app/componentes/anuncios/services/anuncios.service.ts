import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {


private http: HttpClient = inject(HttpClient)

 getAnuncios() {
  return this.http.get('http://localhost:3500/propiedades/sitios')
}


}