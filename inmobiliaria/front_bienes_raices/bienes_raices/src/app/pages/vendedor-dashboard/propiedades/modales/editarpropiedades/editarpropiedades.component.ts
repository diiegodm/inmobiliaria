import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { VendedorService } from '../../../services/vendedores.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editarpropiedades',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editarpropiedades.component.html',
  styleUrl: './editarpropiedades.component.css'
})
export class EditarpropiedadesComponent {
  @Input() selectevent: any = [];
  private imagenes: File[] = []; // Se cambia a un array para soportar múltiples imágenes
  @Output() close = new EventEmitter<{ cerrado: boolean; cambiosGuardados: boolean }>();

  private vendedoresservice: VendedorService = inject(VendedorService);

  public crearpropiedadfroms = {
    idpropiedades: "",
    titulo: "",
    precio: "",
    imagen: "",
    descripcion: "",
    habitaciones: "",
    wc: "",
    parqueadero: "",
    creado: "",
    vendedor_idvendedor: "",
    ciudad: "",
    direccion: "",
    estado: "",
    ubicacion:""
  };

  ngOnInit() {
    if (this.selectevent) {
      this.crearpropiedadfroms = { ...this.selectevent };
    }
  }

  handleImage(event: Event) {
    const eventTarget = event.target as HTMLInputElement;

    if (eventTarget.files && eventTarget.files.length > 0) {
      this.imagenes = Array.from(eventTarget.files); // Convierte FileList en Array
      console.log(" Imágenes seleccionadas:", this.imagenes);
    } else {
      console.warn(" No se seleccionó ninguna imagen.");
    }
  }

  saveChanges() {
    const userFormData = new FormData();

    userFormData.append('titulo', this.crearpropiedadfroms.titulo || this.selectevent.titulo);
    userFormData.append('precio', this.crearpropiedadfroms.precio || this.selectevent.precio);
    userFormData.append('descripcion', this.crearpropiedadfroms.descripcion || this.selectevent.descripcion);
    userFormData.append('habitaciones', this.crearpropiedadfroms.habitaciones || this.selectevent.habitaciones);
    userFormData.append('wc', this.crearpropiedadfroms.wc || this.selectevent.wc);
    userFormData.append('parqueadero', this.crearpropiedadfroms.parqueadero || this.selectevent.parqueadero);
    userFormData.append('vendedor_idvendedor', this.crearpropiedadfroms.vendedor_idvendedor || this.selectevent.vendedor_idvendedor);
    userFormData.append('ciudad', this.crearpropiedadfroms.ciudad || this.selectevent.ciudad);
    userFormData.append('direccion', this.crearpropiedadfroms.direccion || this.selectevent.direccion);
    userFormData.append('estado', this.crearpropiedadfroms.estado || this.selectevent.estado);
    userFormData.append('ubicacion', this.crearpropiedadfroms.ubicacion || this.selectevent.ubicacion);

    // Agregar múltiples imágenes si hay nuevas seleccionadas
    if (this.imagenes.length > 0) {
      this.imagenes.forEach((imagen, index) => {
        userFormData.append(`imagenes`, imagen);
      });
      console.log(" Enviando imágenes al servidor:", this.imagenes);
    } else {
      console.warn(" No se adjuntó una nueva imagen.");
    }

    this.vendedoresservice.updateAnuncio(this.selectevent.idpropiedades, userFormData).subscribe({
      next: (data) => {
        this.close.emit({
          cerrado: true,
          cambiosGuardados: true
        });

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Propiedad actualizada",
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (error) => {
        alert('Hubo un error');
        console.error("❌ Error al actualizar:", error);
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
