import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { ContacService } from './services/contac.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contac-us',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './contac-us.component.html',
  styleUrls: ['./contac-us.component.css']
})
export class ContacUSComponent {


  private contactservice: ContacService = inject(ContacService);


  public formNew = {
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
    
  };

  // Obtener la fecha actual en formato YYYY-MM-DD
  public get hoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Verifica si la fecha seleccionada cae en fin de semana
   */
  public isWeekend(date: string): boolean {
    const day = new Date(date).getDay();
    return day === 0 || day === 6; // Domingo (0) o Sábado (6)
  }

  /**
   * Verifica si la hora está dentro del rango permitido (07:00 - 18:00)
   */
  public isValidHour(): boolean {
    if (!this.formNew.hora) return false;
    const [hours, minutes] = this.formNew.hora.split(':').map(Number);
    return hours >= 7 && hours < 18; // Entre 07:00 y 17:59
  }

  


  
  handleSubmit()  {  
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i; // Agrega la bandera 'i' para ignorar mayúsculas y minúsculas

if (!emailRegex.test(this.formNew.email)) {
  Swal.fire('ingresa un correo electronico valido' );
  return;
}

        if (this.isWeekend(this.formNew.fecha)) {
           Swal.fire('No puedes seleccionar una fecha en fin de semana.' );
          return;
        }

        if (!this.isValidHour()) {
          Swal.fire('La hora debe estar entre 07:00 AM y 06:00 PM.' );
         
          return;
        }

        this.contactservice.createAnuncio(this.formNew).subscribe({
          next: (data: any) => {
           Swal.fire({
                     position: "center",
                     icon: "success",
                     title: "formulario enviado con exito",
                     showConfirmButton: false,
                     timer: 1500
                   });
            
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              position: "center",
              icon: "error",
              title: "debesllenar todo el formulario ",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
       this.formNew = {
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
          
        };
   
  }
}
