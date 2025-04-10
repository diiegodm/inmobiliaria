import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from './services/admin.service';
import { ClientesEditComponent } from './clientes/clientes-edit/clientes-edit.component';
import { FormControl, FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ClientesEditComponent, RouterModule,FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})


export class AdminDashboardComponent {
  searchControl = new FormControl('');
  public opendetalles: boolean = false;
  private router: Router = inject(Router);
  public clientes: any[] = [];
  public vendedores: any[] = [];
  public seletevent: any;
  clientesTotales: number = 0;
  public searchText: string = '';
  public resultados: any = [];
  private adminService: AdminService = inject(AdminService);

  // Variables para paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit() {

    this.getClients();
    this.getEmpleados();

    this.searchControl.valueChanges
    .pipe(debounceTime(300)) // Espera 300ms después de que el usuario deja de escribir
    .subscribe(value => {
      this.buscar()
    });
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

  buscar(){
this.adminService.getClientesbybsuqeda(this.searchText).subscribe(data=>{
  this.resultados = data
});
  }


  filtrarElementos() {
    return this.clientes.filter(item =>
      item.toLowerCase().includes(this.searchText.toLowerCase())
    );
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
