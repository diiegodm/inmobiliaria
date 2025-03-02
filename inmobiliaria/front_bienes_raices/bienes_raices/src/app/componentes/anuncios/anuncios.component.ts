import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AnunciosService } from './services/anuncios.service';
import { CommonModule } from '@angular/common';
 interface Propiedad { // TODO: cree la interface aqui para no abrirlo en otra carpeta
  idpropiedades: number;
  titulo: string;
  precio: string;
  imagenes: string[];  // --> se convierte las imagenes en array 
  descripcion: string;
  ciudad: string;
  direccion: string;
  habitaciones: number;
  parqueadero: number;
  wc: number;
}

@Component({
  selector: 'app-anuncios',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
  templateUrl: './anuncios.component.html',
  styleUrl: './anuncios.component.css'
})
export class AnunciosComponent {

   public propiedadDetails: Propiedad | null = null;

  public anuncios: any[] = [];
  private anunciosService: AnunciosService = inject(AnunciosService);
 

  ngOnInit() {
    this.getAnuncios();

  }

  getAnuncios() {
    this.anunciosService.getAnuncios().subscribe({
      next: (data: any) => {
        this.anuncios = data;
        console.log(this.anuncios);
      }, error: (error) => {
        console.error(error);
      }
    })
  }


  openDetalles(anuncio: any): void {
    this.propiedadDetails = {
      ...anuncio,
      imagenes: anuncio.imagen ? anuncio.imagen.split(',').map((img: string) => img.trim()) : []
    };
  }
  

}
