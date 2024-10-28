import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  username: string = '';
  newPassword: string = '';

  constructor(private navCtrl: NavController, private apiService: ApiService) {}

  cambiarPassword() {
    if (this.username.trim() === '' || this.newPassword.trim() === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }

    this.apiService.cambiarPassword(this.username, this.newPassword).subscribe({
      next: (response: any) => {
        alert(response.message); // Muestra el mensaje de éxito
        this.navCtrl.navigateForward('/login'); // Redirige al Login
      },
      error: (error: any) => {
        alert(error.message); // Muestra el error si el usuario no es encontrado
      },
    });
  }
}
