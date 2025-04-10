import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnunciosService } from '../anuncios/services/anuncios.service';
import { AnunciosComponent } from '../anuncios/anuncios.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,AnunciosComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public anuncios: any[] = [];

  menuAbierto = false;
    private anunciosService: AnunciosService = inject(AnunciosService);
  
    ngOnInit() {
      this.getAnuncios();
    }
  
    getAnuncios() {
      this.anunciosService.getAnuncios().subscribe({
        next:(data:any) =>{
          this.anuncios = data;
          console.log(this.anuncios);
        }, error: (error) => {
          console.error(error);
        }
      })
    }

    toggleMenu() {
      this.menuAbierto = !this.menuAbierto;
    }
  
  
}
