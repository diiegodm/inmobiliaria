import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { HeaderComponent } from '../../../componentes/header/header.component';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService)
  
  menuAbierto = false;

  private router: Router = inject(Router);
  public userLoginForm = {

    correo: '',
    password: ''
    
  }


  handleLoginForm() {
    const userFormValues = Object.values(this.userLoginForm);

    if(userFormValues.includes('')){
      alert('Debes de rellenar todos los campos')
      return
    }

    

    this.authService.login(this.userLoginForm).subscribe({
      next: (data: any) => {
       
      if(data.token){
        this.authService.setUserData(data.token,data.role)
      }
      localStorage.setItem('id',data.usuario.id)
       
      },
      error: (error) => {
        Swal.fire("Error", "Usuario o contraseña incorrectos");
        console.error(error);
      }
    });
    

  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
}
