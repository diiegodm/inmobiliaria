import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../../admin-dashboard/services/admin.service';
import { FormsModule } from '@angular/forms';
import { VendedorService } from '../../services/vendedores.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estadocliente',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './estadocliente.component.html',
  styleUrl: './estadocliente.component.css'
})
export class EstadoclienteComponent {

  
    private router: Router = inject(Router);
    @Output() close = new EventEmitter<{ cerrado: boolean; cambiosGuardados: boolean }>();
    @Input() cliente: any = [];
    private vendedoresservice:VendedorService = inject(VendedorService)
   
    public estado: any = {
     
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

    formattedHora() {
      return new Date('1970-01-01T' + this.cliente.hora + 'Z');
    }
  
    handleSubmit(){
this.vendedoresservice.newEStatus(this.cliente.idcliente,this.estado).subscribe({
  next: (data:any) =>{
    console.log(data)

    this.close.emit({
      cerrado:true,
      cambiosGuardados:true
    })
     Swal.fire({
               position: "center",
               icon: "success",
               title: 'estado actualizado con exito',
               showConfirmButton: false,
               timer: 1500
             });
  },
  error: (error) => {
    console.error("Error en la petición:", error);
    alert('Ocurrió un error al enviar el formulario');
  }
});


    }


    closeModal(){
      this.close.emit({ 
        cerrado: true, 
        cambiosGuardados: false  
      });
    }

   
}
