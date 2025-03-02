import { Component, inject } from '@angular/core';
import { VendedorService } from '../services/vendedores.service';
import { Router, RouterModule } from '@angular/router';
import { CrearpropiedadComponent } from './modales/crearpropiedad/crearpropiedad.component';
import { EditarpropiedadesComponent } from './modales/editarpropiedades/editarpropiedades.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-propiedades',
  standalone: true,
  imports: [RouterModule,CrearpropiedadComponent,EditarpropiedadesComponent,CommonModule ],
  templateUrl: './propiedades.component.html',
  styleUrl: './propiedades.component.css'
})
export class PropiedadesVEndedorComponent {
  public openEdit: boolean = false;
  private router: Router = inject(Router);
  public update: boolean = false;
  public crearp: boolean = false;
  public propiedades: any[] = []
  public vendedores: any[] = [];
  public seletevent: any;
  public opencreate: boolean = false;
  private vendesorservice: VendedorService = inject(VendedorService)

  // Variables para paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit() {

    const idvendedor = localStorage.getItem('id');

    if (idvendedor) {
      this.getpropiedades(Number(idvendedor));
    } else {
      console.log('no se encontro el id del vendedor ')
    }
  }



  handleModalClose(event: { cerrado: boolean; cambiosGuardados: boolean }) {
    // Si el modal debe cerrarse
    if (event.cerrado) {
      if (event.cambiosGuardados) {
        // Si los cambios fueron guardados, actualizamos la lista de empleados
        this.updatepropiedades();
      } else {

        console.log('No se guardaron los cambios');
      }

      this.closeedit();// cierra el modal 
    }
  }

  updatepropiedades() {
    this.update = true;
    this.openEdit = false;
    
    

    if (this.update) {
      const idvendedor = localStorage.getItem('id'); // Obtener el ID del vendedor

      if (idvendedor) {
        this.getpropiedades(Number(idvendedor)); // Convertir a número y pasarlo como argumento
      } else {
        console.error("No se encontró el id del vendedor en localStorage.");
      }
    }
  }

  
updatecrear(){
  this.crearp =true
  this.opencreate = false
  if (this.crearp) {
    const idvendedor = localStorage.getItem('id'); // Obtener el ID del vendedor

    if (idvendedor) {
      this.getpropiedades(Number(idvendedor)); // Convertir a número y pasarlo como argumento
    } else {
      console.error("No se encontró el id del vendedor en localStorage.");
    }
  }
}
  handleModal(event: { cerrar: boolean; cambiosnuevos: boolean }) {
    // Si el modal debe cerrarse
    if (event.cerrar) {
      if (event.cambiosnuevos) {
        
        this.updatecrear();
      } else {

        console.log('No se guardaron los cambios');
      }

      this.closepropiedad();
    }
  }

updatecreado(){
this.crearp = true;
this.opencreate =false

if (this.update){
  const idvendedor = localStorage.getItem('id')
  this.getpropiedades(Number(idvendedor)); // Convertir a número y pasarlo como argumento
      } else {
        console.error("No se encontró el id del vendedor en localStorage.");
      }
}



  getpropiedades(idvendedor: number) {
    this.vendesorservice.getanunciosById(idvendedor).subscribe({
      next: (data: any) => {
        this.propiedades = data.data
        console.log(this.propiedades)
      },
      error: (error) => {
        console.error(error);
      }
    })
  }


  // Métodos de paginación
  get paginatedClientes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.propiedades.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.propiedades.length / this.itemsPerPage);
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

  open(propiedad: any) {
    this.openEdit = true;
    console.log(this.openEdit)
    this.seletevent = { ...propiedad }
   
  }

  closeedit() {
    this.openEdit = false
  }
//abrir la ventna de crear 
  openpropiedad() {
    this.opencreate = true
    console.log(this.opencreate)
  }
  closepropiedad(){
    this.opencreate = false;
  }

}
