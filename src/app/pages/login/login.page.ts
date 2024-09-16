import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController
  ) {}

  async login() {
    if (this.username.trim() === '' || this.password.trim() === '') {
      alert('Por favor, ingrese todos los campos.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      duration: 2000
    });
    await loading.present();

    setTimeout(() => {
      this.navCtrl.navigateForward('/home', { state: { username: this.username } });
    }, 2000);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
