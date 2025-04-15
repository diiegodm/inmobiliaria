import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, ValidatorFn, Validators } from '@angular/forms';
import { ContacService } from './services/contac.service';
import Swal from 'sweetalert2';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contac-us',
  standalone: true,
  imports: [HeaderComponent, FormsModule,ReactiveFormsModule,FooterComponent],
  templateUrl: './contac-us.component.html',
  styleUrls: ['./contac-us.component.css']
})
export class ContacUSComponent {


  private contactservice: ContacService = inject(ContacService);

  
  private activatedRoute = inject(ActivatedRoute);
  formulario = inject(FormBuilder);
  pasoActual = 1;
  totalPasos = 3; 
  progreso: number = 33;
  enviando = false;

  form: FormGroup = this.formulario.group({
   
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    telefono: ['',],
    email: ['', [Validators.required, Validators.email]],
    fecha: ['', [Validators.required,this.validarFecha()]],
    hora: ['', [Validators.required, this.validarHora]],
    mensaje: ['', [Validators.required, Validators.minLength(5)]],
    forma_de_contacto: ['', [Validators.required]],
    presupuesto: [''],
    operacion: [''],
  
  });

ngOnInit(): void{
  this.activatedRoute.queryParams.subscribe((params) => {
    const mensaje = params['mensaje'];
    if (mensaje) {
      this.form.get('mensaje')?.setValue(mensaje); // ✅ Usa this.form, no this.formulario
    }
  });
  
}

  siguientePaso() {
if(this.form.get('nombre')?.value == ''  ){
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Por favor completa todos los campos requeridos.',
  });
}else{
      this.pasoActual++;
      this.progreso += 33;
      console.log(this.form.value);
  
}

  }

  pasoAnterior() {
    if (this.pasoActual > 1) {
      this.progreso -= 33;
      this.pasoActual--;
    }
  }
 
  enviarFormulario() {
    if (this.enviando) return; // Si ya se envió, no volver a enviar
  
    this.enviando = true;
    console.log("🚀 Enviando formulario...");
  
    this.contactservice.createAnuncio(this.form.value).subscribe({
      next: (data: any) => {
        console.log(" Respuesta del servidor:", data);
        if (data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Formulario enviado',
            text: 'Tu formulario ha sido enviado con éxito.',
          });
         
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.msg || "Hubo un problema al registrar el cliente.",
          });
        }
      }
    })

  }


  public get hoy(): string {
    return new Date().toISOString().split('T')[0];   
  }

  validarFecha(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return null; // Si no hay valor, no validar aún
  
      const fechaSeleccionada = new Date(control.value);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0); // Eliminar horas para comparar solo fechas
      const diaSemana = fechaSeleccionada.getDay();
  
      if (fechaSeleccionada < hoy) {
        return { fechaPasada: true };
      }
  
      if (diaSemana === 0 || diaSemana === 6) {
        return { finDeSemana: true };
      }
  
      return null; // ✅ La fecha es válida
    };
  }
  

  // Validar la hora
  validarHora(control: AbstractControl) {
    const hora = control.value;
    if (!hora) return { horaInvalida: true };

    const [hours] = hora.split(':').map(Number);
    return hours >= 7 && hours < 18 ? null : { horaInvalida: true };
  }


}
