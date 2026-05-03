import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nuevoUsuario = { nombre: '', email: '', contrasena: '' };

  constructor(private authService: AuthService, private router: Router) {}
  
  onRegistrar() {
    this.authService.registrar(
      this.nuevoUsuario.nombre, 
      this.nuevoUsuario.email, 
      this.nuevoUsuario.contrasena
    ).subscribe({
      next: (res) => {
        alert('¡Usuario creado con éxito! Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        alert('Error al registrar: ' + (err.error.message || err.error.error));
      }
    });
  }
}