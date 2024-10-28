import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private navCtrl: NavController, private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        alert(response.message);
        this.navCtrl.navigateForward('/home');
      },
      error: (error: any) => {
        alert(error.message);
      },
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
