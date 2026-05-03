import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Asegúrate de que este puerto sea el de tu backend de Node
  private API_URL = 'http://localhost:3000/auth'; 

  constructor(private http: HttpClient) { }

  login(email: string, contrasena: string): Observable<any> {
    // Enviamos el objeto con los nombres de campos que espera tu DB[cite: 1]
    return this.http.post(`${this.API_URL}/login`, { email, contrasena }).pipe(
      tap((res: any) => {
        if (res.token) {
          // Guardamos el token para futuras peticiones protegidas[cite: 5]
          localStorage.setItem('token', res.token);
        }
      })
    );
  }
  registrar(nombre: string, email: string, contrasena: string): Observable<any> {
    // Enviamos los 3 campos obligatorios definidos en el práctico
    return this.http.post(`${this.API_URL}/registrar`, { nombre, email, contrasena });
    }
}