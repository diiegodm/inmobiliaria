import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContacService {

  private http: HttpClient = inject(HttpClient);

  createAnuncio(formNew: any) {
  return this.http.post('http://localhost:3500/clientes/newClient', formNew)
}

}
