import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true, // 2. Asegúrate de que sea standalone si tus otros componentes lo son
  imports: [CommonModule, SidebarComponent], // 3. Agregarlos aquí
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  proyectos: any[] = [];
  tickets: any[] = [];
  proyectoSeleccionado: any = null;

  // Filtros para las columnas del tablero Kanban
  pendientes: any[] = [];
  enProgreso: any[] = [];
  completados: any[] = [];

  private apiUrl = 'http://localhost:3000/api'; // Cambia esto según tu puerto

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarProyectos();
  }

  cargarProyectos() {
    this.http.get<any[]>(`${this.apiUrl}/projects`).subscribe(data => {
      this.proyectos = data;
    });
  }

  seleccionarProyecto(id: number) {
    this.http.get<any>(`${this.apiUrl}/projects/${id}`).subscribe(res => {
      this.proyectoSeleccionado = res;
      this.cargarTickets(id);
    });
  }

  cargarTickets(proyectoId: number) {
    this.http.get<any[]>(`${this.apiUrl}/tickets/project/${proyectoId}`).subscribe(data => {
      this.tickets = data;
      this.organizarTickets();
    });
  }

  organizarTickets() {
    // Dividir tickets por estado según el requerimiento (1, 2, 3)
    this.pendientes = this.tickets.filter(t => t.estado === 1);
    this.enProgreso = this.tickets.filter(t => t.estado === 2);
    this.completados = this.tickets.filter(t => t.estado === 3);
  }

  cambiarEstado(ticketId: number, nuevoEstado: number) {
    // Aquí llamarías a tu endpoint updateStatus del backend
    this.http.patch(`${this.apiUrl}/tickets/${ticketId}/status`, { nuevoEstado })
      .subscribe(() => {
        if (this.proyectoSeleccionado) {
          this.cargarTickets(this.proyectoSeleccionado.id);
        }
      });
  }
}