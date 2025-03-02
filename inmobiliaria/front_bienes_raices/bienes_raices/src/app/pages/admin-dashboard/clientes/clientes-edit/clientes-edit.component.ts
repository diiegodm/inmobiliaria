import { Component, EventEmitter, inject, Input, Output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes-edit.component.html',
  styleUrl: './clientes-edit.component.css'
})
export class ClientesEditComponent {

  private adminService: AdminService = inject(AdminService)

  private router: Router = inject(Router);
  @Output() close = new EventEmitter<boolean>()
  @Input() cliente: any = []
  public vendedores: any[] = []

  


  public asignar: any = {
   
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    fecha: '',
    hora: '',
    mensaje: '',
    forma_de_contacto: '',
    presupuesto: '',
    operacion: '',
    estado: '',
    vendedor_id:''
  }

  ngOnInit() {

    this.getEmpleados(); // Llamar a la función para obtener vendedores
  
   
  }

  logVendedorId() {
    console.log("Valor seleccionado de vendedor_id:", this.asignar.vendedor_id ?? 'No seleccionado');
  }

  formattedHora() {
    return new Date('1970-01-01T' + this.cliente.hora + 'Z');
  }
  getEmpleados() {
    this.adminService.getVendedores().subscribe({
      next: (data: any) => {
        this.vendedores = data;
        console.log(this.vendedores)

      }, error: (error) => {
        console.error(error);
      }
    })
  }
  

  handleSubmit() {
    
    
    this.adminService.asignarVendedor(this.cliente.idcliente, this.asignar).subscribe({
      next: (data: any) => {
        console.log(data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: 'Formulario enviado con éxito',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (error) => {
        console.error("Error en la petición:", error);
        alert('Ocurrió un error al enviar el formulario');
      }
    });
    
     this.closeModal()
     window.location.reload()
  }




  closeModal() {
    this.close.emit(false)
  }

}
