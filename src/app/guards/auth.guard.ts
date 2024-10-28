import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isLoggedIn();
    console.log('Estado de autenticación:', isAuthenticated); // Depuración

    if (!isAuthenticated) {
      this.router.navigate(['/login']);  // Redirigir a Login si no está autenticado
      return false;
    }
    return true;  // Permitir acceso si está autenticado
  }
}
