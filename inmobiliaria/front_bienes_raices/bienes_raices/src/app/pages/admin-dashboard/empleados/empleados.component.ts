import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router, RouterModule } from '@angular/router';
import { VenddoresEditComponent } from './modales/venddores-edit/venddores-edit.component';
import { EditarComponent } from './modales/editar/editar.component';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [RouterModule, VenddoresEditComponent, EditarComponent, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {

  public vendedores: any[] = [];
public update:boolean = false
  public openDetails: boolean = false;
  public openEdit: boolean = false;
  private adminService: AdminService = inject(AdminService);
  public empleadoDetails: any;
  private userFormData: FormData = new FormData();
  public modalAdd: boolean = false;
  public isSubmitted:boolean = false;
  private router:Router = inject(Router)

  private img!: File;

  public empleadoupdate = {
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
    this.getEmpleados()
   
  }

  handleModalClose(event: { cerrado: boolean; cambiosGuardados: boolean }) {
    // Si el modal debe cerrarse
    if (event.cerrado) {
      if (event.cambiosGuardados) {
        // Si los cambios fueron guardados, actualizamos la lista de empleados
        this.updateEmpleados();
      } else {
        
        console.log('No se guardaron los cambios');
      }
      
      this.closeedit();// cierra el modal 
    }
  }
  
  updateEmpleados() {
    this.update = true
    this.openEdit = false;
if(this.update){
  this.getEmpleados()
}
  }

  getEmpleados() {
    this.adminService.getVendedores().subscribe({
      next: (data: any) => {
        this.vendedores = data;  
      },
      error: (error) => {
        console.error(error);
      },
    });
  }



  open(empleado: any) {
    this.openDetails = true;
    this.empleadoDetails = { ...empleado };
  }

  openE(empleado: any) {
    this.openEdit = true;
    this.empleadoDetails = { ...empleado }; 
  }

  close() {
    this.openDetails = false;

  }
  closeedit() {
    this.openEdit = false;
  }


  handleImage(event: Event) {
    const eventTarget = event.target as HTMLInputElement;

    if (eventTarget.files) {
      this.img = eventTarget.files[0];
    }
  }

  saveChanges() {
    this.isSubmitted = true;
    this.userFormData.append('nombre', this.empleadoupdate.nombre || this.empleadoDetails.nombre);
    this.userFormData.append('apellido', this.empleadoupdate.apellido || this.empleadoDetails.apellido);
    this.userFormData.append('password', this.empleadoupdate.password || this.empleadoDetails.password);
    this.userFormData.append('correo', this.empleadoupdate.correo || this.empleadoDetails.correo);
    this.userFormData.append('direccion', this.empleadoupdate.direccion || this.empleadoDetails.direccion);
    this.userFormData.append('telefono', this.empleadoupdate.telefono || this.empleadoDetails.telefono);
    this.userFormData.append('rol', this.empleadoupdate.rol || this.empleadoDetails.rol);
    this.userFormData.append('dni', this.empleadoupdate.dni || this.empleadoDetails.dni);

    // Si el usuario ha seleccionado una nueva imagen, la agregamos a los datos del formulario
    if (this.img) {
      this.userFormData.append('img', this.img);
    }

    this.adminService.newEmpleado(this.empleadoupdate).subscribe({
      next: (data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "nuevo empleado registrado ",
          showConfirmButton: false,
          timer: 1500
        });
        this.getEmpleados();
      },error(error){
        if (error.status === 400) {
          Swal.fire(error.error.msg) // Mostrar el mensaje de error en el frontend
        }
      }
    })

   
    this.closeModal()
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/auth/home']);
  }

  openmodal() {
    this.modalAdd = true;
  }


  closeModal() {
    this.modalAdd = false;
  }

  eliminarusuario(id: string) {

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {

      if (result.isConfirmed) {
        if (result.isConfirmed) {
          this.adminService.eliminar(id).subscribe({
            next: (data) => {
              Swal.fire('usuaro eliminado con exito')
              this.getEmpleados()
            }, error(error) {
              console.log(error)
            }
          });
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
}
