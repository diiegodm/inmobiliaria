import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  private apiUrl: string = 'http://localhost:3502/propiedades'
private apiUrl2: string = 'http://localhost:3502/users//vendedoresall'

private http: HttpClient = inject(HttpClient)





 getAnuncios() {
  return this.http.get(`${this.apiUrl}/sitios`)
}

  getAnuncioById(id: number) {
    return this.http.get(`${this.apiUrl}/propiedadesById/${id}`)
  }
  getVendedores () {
  return this.http.get(`${this.apiUrl2}`)
}
}