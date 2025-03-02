import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


private http: HttpClient = inject(HttpClient);


getClientes (){
  return this.http.get('http://localhost:3500/clientes/clients')
}

getVendedores(){
  return this.http.get('http://localhost:3500/users/vendedores')
}


asignarVendedor(id: string, asignar: any) {
  return this.http.put(`http://localhost:3500/clientes/cliente-vendedor/${id}`,asignar);
}

editEmpleado(id:string, empleadoEdit:any) {
  return this.http.put(`http://localhost:3500/users/update/${id}`,empleadoEdit);
}

newEmpleado(empleadoupdate:any){
  return this.http.post(`http://localhost:3500/users/newOne`,empleadoupdate);
}

eliminar(id:string,){
    return this.http.post(`http://localhost:3500/users/eliminacion/${id}`,{estado:1})    
}




}
