import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  constructor() { }
private http: HttpClient = inject(HttpClient);



getAnuncios() {
  return this.http.get('http://localhost:3500/propiedades/sitios')
}

getanunciosById(id:number){
  return this.http.get(`http://localhost:3500/propiedades/propiedadesBy/${id}`)
}


updateAnuncio( id: string, crearpropiedadfroms:any) {
  return this.http.put(`http://localhost:3500/propiedades/update/${id}`, crearpropiedadfroms)
}

crearAnuncio(crearpropiedadfroms: FormData) {
  return this.http.post('http://localhost:3500/propiedades/newPropiedades', crearpropiedadfroms);
}



//clientes
getClientes (id:number){
  return this.http.get(`http://localhost:3500/users/clientes/${id}`)
}

newEStatus(id:number,estado:any){
  return this.http.post(`http://localhost:3500/clientes/updateestado/${id}`,estado)
}


}
