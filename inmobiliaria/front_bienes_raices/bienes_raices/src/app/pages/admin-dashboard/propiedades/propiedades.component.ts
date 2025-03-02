import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AnunciosService } from '../../../componentes/anuncios/services/anuncios.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-propiedades',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './propiedades.component.html',
  styleUrl: './propiedades.component.css'
})
export class PropiedadesComponent {



private anunciosService: AnunciosService = inject(AnunciosService);
private adminService: AdminService = inject(AdminService);
  public anuncios: any[] = [];
  public vendedores: any[] = [];
  private router: Router = inject(Router)

  currentPage: number = 1;
  itemsPerPage: number = 5;



  ngOnInit() {
    this.getAnuncios();
    this.getEmpleados();
  }

  getAnuncios() {
    this.anunciosService.getAnuncios().subscribe({
      next:(data:any) =>{
        this.anuncios = data;
       
      }, error: (error) => {
        console.error(error);
      }
    })
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

  get paginatedClientes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.anuncios.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.anuncios.length / this.itemsPerPage);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  open(){

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/auth/home']);
  }
}
