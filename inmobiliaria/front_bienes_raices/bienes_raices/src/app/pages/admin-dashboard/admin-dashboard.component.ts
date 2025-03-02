import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from './services/admin.service';
import { ClientesEditComponent } from './clientes/clientes-edit/clientes-edit.component';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ClientesEditComponent, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})


export class AdminDashboardComponent {
  public opendetalles: boolean = false;
  private router: Router = inject(Router);
  public clientes: any[] = [];
  public vendedores: any[] = [];
  public seletevent: any;
  clientesTotales: number = 0;
  private adminService: AdminService = inject(AdminService);

  // Variables para paginación
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
        this.clientesTotales = this.clientes.filter(cliente => cliente.vendedor_id === null).length;

      
      },
      error: (error) => {
        console.error(error);
      },
    });
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

  open(cliente: any) {
    this.opendetalles = true;
    this.seletevent = cliente;
   
  }

  close() {
    this.opendetalles = false;
  }
}
