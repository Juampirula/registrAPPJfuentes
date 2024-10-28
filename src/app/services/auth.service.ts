import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  login(username: string, password: string): Observable<any> {
    return this.apiService.validarUsuario(username, password);
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    return auth;
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('currentUser');
  }
}
