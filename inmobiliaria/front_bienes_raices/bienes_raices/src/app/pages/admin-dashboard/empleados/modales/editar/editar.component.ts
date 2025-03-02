import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  @Input() empleadoDetails?: any;
  @Output() cambiosGuardados = new EventEmitter<boolean>();//este separa para actualizar los cambios 
  @Output() close = new EventEmitter<{ cerrado: boolean; cambiosGuardados: boolean }>();
  private userFormData: FormData = new FormData();
  private img!: File;
  private adminService: AdminService = inject(AdminService);



  public empleadoEdit = {
    idvendedor: '',
    nombre: '',
    apellido: '',
    telefono: '',
    rol: '',
    correo: '',
    password: '',
    direccion: '',
    dni: '',
    img: ''
  };

  ngOnInit() {
    if (this.empleadoDetails) {
      this.empleadoEdit = { ...this.empleadoDetails };
      this.empleadoEdit.password = "";
    
    }
  }

  handleImage(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
  
    if (eventTarget.files) {
      this.img = eventTarget.files[0];
    }
  }
  
  saveChanges() {
    // Añadir todos los datos del formulario
    this.userFormData.append('nombre', this.empleadoEdit.nombre || this.empleadoDetails.nombre);
    this.userFormData.append('apellido', this.empleadoEdit.apellido || this.empleadoDetails.apellido);
    this.userFormData.append('password', this.empleadoEdit.password || this.empleadoDetails.password);
    this.userFormData.append('correo', this.empleadoEdit.correo || this.empleadoDetails.correo);
    this.userFormData.append('direccion', this.empleadoEdit.direccion || this.empleadoDetails.direccion);
    this.userFormData.append('telefono', this.empleadoEdit.telefono || this.empleadoDetails.telefono);
    this.userFormData.append('rol', this.empleadoEdit.rol || this.empleadoDetails.rol);
    this.userFormData.append('dni', this.empleadoEdit.dni || this.empleadoDetails.dni);
  
    // Si el usuario ha seleccionado una nueva imagen, la agregamos a los datos del formulario
    if (this.img) {
        this.userFormData.append('img', this.img);
    }
    
    this.adminService.editEmpleado(this.empleadoDetails.idvendedor, this.userFormData).subscribe({
      next: (data) => {
         
        this.close.emit({ 
          cerrado: true,
          cambiosGuardados: true 
        });
          
        Swal.fire({
          position: "center",
          icon: "success",
          title: "empleado actualizado ",
          showConfirmButton: false,
          timer: 1500
        });
        },
        error: (error) => {
            alert('Hubo un error');
            console.log(error);
        }
    });
}

cancelarEdicion() {
  this.close.emit({ 
    cerrado: true, 
    cambiosGuardados: false  
  });
}
}

