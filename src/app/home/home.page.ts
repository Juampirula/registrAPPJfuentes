import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';  // Asegúrate de importar NavController
import { AuthService } from '../services/auth.service';  // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tareas: string[] = ['Tarea 1', 'Tarea 2'];
  nuevaTarea: string = '';

  constructor(private authService: AuthService, private navCtrl: NavController) {}

  // Método para agregar una nueva tarea
  agregarTarea() {
    if (this.nuevaTarea.trim() !== '') {
      this.tareas.push(this.nuevaTarea);
      this.nuevaTarea = '';  // Limpiar el campo de entrada
    }
  }

  // Método para eliminar una tarea
  eliminarTarea(tarea: string) {
    this.tareas = this.tareas.filter(t => t !== tarea);
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();  // Llamada al servicio de logout
    this.navCtrl.navigateRoot('/login');  // Redirigir al Login después de cerrar sesión
  }
}
