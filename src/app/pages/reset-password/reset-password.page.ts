import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  username: string = '';

  constructor(private navCtrl: NavController) {}

  resetPassword() {
    if (this.username) {
      alert('Instrucciones de recuperación enviadas a ' + this.username);
      this.navCtrl.navigateBack('/login');
    } else {
      alert('Por favor, ingrese su nombre de usuario.');
    }
  }
}
