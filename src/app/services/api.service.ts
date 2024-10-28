import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private usuarios: any[] = [];

  constructor() {
    this.usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  }

  validarUsuario(username: string, password: string): Observable<any> {
    const usuario = this.usuarios.find(
      (u) => u.username === username && u.password === password
    );

    if (usuario) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', username);
      return of({ message: 'Inicio de sesión exitoso.' });
    } else {
      return throwError(() => new Error('Credenciales incorrectas.'));
    }
  }

  crearUsuario(usuario: any): Observable<any> {
    const usuarioExistente = this.usuarios.find(
      (u) => u.username === usuario.username
    );

    if (usuarioExistente) {
      return throwError(() => new Error('El usuario ya existe.'));
    }

    this.usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

    return of({ message: 'Usuario creado con éxito.' });
  }

  cambiarPassword(username: string, newPassword: string): Observable<any> {
    const usuario = this.usuarios.find((u) => u.username === username);

    if (!usuario) {
      return throwError(() => new Error('Usuario no encontrado.'));
    }

    usuario.password = newPassword; // Asigna la nueva contraseña
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

    return of({ message: 'Contraseña cambiada con éxito.' });
  }
}
