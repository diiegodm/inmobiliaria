import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {



private apiPropiedad = "http://localhost:3502/propiedades"
private apiCliente= "http://localhost:3502/clientes";
private apiUser = "http://localhost:3502/users";

private http: HttpClient = inject(HttpClient);



getAnuncios() {
  return this.http.get(`${this.apiPropiedad}/sitios`)
}

getanunciosById(id:number){
  return this.http.get(`${this.apiPropiedad}/propiedadesBy/${id}`)
}


updateAnuncio( id: string, crearpropiedadfroms:any) {
  return this.http.put(`${this.apiPropiedad}/update/${id}`, crearpropiedadfroms)
}

crearAnuncio(crearpropiedadfroms: FormData) {
  return this.http.post(`${this.apiPropiedad}/newPropiedades`, crearpropiedadfroms);
}



//clientes
getClientes (id:number){
  return this.http.get(`${this.apiUser}/clientes/${id}`)
}

newEStatus(id:number,estado:any){
  return this.http.post(`${this.apiCliente}/updateestado/${id}`,estado)
}


}
