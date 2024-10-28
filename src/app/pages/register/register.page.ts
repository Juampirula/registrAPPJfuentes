import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private navCtrl: NavController) {}

  registrarUsuario() {
    if (this.username.trim() === '' || this.password.trim() === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const nuevoUsuario = { username: this.username, password: this.password };

    this.apiService.crearUsuario(nuevoUsuario).subscribe({
      next: (response: { message: string }) => {
        alert(response.message);  // Mostrar mensaje de éxito
        this.navCtrl.navigateRoot('/login');  // Redirigir al Login
      },
      error: (error: { message: string }) => {
        alert(error.message);  // Mostrar mensaje de error
      },
    });
  }
}
