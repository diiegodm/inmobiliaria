import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VendedorService } from '../../../services/vendedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crearpropiedad',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crearpropiedad.component.html',
  styleUrl: './crearpropiedad.component.css'
})
export class CrearpropiedadComponent {
  @Input() selectevent: any = [];
  private imagenes: File[] = []; // Para manejar múltiples imágenes
  @Output() close = new EventEmitter<{ cerrar: boolean; cambiosnuevos: boolean }>();
 private getId = localStorage.getItem('id')
  private vendedoresservice: VendedorService = inject(VendedorService);

  public crearpropiedadfroms = {
    idpropiedades: "",
    titulo: "",
    precio: "",
    descripcion: "",
    habitaciones: "",
    wc: "",
    parqueadero: "",
    creado:  this.hoy,
    vendedor_idvendedor: this.getId,
    ciudad: "",
    direccion: "",
    estado: ""
  };
  public get hoy(): string {
    return new Date().toISOString().split('T')[0];
  }
  ngOnInit() {
  

  }
  
  

  // Manejo de múltiples imágenes
  handleImage(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    if (eventTarget.files && eventTarget.files.length > 0) {
      this.imagenes = Array.from(eventTarget.files);
      console.log("📸 Imágenes seleccionadas:", this.imagenes);
    } else {
      console.warn("⚠ No se seleccionó ninguna imagen.");
    }
  }

  saveChanges() {


    const userFormData = new FormData();
    
    userFormData.append('titulo', this.crearpropiedadfroms.titulo);
    userFormData.append('precio', this.crearpropiedadfroms.precio);
    userFormData.append('descripcion', this.crearpropiedadfroms.descripcion);
    userFormData.append('habitaciones', this.crearpropiedadfroms.habitaciones);
    userFormData.append('wc', this.crearpropiedadfroms.wc);
    userFormData.append('parqueadero', this.crearpropiedadfroms.parqueadero);
    userFormData.append('vendedor_idvendedor', this.crearpropiedadfroms.vendedor_idvendedor || '' )
    userFormData.append('ciudad', this.crearpropiedadfroms.ciudad);
    userFormData.append('direccion', this.crearpropiedadfroms.direccion);
    userFormData.append('estado', this.crearpropiedadfroms.estado);
;

    //  Revisión de imágenes
    if (this.imagenes.length > 0) {
      this.imagenes.forEach((imagen, index) => {
        userFormData.append(`imagenes`, imagen);
      });
    } else {
      console.warn(" No se adjuntaron imágenes.");
    }
  
  
  

    this.vendedoresservice.crearAnuncio(userFormData).subscribe({
      next: (data) => {
        this.close.emit({
          cerrar: true,
          cambiosnuevos: true
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Propiedad creada",
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (error) => {
        console.error("❌ Error en la petición:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Hubo un error al crear la propiedad",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
  
  cancelarEdicion() {
    this.close.emit({ cerrar: true, cambiosnuevos: false });
  }
}
