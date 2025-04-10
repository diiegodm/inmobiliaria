import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContacService {

  private apiCliente= "http://localhost:3502/clientes";
  
  private http: HttpClient = inject(HttpClient);

  createAnuncio(form: any) {
  return this.http.post(`${this.apiCliente}/newClient`, form)
}

}
