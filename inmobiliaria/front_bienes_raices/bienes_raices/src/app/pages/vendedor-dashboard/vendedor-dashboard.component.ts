import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AdminService } from '../admin-dashboard/services/admin.service';
import Swal from 'sweetalert2';
import { VendedorService } from './services/vendedores.service';
import { VenddoresEditComponent } from '../admin-dashboard/empleados/modales/venddores-edit/venddores-edit.component';
import { EstadoclienteComponent } from "./modales/estadocliente/estadocliente.component";

@Component({
  selector: 'app-vendedor-dashboard',
  standalone: true,
  imports: [RouterModule, EstadoclienteComponent],
  templateUrl: './vendedor-dashboard.component.html',
  styleUrl: './vendedor-dashboard.component.css'
})
export class VendedorDashboardComponent {

 public openEdit: boolean = false;
  private router: Router = inject(Router);
  public clientes: any[] = [];
  public vendedores: any[] = [];
  public seletevent: any;
  private vendesorservice : VendedorService =inject(VendedorService)

  // Variables para paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit() {

    const idvendedor = localStorage.getItem('id');

    if(idvendedor){
      this.getClienteVEndedor(Number(idvendedor));
    }else {
      console.log('nop se encontro el id del vendedor ')
    }
  }

 actualizarclientes(event:{cerrado:boolean; cambiosGuardados:boolean}){
  if (event.cerrado) {
    if (event.cambiosGuardados) {
      // Si los cambios fueron guardados, actualizamos la lista de empleados
      const idvendedor = Number(localStorage.getItem('id'));
      this.getClienteVEndedor(idvendedor);
    } else {
      
      console.log('No se guardaron los cambios');
    }
    
    this.closeedit();// cierra el modal 
  }
 }


  getClienteVEndedor(idvendedor:number) {
    this.vendesorservice.getClientes(idvendedor).subscribe({
      next: (data: any) => {
        this.clientes = data.data;
        console.log(data)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  

  // Métodos de paginación
  get paginatedClientes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.clientes.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.clientes.length / this.itemsPerPage);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/auth/home']);
  }

  open(cliente: any) {
    this.openEdit = true;
   this.seletevent = {... cliente} 
    console.log(this.seletevent);
    console.log( this.openEdit)
  }


  closeedit(){
    this.openEdit= false
  }



}
