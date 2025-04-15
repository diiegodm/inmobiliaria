import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AnunciosService } from '../services/anuncios.service';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from "../../footer/footer.component";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Propiedad { // TODO: cree la interface aqui para no abrirlo en otra carpeta

  idpropiedades: number;
  titulo: string;
  precio: string;
  imagenes: string[];
  descripcion: string;
  ciudad: string;
  direccion: string;
  habitaciones: number;
  parqueadero: number;
  wc: number;
  ubicacion: string;
}

@Component({
  selector: 'app-id-anuncio',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterModule],
  templateUrl: './id-anuncio.component.html',
  styleUrl: './id-anuncio.component.css'

})
export class IdAnuncioComponent {

  private activeroute = inject(ActivatedRoute);
  private anuncioService = inject(AnunciosService);
  private sanitizer = inject(DomSanitizer);

  public propiedadDetails: Propiedad | null = null;
  private id: any = "";
  public vendedores: any = null;
  public ubicacionMapa: SafeHtml | null = null;

  ngOnInit() {
    this.getPropiedadesDetails();
    this.getvendedores();
  }



  getPropiedadesDetails() {

    this.activeroute.params.subscribe((params) => {
      this.id = params['id'];
      this.anuncioService.getAnuncioById(this.id).subscribe({
        next: (data: any) => {
console.log(data.data)
          this.propiedadDetails = {
            ...data.data[0],
            imagenes: data.data[0].imagen ? data.data[0].imagen.split(',').map((img: string) => img.trim()) : [],
             ubicacion: data.data[0].ubicacion || ''
          };
          // Usamos DomSanitizer para marcar el contenido HTML del iframe como seguro
          if (this.propiedadDetails?.ubicacion) {
            this.ubicacionMapa = this.sanitizer.bypassSecurityTrustHtml(this.propiedadDetails.ubicacion);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    });
  }

  getvendedores() {
    this.anuncioService.getVendedores().subscribe({
      next: (data: any) => {
        this.vendedores = Object.values(data.data);
       
      }
      , error: (error) => {
        console.error(error);
      }
    }
    )
  }


}

