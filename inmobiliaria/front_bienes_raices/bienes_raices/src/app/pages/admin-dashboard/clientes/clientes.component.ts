import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  
private authservise: AuthService = inject(AuthService)
  public opendetalles: boolean = false
  private router: Router = inject(Router);
  public clientes: any = [];
  public vendedores: any = [];
  public seletevent: any
  clientesTotales: number = 0
  private adminService: AdminService = inject(AdminService);
  currentPage: number = 1;
  itemsPerPage: number = 5;


  ngOnInit() {
    this.getClients();
    this.getEmpleados();

  }



  getClients() {
    this.adminService.getClientes().subscribe({
      next: (data: any) => {
        this.clientes = data;
        this.clientesTotales = this.clientes.length

      }, error: (error) => {
        console.error(error);
      }
    })
  }

  getEmpleados() {
    this.adminService.getVendedores().subscribe({
      next: (data: any) => {
        this.vendedores = data;


      }, error: (error) => {
        console.error(error);
      }
    })
  }


  // Métodos de paginación
get paginatedClientes() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.clientes.slice(start, end);
}

get totalPages() {
  return Math.ceil(this.clientes.length / this.itemsPerPage);
}

setPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/auth/home']);
  }

  open(cleinte: any) {
    this.opendetalles = true
    this.seletevent = cleinte
    console.log(this.opendetalles)
  }
  close() {
    this.opendetalles = false
  }
}
