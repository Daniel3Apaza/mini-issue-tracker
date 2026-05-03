import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  datos = { email: '', contrasena: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.datos.email, this.datos.contrasena).subscribe({
      next: (res) => {
        alert('¡Bienvenido al Tracker!');
        this.router.navigate(['/dashboard'])
        console.log('JWT:', res.token);
      },
      error: (err) => {
        alert('Error: ' + (err.error.message || 'Credenciales inválidas'));
      }
    });
  }

  registrar() {
    this.router.navigate(['/registro']);
  }
}